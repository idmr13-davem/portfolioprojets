#!/usr/bin/env python3
"""Encode every V3 video to an optimized H.264 MP4 beside the original (name.web.mp4). Never touches originals."""
import json, os, re, subprocess, sys, unicodedata

ROOT = '/Users/dave/Documents/Personal/davidmontealegreux-site'
REFS = sys.argv[1]
OUT_JSON = sys.argv[2]
CRF = os.environ.get('CRF', '26')


def real(p):
    for c in (p, unicodedata.normalize('NFD', p), unicodedata.normalize('NFC', p)):
        if os.path.exists(os.path.join(ROOT, c)): return c
    raise FileNotFoundError(p)


def probe(path):
    out = subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries',
        'stream=codec_type,codec_name,width,height,pix_fmt,r_frame_rate:format=duration,bit_rate', '-of', 'json', path])
    return json.loads(out)


rows = []
for line in open(REFS):
    rel = line.strip()
    if not re.search(r'\.(mov|mp4)$', rel, re.I): continue
    src = os.path.join(ROOT, real(rel))
    size = os.path.getsize(src)
    # Small MP4s are already light; MOVs are always converted so the site serves a single container.
    if rel.lower().endswith('.mp4') and size < 1_000_000: continue
    base = re.sub(r'(\.mov)?\.(mov|mp4)$', '', src, flags=re.I)
    dst = base + '.web.mp4'
    info = probe(src)
    dur = info['format']['duration']
    v = next(s for s in info['streams'] if s['codec_type'] == 'video')
    alpha = 'a' in v.get('pix_fmt', '').replace('yuva', 'a').replace('yuv', '')
    subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', src, '-map', '0:v:0', '-c:v', 'libx264', '-preset', 'slow', '-crf', CRF,
        '-profile:v', 'high', '-pix_fmt', 'yuv420p', # Screen recordings have variable frame durations. The fps filter (not the -r output option, which shifts
        # long holds) gives constant 60 fps on the source clock; the held last frame keeps the exact length.
        '-vf', "fps=60,scale=-2:'min(1600,ih)',tpad=stop_mode=clone:stop_duration=2", '-t', dur, '-an', '-movflags', '+faststart', dst], check=True)
    # SSIM against the original scaled to the output size (1.0 = identical).
    o = probe(dst)['streams'][0]
    ssim = subprocess.run(['ffmpeg', '-v', 'info', '-i', dst, '-i', src, '-lavfi',
        f"[1:v]fps=60,scale={o['width']}:{o['height']},format=yuv420p[r];[0:v][r]ssim", '-f', 'null', '-'], capture_output=True, text=True).stderr
    m = re.search(r'All:([\d.]+)', ssim)
    rows.append({'src': os.path.relpath(src, ROOT), 'dst': os.path.relpath(dst, ROOT), 'before': size, 'after': os.path.getsize(dst),
        'codec': v['codec_name'], 'pix_fmt': v.get('pix_fmt'), 'alpha': alpha, 'in': f"{v['width']}x{v['height']}",
        'out': f"{o['width']}x{o['height']}", 'dur_before': float(dur), 'dur_after': float(probe(dst)['format']['duration']), 'audio': any(s['codec_type'] == 'audio' for s in info['streams']),
        'ssim': float(m.group(1)) if m else None})
    r = rows[-1]
    print(f"{r['before']/1e6:6.2f} -> {r['after']/1e6:6.2f} MB  ssim {r['ssim']}  {r['in']}->{r['out']}  {r['src']}", flush=True)

json.dump(rows, open(OUT_JSON, 'w'), ensure_ascii=False, indent=2)
b = sum(r['before'] for r in rows); a = sum(r['after'] for r in rows)
print(f"TOTAL {b/1e6:.1f} -> {a/1e6:.1f} MB ({(1-a/b)*100:.0f}% less), {len(rows)} files")

#!/usr/bin/env python3
"""Capture the 1200x630 Open Graph images of the V3 pages into assets/og/ (committed, reused by every release).

Needs the local server (node server.js) and Google Chrome; ffmpeg converts the captures to JPEG.
  python3 scripts/make-og-images.py [http://localhost:3456]
"""
from pathlib import Path
import subprocess, sys, tempfile

ROOT = Path(__file__).resolve().parents[1]
BASE = (sys.argv[1] if len(sys.argv) > 1 else 'http://localhost:3456').rstrip('/')
CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
OUT = ROOT / 'assets' / 'og'
# Same names build-pages.mjs --release uses for og:image.
PAGES = {
    'home': 'index.html',
    'registro': 'work/registro-ml.html',
    'motion': 'work/motion-design-system.html',
    'menores': 'work/menores-mexico.html',
    'switch': 'work/cambio-cuentas-paises.html',
    'ropstar': 'work/ropstar.html',
    'winefast': 'work/winefast.html',
    'por-que-mercado-libre-fue-el-primer-lugar-del-que-no-quise-irme': 'articles/por-que-mercado-libre-fue-el-primer-lugar-del-que-no-quise-irme.html',
    'lo-que-mi-pasion-por-los-autos-me-enseno-sobre-disenar-experiencias': 'articles/lo-que-mi-pasion-por-los-autos-me-enseno-sobre-disenar-experiencias.html',
}

# A same-origin bridge records a rejected consent so the cookie panel stays out of the capture.
# It lives in releases/, which Git ignores, and is removed afterwards.
bridge = ROOT / 'releases' / '_og-bridge.html'
bridge.parent.mkdir(exist_ok=True)
bridge.write_text("""<!doctype html><script>
localStorage.setItem('portfolio-analytics-consent-v1', JSON.stringify({ value: 'rejected', at: Date.now() }));
location.replace(location.hash.slice(1));
</script>""")
OUT.mkdir(exist_ok=True)
try:
    with tempfile.TemporaryDirectory() as tmp:
        for name, page in PAGES.items():
            png = Path(tmp) / f'{name}.png'
            subprocess.run([CHROME, '--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1',
                '--window-size=1200,630', '--virtual-time-budget=5000', f'--user-data-dir={tmp}/profile', f'--screenshot={png}',
                f'{BASE}/releases/_og-bridge.html#/v3/statement/{page}'], check=True, capture_output=True)
            subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', str(png), '-q:v', '3', str(OUT / f'{name}.jpg')], check=True)
            print(f"{(OUT / f'{name}.jpg').stat().st_size // 1024:5} KB  assets/og/{name}.jpg")
finally:
    bridge.unlink(missing_ok=True)

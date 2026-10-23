#!/usr/bin/env python3
"""Build an independent static release from the current working files; never deploy."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import unquote, urlsplit, quote, urlunsplit
import hashlib, html, json, re, shutil, subprocess, unicodedata, zipfile

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'releases' / 'github-pages'
PUBLIC = ['index.html', 'about.html', '404.html',
 'work/registro-ml.html', 'work/motion-design-system.html', 'work/menores-mexico.html',
 'articles/por-que-mercado-libre-fue-el-primer-lugar-del-que-no-quise-irme.html',
 'articles/lo-que-mi-pasion-por-los-autos-me-enseno-sobre-disenar-experiencias.html',
 'articles/page-under-work.html']
DOMAIN = 'https://davidmontealegreux.com'
PRIVATE = re.compile(r'country[ _-]?switch|cambio-cuentas-paises|switch entre|switch países|/Videos/Switch|home-v2-poster-4|(?:css|js)/country-v2', re.I)
CASE_TEXT = re.compile(r'switch|across countries|entre pa[ií]ses|Case 4|Caso 4|200k|a number that has continued to grow in recent quarters|un número que viene creciendo', re.I)
POSITIONS = [7, 87, 167, 247, 327, 407, 488]
PEAKS = [(p + 20 - 7) / 512 * 100 for p in POSITIONS]


def normalize_html_urls(text):
    def replace(match):
        parts = urlsplit(match.group(2))
        if parts.scheme or parts.netloc: return match.group(0)
        decoded = unquote(parts.path)
        normalized = unicodedata.normalize('NFC', decoded)
        if normalized == decoded: return match.group(0)
        url = urlunsplit(('', '', quote(normalized, safe="/~!$&'()*+,;=:@-._"), parts.query, parts.fragment))
        return match.group(1) + url + match.group(3)
    return re.sub(r"((?:src|href|poster)=['\"])([^'\"]*)(['\"])", replace, text)


def transform(rel, text):
    if rel == 'index.html':
        text, count = re.subn(r'<article\b[^>]*data-project="4".*?</article>', '', text, flags=re.S)
        assert count == 1, 'Expected exactly one excluded card'
        text = re.sub(r'<a\b[^>]*href="#case-4".*?</a>', '', text, flags=re.S)
        for anchor, position in zip(['hero','about','case-1','case-2','case-3','articles','contact'], POSITIONS):
            text = re.sub(r'(href="#' + anchor + r'" class="v2-scroll-stop" style="--stop:)\d+px', rf'\g<1>{position+11}px', text)
        text = re.sub(r'<button\b[^>]*data-case-pending[^>]*>.*?</button>', '', text, flags=re.S)
        text = text.replace('data-local-case hidden ', '')
        text = re.sub(r'<dialog class="v2-pending-dialog".*?</dialog>', '', text, flags=re.S)
    if rel == 'js/home-v2.js':
        text = text.replace("'case-3', 'case-4', 'articles'", "'case-3', 'articles'")
        text = text.replace('[7, 74, 141, 208, 278, 348, 418, 488]', json.dumps(POSITIONS))
        text = text.replace('[4.017, 16.563, 29.693, 42.681, 56.56, 69.992, 83.76, 97.474]', json.dumps(PEAKS))
        text = text.split('// Local preview entry for the active, unpublished case.')[0]
        text = re.sub(r"  const dialog = document.querySelector\('.v2-pending-dialog'\);.*?(?=  const drawer)", '', text, flags=re.S)
    if rel == 'css/home-v2-motion.css':
        text = re.sub(r"^.*\[data-project='4'\].*\n", '', text, flags=re.M)
        text = text.split('/* Native Figma label keyframes')[0]
        text += '\n/* Seven public navigation stops; scroll seeks the opacity timeline. */\n'
        text += '.home-v2 .v2-scroll-stop span {animation-duration:2500ms;animation-timing-function:linear;animation-iteration-count:1;animation-fill-mode:both;animation-play-state:paused;animation-delay:var(--indicator-label-delay,0ms);}\n'
        for i, peak in enumerate(PEAKS,1):
            low, high = max(0, peak-6), min(100, peak+6)
            text += f'.home-v2 .v2-scroll-stop:nth-of-type({i}) span {{animation-name:public-stop-{i};}}\n'
            text += f'@keyframes public-stop-{i} {{0%{{opacity:0}} {low:.4f}%{{opacity:0;animation-timing-function:cubic-bezier(.5,0,.5,1)}} {peak:.4f}%{{opacity:1;animation-timing-function:cubic-bezier(.5,0,.5,1)}} {high:.4f}%{{opacity:0}} 100%{{opacity:0}}}}\n'
    if rel == 'js/i18n.js':
        # Remove complete EN/ES pairs, including unused legacy copy and media labels.
        pair = re.compile(r'\[\s*"(?:\\.|[^"\\])*"\s*,\s*"(?:\\.|[^"\\])*"\s*\]\s*,?', re.S)
        text = pair.sub(lambda m: '' if CASE_TEXT.search(m.group()) else m.group(), text)
    if rel == 'js/analytics.js':
        text = re.sub(r"\s*'/work/cambio-cuentas-paises.html': 'country_switch'", '', text)
        text = text.replace(", '4': 'country_switch'", '').replace(", '#case-4': 'country_switch_preview'", '')
        text = text.replace("'/', '/index.html', '/about.html',", "'/', '/index.html', '/about.html', '/work/registro-ml.html', '/work/motion-design-system.html', '/work/menores-mexico.html',")
    if rel in ['js/registro-v2.js','js/motion-v2.js']:
        folder = 'Registro ML' if 'registro-' in rel else 'Motion DS'
        copy = json.loads((ROOT / 'assets' / folder / 'v2/review-copy.json').read_text())
        text = re.sub(r"(\"?reviewPath\"?\s*:)\s*['\"][^'\"]+['\"]", r'\1null', text)
        text += '\n// Embed the approved bilingual content in the static release.\n'
        text += 'for (const [lang, copy] of Object.entries(' + json.dumps(copy,ensure_ascii=False) + ')) Object.assign(window.caseStudyV2.translations[lang], copy);\nwindow.caseStudyV2.reviewPath = null;\n'
    if rel == 'js/case-study-v2.js':
        text = text.replace('/* Local implementation of Dev Mode interactions. Full cases need server authentication before publication. */', '/* Shared interactions for the three public case studies. */')
        text = re.sub(r"  // Exact review copy.*?(?=  document.querySelectorAll\('\[data-language\]'\))", '  const copyReady = Promise.resolve();\n', text, flags=re.S)
    if rel.startswith('work/') and rel.endswith('.html'):
        text = re.sub(r'<meta name="robots"[^>]*>', '<meta name="robots" content="index, follow">', text)
        if 'rel="canonical"' not in text:
            text = text.replace('</head>', f'<link rel="canonical" href="{DOMAIN}/{rel}"></head>')
        if 'js/analytics.js' not in text:
            text = text.replace('</head>', '<link rel="stylesheet" href="../css/analytics.css?v=public-v2"><script defer src="../js/analytics.js?v=public-v2"></script></head>')
    if rel.endswith('.html'): text = normalize_html_urls(text)
    return re.sub(r'(?m)^[ \t]+$', '', text).rstrip() + '\n'


class References(HTMLParser):
    def __init__(self):
        super().__init__(); self.refs = []
    def handle_starttag(self, tag, attrs):
        for key, value in attrs:
            if not value: continue
            if key in ('src','href','poster'): self.refs.append(value)
            elif key == 'srcset':
                self.refs.extend(re.sub(r'\s+\d+(?:\.\d+)?[wx]$', '', v.strip()) for v in value.split(','))


def dependencies(rel, text):
    if rel.endswith('.html'):
        parser = References(); parser.feed(text); return parser.refs
    if rel.endswith('.css'):
        return [m.group(2) for m in re.finditer(r'url\(\s*([\'"]?)(.*?)\1\s*\)', text)]
    return []


def local_path(rel, ref):
    url = urlsplit(html.unescape(ref))
    if url.scheme or url.netloc or not url.path: return None
    p = ROOT / unquote(url.path).lstrip('/') if url.path.startswith('/') else ROOT / Path(rel).parent / unquote(url.path)
    return p.resolve().relative_to(ROOT).as_posix()


def build():
    OUT.parent.mkdir(exist_ok=True)
    if OUT.exists():
        assert (OUT / '.portfolio-generated').is_file(), 'Refuse to overwrite an unknown folder'
        shutil.rmtree(OUT)
    OUT.mkdir(); (OUT / '.portfolio-generated').touch()
    queue = PUBLIC + ['CNAME', 'robots.txt']
    # Shared JS generates these URLs at runtime, beyond static HTML/CSS references.
    for folder in ['assets/Home/v2','assets/Home/logo']:
        queue += [p.relative_to(ROOT).as_posix() for p in (ROOT/folder).rglob('*') if p.is_file() and p.name!='.DS_Store']
    done=set()
    while queue:
        rel=queue.pop(0)
        if rel in done: continue
        assert not PRIVATE.search(rel), 'Protected dependency: '+rel
        src=ROOT/rel
        if src.is_file(): data=src.read_bytes()
        else:
            # About still uses three tracked images deleted from the working tree.
            assert rel in ['assets/Home/Imágenes/Img1.png','assets/Home/Imágenes/Img2.png','assets/Home/Imágenes/Img3.png'], 'Missing resource: '+rel
            data=subprocess.check_output(['git','show','HEAD:'+rel],cwd=ROOT)
        if Path(rel).suffix in ('.html','.css','.js'):
            text=transform(rel,data.decode())
            assert not PRIVATE.search(text), 'Protected runtime reference: '+rel
            data=text.encode()
            for ref in dependencies(rel,text):
                path=local_path(rel,ref)
                if path: queue.append(path)
        dest=OUT/rel;dest.parent.mkdir(parents=True,exist_ok=True);dest.write_bytes(data);done.add(rel)
    (OUT/'.nojekyll').touch()
    urls=[DOMAIN+'/' if p=='index.html' else DOMAIN+'/'+p for p in PUBLIC if p not in ['404.html','articles/page-under-work.html']]
    (OUT/'sitemap.xml').write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+''.join(f'  <url><loc>{u}</loc></url>\n' for u in urls)+'</urlset>\n')
    (OUT/'README.md').write_text('''# Portfolio V2 — GitHub Pages\n\nStatic release for davidmontealegreux.com, containing the three public case studies.\n\nCopy this folder’s contents into the publishing branch root, with index.html, CNAME and .nojekyll at the root. In Settings > Pages, select Deploy from a branch and the root folder. Do not upload the ZIP itself or the outer releases folder. Replace the old publishing tree rather than overlaying files, so obsolete files do not survive. Preserve your repository Git history separately.\n\nNo build or server is required. English is the default; Spanish is available. The custom domain and production analytics guards are retained. A repository-subpath deployment without the custom domain is not this release’s target.\n\nPrepared from local working files; this package is not evidence of employer content approval. No deployment was performed.\n\nGitHub documentation: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site\n''')
    items=[]
    for p in sorted(OUT.rglob('*')):
        if p.is_file() and p.name!='.portfolio-generated':
            items.append({'path':p.relative_to(OUT).as_posix(),'bytes':p.stat().st_size,'sha256':hashlib.sha256(p.read_bytes()).hexdigest()})
    (OUT/'release-manifest.json').write_text(json.dumps({'files':items},ensure_ascii=False,indent=2)+'\n')
    archive=OUT.parent/'portfolio-v2-github-pages.zip'
    with zipfile.ZipFile(archive,'w',zipfile.ZIP_DEFLATED) as z:
        for p in sorted(OUT.rglob('*')):
            if p.is_file() and p.name!='.portfolio-generated': z.write(p,p.relative_to(OUT).as_posix())
    print(json.dumps({'folder':str(OUT),'zip':str(archive),'files':len(items)+1,'bytes':sum(i['bytes'] for i in items)},ensure_ascii=False))

if __name__=='__main__': build()

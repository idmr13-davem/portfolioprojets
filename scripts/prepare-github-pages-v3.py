#!/usr/bin/env python3
"""Build the independent static V3 release (Statement) from the current working files; never deploy.

  python3 scripts/prepare-github-pages-v3.py

Output: releases/github-pages-v3/ (copy its contents to the publishing branch root) and
releases/portfolio-v3-github-pages.zip. Plan and scope: docs/v3-release-plan.md.
"""
from pathlib import Path
import hashlib, json, re, shutil, subprocess, unicodedata, zipfile

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'releases' / 'github-pages-v3'
DOMAIN = 'https://davidmontealegreux.com'
# Indexable pages, in sitemap order (404, page-under-work and the about.html redirect are noindex).
INDEXED = ['index.html',
 'work/registro-ml.html', 'work/motion-design-system.html', 'work/menores-mexico.html',
 'work/cambio-cuentas-paises.html', 'work/ropstar.html', 'work/winefast.html',
 'articles/por-que-mercado-libre-fue-el-primer-lugar-del-que-no-quise-irme.html',
 'articles/lo-que-mi-pasion-por-los-autos-me-enseno-sobre-disenar-experiencias.html']
# Renderer and shared files the shells load; the shells themselves come from build-pages.mjs --release.
STATIC = ['v3/shared/base.css', 'v3/shared/content.js', 'v3/shared/site.js', 'v3/statement/app.js', 'v3/statement/styles.css',
 'css/tokens/figma.css', 'css/analytics.css', 'js/analytics.js', 'assets/Favicon/favicon.ico', 'CNAME', 'robots.txt']
# Working material that must never reach the public site.
BLOCKED = re.compile(r'^(intercambio|releases|docs|variants|plantillas|research|\.[a-z-]+)/|^v3/(stage|poster)/|\.mov$|Img hero\.png$', re.I)
ASSET = re.compile(r"""['"`(](assets/[^'"`)]+?\.(?:webp|png|jpe?g|svg|gif|ico|mp4|webm|pdf|woff2?))['"`)]""")


def source(rel):
    """Asset paths are written NFC in code; macOS may store them NFD."""
    for candidate in (rel, unicodedata.normalize('NFD', rel)):
        if (ROOT / candidate).is_file(): return ROOT / candidate
    raise FileNotFoundError('Missing resource: ' + rel)


def must_replace(text, old, new, label):
    assert old in text, 'Analytics anchor not found: ' + label
    return text.replace(old, new)


def analytics(text):
    """The working copy measures only V2 public pages; the V3 release measures every public V3 page."""
    text = must_replace(text, "'/', '/index.html', '/about.html', '/articles/page-under-work.html',",
        "'/', '/index.html', '/articles/page-under-work.html',\n"
        "    '/work/registro-ml.html', '/work/motion-design-system.html', '/work/menores-mexico.html',\n"
        "    '/work/cambio-cuentas-paises.html', '/work/ropstar.html', '/work/winefast.html',", 'publicPaths')
    text = must_replace(text, "'/work/cambio-cuentas-paises.html': 'country_switch'\n",
        "'/work/cambio-cuentas-paises.html': 'country_switch',\n"
        "    '/work/ropstar.html': 'ropstar_ui',\n"
        "    '/work/winefast.html': 'winefast_concept'\n", 'casePaths')
    text = must_replace(text, "const sections = { '#hero': 'intro', '#about': 'about', '#work': 'work', '#articles': 'articles', '#contact': 'contact', '#case-1': 'registro_ml_preview', '#case-2': 'motion_level_preview', '#case-3': 'accounts_minors_mexico_preview', '#case-4': 'country_switch_preview' };",
        "const sections = { '#main': 'intro', '#about-title': 'about', '#work': 'work', '#craft': 'side_projects', '#blog': 'articles', '#contact': 'contact' };", 'sections')
    text = must_replace(text, "element.closest('.v2-mobile-drawer, .v2-drawer-contact, .mobile-home-drawer, .mobile-construction__drawer')",
        "element.closest('#a-menu')", 'drawer placement')
    text = must_replace(text, "element.closest('.v2-project')", "element.closest('.a-case, .a-craft')", 'card placement')
    text = must_replace(text, "element.closest('#articles')", "element.closest('#blog')", 'articles placement')
    assert text.count("site_version: 'v2'") == 3, 'Expected three site_version fields'
    return text.replace("site_version: 'v2'", "site_version: 'v3'")


def build():
    OUT.parent.mkdir(exist_ok=True)
    if OUT.exists():
        assert (OUT / '.portfolio-generated').is_file(), 'Refuse to overwrite an unknown folder'
        shutil.rmtree(OUT)
    OUT.mkdir(); (OUT / '.portfolio-generated').touch()
    subprocess.run(['node', 'v3/build-pages.mjs', '--release', str(OUT)], cwd=ROOT, check=True, capture_output=True)
    shells = [p.relative_to(OUT).as_posix() for p in OUT.rglob('*.html')]

    copied = set()
    def copy(rel, data=None):
        rel = unicodedata.normalize('NFC', rel)
        if rel in copied: return
        assert not BLOCKED.search(rel), 'Blocked resource: ' + rel
        dest = OUT / rel; dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_bytes(data if data is not None else source(rel).read_bytes()); copied.add(rel)

    refs = set()
    for rel in STATIC:
        if rel == 'js/analytics.js':
            copy(rel, analytics(source(rel).read_text()).encode())
        else:
            copy(rel)
        if rel.endswith(('.js', '.css')): refs |= set(ASSET.findall(source(rel).read_text()))
    for rel in shells: refs |= set(ASSET.findall((OUT / rel).read_text()))
    # Open Graph images are named in the shells by absolute URL.
    refs |= {f'assets/og/{name}' for name in re.findall(r'assets/og/([\w-]+\.jpg)', ''.join((OUT / s).read_text() for s in shells))}
    for rel in sorted(refs): copy(rel)
    assert not [r for r in copied if r.endswith('.mov')], 'MOV files must not ship; V3 uses .web.mp4'

    (OUT / '.nojekyll').touch()
    urls = [f'{DOMAIN}/' if p == 'index.html' else f'{DOMAIN}/{p}' for p in INDEXED]
    assert all((OUT / p).is_file() for p in INDEXED), 'Sitemap page missing'
    (OUT / 'sitemap.xml').write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        + ''.join(f'  <url><loc>{u}</loc></url>\n' for u in urls) + '</urlset>\n')
    (OUT / 'README.md').write_text('''# Portfolio V3 — GitHub Pages

Static release for davidmontealegreux.com: Home, four case studies (Registro ML, Motion Level, Accounts for minors in Mexico, Switching accounts across countries), the Ropstar and Winefast side projects, two articles, 404 and page under work. about.html redirects to the About section of the Home.

Copy this folder's contents into the publishing branch root, with index.html, CNAME and .nojekyll at the root. Replace the old publishing tree rather than overlaying files, so obsolete V2 files do not survive. Do not upload the ZIP itself or the outer releases folder.

No build or server is required. English is the default; Spanish is available. Pages render with JavaScript. Analytics loads only on the production domain and only after consent.

Prepared from local working files by scripts/prepare-github-pages-v3.py; this package is not evidence of employer content approval. No deployment was performed.
''')
    items = []
    for p in sorted(OUT.rglob('*')):
        if p.is_file() and p.name != '.portfolio-generated':
            items.append({'path': p.relative_to(OUT).as_posix(), 'bytes': p.stat().st_size, 'sha256': hashlib.sha256(p.read_bytes()).hexdigest()})
    (OUT / 'release-manifest.json').write_text(json.dumps({'files': items}, ensure_ascii=False, indent=2) + '\n')
    archive = OUT.parent / 'portfolio-v3-github-pages.zip'
    with zipfile.ZipFile(archive, 'w', zipfile.ZIP_DEFLATED) as z:
        for p in sorted(OUT.rglob('*')):
            if p.is_file() and p.name != '.portfolio-generated': z.write(p, p.relative_to(OUT).as_posix())
    print(json.dumps({'folder': str(OUT), 'zip': str(archive), 'files': len(items) + 1, 'bytes': sum(i['bytes'] for i in items)}, ensure_ascii=False))


if __name__ == '__main__': build()

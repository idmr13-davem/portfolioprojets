// Writes the HTML shells for every V3 proposal. Run from the repository root:
//   node v3/build-pages.mjs
// With --release <dir>, writes instead the production shells of Statement at the root of <dir>
// (used by scripts/prepare-github-pages-v3.py).
// Content and rendering live in v3/shared/ and v3/<proposal>/app.js.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const proposals = {
  statement: {
    // Colour, family, weights and radii come from the portfolio design system (css/tokens/figma.css).
    fonts: '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700&display=swap" rel="stylesheet">',
    tokens: true,
    theme: '#171b1f'
  },
  stage: {
    fonts: '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Besley:wght@500;700;800&family=Libre+Franklin:wght@400;500;600&display=swap" rel="stylesheet">',
    theme: '#1a2039'
  },
  poster: {
    fonts: '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Chivo:wght@400;700;900&display=swap" rel="stylesheet">',
    theme: '#9c1220'
  }
};

const pages = [
  { file: 'index.html', page: 'home', title: 'David Montealegre — Product Designer' },
  { file: '404.html', page: 'status', id: 'notFound', title: 'Error 404 — David Montealegre' },
  { file: 'work/registro-ml.html', page: 'case', id: 'registro', title: 'Mercado Libre sign-up — David Montealegre' },
  { file: 'work/motion-design-system.html', page: 'case', id: 'motion', title: 'Motion Level — David Montealegre' },
  { file: 'work/menores-mexico.html', page: 'case', id: 'menores', title: 'Accounts for minors in Mexico — David Montealegre' },
  { file: 'work/cambio-cuentas-paises.html', page: 'case', id: 'switch', title: 'Account switching between countries — David Montealegre' },
  // Side project: built on the Statement case template only.
  { file: 'work/ropstar.html', page: 'case', id: 'ropstar', title: 'Ropstar — David Montealegre', only: 'statement' },
  { file: 'work/winefast.html', page: 'case', id: 'winefast', title: 'Winefast — David Montealegre', only: 'statement' },
  { file: 'articles/por-que-mercado-libre-fue-el-primer-lugar-del-que-no-quise-irme.html', page: 'article', id: 'por-que-mercado-libre-fue-el-primer-lugar-del-que-no-quise-irme', title: 'Why Mercado Libre Was the First Place I Didn’t Want to Leave — David Montealegre' },
  { file: 'articles/lo-que-mi-pasion-por-los-autos-me-enseno-sobre-disenar-experiencias.html', page: 'article', id: 'lo-que-mi-pasion-por-los-autos-me-enseno-sobre-disenar-experiencias', title: 'What My Passion for Cars Taught Me About Designing Experiences — David Montealegre' },
  { file: 'articles/page-under-work.html', page: 'status', id: 'underWork', title: 'Page under work — David Montealegre' }
];

// Cache versions shared by the exploration and release shells.
const v = { content: '20261027-videos-mp4', site: '20261027-winefast', statementCss: '20261027-winefast', statementJs: '20261027-winefast-nav' };

const releaseAt = process.argv.indexOf('--release');
if (releaseAt !== -1) {
  writeRelease(process.argv[releaseAt + 1]);
  process.exit(0);
}

for (const [name, p] of Object.entries(proposals)) {
  for (const page of pages) {
    if (page.only && page.only !== name) continue;
    const depth = page.file.split('/').length - 1;
    const base = '../'.repeat(depth);
    const root = '../../' + base;
    const out = `<!doctype html>
<html lang="en" data-root="${root}" data-base="${base}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<meta name="theme-color" content="${p.theme}">
<title>${page.title}</title>
<link rel="icon" href="${root}assets/Favicon/favicon.ico">
${p.fonts}
<script>document.documentElement.classList.add('js')</script>
${p.tokens ? `<link rel="stylesheet" href="${root}css/tokens/figma.css">\n` : ''}${name === 'statement' ? `<link rel="stylesheet" href="${root}css/analytics.css">\n` : ''}<link rel="stylesheet" href="${base}../shared/base.css">
<link rel="stylesheet" href="${base}styles.css${name === 'statement' ? `?v=${v.statementCss}` : name === 'poster' ? '?v=20261026-motion-curve-review' : ''}">
</head>
<body class="v3-${name}" data-page="${page.page}"${page.id ? ` data-id="${page.id}"` : ''}>
<div id="app"></div>
<noscript><p style="padding:24px">This exploration renders with JavaScript. <a href="${root}index.html">Open the published portfolio</a>.</p></noscript>
<script src="${base}../shared/content.js?v=${v.content}"></script>
<script src="${base}../shared/site.js?v=${v.site}"></script>
<script src="${base}app.js${name === 'statement' ? `?v=${v.statementJs}` : ''}"></script>${name === 'statement' ? `\n<script src="${root}js/analytics.js" defer></script>` : ''}
</body>
</html>
`;
    const target = path.join('v3', name, page.file);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, out);
  }
}
console.log('V3 shells written');

// Production shells for davidmontealegreux.com: Statement only, pages at the domain root,
// renderer files under v3/, indexable pages with canonical, description and Open Graph.
function writeRelease(dir) {
  if (!dir) throw new Error('Usage: node v3/build-pages.mjs --release <dir>');
  const domain = 'https://davidmontealegreux.com';
  const sandbox = { window: {} };
  vm.runInNewContext(fs.readFileSync('v3/shared/content.js', 'utf8'), sandbox);
  const C = sandbox.window.V3_CONTENT;
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  const p = proposals.statement;
  // Open Graph images live in assets/og/ (scripts/make-og-images.py), one per indexable page.
  const meta = page => {
    if (page.page === 'home') return { description: C.site.heroTitle.en, image: 'home' };
    if (page.page === 'case') { const c = C.cases[page.id]; return { description: (c.card.summary || c.lead).en, image: page.id }; }
    if (page.page === 'article') return { description: C.articles[page.id].summary.en, image: page.id, type: 'article' };
    return null;
  };
  for (const page of pages) {
    // GitHub Pages serves 404.html at any depth, so it alone uses root-absolute paths.
    const base = page.file === '404.html' ? '/' : '../'.repeat(page.file.split('/').length - 1);
    const m = meta(page);
    const url = page.file === 'index.html' ? `${domain}/` : `${domain}/${page.file}`;
    const head = m ? `<meta name="robots" content="index, follow">
<meta name="description" content="${esc(m.description)}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="${m.type || 'website'}">
<meta property="og:site_name" content="David Montealegre">
<meta property="og:title" content="${esc(page.title)}">
<meta property="og:description" content="${esc(m.description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${domain}/assets/og/${m.image}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="en_US">
<meta property="og:locale:alternate" content="es_LA">
<meta name="twitter:card" content="summary_large_image">` : '<meta name="robots" content="noindex">';
    const out = `<!doctype html>
<html lang="en" data-root="${base}" data-base="${base}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${page.title}</title>
${head}
<meta name="theme-color" content="${p.theme}">
<link rel="icon" href="${base}assets/Favicon/favicon.ico">
${p.fonts}
<script>document.documentElement.classList.add('js')</script>
<link rel="stylesheet" href="${base}css/tokens/figma.css">
<link rel="stylesheet" href="${base}css/analytics.css">
<link rel="stylesheet" href="${base}v3/shared/base.css">
<link rel="stylesheet" href="${base}v3/statement/styles.css?v=${v.statementCss}">
</head>
<body class="v3-statement" data-page="${page.page}"${page.id ? ` data-id="${page.id}"` : ''}>
<div id="app"></div>
<noscript><p style="padding:24px">This portfolio needs JavaScript to display. Contact: <a href="mailto:idmr13@gmail.com">idmr13@gmail.com</a>.</p></noscript>
<script src="${base}v3/shared/content.js?v=${v.content}"></script>
<script src="${base}v3/shared/site.js?v=${v.site}"></script>
<script src="${base}v3/statement/app.js?v=${v.statementJs}"></script>
<script src="${base}js/analytics.js" defer></script>
</body>
</html>
`;
    const target = path.join(dir, page.file);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, out);
  }
  // V2 had an About page; V3 keeps its URL alive by sending visitors to the About section of the Home.
  fs.writeFileSync(path.join(dir, 'about.html'), `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>About — David Montealegre</title>
<meta name="robots" content="noindex">
<link rel="canonical" href="${domain}/">
<meta http-equiv="refresh" content="0; url=index.html#about-title">
<script>location.replace('index.html' + location.search + '#about-title')</script>
</head>
<body>
<p><a href="index.html#about-title">About David Montealegre</a></p>
</body>
</html>
`);
  console.log('V3 release shells written to ' + dir);
}

// Writes the HTML shells for every V3 proposal. Run from the repository root:
//   node v3/build-pages.mjs
// Content and rendering live in v3/shared/ and v3/<proposal>/app.js.
import fs from 'node:fs';
import path from 'node:path';

const proposals = {
  statement: {
    fonts: '<link rel="preconnect" href="https://api.fontshare.com"><link rel="preconnect" href="https://cdn.fontshare.com" crossorigin><link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@400,500,700,800&display=swap" rel="stylesheet">',
    theme: '#ecebe7'
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
  { file: 'articles/por-que-mercado-libre-fue-el-primer-lugar-del-que-no-quise-irme.html', page: 'article', id: 'por-que-mercado-libre-fue-el-primer-lugar-del-que-no-quise-irme', title: 'Why Mercado Libre Was the First Place I Didn’t Want to Leave — David Montealegre' },
  { file: 'articles/lo-que-mi-pasion-por-los-autos-me-enseno-sobre-disenar-experiencias.html', page: 'article', id: 'lo-que-mi-pasion-por-los-autos-me-enseno-sobre-disenar-experiencias', title: 'What My Passion for Cars Taught Me About Designing Experiences — David Montealegre' },
  { file: 'articles/page-under-work.html', page: 'status', id: 'underWork', title: 'Page under work — David Montealegre' }
];

for (const [name, p] of Object.entries(proposals)) {
  for (const page of pages) {
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
<link rel="stylesheet" href="${base}../shared/base.css">
<link rel="stylesheet" href="${base}styles.css">
</head>
<body class="v3-${name}" data-page="${page.page}"${page.id ? ` data-id="${page.id}"` : ''}>
<div id="app"></div>
<noscript><p style="padding:24px">This exploration renders with JavaScript. <a href="${root}index.html">Open the published portfolio</a>.</p></noscript>
<script src="${base}../shared/content.js"></script>
<script src="${base}../shared/site.js"></script>
<script src="${base}app.js"></script>
</body>
</html>
`;
    const target = path.join('v3', name, page.file);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, out);
  }
}
console.log('V3 shells written');

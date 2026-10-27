// Run from repository root. VM checks do not certify HTTP loading or video playback.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const source = fs.readFileSync('v3/shared/content.js', 'utf8');
const context = { window: {} };
vm.runInNewContext(source, context);
const posters = [];
function walk(value) {
  if (!value || typeof value !== 'object') return;
  if (value.type === 'video') {
    assert(fs.existsSync(value.src), value.src);
    assert(fs.existsSync(value.poster), value.poster);
    posters.push(value.poster);
  }
  Object.values(value).forEach(walk);
}
walk(context.window.V3_CONTENT.cases.motion);
const jpg = posters.filter(p => p.endsWith('-hd.jpg'));
assert.equal(jpg.length, 9);
assert.equal(new Set(jpg).size, 8);
const bytes = [...new Set(jpg)].map(p => fs.statSync(p).size);
console.log('PASS 9 JPEG references / 8 unique files; bytes:', bytes, 'total:', bytes.reduce((a,b) => a+b, 0));
const pages = ['statement','stage','poster'].flatMap(name => fs.readdirSync(`v3/${name}`, { recursive: true }).filter(p => p.endsWith('.html')).map(p => `v3/${name}/${p}`));
assert.equal(pages.length, 24);
for (const p of [...pages, 'v3/build-pages.mjs']) assert(fs.readFileSync(p, 'utf8').includes('content.js?v=20261026-motion-posters-hd3'), p);
console.log('PASS cache 24 pages + generator');
for (const name of ['statement', 'stage', 'poster']) {
  const ctx = { window: {}, document: { documentElement: { dataset: { root: '../../../', base: '../' } }, body: { dataset: { page: 'case', id: 'motion' } }, getElementById: () => ({}), addEventListener() {} }, location: { search: '', hash: '' }, localStorage: { getItem: () => null }, matchMedia: () => ({ matches: false }), URLSearchParams };
  ctx.matchMedia = () => ({ matches: false, addEventListener() {} });
  vm.createContext(ctx);
  vm.runInContext(source, ctx);
  vm.runInContext(fs.readFileSync('v3/shared/site.js','utf8'), ctx);
  ctx.V3 = ctx.window.V3;
  vm.runInContext(fs.readFileSync(`v3/${name}/app.js`, 'utf8').replace('  V3.start();', '  window.__review = { casePage };'), ctx);
  const html = ctx.window.__review.casePage('motion');
  const actual = [...html.matchAll(/poster="([^"]+-hd\.jpg)"/g)].map(m => decodeURIComponent(m[1]).replace(/^\.\.\/\.\.\/\.\.\//, ''));
  assert(actual.length >= 8);
  assert.equal(new Set(actual).size, 8);
  for (const p of actual) assert(fs.existsSync(p), p);
  console.log(`PASS ${name}: actual renderer emits all 8 new posters (${actual.length} references)`);
}
for (const p of ['assets/Motion DS/v2/hero-0.mp4', 'assets/prueba con tilde/Animación.mov']) {
  const url = '/' + p.split('/').map(encodeURIComponent).join('/');
  assert.equal(decodeURIComponent(new URL(url, 'http://localhost').pathname), '/' + p);
}
console.log('PASS segment URL encoding round trip: spaces and accents');

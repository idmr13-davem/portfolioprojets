// Run from repository root. VM assertions do not certify browser layout or media playback.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const source = fs.readFileSync('v3/shared/content.js', 'utf8');
const c = { window: {} }; vm.runInNewContext(source, c);
const motion = c.window.V3_CONTENT.cases.motion;
assert.equal(motion.heroSet.length, 3);
assert.equal(JSON.stringify(motion.hero), JSON.stringify(motion.heroSet[0]));
assert(!motion.sections.find(s => s.id === 'roadmap').media);
for (const [i, m] of motion.heroSet.entries()) {
  assert.equal(m.src, `assets/Motion DS/v3/Motion curve ${i+1}.mov`);
  for (const p of [m.src, m.poster]) assert(fs.existsSync(p), p);
  const png = fs.readFileSync(m.poster);
  assert.equal(png.readUInt32BE(16), 850); assert.equal(png.readUInt32BE(20), 860);
  console.log('PASS asset', m.src, fs.statSync(m.src).size, 'poster', png.length, '850x860');
}
for (const name of ['statement','stage','poster']) {
 const pages = fs.readdirSync(`v3/${name}`, {recursive:true}).filter(p=>p.endsWith('.html'));
 assert.equal(pages.length,8);
 for (const p of pages) {
  const html = fs.readFileSync(`v3/${name}/${p}`,'utf8');
  assert(html.includes('content.js?v=20261026-motion-hero-v3'),p);
  if(name==='statement') assert(html.includes('styles.css?v=20261026-motion-hero-v3'),p);
  if(name==='poster') assert(html.includes('styles.css?v=20261026-motion-curve-review'),p);
 }
 for (const lang of ['en','es']) {
  const ctx = {window:{},document:{documentElement:{dataset:{root:'../../../',base:'../'}},body:{dataset:{page:'case',id:'motion'}},getElementById:()=>({}),addEventListener(){}},location:{search:`?lang=${lang}`,hash:''},localStorage:{getItem:()=>null},matchMedia:()=>({matches:false,addEventListener(){}}),URLSearchParams};
  vm.createContext(ctx); vm.runInContext(source,ctx);
  vm.runInContext(fs.readFileSync('v3/shared/site.js','utf8'),ctx); ctx.V3=ctx.window.V3;
  vm.runInContext(fs.readFileSync(`v3/${name}/app.js`,'utf8').replace('  V3.start();','  window.__review = { casePage };'),ctx);
  for(const id of ['motion','registro','menores']) {
   const html = ctx.window.__review.casePage(id);
   if(id==='motion') {
    for(const m of motion.heroSet) { assert(html.includes(ctx.V3.asset(m.src))); assert(html.includes(ctx.V3.asset(m.poster))); }
    assert(!html.includes('imgRoadmap1'));
    assert(html.includes(ctx.V3.esc(motion.heroAlt[lang])));
    if(name==='statement') {
     const hero=html.split('<div class="a-cs__visual" data-reveal>')[1].split('<section class="a-cs__goals">')[0];
     assert.equal((hero.match(/<video /g)||[]).length,3); assert(!hero.includes('<button'));
    }
   } else assert(!html.includes('Motion%20curve'));
   for(const m of html.matchAll(/(?:src|poster)="([^"]+)"/g)) {
    const p=decodeURIComponent(m[1]).replace(/^\.\.\/\.\.\/\.\.\//,'');
    if(p.startsWith('assets/')) assert(fs.existsSync(p),`${name}/${id}: ${p}`);
   }
  }
  console.log('PASS renderer',name,lang,'Motion clips/posters/alt/roadmap; Registro/Menores assets');
 }
}
const generator=fs.readFileSync('v3/build-pages.mjs','utf8');
assert(generator.includes('?v=20261026-motion-curve-review'));
assert(generator.includes('content.js?v=20261026-motion-hero-v3'));
console.log('PASS cache: 24 content + 8 Statement CSS + 8 Poster CSS; generator');

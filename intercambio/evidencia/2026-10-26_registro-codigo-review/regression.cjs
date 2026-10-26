const fs = require('node:fs');
const vm = require('node:vm');
const cp = require('node:child_process');
const assert = require('node:assert/strict');
const read = p => fs.readFileSync(p, 'utf8');
const old = p => cp.execFileSync('git', ['show', `9fdee20:${p}`], {encoding:'utf8'});
const dir = 'intercambio/evidencia/2026-10-26_registro-codigo-review';
const snapshot = '/private/tmp/claude-501/-Users-dave--claude-spares-spare-KCRqve/ddc09c22-d6f7-441b-b966-c4769dd8841f/scratchpad/antes-codex-registro-v1/';
function render(source, id, lang) {
  const app = {innerHTML:'',querySelector:()=>null};
  const document = {documentElement:{dataset:{root:'../../../',base:'../'}},body:{dataset:{page:'case',id}},getElementById:()=>app,querySelectorAll:()=>[],querySelector:()=>null,addEventListener:()=>{}};
  const ctx = {document,location:{search:`?lang=${lang}`,hash:''},localStorage:{getItem:()=>null},matchMedia:()=>({matches:true}),scrollY:0,scrollTo:()=>{},setTimeout:()=>{},URLSearchParams,addEventListener:()=>{}};
  ctx.window=ctx; vm.createContext(ctx);
  for(const src of [read('v3/shared/content.js'),read('v3/shared/site.js'),source]) vm.runInContext(src,ctx);
  return app.innerHTML;
}
const rows=[];
for(const id of ['motion','menores']) for(const lang of ['en','es']) {
 const before=render(old('v3/statement/app.js'),id,lang);
 const after=render(read('v3/statement/app.js'),id,lang).replace('a-cs--motion a-cs--grid','a-cs--motion');
 assert.equal(after.replace(/>\s+</g,'><'),before.replace(/>\s+</g,'><'),`${id}/${lang}`);
 rows.push({id,lang,markupEqual:true});
}
assert.equal(read('v3/statement/styles.css').split('/* ---------- Figma case template:')[0],old('v3/statement/styles.css').split('/* ---------- Figma update: case 2')[0]);
for(const p of ['v3/shared/site.js','v3/shared/content.js']) assert.equal(read(p),old(p));
const result={baseline:'9fdee20',rows,sharedCssBeforeTemplateUnchanged:true,sharedRuntimeAndContentUnchanged:true,snapshotEqualsCurrent:['app.js','styles.css'].map(p=>({file:p,equal:fs.existsSync(snapshot+'statement/'+p)?read(snapshot+'statement/'+p)===read('v3/statement/'+p):null}))};
fs.writeFileSync(dir+'/regression.json',JSON.stringify(result,null,2)+'\n');
// Browser fixtures use the pre-Registro CSS plus the four corrections documented in the previous review.
let css=old('v3/statement/styles.css').replace('.a-cs--motion .cs-parts { display: flex; flex-direction: column; gap: 3rem; }','.a-cs--motion .cs-parts { display: flex; flex-direction: column; gap: var(--space-xl); }').replace('.a-cs--motion .cs-part { display: flex; flex-direction: column; gap: .75rem; }','.a-cs--motion .cs-part { display: flex; flex-direction: column; gap: var(--space-ss); }').replace('.a-cs--motion .cs-axis__ends { row-gap: 1.5rem; }','.a-cs--motion .cs-axis__ends { row-gap: var(--space-m); }');
css+='\n.a-cs--motion { --t-reveal: 500ms; }\n.a-cs--motion [data-reveal] { transition-duration: var(--t-reveal); }\n.a-cs--motion .lines [data-line] { animation-duration: var(--t-reveal); }\n.a-cs--motion .cs-steps li { min-height: 77px; }\n';
fs.writeFileSync(dir+'/baseline.css',css);
fs.writeFileSync(dir+'/baseline.js',old('v3/statement/app.js'));
for(const [id,slug] of [['motion','motion-design-system'],['menores','menores-mexico']]) {
 let html=read('v3/statement/work/'+slug+'.html').replace('data-base="../"','data-base="/v3/statement/"').replaceAll('../../shared/','/v3/shared/').replace(/\.\.\/styles\.css\?v=[^"]+/, 'baseline.css').replace(/\.\.\/app\.js\?v=[^"]+/, 'baseline.js');
 fs.writeFileSync(dir+'/baseline-'+id+'.html',html);
}
console.log(JSON.stringify(result,null,2));

const fs = require('node:fs');
const vm = require('node:vm');
const cp = require('node:child_process');
const root = process.cwd();
const read = p => fs.readFileSync(p, 'utf8');
const old = p => cp.execFileSync('git', ['show', `HEAD^:${p}`], {encoding:'utf8'});
function render(appSource, id, lang) {
  const app = {innerHTML:'',querySelector:()=>null};
  const document = {documentElement:{dataset:{root:'../../../',base:'../'}},body:{dataset:{page:'case',id}},getElementById:()=>app,querySelectorAll:()=>[],querySelector:()=>null,addEventListener:()=>{}};
  const ctx = {document,window:{},location:{search:`?lang=${lang}`,hash:''},localStorage:{getItem:()=>null},matchMedia:()=>({matches:true}),scrollY:0,scrollTo:()=>{},setTimeout:()=>{},URLSearchParams,addEventListener:()=>{}};
  ctx.window=ctx;
  vm.createContext(ctx);
  for(const src of [read('v3/shared/content.js'),read('v3/shared/site.js'),appSource]) vm.runInContext(src,ctx);
  return app.innerHTML;
}
const rows=[];
for(const id of ['registro','menores']) for(const lang of ['en','es']) {
 const before=render(old('v3/statement/app.js'),id,lang);
 const after=render(read('v3/statement/app.js'),id,lang);
 const equal=before===after.replace(`class="a-cs a-cs--${id}"`,'class="a-cs"');
 if(!equal) throw new Error(`Unexpected markup difference: ${id}/${lang}`);
 rows.push({id,lang,equalAfterNormalizingMainClass:equal});
}
const beforeCss=old('v3/statement/styles.css');
if(!read('v3/statement/styles.css').startsWith(beforeCss)) throw new Error('Shared CSS changed');
for(const p of ['v3/shared/site.js','v3/shared/content.js']) if(read(p)!==old(p)) throw new Error(`Shared dependency changed: ${p}`);
console.log(JSON.stringify({rows,sharedCssUnchanged:true,sharedRuntimeAndContentUnchanged:true},null,2));

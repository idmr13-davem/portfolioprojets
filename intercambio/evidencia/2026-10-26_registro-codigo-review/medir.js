// Lectura DOM utilizada en Chrome conectado. Ejecutar después de cargar imágenes y fuentes.
// Repetir en las seis resoluciones y ambos idiomas indicados en verificacion.md.
(() => {
  const rect = e => {
    const b = e.getBoundingClientRect();
    return {x:b.x,y:b.y,width:b.width,height:b.height};
  };
  return {
    viewport:[innerWidth,innerHeight],lang:document.documentElement.lang,
    scrollWidth:document.documentElement.scrollWidth,
    images:[...document.images].map(i=>({src:i.currentSrc,complete:i.complete,naturalWidth:i.naturalWidth})),
    blocks:[...document.querySelectorAll('.cs-section,.a-cs__final,.a-cs__next')].map(e=>({id:e.id||e.className,...rect(e)})),
    rows:[...document.querySelectorAll('.cs-intro')].map(e=>({id:e.parentElement.id,boxes:[...e.querySelectorAll(':scope > .cs-title,:scope > .cs-content,.cs-figure video')].map(rect)})),
    overflow:[...document.querySelectorAll('main *')].filter(e=>{const b=e.getBoundingClientRect();return b.width>0&&(b.x<-.5||b.right>innerWidth+.5)}).map(e=>e.className)
  };
})();

/* Status pages inherit the portfolio's selected language and return destination. */
(() => {
  const requested = new URL(location.href).searchParams.get('lang');
  let stored;
  try { stored = localStorage.getItem('portfolio-language'); } catch {}
  const language = requested === 'es' || requested === 'en' ? requested : stored === 'es' ? 'es' : 'en';
  const is404 = document.body.classList.contains('status-v2--404');
  const copy = language === 'es'
    ? {heading:is404 ? 'Error 404' : 'Página en construcción',description:is404 ? 'Página no encontrada, la página que buscas puede haberse movido o nunca haber existido.' : 'El contenido aquí aún no está disponible, por favor regresa más tarde.',home:'Ir a la home',built:'Sitio web creado con'}
    : {heading:is404 ? 'Error 404' : 'Page under work',description:is404 ? 'Page not found, the page you’re looking for may have moved or never existed.' : 'The content here isn’t available yet, please come back later.',home:'Go home',built:'Website created with'};
  document.documentElement.lang = language;
  document.querySelectorAll('[data-status-copy]').forEach(element => {element.textContent = copy[element.dataset.statusCopy];});
  document.title = copy.heading + ' — David Montealegre';
  try { localStorage.setItem('portfolio-language',language); } catch {}
  document.querySelectorAll('[data-status-home]').forEach(link => {
    const url = new URL(link.href);url.searchParams.set('lang',language);link.href = url.pathname + url.search;
    if (link.closest('header')) link.setAttribute('aria-label',language === 'es' ? 'David Montealegre — Inicio' : 'David Montealegre — Home');
  });
})();

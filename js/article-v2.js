/* Article enhancements: accessible shared language control and bilingual SEO. */
(() => {
  const article = document.querySelector('.article-shell');
  if (!article) return;
  const toggle = document.querySelector('.article-header .language-toggle');
  const radios = [...toggle.querySelectorAll('[role="radio"]')];
  const metadata = {
    description: {en: document.querySelector('meta[name="description"]').content, es: document.querySelector('meta[name="description"]').dataset.es}
  };
  function sync(language) {
    radios.forEach(radio => {
      const selected = radio.dataset.language === language;
      radio.setAttribute('aria-checked', String(selected));
      radio.removeAttribute('aria-pressed');
      radio.tabIndex = selected ? 0 : -1;
    });
    const title = document.querySelector('h1').textContent + ' — David Montealegre';
    document.title = title;
    const description = metadata.description[language];
    document.querySelector('meta[name="description"]').content = description;
    for (const name of ['og:title', 'twitter:title']) document.querySelector(`meta[property="${name}"],meta[name="${name}"]`).content = title;
    for (const name of ['og:description', 'twitter:description']) document.querySelector(`meta[property="${name}"],meta[name="${name}"]`).content = description;
    document.querySelector('meta[property="og:locale"]').content = language === 'es' ? 'es_CO' : 'en_US';
    const data = JSON.parse(document.querySelector('#article-schema').textContent);
    data.headline = document.querySelector('h1').textContent;
    data.description = description;
    data.inLanguage = language;
    data.url = document.querySelector('link[rel="canonical"]').href + '?lang=' + language;
    document.querySelector('#article-schema').textContent = JSON.stringify(data);
    const home = document.querySelector('.article-header .logotype');
    home.href = '../index.html?lang=' + language + '#articles';
  }
  document.addEventListener('portfolio:translated', event => sync(event.detail.language));
  toggle.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const index = radios.indexOf(document.activeElement);
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? radios.length - 1 : (index + (['ArrowLeft', 'ArrowUp'].includes(event.key) ? -1 : 1) + radios.length) % radios.length;
    radios[next].focus();
    radios[next].click();
  });
  sync(document.documentElement.lang);
})();

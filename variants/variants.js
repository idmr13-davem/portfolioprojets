/* Local comparison pages: shared language and progressive disclosure. */
(() => {
  let language = 'en';
  try { language = localStorage.getItem('portfolio-language') || 'en'; } catch {}
  const translate = value => {
    language = value === 'es' ? 'es' : 'en';
    document.documentElement.lang = language;
    document.querySelectorAll('[data-en][data-es]').forEach(node => {
      node.textContent = node.dataset[language];
    });
    document.querySelectorAll('[data-alt-en]').forEach(node => {
      const text = language === 'es' ? node.dataset.altEs : node.dataset.altEn;
      node.setAttribute(node.tagName === 'IMG' ? 'alt' : 'aria-label', text);
    });
    document.querySelectorAll('[data-language]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.language === language));
    });
    document.querySelectorAll('.pv-resume').forEach(link => {
      link.href = language === 'es' ? '../assets/CV/DavidMontealegre-HV-ES.pdf' : '../assets/CV/DavidMontealegre-CV-EN.pdf';
    });
    try { localStorage.setItem('portfolio-language', language); } catch {}
  };
  translate(language);
  document.querySelectorAll('[data-language]').forEach(button => {
    button.addEventListener('click', () => translate(button.dataset.language));
  });
  const reduced = matchMedia('(prefers-reduced-motion:reduce)');
  if (!reduced.matches && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('pv-reveal');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold:.1 });
    document.querySelectorAll('.pv-intro,.pv-index a,.pv-media,.pv-project-heading,.pv-result,.pv-about-text,.pv-article,.pv-closing').forEach(node => observer.observe(node));
  }
})();

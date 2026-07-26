/* ─────────────────────────────────────────
   ABOUT — Article carousel and story selection
───────────────────────────────────────── */

(() => {
  const links = document.querySelectorAll('.about-articles-carousel .article-link');
  const sections = document.querySelectorAll('.story-section');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function showSection(id) {
    sections.forEach(section => section.classList.remove('active', 'visible'));
    const target = document.getElementById(id);
    if (!target) return;

    target.classList.add('active');
    requestAnimationFrame(() => {
      requestAnimationFrame(() => target.classList.add('visible'));
    });
    target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
  }

  const first = sections[0];
  if (first) {
    first.classList.add('active');
    requestAnimationFrame(() => {
      requestAnimationFrame(() => first.classList.add('visible'));
    });
  }

  links.forEach(link => {
    link.addEventListener('click', event => {
      const id = link.getAttribute('href')?.replace('#', '');
      if (!id) return;
      event.preventDefault();
      history.replaceState(null, '', `#${id}`);
      showSection(id);
    });
  });

  const hash = window.location.hash.replace('#', '');
  if (hash) showSection(hash);

  const carousel = document.querySelector('.about-articles-carousel');
  const track = document.getElementById('aboutArticlesTrack');
  if (!carousel || !track) return;

  if (reducedMotion) {
    carousel.style.height = 'auto';
    track.style.transform = 'none';
    return;
  }

  function updateCarousel() {
    const rect = carousel.getBoundingClientRect();
    const scrollable = carousel.offsetHeight - window.innerHeight;
    const progress = Math.max(0, Math.min(1, -rect.top / Math.max(scrollable, 1)));
    const articles = track.querySelectorAll('.article-item');
    const lastArticle = articles[articles.length - 1];
    const contentLeft = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--grid-margin-left')) || 0;
    const trackMax = lastArticle ? Math.max(0, lastArticle.offsetLeft - contentLeft) : 0;
    track.style.transform = `translateX(${-progress * trackMax}px)`;
  }

  window.addEventListener('scroll', updateCarousel, { passive: true });
  window.addEventListener('resize', updateCarousel);
  updateCarousel();
})();

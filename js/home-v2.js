/* Home v2 interactions from the Figma Dev Mode annotations. */
(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const title = document.querySelector('[data-home-title]');
  const headline = {
    en: ["Hi, I'm David Montealegre, ", 'senior product designer', ', ', 'ex-Mercado Libre', ', ', 'consultant and freelance designer', ', mentor at ADPlist'],
    es: ['Hola, soy David Montealegre, ', 'senior product designer', ', ', 'ex-Mercado Libre', ', ', 'consultor y diseñador freelance', ', mentor en ADPlist']
  };
  function renderTitle(language, animate = false) {
    const parts = headline[language] || headline.en;
    title.setAttribute('aria-label', parts.join(''));
    const count = parts.join('').length;
    let index = 0;
    title.replaceChildren(...parts.map((text, part) => {
      const span = document.createElement('span');
      span.setAttribute('aria-hidden', 'true');
      if (part === 1 || part === 3 || part === 5) span.className = 'hero-title-accent';
      // Native Figma text animation: character opacity, HOLD easing, 1.3s total.
      for (const char of Array.from(text)) {
        const letter = document.createElement('span');
        letter.textContent = char;
        if (animate && !reduced.matches) {
          letter.style.animation = `v2-character-in 1ms steps(1, end) ${index * 1300 / count}ms both`;
        }
        span.append(letter);
        index++;
      }
      return span;
    }));
    // Leave the completed headline as normal text, including in background tabs.
    window.setTimeout(() => title.querySelectorAll('[style]').forEach(letter => letter.style.removeProperty('animation')), 1350);
  }
  renderTitle(document.documentElement.lang, true);
  document.addEventListener('portfolio:translated', event => renderTitle(event.detail.language));

  document.querySelectorAll('[data-home-scroll]').forEach(button => button.addEventListener('click', () => {
    const section = document.getElementById(button.dataset.homeScroll);
    section.scrollIntoView({behavior: reduced.matches ? 'instant' : 'smooth'});
    section.setAttribute('tabindex', '-1');
    section.focus({preventScroll: true});
  }));

  const sections = [...document.querySelectorAll('#work, #about, #articles')];
  const entrance = new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      entrance.unobserve(entry.target);
    }
  }, { threshold: 0, rootMargin: '0px 0px -10% 0px' });
  sections.forEach(section => entrance.observe(section));

  const videos = [...document.querySelectorAll('[data-preview-video]')];
  const visibleVideos = new Set();
  function play(video) {
    video.currentTime = 0;
    video.play().then(() => video.parentElement.classList.remove('is-paused')).catch(() => video.parentElement.classList.add('is-paused'));
  }
  const playback = new IntersectionObserver(entries => {
    for (const entry of entries) {
      const video = entry.target;
      if (entry.isIntersecting && entry.intersectionRatio >= .5) {
        if (!visibleVideos.has(video)) {
          visibleVideos.add(video);
          if (!reduced.matches) play(video);
        }
      } else if (!entry.isIntersecting) {
        visibleVideos.delete(video);
        video.pause();
      }
    }
  }, { threshold: [0, .5] });
  for (const video of videos) {
    playback.observe(video);
    const button = video.parentElement.querySelector('[data-video-play]');
    button.addEventListener('click', () => play(video));
    video.addEventListener('error', () => video.parentElement.classList.add('is-paused'));
    video.addEventListener('ended', () => video.parentElement.classList.add('is-paused'));
  }
  reduced.addEventListener('change', () => { if (reduced.matches) videos.forEach(video => video.pause()); });

  const track = document.getElementById('articlesTrack');
  const articles = [...track.querySelectorAll('.article-item')];
  const prev = document.querySelector('[data-article-prev]');
  const next = document.querySelector('[data-article-next]');
  function currentIndex() {
    const margin = parseFloat(getComputedStyle(track).paddingLeft);
    const left = track.getBoundingClientRect().left + margin;
    return articles.reduce((best, item, i) => Math.abs(item.getBoundingClientRect().left - left) < Math.abs(articles[best].getBoundingClientRect().left - left) ? i : best, 0);
  }
  function move(step) {
    const index = Math.max(0, Math.min(articles.length - 1, currentIndex() + step));
    const margin = parseFloat(getComputedStyle(track).paddingLeft);
    track.scrollTo({left: articles[index].offsetLeft - track.offsetLeft - margin, behavior: reduced.matches ? 'instant' : 'smooth'});
  }
  prev.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  track.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); move(event.key === 'ArrowLeft' ? -1 : 1); }
  });
  track.tabIndex = 0;
  track.setAttribute('aria-label', 'Article carousel');
  track.addEventListener('scroll', () => {
    prev.disabled = track.scrollLeft < 2;
    next.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 2;
  }, {passive:true});
  prev.disabled = true;

  const dialog = document.querySelector('.v2-pending-dialog');
  document.querySelectorAll('[data-case-pending]').forEach(button => button.addEventListener('click', () => dialog.showModal()));
  dialog.addEventListener('click', event => { if (event.target === dialog && (event.clientX < dialog.getBoundingClientRect().left || event.clientX > dialog.getBoundingClientRect().right || event.clientY < dialog.getBoundingClientRect().top || event.clientY > dialog.getBoundingClientRect().bottom)) dialog.close(); });

  const drawer = document.getElementById('homeMobileDrawer');
  drawer.addEventListener('keydown', event => {
    if (event.key !== 'Tab' || !drawer.classList.contains('is-open')) return;
    const elements = [document.querySelector('.mobile-menu-toggle'), ...drawer.querySelectorAll('a, button')];
    const first = elements[0], last = elements.at(-1);
    if (event.shiftKey && document.activeElement === first) {event.preventDefault();last.focus();}
    else if (!event.shiftKey && document.activeElement === last) {event.preventDefault();first.focus();}
  });
  document.querySelector('.mobile-menu-toggle').addEventListener('keydown', event => {
    if (event.key === 'Tab' && event.shiftKey && drawer.classList.contains('is-open')) {event.preventDefault();[...drawer.querySelectorAll('a, button')].at(-1).focus();}
  });
  const progressStops = ['hero', 'about', 'case-1', 'case-2', 'case-3', 'case-4', 'articles', 'contact']
    .map(id => ({ id, element: document.getElementById(id) }));
  const markerPositions = [7, 74, 141, 208, 278, 348, 418, 488];
  const markerEnd = 519;
  function scrollState() {
    const scroll = window.scrollY;
    const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    // Every stop must use document coordinates. offsetTop is relative to an
    // offsetParent, which differs between page sections and nested case cards.
    const boundaries = progressStops.map(({ element }) => Math.min(maxScroll,
      Math.max(0, element.getBoundingClientRect().top + scroll - 150)));
    let index = 0;
    boundaries.forEach((start, i) => { if (scroll >= start) index = i; });
    const current = progressStops[index].id;
    const navCurrent = current.startsWith('case-') ? 'work' : current;
    const start = boundaries[index];
    const end = boundaries[index + 1] ?? maxScroll;
    const progress = Math.max(0, Math.min(1, (scroll - start) / Math.max(1, end - start)));
    // If the final section cannot reach the activation line, interpolate all
    // the way to the track end rather than freezing or jumping at page bottom.
    const next = end === maxScroll ? markerEnd : markerPositions[index + 1];
    const position = scroll >= maxScroll ? markerEnd
      : markerPositions[index] + progress * (next - markerPositions[index]);
    const labelPeaks = [4.017, 16.563, 29.693, 42.681, 56.56, 69.992, 83.76, 97.474]
      .map(percent => markerPositions[0] + percent / 100 * (markerEnd - markerPositions[0]));
    const nearestLabel = labelPeaks.reduce((nearest, peak, i) =>
      Math.abs(peak - position) < Math.abs(labelPeaks[nearest] - position) ? i : nearest, 0);
    document.querySelectorAll('.v2-scroll-stop').forEach(link => {
      const stopIndex = progressStops.findIndex(stop => link.hash === '#' + stop.id);
      // Reduced motion uses an immediate nearby label rather than an opacity fade.
      link.style.setProperty('--indicator-label-opacity', stopIndex === nearestLabel && Math.abs(labelPeaks[stopIndex] - position) < 31 ? '1' : '0');
      if (link.hash === '#' + current) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
    });
    document.querySelectorAll('.v2-scroll-marker').forEach(marker => {
      marker.style.transform = `translateY(${position - markerPositions[0]}px)`;
      // Seek the Figma label timeline with the actual marker, in either direction.
      marker.parentElement.style.setProperty('--indicator-label-delay', `${-(position - markerPositions[0]) / (markerEnd - markerPositions[0]) * 2500}ms`);
    });
    document.querySelectorAll('.v2-nav-link').forEach(link => {
      if (link.hash === '#' + navCurrent) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
    });
  }
  window.addEventListener('scroll', scrollState, {passive:true});
  scrollState();
  window.addEventListener('resize', scrollState);
  document.addEventListener('portfolio:translated', () => requestAnimationFrame(scrollState));
  // Font and content reflow can move stops without a window resize or scroll.
  document.fonts.ready.then(scrollState);
  reduced.addEventListener('change', scrollState);
  new ResizeObserver(scrollState).observe(document.getElementById('main'));
  window.addEventListener('pageshow', event => {
    if (!event.persisted) return;
    sections.forEach(section => {section.classList.remove('is-visible');entrance.observe(section);});
    visibleVideos.clear();
    videos.forEach(video => {playback.unobserve(video);playback.observe(video);});
    renderTitle(document.documentElement.lang, true);
  });
})();

// Local preview entry for the active, unpublished case.
if (['localhost', '127.0.0.1', '[::1]'].includes(location.hostname)) {
  document.querySelectorAll('[data-local-case]').forEach(link => {
    link.closest('.v2-project-context')?.querySelector('[data-case-pending]')?.remove();
    link.hidden = false;
  });
}

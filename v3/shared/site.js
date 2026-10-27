/* V3 exploration runtime shared by the three proposals.
   Language logic mirrors production: English by default, `?lang=` wins, then the
   `portfolio-language` value in localStorage, which every change updates. */
(() => {
  const C = window.V3_CONTENT;
  const html = document.documentElement;
  const root = html.dataset.root || '';
  const base = html.dataset.base || '';
  const supported = ['en', 'es'];
  const query = new URLSearchParams(location.search).get('lang');
  let stored = null;
  try { stored = localStorage.getItem('portfolio-language'); } catch (error) { /* private mode */ }
  let lang = supported.includes(query) ? query : supported.includes(stored) ? stored : 'en';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const renderers = [];

  const isBilingual = v => v && typeof v === 'object' && !Array.isArray(v) && ('en' in v || 'es' in v);
  const t = v => (v == null ? '' : isBilingual(v) ? (v[lang] ?? v.en) : v);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const asset = p => root + p.normalize('NFC').split('/').map(encodeURIComponent).join('/');
  // Side projects (Ropstar) have a case page but no band in the Home case list or the next-case cycle.
  const caseList = Object.entries(C.cases).filter(([, c]) => !c.side).map(([id, c]) => ({ id, ...c })).sort((a, b) => a.home - b.home);
  const articleList = Object.entries(C.articles).map(([slug, a]) => ({ slug, ...a }));

  const href = {
    home: (hash = '') => `${base}index.html${hash}`,
    case: c => `${base}work/${c.slug}.html`,
    article: slug => `${base}articles/${slug}.html`,
    cv: () => asset(t(C.site.cv))
  };

  function setLang(next) {
    if (!supported.includes(next) || next === lang) return;
    lang = next;
    try { localStorage.setItem('portfolio-language', next); } catch (error) { /* private mode */ }
    const url = new URL(location.href);
    if (url.searchParams.has('lang')) { url.searchParams.set('lang', next); history.replaceState(null, '', url); }
    render();
  }

  function syncToggles() {
    document.querySelectorAll('[data-set-lang]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.setLang === lang));
    });
  }

  function render() {
    html.lang = lang;
    const y = scrollY;
    renderers.forEach(fn => fn(lang));
    syncToggles();
    observe();
    if (y) scrollTo(0, y);
  }

  // Reveal once on entry; a safety net shows anything the observer missed.
  let observer;
  function observe() {
    const targets = document.querySelectorAll('[data-reveal]:not(.is-in)');
    if (reduced.matches || !('IntersectionObserver' in window)) { targets.forEach(el => el.classList.add('is-in')); return; }
    observer ??= new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      observer.unobserve(entry.target);
    }), { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    targets.forEach(el => observer.observe(el));
    setTimeout(() => document.querySelectorAll('[data-reveal]:not(.is-in)').forEach(el => {
      if (el.getBoundingClientRect().top < innerHeight) el.classList.add('is-in');
    }), 2500);
    watchVideos();
  }

  // Muted loops play only while visible and never under reduced motion.
  let videoObserver;
  function watchVideos() {
    const videos = document.querySelectorAll('video[data-autoplay]');
    if (reduced.matches || !('IntersectionObserver' in window)) return;
    videoObserver ??= new IntersectionObserver(entries => entries.forEach(({ target, isIntersecting }) => {
      if (isIntersecting) target.play().catch(() => {});
      else target.pause();
    }), { threshold: 0.35 });
    videos.forEach(v => videoObserver.observe(v));
  }

  document.addEventListener('click', event => {
    const langButton = event.target.closest('[data-set-lang]');
    if (langButton) setLang(langButton.dataset.setLang);
    const play = event.target.closest('[data-video-toggle]');
    if (play) {
      const video = play.closest('figure, [data-video-wrap]')?.querySelector('video');
      if (!video) return;
      if (video.paused) video.play().catch(() => {}); else video.pause();
    }
  });
  document.addEventListener('play', e => e.target.closest?.('figure, [data-video-wrap]')?.classList.add('is-playing'), true);
  document.addEventListener('pause', e => e.target.closest?.('figure, [data-video-wrap]')?.classList.remove('is-playing'), true);

  // Markup helpers shared by the proposals. Classes are neutral; each proposal styles them.
  const ui = key => t(C.site.ui[key]);
  function media(m, { cls = '', autoplay = true, eager = false, sizes = '' } = {}) {
    if (!m) return '';
    if (m.type === 'video') {
      const label = esc(t(m.caption) || t(m.alt) || '');
      return `<video class="${cls}" muted loop playsinline preload="${eager ? 'auto' : 'none'}" ${autoplay ? 'data-autoplay' : ''} poster="${asset(m.poster)}" ${label ? `aria-label="${label}"` : 'aria-hidden="true"'}><source src="${asset(m.src)}"></video>`;
    }
    const source = m.mobile ? `<source media="(max-width: 767px)" srcset="${asset(m.mobile)}">` : '';
    return `<picture class="${cls}">${source}<img src="${asset(m.src)}" alt="${esc(t(m.alt))}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} ${sizes}></picture>`;
  }
  function figure(m, opts = {}) {
    const caption = t(m.caption);
    const toggle = m.type === 'video' ? `<button class="v3-play" type="button" data-video-toggle data-grid-ignore><span class="v3-play__play">${ui('play')}</span><span class="v3-play__pause">${ui('pause')}</span></button>` : '';
    return `<figure class="cs-figure cs-figure--${m.type}" data-reveal>${media(m, opts)}${toggle}${caption ? `<figcaption>${esc(caption)}</figcaption>` : ''}${m.description ? `<p class="cs-figure__note">${esc(t(m.description))}</p>` : ''}</figure>`;
  }
  const paras = list => (t(list) || []).map(p => `<p>${esc(p)}</p>`).join('');
  // A list item may be an array of text runs and links ({ text, href }), which open in a new tab.
  const rich = item => Array.isArray(item) ? item.map(r => typeof r === 'string' ? esc(r) : `<a href="${esc(r.href)}" target="_blank" rel="noopener noreferrer">${esc(r.text)}</a>`).join('') : esc(item);
  const bullets = (list, ordered = false) => { const items = t(list) || []; const tag = ordered ? 'ol' : 'ul'; return items.length ? `<${tag} class="cs-list${ordered ? ' cs-list--ordered' : ''}">${items.map(p => `<li>${rich(p)}</li>`).join('')}</${tag}>` : ''; };

  function caseSection(s) {
    const parts = (s.parts || []).map(p => `<div class="cs-part" data-reveal><h3>${esc(t(p.title))}</h3>${paras(p.body)}${bullets(p.list)}${p.media ? `<div class="cs-media cs-media--${p.media.length}">${p.media.map(m => figure(m)).join('')}</div>` : ''}</div>`).join('');
    const steps = s.steps ? `<ol class="cs-steps">${s.steps.map(step => step.title ? `<li data-reveal><h3>${esc(t(step.title))}</h3><p>${esc(t(step.body))}</p></li>` : `<li data-reveal>${esc(t(step))}</li>`).join('')}</ol>` : '';
    const groups = s.groups ? `<div class="cs-groups">${s.groups.map(g => `<div class="cs-group" data-reveal><h3>${esc(t(g.title))}</h3><div class="cs-media cs-media--${g.media.length}">${g.media.map(m => figure(m)).join('')}</div></div>`).join('')}</div>` : '';
    const axis = s.axis ? `<div class="cs-axis" data-reveal><p>${esc(t(s.axis.intro))}</p><div class="cs-axis__labels">${s.axis.labels.map(l => `<span>${esc(t(l))}</span>`).join('')}</div><div class="cs-axis__ends"><div><h3>${esc(t(s.axis.left.label))}</h3>${bullets(s.axis.left.list)}</div><div><h3>${esc(t(s.axis.right.label))}</h3>${bullets(s.axis.right.list)}</div></div></div>` : '';
    const mediaBlock = s.media ? `<div class="cs-media cs-media--${s.media.length}">${s.media.map(m => figure(m)).join('')}</div>` : '';
    return `<section class="cs-section cs-section--${s.id}" id="${s.id}">
      <h2 class="cs-title" data-reveal>${esc(t(s.title))}</h2>
      <div class="cs-copy" data-reveal>${paras(s.body)}${bullets(s.list)}${s.closing ? `<p class="cs-closing">${esc(t(s.closing))}</p>` : ''}</div>
      ${steps}${parts}${groups}${axis}${mediaBlock}
    </section>`;
  }

  function articleBody(a) {
    return a.blocks.map(b => {
      if (b.t === 'hr') return '<div class="ar-break" aria-hidden="true"></div>';
      if (b.t === 'ul' || b.t === 'ol') return `<${b.t}>${t(b.x).map(li => `<li>${esc(li)}</li>`).join('')}</${b.t}>`;
      if (b.t === 'figure') return `<figure class="ar-figure"><img src="${asset(b.src)}" alt="${esc(t(b.alt))}" loading="lazy">${t(b.x) ? `<figcaption>${esc(t(b.x))}</figcaption>` : ''}</figure>`;
      return `<${b.t}>${esc(t(b.x))}</${b.t}>`;
    }).join('');
  }

  const langToggle = (cls = '') => `<div class="v3-lang ${cls}" role="group" aria-label="${ui('language')}"><button type="button" data-set-lang="en" aria-pressed="false">EN</button><button type="button" data-set-lang="es" aria-pressed="false">ES</button></div>`;
  const contactLinks = (cls = '') => C.site.contact.map(c => `<a class="${cls} ${cls}--${c.id}" href="${c.href}" ${c.id === 'email' ? '' : 'target="_blank" rel="noopener noreferrer"'}>${esc(t(c.label))}</a>`).join('');

  window.V3 = {
    C, t, esc, asset, href, ui, media, figure, paras, bullets, caseSection, articleBody, langToggle, contactLinks,
    cases: caseList, articles: articleList,
    get lang() { return lang; },
    get reduced() { return reduced.matches; },
    page: document.body.dataset.page,
    id: document.body.dataset.id,
    onRender: fn => renderers.push(fn),
    start: render,
    setLang
  };
})();

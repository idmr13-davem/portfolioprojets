/* Proposal B — Stage. Half the screen never moves: the phone screens David designed play
   on a fixed stage while the reading column scrolls. */
(() => {
  const { C, t, esc, asset, href, ui, media, caseSection, articleBody, langToggle, cases, articles } = V3;
  const app = document.getElementById('app');
  const S = C.site;
  const desktop = matchMedia('(min-width: 1024px)');
  const copy = {
    soon: { en: 'Soon', es: 'Pronto' },
    hello: { en: 'Hi, I’m David', es: 'Hola, soy David' },
    nowPlaying: { en: 'On stage', es: 'En escena' },
    resumeEs: { en: 'Resume in Spanish', es: 'Hoja de vida en español' },
    resumeEn: { en: 'Resume in English', es: 'Hoja de vida en inglés' }
  };
  const roleTail = title => title.replace(/^.*?Montealegre,\s*/, '').replace(/^./, ch => ch.toUpperCase());
  const stripe = '<div class="b-stripe" aria-hidden="true">' + Array.from({ length: 24 }, () => '<i></i>').join('') + '</div>';

  const top = () => `
    <a class="v3-skip" href="#main">${ui('skip')}</a>
    <header class="b-top">
      <a class="b-mark" href="${href.home()}">David Montealegre</a>
      <nav class="b-nav" aria-label="${esc(t(S.nav.home))}">
        <a href="${href.home('#work')}">${esc(t(S.nav.work))}</a>
        <a href="${href.home('#blog')}">${esc(t(S.nav.blog))}</a>
        <a href="${href.home('#contact')}">${esc(t(S.nav.contact))}</a>
      </nav>
      ${langToggle('b-lang')}
    </header>`;

  const stage = initial => `<aside class="b-stage" aria-label="${esc(t(copy.nowPlaying))}"><div class="b-stage__inner" data-stage>${initial}</div><p class="b-stage__label" data-stage-label></p></aside>`;

  const contactBlock = () => `
    <section class="b-contact" id="contact" aria-labelledby="contact-title">
      <h2 class="sr-only" id="contact-title">${esc(t(S.nav.contact))}</h2>
      <p class="b-contact__title" data-reveal>${esc(t(S.closingTitle))}</p>
      <p data-reveal>${esc(t(S.closingBody))}</p>
      <div class="b-pills" data-reveal>
        ${S.contact.map(c => `<a class="b-pill ${c.id === 'email' ? 'b-pill--solid' : ''}" href="${c.href}" ${c.id === 'email' ? '' : 'target="_blank" rel="noopener noreferrer"'}>${esc(t(c.label))}</a>`).join('')}
      </div>
      <p class="b-cv" data-reveal>${esc(t(S.cvLabel))}: <a href="${asset(S.cv.en)}" target="_blank" rel="noopener">${esc(t(copy.resumeEn))}</a> · <a href="${asset(S.cv.es)}" target="_blank" rel="noopener">${esc(t(copy.resumeEs))}</a></p>
    </section>`;

  const footer = () => `
    <footer class="b-foot">
      <img class="b-foot__img" src="${asset('assets/Articles/v2/ml-desktop.png')}" alt="" loading="lazy">
      <div class="b-foot__top">
        <nav aria-label="${esc(t(S.nav.home))}"><a href="${href.home()}">${esc(t(S.nav.home))}</a><a href="${href.home('#work')}">${esc(t(S.nav.work))}</a><a href="${href.home('#blog')}">${esc(t(S.nav.blog))}</a><a href="${href.cv()}" target="_blank" rel="noopener">${esc(t(S.cvLabel))}</a></nav>
        <div>${S.contact.map(c => `<a href="${c.href}" ${c.id === 'email' ? '' : 'target="_blank" rel="noopener noreferrer"'}>${esc(c.value)}</a>`).join('')}</div>
      </div>
      ${stripe}
      <p class="b-foot__name" aria-hidden="true">Montealegre</p>
      <p class="b-foot__legal"><span>${esc(t(S.footer)[0])}</span><span>${esc(t(S.footer)[1])}</span></p>
    </footer>`;

  // Stage content keyed by name; sections declare which one they want with data-stage-key.
  const stageItems = {};
  const video = (src, poster, label) => media({ type: 'video', src, poster, caption: label }, { eager: true });

  function home() {
    cases.forEach(c => { stageItems['case-' + c.id] = { html: video(c.card.video, c.card.poster, c.card.videoLabel), label: t(c.card.title) }; });
    articles.forEach(a => { stageItems['article-' + a.slug] = { html: `<img src="${asset(a.img)}" alt="">`, label: t(a.card).title, kind: 'photo' }; });
    stageItems.hero = { html: cases.map(c => `<img class="b-fade" src="${asset(c.card.poster)}" alt="">`).join(''), label: '', kind: 'fade' };
    stageItems.about = { html: `<img src="${asset(S.portrait)}" alt="David Montealegre">`, label: 'David Montealegre', kind: 'photo' };
    const facts = t(S.facts);
    const about = t(S.about);
    const hello = t(S.heroTitle).match(/^(.*?Montealegre)/)?.[1] ?? t(copy.hello);
    return `<div class="b-split">
      <div class="b-read">
        ${top()}
        <main id="main">
          <section class="b-card" data-stage-key="hero">
            ${stripe}
            <h1 class="b-card__title" data-rise>${esc(hello)}</h1>
            <p class="b-card__lead" data-rise style="--i:1">${esc(roleTail(t(S.heroTitle)))}</p>
            <a class="b-pill b-pill--solid" data-rise style="--i:2" href="#work">${esc(t(S.heroLink))}</a>
          </section>

          <section class="b-intro" data-stage-key="hero" aria-label="${esc(t(S.aboutTitle))}">
            ${facts.map(f => `<p data-reveal>${esc(f)}</p>`).join('')}
          </section>

          <section class="b-work" id="work" aria-labelledby="work-title">
            <h2 id="work-title" data-reveal>${esc(t(S.workTitle))}</h2>
            <ol class="b-list">
              ${cases.map((c, i) => `<li class="b-item${i === 0 ? ' is-active' : ''}" data-stage-key="case-${c.id}">
                <button class="b-item__head" type="button" aria-expanded="${i === 0}"><span class="b-item__name">${esc(t(c.card.title))}</span><span class="b-item__val">${esc(t(c.period))}</span></button>
                <div class="b-item__body">
                  <div class="b-item__media">${video(c.card.video, c.card.poster, c.card.videoLabel)}</div>
                  <p class="b-item__impact">${esc(t(c.card.outcome))}</p>
                  <p>${esc(t(c.card.summary))}</p>
                  <p class="b-item__role">${esc(t(c.card.role))}</p>
                  <a class="b-pill b-pill--solid" href="${href.case(c)}">${esc(t(c.card.cta))}</a>
                </div>
              </li>`).join('')}
            </ol>
          </section>

          <section class="b-letter" id="about" data-stage-key="about" aria-labelledby="about-title">
            <h2 class="sr-only" id="about-title">${esc(t(S.aboutTitle))}</h2>
            <img class="b-letter__face" src="${asset(S.portrait)}" alt="" width="48" height="48" loading="lazy">
            <p data-reveal>${esc(about[0])}</p>
            <ul data-reveal>${about[1].map(i => `<li>${esc(i)}</li>`).join('')}</ul>
            <p data-reveal>${esc(about[2])}</p>
            <p data-reveal><mark>${esc(about[3])}</mark></p>
            <p class="b-letter__sign" data-reveal>David Montealegre<span>${esc(roleTail(t(S.heroTitle)).split(',')[0])}</span></p>
            <a class="b-pill b-pill--solid" data-reveal href="${href.cv()}" target="_blank" rel="noopener">${esc(t(S.cvLabel))}</a>
          </section>

          <section class="b-blog" id="blog" aria-labelledby="blog-title">
            <h2 id="blog-title" data-reveal>${esc(t(S.blogTitle))}</h2>
            <ul class="b-ledger">
              ${articles.map(a => `<li data-stage-key="article-${a.slug}"><a href="${href.article(a.slug)}"><img src="${asset(a.img)}" alt="" loading="lazy"><span class="b-ledger__name">${esc(t(a.card).title)}</span><span class="b-ledger__val">${a.underWork ? esc(t(copy.soon)) : esc(t(a.meta)[0])}</span></a></li>`).join('')}
            </ul>
          </section>

          ${contactBlock()}
        </main>
      </div>
      ${stage(stageItems.hero.html)}
    </div>
    ${footer()}`;
  }

  function casePage(id) {
    const c = C.cases[id];
    const i = cases.findIndex(x => x.id === id);
    const next = cases[(i + 1) % cases.length];
    document.title = t(c.meta.title);
    const heroMedia = c.heroSet ? c.heroSet.map(m => media({ ...m, caption: c.heroAlt }, { eager: true })).join('') : media(c.hero, { eager: true });
    stageItems.hero = { html: heroMedia, label: t(c.card.title), kind: c.heroSet ? 'set' : 'photo' };
    return `<div class="b-split">
      <div class="b-read">
        ${top()}
        <main id="main" class="b-cs">
          <section class="b-card" data-stage-key="hero">
            ${stripe}
            <h1 class="b-card__title" data-rise>${esc(t(c.title))}</h1>
            <dl class="b-meta" data-rise style="--i:1">
              <div><dt>${ui('role')}</dt><dd>${esc(t(c.role).replace(/^(Role|Rol):\s*/, ''))}</dd></div>
              <div><dt>${ui('period')}</dt><dd>${esc(t(c.period))}</dd></div>
              <div><dt>${ui('status')}</dt><dd>${esc(t(c.status))}</dd></div>
            </dl>
            <div class="b-card__hero">${heroMedia}</div>
          </section>
          <section class="b-goals" data-stage-key="hero">
            <div data-reveal><h2>${esc(t(c.objectivesTitle))}</h2>${V3.bullets(c.objectives)}</div>
            <div data-reveal><h2>${esc(t(c.outcomesTitle))}</h2>${V3.bullets(c.outcomes)}</div>
          </section>
          <div class="b-cs__body">${c.sections.map(caseSection).join('')}</div>
          <section class="b-final" data-stage-key="hero">
            <h2 data-reveal>${esc(t(c.final.title))}</h2>
            ${c.final.intro ? `<p data-reveal>${esc(t(c.final.intro))}</p>` : ''}
            ${V3.bullets(c.final.list)}
            ${c.final.note ? `<p class="b-note" data-reveal>${esc(t(c.final.note))}</p>` : ''}
          </section>
          <nav class="b-next" aria-label="${ui('next')}">
            <a href="${href.home('#work')}">${ui('back')}</a>
            <a class="b-next__link" href="${href.case(next)}"><span>${ui('next')}</span><strong>${esc(t(next.card.title))}</strong></a>
          </nav>
          ${contactBlock()}
        </main>
      </div>
      ${stage(stageItems.hero.html)}
    </div>
    ${footer()}`;
  }

  function articlePage(slug) {
    const a = C.articles[slug];
    document.title = `${t(a.title)} — David Montealegre`;
    const hero = media({ type: 'image', src: a.hero.src, mobile: a.hero.mobile, alt: a.hero.alt }, { eager: true });
    stageItems.hero = { html: hero, label: t(a.hero.caption), kind: 'photo' };
    return `<div class="b-split">
      <div class="b-read">
        ${top()}
        <main id="main" class="b-ar">
          <section class="b-card" data-stage-key="hero">
            ${stripe}
            <h1 class="b-card__title b-card__title--article" data-rise>${esc(t(a.title))}</h1>
            <p class="b-ar__meta" data-rise style="--i:1">${t(a.meta).map(esc).join(' · ')}</p>
            <p class="b-card__lead" data-rise style="--i:2">${esc(t(a.summary))}</p>
            <ul class="b-tags" data-rise style="--i:3">${t(a.tags).map(x => `<li>${esc(x)}</li>`).join('')}</ul>
            <figure class="b-card__hero">${hero}<figcaption>${esc(t(a.hero.caption))}</figcaption></figure>
          </section>
          <div class="b-ar__body" data-stage-key="hero">${articleBody(a)}</div>
          <nav class="b-next" aria-label="${esc(t(S.blogTitle))}">
            <a href="${href.home('#blog')}">${esc(t(S.blogTitle))}</a>
            <a class="b-next__link" href="${href.home('#work')}"><span>${esc(t(S.nav.work))}</span><strong>${esc(t(cases[0].card.title))}</strong></a>
          </nav>
          ${contactBlock()}
        </main>
      </div>
      ${stage(stageItems.hero.html)}
    </div>
    ${footer()}`;
  }

  function statusPage(id) {
    const s = t(S.status[id]);
    document.title = `${s.heading} — David Montealegre`;
    stageItems.hero = id === 'underWork'
      ? { html: `<img src="${asset(S.status.img.underWork)}" alt="">`, label: '', kind: 'photo' }
      : { html: `<p class="b-stage__big" aria-hidden="true">404</p>`, label: '', kind: 'type' };
    return `<div class="b-split b-split--status">
      <div class="b-read">
        ${top()}
        <main id="main">
          <section class="b-card b-card--status" data-stage-key="hero">
            ${stripe}
            <h1 class="b-card__title" data-rise>${esc(s.heading)}</h1>
            <p class="b-card__lead" data-rise style="--i:1">${esc(s.description)}</p>
            <a class="b-pill b-pill--solid" data-rise style="--i:2" href="${href.home()}">${esc(s.home)}</a>
          </section>
        </main>
      </div>
      ${stage(stageItems.hero.html)}
    </div>
    ${footer()}`;
  }

  // ---------- the stage: whatever is in the middle of the reading column decides what plays ----------
  let stageObserver;
  let currentKey = 'hero';
  function setStage(key, sectionEl) {
    const inner = app.querySelector('[data-stage]');
    const label = app.querySelector('[data-stage-label]');
    if (!inner || key === currentKey) return;
    currentKey = key;
    let item = stageItems[key];
    if (!item && sectionEl) {
      const figs = [...sectionEl.querySelectorAll(':scope > .cs-media .cs-figure, :scope .cs-group .cs-figure, :scope > .cs-part .cs-figure')].slice(0, 12);
      if (!figs.length) return;
      item = { html: figs.map(f => f.querySelector('video, picture')?.outerHTML ?? '').join(''), label: t(C.cases[V3.id]?.sections.find(s => s.id === key.replace('section-', ''))?.title) || '', kind: figs.length > 1 ? 'set' : figs[0].querySelector('video') ? 'video' : 'photo', count: figs.length };
    }
    if (!item) return;
    inner.classList.add('is-leaving');
    setTimeout(() => {
      inner.innerHTML = item.html;
      inner.dataset.kind = item.kind || 'video';
      inner.dataset.count = item.count || 1;
      label.textContent = item.label || '';
      inner.querySelectorAll('video').forEach(v => { v.removeAttribute('data-autoplay'); v.preload = 'auto'; if (!V3.reduced) v.play().catch(() => {}); });
      inner.classList.remove('is-leaving');
    }, V3.reduced ? 0 : 220);
  }
  function wireStage() {
    stageObserver?.disconnect();
    currentKey = null;
    setStage('hero');
    if (!desktop.matches) return;
    app.querySelectorAll('.cs-section').forEach(s => s.dataset.stageKey ||= 'section-' + s.id);
    stageObserver = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) setStage(e.target.dataset.stageKey, e.target);
    }), { rootMargin: '-45% 0px -45% 0px' });
    app.querySelectorAll('[data-stage-key]').forEach(el => stageObserver.observe(el));
  }

  function wire() {
    // Active list: one case open at a time; the stage follows the open case.
    app.querySelectorAll('.b-item__head').forEach(head => head.addEventListener('click', () => {
      const item = head.closest('.b-item');
      app.querySelectorAll('.b-item').forEach(other => {
        const open = other === item;
        other.classList.toggle('is-active', open);
        other.querySelector('.b-item__head').setAttribute('aria-expanded', String(open));
      });
      setStage(item.dataset.stageKey);
    }));
    app.querySelectorAll('.b-ledger a').forEach(a => {
      const key = a.closest('[data-stage-key]').dataset.stageKey;
      a.addEventListener('mouseenter', () => setStage(key));
      a.addEventListener('focus', () => setStage(key));
    });
    wireStage();
  }

  V3.onRender(() => {
    const p = V3.page;
    app.innerHTML = p === 'home' ? home() : p === 'case' ? casePage(V3.id) : p === 'article' ? articlePage(V3.id) : statusPage(V3.id);
    if (p === 'home') document.title = t(S.pageTitle);
    wire();
  });
  desktop.addEventListener('change', wireStage);
  document.addEventListener('visibilitychange', () => app.querySelectorAll('.b-stage video').forEach(v => document.hidden ? v.pause() : (!V3.reduced && v.play().catch(() => {}))));
  V3.start();
  if (location.hash) document.querySelector(location.hash)?.scrollIntoView();
})();

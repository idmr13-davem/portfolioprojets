/* Proposal C — Poster. "Monte / alegre" stays pinned to two corners while the work passes
   between the halves; the live thing is Motion Level's expressivity scale, playable. */
(() => {
  const { C, t, esc, asset, href, ui, media, caseSection, articleBody, langToggle, cases, articles } = V3;
  const app = document.getElementById('app');
  const S = C.site;
  const M = C.cases.motion;
  const level = M.sections.find(s => s.id === 'level');
  const copy = {
    menu: { en: 'Menu', es: 'Menú' },
    dial: { en: 'Try Motion Level', es: 'Prueba Motion Level' },
    dialNote: { en: 'Move the scale. The card answers with the motion that level would allow, from a quiet daily update to a milestone.', es: 'Mueve la escala. La tarjeta responde con el movimiento que permitiría ese nivel, desde una actualización diaria discreta hasta un hito.' },
    replay: { en: 'Play again', es: 'Reproducir de nuevo' },
    level: { en: 'Level', es: 'Nivel' },
    top: { en: 'Back to top', es: 'Volver arriba' },
    soon: { en: 'Soon', es: 'Pronto' },
    resumeEs: { en: 'Resume in Spanish', es: 'Hoja de vida en español' },
    resumeEn: { en: 'Resume in English', es: 'Hoja de vida en inglés' },
    interests: { en: 'Beyond design', es: 'Más allá del diseño' }
  };
  const cap = s => s.replace(/^./, ch => ch.toUpperCase());
  const roleTail = title => cap(title.replace(/^.*?Montealegre,\s*/, ''));

  const header = () => `
    <a class="v3-skip" href="#main">${ui('skip')}</a>
    <header class="c-top">
      <a class="c-mark" href="${href.home()}">David Montealegre</a>
      <nav class="c-nav" aria-label="${esc(t(S.nav.home))}">
        <a href="${href.home('#work')}">${esc(t(S.nav.work))}</a>
        <a href="${href.home('#blog')}">${esc(t(S.nav.blog))}</a>
        <a href="${href.home('#contact')}">${esc(t(S.nav.contact))}</a>
      </nav>
      ${langToggle('c-lang')}
    </header>`;

  const contact = () => `
    <section class="c-mail" id="contact" aria-labelledby="contact-title">
      <h2 class="sr-only" id="contact-title">${esc(t(S.nav.contact))}</h2>
      <p class="c-mail__lead" data-reveal>${esc(t(S.closingTitle))}</p>
      <a class="c-mail__address" href="mailto:idmr13@gmail.com" data-reveal>idmr13@<wbr>gmail.com</a>
      <div class="c-mail__corners">
        <p>${esc(t(S.closingBody))}</p>
        <div class="c-mail__links">
          ${S.contact.filter(c => c.id !== 'email').map(c => `<a href="${c.href}" target="_blank" rel="noopener noreferrer">${esc(t(c.label))} · ${esc(c.value)}</a>`).join('')}
          <a href="${asset(S.cv.en)}" target="_blank" rel="noopener">${esc(t(copy.resumeEn))}</a>
          <a href="${asset(S.cv.es)}" target="_blank" rel="noopener">${esc(t(copy.resumeEs))}</a>
        </div>
      </div>
    </section>`;

  const footer = () => `
    <footer class="c-foot">
      <p class="c-foot__name" aria-hidden="true">Montealegre</p>
      <div class="c-foot__row">
        <ul class="c-foot__places">${S.contact.map(c => `<li><a href="${c.href}" ${c.id === 'email' ? '' : 'target="_blank" rel="noopener noreferrer"'}>${esc(c.value)}</a></li>`).join('')}</ul>
        <nav class="c-foot__cols" aria-label="${esc(t(S.nav.home))}">
          <ul><li><a href="${href.home()}">${esc(t(S.nav.home))}</a></li><li><a href="${href.home('#work')}">${esc(t(S.nav.work))}</a></li><li><a href="${href.home('#blog')}">${esc(t(S.nav.blog))}</a></li></ul>
          <ul>${cases.map(c => `<li><a href="${href.case(c)}">${esc(t(c.card.title))}</a></li>`).join('')}</ul>
          <ul><li><a href="${asset(S.cv.en)}" target="_blank" rel="noopener">${esc(t(copy.resumeEn))}</a></li><li><a href="${asset(S.cv.es)}" target="_blank" rel="noopener">${esc(t(copy.resumeEs))}</a></li></ul>
        </nav>
      </div>
      <div class="c-foot__legal"><span>${esc(t(S.footer)[0])} · ${esc(t(S.footer)[1])}</span><a href="#main">${esc(t(copy.top))}</a></div>
    </footer>`;

  function dial() {
    const labels = level.axis.labels.map(l => t(l));
    return `<section class="c-dial" aria-labelledby="dial-title">
      <div class="c-dial__copy">
        <h2 id="dial-title" data-reveal>${esc(t(copy.dial))}</h2>
        <p data-reveal>${esc(t(level.parts[0].body)[0])}</p>
        <p data-reveal>${esc(t(copy.dialNote))}</p>
        <label class="c-dial__control" data-reveal>
          <span class="sr-only">${esc(t(copy.level))}</span>
          <input type="range" min="1" max="5" step="1" value="2" data-dial>
          <span class="c-dial__ends"><span>${esc(labels[1])} · ${esc(labels[3])}</span><span>${esc(labels[0])} · ${esc(labels[2])}</span></span>
        </label>
        <p class="c-dial__example" data-dial-example aria-live="polite"></p>
      </div>
      <div class="c-dial__stage" data-reveal>
        <div class="c-dial__card" data-dial-card><span class="c-dial__level" data-dial-level>2</span><span class="c-dial__check" aria-hidden="true"></span></div>
        <button class="c-btn c-btn--ghost" type="button" data-dial-play>${esc(t(copy.replay))}</button>
      </div>
    </section>`;
  }

  function home() {
    const facts = t(S.facts);
    const about = t(S.about);
    const interestImages = ['assets/Home/v2/article-career.png', 'assets/Home/v2/article-music.png', 'assets/Home/v2/article-automotive.png'];
    const interests = [about[1][4], about[1][1], about[1][3]];
    return `${header()}
    <main id="main">
      <section class="c-hero" aria-label="David Montealegre">
        <h1 class="c-hero__name" aria-label="David Montealegre"><span class="c-hero__w1" data-drift="-1">Monte</span><span class="c-hero__w2" data-drift="1">alegre</span></h1>
        <figure class="c-hero__photo"><img src="${asset(S.portrait)}" alt="David Montealegre" width="900" height="1125" fetchpriority="high"></figure>
        <div class="c-hero__intro">
          <p class="c-hero__who">David Montealegre</p>
          <p class="c-hero__role">${esc(roleTail(t(S.heroTitle)))}</p>
          <a class="c-btn" href="#work">${esc(t(S.heroLink))}</a>
        </div>
      </section>

      <section class="c-facts" aria-label="${esc(t(S.aboutTitle))}">
        <ul>${facts.map(f => `<li data-reveal>${esc(f)}</li>`).join('')}</ul>
      </section>

      <section class="c-work" id="work" aria-labelledby="work-title">
        <h2 class="sr-only" id="work-title">${esc(t(S.workTitle))}</h2>
        ${cases.map(c => `<article class="c-panel">
          ${media({ type: 'video', src: c.card.video, poster: c.card.poster, caption: c.card.videoLabel }, { cls: 'c-panel__video' })}
          <a class="c-panel__row" href="${href.case(c)}">
            <span class="c-panel__date">${esc(t(c.period))}</span>
            <h3 class="c-panel__title">${esc(t(c.card.title))}</h3>
            <span class="c-panel__fact">${esc(cap(t(c.card.impact)))}</span>
          </a>
        </article>`).join('')}
      </section>

      ${dial()}

      <section class="c-about" aria-labelledby="about-title">
        <div class="c-about__run">
          <div class="c-about__pin"><h2 id="about-title">${esc(t(S.aboutTitle))}</h2><p class="c-about__sub">${esc(t(copy.interests))}</p></div>
          <div class="c-about__pass">
            ${interests.map((text, i) => `<figure class="c-about__item" data-reveal><img src="${asset(interestImages[i])}" alt="" loading="lazy"><figcaption>${esc(text)}</figcaption></figure>`).join('')}
          </div>
        </div>
        <div class="c-about__text">
          <p data-reveal>${esc(about[0])}</p>
          <ul data-reveal>${about[1].map(i => `<li>${esc(i)}</li>`).join('')}</ul>
          <p data-reveal>${esc(about[2])}</p>
          <a class="c-btn" data-reveal href="${href.cv()}" target="_blank" rel="noopener">${esc(t(S.cvLabel))}</a>
        </div>
      </section>

      <section class="c-blog" id="blog" aria-labelledby="blog-title">
        <figure class="c-blog__photo"><img src="${asset(articles[0].img)}" alt="" data-blog-photo loading="lazy"></figure>
        <div class="c-blog__list">
          <h2 id="blog-title" data-reveal>${esc(t(S.blogTitle))}</h2>
          <ul>
            ${articles.map((a, i) => `<li class="${i === 0 ? 'is-active' : ''}" data-photo="${asset(a.img)}"><a href="${href.article(a.slug)}"><span class="c-blog__name">${esc(t(a.card).title)}</span><span class="c-blog__val">${a.underWork ? esc(t(copy.soon)) : esc(t(a.meta)[0])}</span></a><p>${esc(t(a.card).body)}</p></li>`).join('')}
          </ul>
        </div>
      </section>

      ${contact()}
    </main>
    ${footer()}`;
  }

  function casePage(id) {
    const c = C.cases[id];
    const i = cases.findIndex(x => x.id === id);
    const next = cases[(i + 1) % cases.length];
    document.title = t(c.meta.title);
    const hero = c.heroSet ? `<div class="c-cs__set">${c.heroSet.map(m => media({ ...m, caption: c.heroAlt }, { eager: true })).join('')}</div>` : media(c.hero, { eager: true });
    return `${header()}
    <main id="main" class="c-cs">
      <section class="c-cs__hero">
        <h1 class="c-cs__title" data-rise>${esc(t(c.title))}</h1>
        <dl class="c-cs__meta" data-rise style="--i:1">
          <div><dt>${ui('role')}</dt><dd>${esc(t(c.role).replace(/^(Role|Rol):\s*/, ''))}</dd></div>
          <div><dt>${ui('period')}</dt><dd>${esc(t(c.period))}</dd></div>
          <div><dt>${ui('status')}</dt><dd>${esc(t(c.status))}</dd></div>
        </dl>
      </section>
      <div class="c-cs__visual" data-reveal>${hero}</div>
      <section class="c-cs__goals">
        <div data-reveal><h2>${esc(t(c.objectivesTitle))}</h2>${V3.bullets(c.objectives)}</div>
        <div data-reveal><h2>${esc(t(c.outcomesTitle))}</h2>${V3.bullets(c.outcomes)}</div>
      </section>
      <div class="c-cs__body">${c.sections.map(caseSection).join('')}</div>
      <section class="c-cs__final">
        <h2 data-reveal>${esc(t(c.final.title))}</h2>
        ${c.final.intro ? `<p data-reveal>${esc(t(c.final.intro))}</p>` : ''}
        ${V3.bullets(c.final.list)}
        ${c.final.note ? `<p class="c-note" data-reveal>${esc(t(c.final.note))}</p>` : ''}
      </section>
      <article class="c-panel c-panel--next">
        ${media({ type: 'video', src: next.card.video, poster: next.card.poster, caption: next.card.videoLabel }, { cls: 'c-panel__video' })}
        <a class="c-panel__row" href="${href.case(next)}">
          <span class="c-panel__date">${ui('next')}</span>
          <h2 class="c-panel__title">${esc(t(next.card.title))}</h2>
          <span class="c-panel__fact">${esc(t(next.period))}</span>
        </a>
      </article>
      ${contact()}
    </main>
    ${footer()}`;
  }

  function articlePage(slug) {
    const a = C.articles[slug];
    document.title = `${t(a.title)} — David Montealegre`;
    return `${header()}
    <main id="main" class="c-ar">
      <header class="c-ar__head">
        <h1 data-rise>${esc(t(a.title))}</h1>
        <p class="c-ar__summary" data-rise style="--i:1">${esc(t(a.summary))}</p>
        <p class="c-ar__meta" data-rise style="--i:2">${t(a.meta).map(esc).join(' · ')} · ${t(a.tags).map(esc).join(', ')}</p>
      </header>
      <figure class="c-ar__hero" data-reveal>${media({ type: 'image', src: a.hero.src, mobile: a.hero.mobile, alt: a.hero.alt }, { eager: true })}<figcaption>${esc(t(a.hero.caption))}</figcaption></figure>
      <div class="c-ar__body">${articleBody(a)}</div>
    </main>
    ${contact()}
    ${footer()}`;
  }

  function statusPage(id) {
    const s = t(S.status[id]);
    document.title = `${s.heading} — David Montealegre`;
    const words = id === 'notFound' ? ['404', ''] : [s.heading.split(' ')[0], s.heading.split(' ').slice(1).join(' ')];
    return `${header()}
    <main id="main" class="c-status">
      <h1 class="c-hero__name" aria-label="${esc(s.heading)}"><span class="c-hero__w1">${esc(words[0])}</span><span class="c-hero__w2">${esc(words[1])}</span></h1>
      <div class="c-status__card">
        ${id === 'underWork' ? `<img src="${asset(S.status.img.underWork)}" alt="" width="640" height="480">` : ''}
        <p>${esc(s.description)}</p>
        <a class="c-btn" href="${href.home()}">${esc(s.home)}</a>
      </div>
    </main>
    ${footer()}`;
  }

  // Motion Level, playable: higher levels travel further, overshoot more and take longer.
  function wireDial() {
    const input = app.querySelector('[data-dial]');
    if (!input) return;
    const card = app.querySelector('[data-dial-card]');
    const levelEl = app.querySelector('[data-dial-level]');
    const example = app.querySelector('[data-dial-example]');
    const leftList = t(level.axis.left.list);
    const rightList = t(level.axis.right.list);
    const curves = ['cubic-bezier(.2,0,0,1)', 'cubic-bezier(.3,0,0,1)', 'cubic-bezier(.34,1.2,.64,1)', 'cubic-bezier(.34,1.5,.64,1)', 'cubic-bezier(.34,1.9,.5,1)'];
    const play = () => {
      const v = +input.value;
      levelEl.textContent = v;
      example.textContent = v >= 4 ? leftList[Math.min(v - 3, leftList.length - 1)] : rightList[Math.min(3 - v + 1, rightList.length - 1)];
      if (V3.reduced) return;
      card.animate([
        { transform: `translateY(${16 + v * 10}px) scale(${1 - v * 0.04}) rotate(${v >= 4 ? -v * 2 : 0}deg)`, opacity: 0 },
        { transform: 'none', opacity: 1 }
      ], { duration: 220 + v * 140, easing: curves[v - 1], fill: 'both' });
    };
    input.addEventListener('input', play);
    app.querySelector('[data-dial-play]').addEventListener('click', play);
    play();
  }

  // The two halves of the name drift apart as the hero scrolls away (transform only).
  function wireDrift() {
    const words = app.querySelectorAll('[data-drift]');
    if (!words.length || V3.reduced) return;
    let ticking = false;
    const update = () => {
      ticking = false;
      const p = Math.min(scrollY / innerHeight, 1);
      words.forEach(w => { w.style.transform = `translateX(${w.dataset.drift * p * 12}vw)`; });
    };
    addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  }

  function wire() {
    wireDrift();
    wireDial();
    const photo = app.querySelector('[data-blog-photo]');
    app.querySelectorAll('.c-blog__list li').forEach(li => {
      const activate = () => {
        app.querySelectorAll('.c-blog__list li').forEach(o => o.classList.toggle('is-active', o === li));
        if (photo.src !== li.dataset.photo) { photo.style.opacity = 0; setTimeout(() => { photo.src = li.dataset.photo; photo.style.opacity = 1; }, 150); }
      };
      li.addEventListener('mouseenter', activate);
      li.querySelector('a').addEventListener('focus', activate);
    });
  }

  V3.onRender(() => {
    const p = V3.page;
    app.innerHTML = p === 'home' ? home() : p === 'case' ? casePage(V3.id) : p === 'article' ? articlePage(V3.id) : statusPage(V3.id);
    if (p === 'home') document.title = t(S.pageTitle);
    wire();
  });
  V3.start();
  if (location.hash) document.querySelector(location.hash)?.scrollIntoView();
})();

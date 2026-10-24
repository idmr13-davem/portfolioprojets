/* Proposal A — Statement. Type first, olive on bone; outcomes are the display type. */
(() => {
  const { C, t, esc, asset, href, ui, media, figure, caseSection, articleBody, langToggle, contactLinks, cases, articles } = V3;
  const app = document.getElementById('app');
  const S = C.site;
  const lastSentence = s => { const parts = s.split(/(?<=[.!?])\s+/); return parts[parts.length - 1]; };
  const roleTail = title => title.replace(/^.*?Montealegre,\s*/, '').replace(/^./, ch => ch.toUpperCase());
  const copy = {
    menu: { en: 'Menu', es: 'Menú' },
    prompt1: { en: 'Write the first line.', es: 'Escribe la primera línea.' },
    placeholder: { en: 'Hi David, I’d like to talk about…', es: 'Hola David, me gustaría hablar sobre…' },
    send: { en: 'Open in your email app', es: 'Abrir en tu app de correo' },
    sendNote: { en: 'Your email app opens with this message to idmr13@gmail.com. Nothing is sent from this page.', es: 'Tu app de correo se abre con este mensaje para idmr13@gmail.com. Esta página no envía nada.' },
    subject: { en: 'Hello from your portfolio', es: 'Hola desde tu portafolio' },
    resumeEs: { en: 'Resume in Spanish', es: 'Hoja de vida en español' },
    resumeEn: { en: 'Resume in English', es: 'Hoja de vida en inglés' },
    soon: { en: 'Soon', es: 'Pronto' }
  };

  const header = () => `
    <a class="v3-skip" href="#main">${ui('skip')}</a>
    <header class="a-top">
      <a class="a-mark" href="${href.home()}" aria-label="David Montealegre — ${esc(t(S.nav.home))}"><img src="${asset('assets/Home/v2/header-logo.svg')}" alt="" width="59" height="52"></a>
      <nav class="a-nav" data-grid-ignore aria-label="${esc(t(S.nav.home))}">
        <a href="${href.home('#work')}">${esc(t(S.nav.work))}</a>
        <a href="${href.home('#blog')}">${esc(t(S.nav.blog))}</a>
        <a href="${href.home('#contact')}">${esc(t(S.nav.contact))}</a>
        ${langToggle('a-lang')}
      </nav>
      <button class="a-menu-btn" type="button" aria-expanded="false" aria-controls="a-menu">${esc(t(copy.menu))}</button>
    </header>
    <div class="a-menu" id="a-menu" hidden>
      <nav aria-label="${esc(t(copy.menu))}">
        <a href="${href.home()}">${esc(t(S.nav.home))}</a>
        <a href="${href.home('#work')}">${esc(t(S.nav.work))}</a>
        <a href="${href.home('#blog')}">${esc(t(S.nav.blog))}</a>
        <a href="${href.home('#contact')}">${esc(t(S.nav.contact))}</a>
      </nav>
      ${langToggle('a-lang a-lang--menu')}
      <div class="a-menu__links">${contactLinks('a-menu__link')}</div>
    </div>`;

  const footer = () => `
    <footer class="a-foot" id="contact-close">
      <div class="a-foot__top">
        <div class="a-foot__invite" data-reveal>
          <p class="a-foot__line">${esc(lastSentence(t(S.closingBody)))}</p>
          <a class="a-btn a-btn--inverse" href="mailto:idmr13@gmail.com">${esc(t(S.contact[0].label))}</a>
        </div>
        <div class="a-foot__links" data-reveal>
          ${contactLinks('a-foot__link')}
          <a class="a-foot__link" href="${href.cv()}" target="_blank" rel="noopener">${esc(t(S.cvLabel))}</a>
        </div>
      </div>
      <div class="a-foot__legal"><span>${esc(t(S.footer)[0])}</span><span>${esc(t(S.footer)[1])}</span></div>
      <p class="a-foot__name" aria-hidden="true" data-grid-ignore>Montealegre</p>
    </footer>`;

  const lines = (a, b) => `<span class="line"><span data-line style="--i:0">${esc(a)}</span></span><span class="line"><span data-line style="--i:1">${esc(b)}</span></span>`;

  function home() {
    const facts = t(S.facts);
    const numeric = facts.map(f => f.match(/^(\d+)\s+(.*)$/)).filter(Boolean);
    const plain = facts.filter(f => !/^\d/.test(f));
    const about = t(S.about);
    const highlights = about[1].map(i => `<mark>${esc(i.replace(/\.$/, ''))}</mark>`).join(', ');
    return `${header()}
    <main id="main">
      <section class="a-hero">
        <h1 class="a-hero__name lines" aria-label="David Montealegre">${lines('David', 'Montealegre')}</h1>
        <div class="a-hero__foot">
          <p class="a-hero__role" data-rise style="--i:3">${esc(roleTail(t(S.heroTitle)))}</p>
          <a class="a-btn" data-rise style="--i:4" href="#work">${esc(t(S.heroLink))}</a>
        </div>
      </section>

      <section class="a-facts" aria-label="${esc(t(S.aboutTitle))}">
        <div class="a-facts__nums">
          ${numeric.map(([, n, rest]) => `<div class="a-fact" data-reveal><p class="a-fact__n">${n}</p><p class="a-fact__t">${esc(rest)}</p></div>`).join('')}
        </div>
        <figure class="a-facts__chip" data-reveal><img src="${asset(S.portrait)}" alt="David Montealegre" loading="lazy" width="600" height="750"></figure>
        <ul class="a-facts__list">${plain.map(f => `<li data-reveal>${esc(f)}</li>`).join('')}</ul>
      </section>

      <section class="a-work" id="work" aria-labelledby="work-title">
        <h2 class="a-work__title" id="work-title">${esc(t(S.workTitle))}</h2>
      </section>

      ${cases.map(c => `
      <section class="a-case" aria-labelledby="case-${c.id}">
        <div class="a-case__media" data-reveal data-video-wrap>
          ${media({ type: 'video', src: c.card.video, poster: c.card.poster, caption: c.card.videoLabel }, { cls: 'a-case__video' })}
          <button class="v3-play" type="button" data-video-toggle data-grid-ignore><span class="v3-play__play">${ui('play')}</span><span class="v3-play__pause">${ui('pause')}</span></button>
        </div>
        <div class="a-case__copy">
          <h3 id="case-${c.id}" data-reveal>${esc(t(c.card.title))}</h3>
          <p class="a-case__impact" data-reveal>${esc(t(c.card.impact).replace(/^./, ch => ch.toUpperCase()))}</p>
          <p class="a-case__summary" data-reveal>${esc(t(c.card.summary))}</p>
          <p class="a-case__role" data-reveal>${esc(t(c.card.role))}</p>
          <a class="a-btn" data-reveal href="${href.case(c)}">${esc(t(c.card.cta))}</a>
        </div>
      </section>`).join('')}

      <section class="a-about" aria-labelledby="about-title">
        <h2 class="sr-only" id="about-title">${esc(t(S.aboutTitle))}</h2>
        <div class="a-about__text" data-reveal>
          <p><strong>David Montealegre.</strong> ${esc(about[0])} ${highlights}. ${esc(about[2])}</p>
          <p class="a-about__end"><a href="${href.cv()}" target="_blank" rel="noopener"><mark class="is-strong">${esc(about[3])}</mark></a></p>
        </div>
      </section>

      <section class="a-blog" id="blog" aria-labelledby="blog-title">
        <h2 class="a-blog__title" id="blog-title" data-reveal>${esc(t(S.blogTitle))}</h2>
        <ul class="a-rows">
          ${articles.map(a => `<li data-reveal><a class="a-row" href="${href.article(a.slug)}"><img src="${asset(a.img)}" alt="" loading="lazy" width="96" height="96"><span class="a-row__name"><strong>${esc(t(a.card).title)}</strong><span>${esc(t(a.card).body)}</span></span><span class="a-row__value">${a.underWork ? esc(t(copy.soon)) : esc(t(a.meta)[0])}</span></a></li>`).join('')}
        </ul>
      </section>

      <section class="a-contact" id="contact" aria-labelledby="contact-title">
        <h2 class="sr-only" id="contact-title">${esc(t(S.nav.contact))}</h2>
        <p class="a-contact__prompt" data-reveal><span>${esc(t(S.closingTitle))}</span> ${esc(t(copy.prompt1))}</p>
        <form class="a-field" data-reveal action="mailto:idmr13@gmail.com" data-mail>
          <label class="sr-only" for="a-message">${esc(t(copy.prompt1))}</label>
          <input id="a-message" name="message" autocomplete="off" placeholder="${esc(t(copy.placeholder))}">
          <button type="submit" data-grid-ignore aria-label="${esc(t(copy.send))}"><svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.2"/></svg></button>
        </form>
        <p class="a-contact__note" data-reveal>${esc(t(copy.sendNote))}</p>
        <dl class="a-contact__rows" data-reveal>
          ${S.contact.map(c => `<div><dt>${esc(t(c.label))}</dt><dd><a href="${c.href}" ${c.id === 'email' ? '' : 'target="_blank" rel="noopener noreferrer"'}>${esc(c.value)}</a></dd></div>`).join('')}
          <div><dt>${esc(t(S.cvLabel))}</dt><dd><a href="${asset(S.cv.en)}" target="_blank" rel="noopener">${esc(t(copy.resumeEn))}</a> · <a href="${asset(S.cv.es)}" target="_blank" rel="noopener">${esc(t(copy.resumeEs))}</a></dd></div>
        </dl>
      </section>
    </main>
    ${footer()}`;
  }

  function casePage(id) {
    const c = C.cases[id];
    const i = cases.findIndex(x => x.id === id);
    const next = cases[(i + 1) % cases.length];
    const words = t(c.title).split(' ');
    const cut = Math.ceil(words.length / 2);
    const hero = c.heroSet ? `<div class="a-cs__heroset">${c.heroSet.map(m => media({ ...m, caption: c.heroAlt }, { eager: true })).join('')}</div>` : media(c.hero, { cls: 'a-cs__heroimg', eager: true });
    document.title = t(c.meta.title);
    return `${header()}
    <main id="main" class="a-cs">
      <section class="a-cs__hero">
        <h1 class="a-cs__title lines">${lines(words.slice(0, cut).join(' '), words.slice(cut).join(' '))}</h1>
        <dl class="a-cs__meta" data-rise style="--i:3">
          <div><dt>${ui('role')}</dt><dd>${esc(t(c.role).replace(/^(Role|Rol):\s*/, ''))}</dd></div>
          <div><dt>${ui('period')}</dt><dd>${esc(t(c.period))}</dd></div>
          <div><dt>${ui('status')}</dt><dd>${esc(t(c.status))}</dd></div>
        </dl>
      </section>
      <div class="a-cs__visual" data-reveal>${hero}</div>
      <section class="a-cs__goals">
        <div data-reveal><h2>${esc(t(c.objectivesTitle))}</h2>${V3.bullets(c.objectives)}</div>
        <div data-reveal><h2>${esc(t(c.outcomesTitle))}</h2>${V3.bullets(c.outcomes)}</div>
      </section>
      <div class="a-cs__body">${c.sections.map(caseSection).join('')}</div>
      <section class="a-cs__final">
        <h2 data-reveal>${esc(t(c.final.title))}</h2>
        ${c.final.intro ? `<p data-reveal>${esc(t(c.final.intro))}</p>` : ''}
        ${V3.bullets(c.final.list)}
        ${c.final.note ? `<p class="a-cs__note" data-reveal>${esc(t(c.final.note))}</p>` : ''}
      </section>
      <nav class="a-cs__next" aria-label="${ui('next')}">
        <a href="${href.home('#work')}">${ui('back')}</a>
        <a class="a-cs__nextlink" href="${href.case(next)}"><span>${ui('next')}</span><strong>${esc(t(next.card.title))}</strong></a>
      </nav>
    </main>
    ${footer()}`;
  }

  function articlePage(slug) {
    const a = C.articles[slug];
    document.title = `${t(a.title)} — David Montealegre`;
    return `${header()}
    <main id="main" class="a-ar">
      <header class="a-ar__head">
        <h1 data-rise>${esc(t(a.title))}</h1>
        <p class="a-ar__meta" data-rise style="--i:1">${t(a.meta).map(esc).join(' · ')}</p>
        <p class="a-ar__summary" data-rise style="--i:2">${esc(t(a.summary))}</p>
        <ul class="a-ar__tags" data-grid-ignore data-rise style="--i:3">${t(a.tags).map(x => `<li>${esc(x)}</li>`).join('')}</ul>
      </header>
      <figure class="a-ar__hero" data-reveal>${media({ type: 'image', src: a.hero.src, mobile: a.hero.mobile, alt: a.hero.alt }, { eager: true })}<figcaption>${esc(t(a.hero.caption))}</figcaption></figure>
      <div class="a-ar__body">${articleBody(a)}</div>
      <nav class="a-cs__next" aria-label="${esc(t(S.blogTitle))}">
        <a href="${href.home('#blog')}">${esc(t(S.blogTitle))}</a>
        <a class="a-cs__nextlink" href="${href.home('#work')}"><span>${esc(t(S.nav.work))}</span><strong>${esc(t(cases[0].card.title))}</strong></a>
      </nav>
    </main>
    ${footer()}`;
  }

  function statusPage(id) {
    const s = t(S.status[id]);
    document.title = `${s.heading} — David Montealegre`;
    const big = id === 'notFound' ? ['404', ''] : s.heading.split(' ').length > 2 ? [s.heading.split(' ').slice(0, -1).join(' '), s.heading.split(' ').slice(-1)[0]] : [s.heading, ''];
    return `${header()}
    <main id="main" class="a-status a-status--${id}">
      <h1 class="a-status__big lines" aria-label="${esc(s.heading)}">${lines(big[0], big[1])}</h1>
      <div class="a-hero__foot">
        <p class="a-hero__role" data-rise style="--i:3">${esc(s.description)}</p>
        <a class="a-btn" data-rise style="--i:4" href="${href.home()}">${esc(s.home)}</a>
      </div>
      ${id === 'underWork' ? `<figure class="a-status__img" data-reveal><img src="${asset(S.status.img.underWork)}" alt="" loading="lazy"></figure>` : ''}
    </main>
    ${footer()}`;
  }

  function wire() {
    const btn = app.querySelector('.a-menu-btn');
    const menu = app.querySelector('#a-menu');
    btn?.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') !== 'true';
      btn.setAttribute('aria-expanded', String(open));
      btn.textContent = open ? ui('close') : t(copy.menu);
      menu.hidden = !open;
      document.body.classList.toggle('is-locked', open);
    });
    menu?.addEventListener('click', e => { if (e.target.closest('a')) btn.click(); });

    // Status headings: fit the longest line to the grid on phones (17vw at most), whatever the language.
    // Measured once Inter has loaded (the fallback face is narrower) and again on resize.
    const big = app.querySelector('.a-status__big');
    const fitStatus = () => {
      if (!big) return;
      big.style.fontSize = '';
      if (!matchMedia('(max-width: 767px)').matches) return;
      const lines = [...big.querySelectorAll('[data-line]')];
      const widest = Math.max(...lines.map(l => { const r = document.createRange(); r.selectNodeContents(l); return r.getBoundingClientRect().width; }));
      // Available room is the parent's content box: the heading itself may already be stretched by the long word.
      const host = big.parentElement, hs = getComputedStyle(host);
      const room = host.clientWidth - parseFloat(hs.paddingLeft) - parseFloat(hs.paddingRight);
      if (widest > room) big.style.fontSize = `${parseFloat(getComputedStyle(big).fontSize) * room / widest}px`;
    };
    if (big) { document.fonts.ready.then(fitStatus); addEventListener('resize', fitStatus); }

    app.querySelector('[data-mail]')?.addEventListener('submit', e => {
      e.preventDefault();
      const body = e.target.message.value.trim();
      location.href = `mailto:idmr13@gmail.com?subject=${encodeURIComponent(t(copy.subject))}&body=${encodeURIComponent(body)}`;
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

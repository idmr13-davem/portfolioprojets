/* Local implementation of Dev Mode interactions. Full cases need server authentication before publication. */
(() => {
  const config = window.caseStudyV2;
  const translations = config.translations;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const menuButton = document.querySelector('.rml-menu-button');
  const menu = document.getElementById('rml-menu');
  const main = document.querySelector('main');
  const footer = document.querySelector('body > .rml-footer');
  let closeTimer, reviewCopy = {}, language;
  function preferredLanguage() {
    const requested = new URL(location.href).searchParams.get('lang');
    if (requested === 'es' || requested === 'en') return requested;
    try { return localStorage.getItem('portfolio-language') === 'es' ? 'es' : 'en'; }
    catch { return 'en'; }
  }
  function render(lang) {
    language = lang;
    const copy = {...translations[lang], ...reviewCopy[lang]};
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-copy]').forEach(element => {
      const value = copy[element.dataset.copy];
      const mode = element.dataset.copyMode;
      if (value === undefined) return;
      if (mode) {
        const children = [];
        const values = Array.isArray(value) ? [...value] : [value];
        if (mode === 'final') {
          const intro = document.createElement('p'); intro.textContent = values.shift(); children.push(intro);
        }
        if (mode === 'list' || mode === 'final') {
          const list = document.createElement('ul');
          values.forEach((text, index) => {
            const item = document.createElement('li');
            const highlight = copy[element.dataset.copyHighlights]?.[index];
            const offset = typeof highlight === 'string' && highlight.length ? text.indexOf(highlight) : -1;
            if (offset < 0) item.textContent = text;
            else {
              const accent = document.createElement('span');
              accent.className = 'case-copy-accent'; accent.textContent = highlight;
              item.append(text.slice(0, offset), accent, text.slice(offset + highlight.length));
            }
            list.append(item);
          });
          children.push(list);
        } else values.forEach(text => { const paragraph = document.createElement('p'); paragraph.textContent = text; children.push(paragraph); });
        element.replaceChildren(...children);
      } else if (element.dataset.copy === 'title') {
        element.replaceChildren(...value.split('\n').flatMap((line,index) => index ? [document.createElement('br'), document.createTextNode(line)] : [document.createTextNode(line)]));
      } else element.textContent = value;
    });
    document.querySelectorAll('[data-copy-alt]').forEach(img => { img.alt = copy[img.dataset.copyAlt]; });
    document.querySelectorAll('[data-copy-video]').forEach(video => {
      video.setAttribute('aria-label', copy[video.dataset.copyVideo] + (lang === 'es' ? ' — video del flujo' : ' — flow walkthrough video'));
    });
    document.querySelectorAll('.language-toggle').forEach(toggle => {
      toggle.dataset.activeLanguage = lang;
      toggle.setAttribute('aria-label', copy.languageLabel);
    });
    document.querySelectorAll('[data-language]').forEach(link => {
      const url = new URL(location.href); url.searchParams.set('lang', link.dataset.language);
      link.href = url.pathname + url.search + url.hash;
      if (link.dataset.language === lang) link.setAttribute('aria-current','true');
      else link.removeAttribute('aria-current');
    });
    if (document.body.classList.contains('registro-ml-v2') || document.body.classList.contains('motion-v2') || document.body.classList.contains('menores-v2') || document.body.classList.contains('country-v2')) {
      document.querySelectorAll('.language-toggle__option img').forEach(img => {
        const selected = img.closest('[data-language]').dataset.language === lang;
        img.src = '../assets/Home/v2/' + (img.closest('[data-language]').dataset.language === 'es'
          ? (selected ? 'flag-es-selected.svg' : 'flag-es-unselected.svg')
          : 'flag-en.svg');
      });
    }
    document.querySelectorAll('a[href*="index.html"]').forEach(link => {
      const url = new URL(link.href); url.searchParams.set('lang', lang); link.href = url.pathname + url.search + url.hash;
    });
    document.querySelector('.rml-logo').setAttribute('aria-label',copy.logoLabel);
    document.querySelector('.rml-nav').setAttribute('aria-label',copy.navLabel);
    menu.querySelector('nav').setAttribute('aria-label',copy.navLabel);
    menuButton.setAttribute('aria-label',copy[menuButton.getAttribute('aria-expanded') === 'true' ? 'menuClose' : 'menuOpen']);
    document.querySelectorAll('[data-external]').forEach(link => link.setAttribute('aria-label',link.textContent.trim() + ' — ' + copy.external));
    document.title = config.titles[lang];
    const description = config.descriptions[lang];
    document.querySelector('meta[name="description"]').content = description;
    document.querySelector('meta[property="og:title"]').content = document.title;
    document.querySelector('meta[property="og:description"]').content = description;
    try { localStorage.setItem('portfolio-language',lang); } catch {}
    document.dispatchEvent(new CustomEvent('case-language-change', {detail:{lang, copy}}));
  }
  render(preferredLanguage());
  // Exact review copy is excluded from Git and requested only by the loopback preview.
  const copyReady = config.reviewPath && ['localhost','127.0.0.1','[::1]'].includes(location.hostname)
    ? fetch(config.reviewPath, {cache:'no-store'})
      .then(response => { if (!response.ok) throw new Error('Review copy unavailable'); return response.json(); })
      .then(copy => { reviewCopy = copy; render(language); }).catch(() => {})
    : Promise.resolve();
  document.querySelectorAll('[data-language]').forEach(link => link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const url = new URL(location.href); url.searchParams.set('lang',link.dataset.language);
    history.pushState({},'',url.pathname + url.search + url.hash);
    render(link.dataset.language);
  }));
  addEventListener('popstate',() => render(preferredLanguage()));
  function setMenu(open, restoreFocus = true) {
    clearTimeout(closeTimer);
    menuButton.setAttribute('aria-expanded',String(open));
    menuButton.setAttribute('aria-label',translations[language][open ? 'menuClose' : 'menuOpen']);
    main.inert = open; footer.inert = open; menu.inert = !open;
    document.body.classList.toggle('rml-menu-open',open);
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) {
      menu.hidden = false;
      requestAnimationFrame(() => requestAnimationFrame(() => {
        if (menuButton.getAttribute('aria-expanded') !== 'true') return;
        menu.classList.add('is-open');
        setTimeout(() => {
          if (menuButton.getAttribute('aria-expanded') === 'true' && document.activeElement === menuButton) {
            menu.querySelector('a').focus({preventScroll:true});
          }
        }, reduced.matches ? 0 : 500);
      }));
    } else {
      menu.classList.remove('is-open');
      closeTimer = setTimeout(() => { menu.hidden = true; },reduced.matches ? 0 : 500);
      if (restoreFocus) menuButton.focus({preventScroll:true});
    }
  }
  menuButton.addEventListener('click',() => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  menu.querySelectorAll('a:not([data-language])').forEach(link => link.addEventListener('click',() => setMenu(false,false)));
  document.addEventListener('keydown',event => {
    if (menuButton.getAttribute('aria-expanded') !== 'true') return;
    if (event.key === 'Escape') { event.preventDefault(); setMenu(false); }
    if (event.key === 'Tab') {
      const controls = [menuButton,...menu.querySelectorAll('a')];
      const first=controls[0],last=controls.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault();last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault();first.focus(); }
    }
  });
  matchMedia('(min-width:1000px)').addEventListener('change',event => { if (event.matches) setMenu(false,false); });
  document.querySelectorAll('.rml-nav a,.rml-menu nav a,.rml-skip').forEach(link => link.addEventListener('click',event => {
    if (new URL(link.href).pathname !== location.pathname || !link.hash) return;
    const target = document.querySelector(link.hash);
    if (!target) return;
    event.preventDefault(); history.pushState({},'',link.hash);
    target.setAttribute('tabindex','-1'); target.focus({preventScroll:true});
    // Navigation has a bounded 500 ms duration; native reduced-motion navigation is instant.
    const headerOffset = getComputedStyle(document.querySelector('.rml-header')).position === 'fixed' ? document.querySelector('.rml-header').offsetHeight : 0;
    const start = scrollY, end = target.getBoundingClientRect().top + start - headerOffset - 24;
    if (reduced.matches) scrollTo({top:end,behavior:'instant'});
    else {
      const begin=performance.now();
      function step(now) { const t=Math.min((now-begin)/500,1);scrollTo({top:start+(end-start)*(1-Math.pow(1-t,3)),behavior:'instant'});if(t<1) requestAnimationFrame(step); }
      requestAnimationFrame(step);
    }
  }));
  function initMotion() {
    if (reduced.matches || !('IntersectionObserver' in window)) return;
    // The Figma loops demonstrate timing. Reading content enters once per section.
    const observer=new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible'); observer.unobserve(entry.target);
    }),{threshold:0,rootMargin:'0px 0px -5% 0px'});
    document.querySelectorAll('[data-cohort]').forEach(section => {
      section.classList.add('rml-motion-ready'); observer.observe(section);
    });
    reduced.addEventListener('change',event => {
      if (event.matches) { observer.disconnect();document.querySelectorAll('.rml-motion-ready').forEach(section => section.classList.remove('rml-motion-ready')); }
    });
  }
  copyReady.finally(initMotion);
  // Cases with an annotated sequence own playback in their media controller.
  if (config.mediaPlayback === 'sequence') return;
  const flowVideos = [...document.querySelectorAll('[data-flow-video]')];
  const visibleVideos = new Set();
  const backgroundPlaying = new Set();
  function playFlow(video) {
    // Muted inline playback is eligible for autoplay; controls remain available if denied.
    video.muted = true;
    video.play().catch(() => {});
  }
  const playback = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const video = entry.target;
      if (entry.isIntersecting && entry.intersectionRatio >= .5) {
        visibleVideos.add(video);
        if (!reduced.matches && !document.hidden) playFlow(video);
      } else {
        visibleVideos.delete(video);
        video.pause();
      }
    });
  }, {threshold:[0,.5]});
  flowVideos.forEach(video => playback.observe(video));
  reduced.addEventListener('change',event => {
    if (event.matches) flowVideos.forEach(video => video.pause());
    else if (!document.hidden) visibleVideos.forEach(playFlow);
  });
  document.addEventListener('visibilitychange',() => {
    if (document.hidden) {
      flowVideos.forEach(video => { if (!video.paused) backgroundPlaying.add(video); video.pause(); });
    } else {
      if (!reduced.matches) backgroundPlaying.forEach(video => { if (visibleVideos.has(video)) playFlow(video); });
      backgroundPlaying.clear();
    }
  });
})();

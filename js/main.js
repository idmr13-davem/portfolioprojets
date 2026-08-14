// ─────────────────────────────────────────
//  Header — scroll state
// ─────────────────────────────────────────
const sidenav = document.getElementById('sidenav');
const scrollFill = document.getElementById('scrollProgressFill');

// ─────────────────────────────────────────
//  Page heroes — choreographed entrance
// ─────────────────────────────────────────
(function initPageEntrance() {
  if (!document.querySelector('.hero, .about-hero, .cs-hero, .error-main')) return;

  const root = document.documentElement;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) {
    root.classList.add('motion-entered');
    return;
  }

  requestAnimationFrame(() => {
    requestAnimationFrame(() => root.classList.add('motion-entered'));
  });
})();

// ─────────────────────────────────────────
//  Temporary mobile state — shared across every page
// ─────────────────────────────────────────
(function initMobileUnderConstruction() {
  if (document.body.classList.contains('home-page')) return;
  if (document.body.classList.contains('has-mobile-layout')) return;

  const isNestedPage = window.location.pathname.includes('/work/') || window.location.pathname.includes('/articles/');
  const rootPath = isNestedPage ? '../' : '';
  const overlay = document.createElement('section');
  overlay.className = 'mobile-construction';
  overlay.setAttribute('aria-label', 'Mobile version under construction');
  overlay.innerHTML = `
    <header class="mobile-construction__header">
      <a href="${rootPath}index.html" class="mobile-construction__logo" aria-label="David Montealegre — Home">
        <img src="${rootPath}assets/Home/logo/isotipo.svg" alt="">
      </a>
      <button class="mobile-construction__menu" type="button" aria-expanded="false" aria-controls="mobileConstructionDrawer" aria-label="Open navigation"><span></span><span></span><span></span></button>
    </header>
    <div class="mobile-construction__content">
      <div>
        <h1>This page is under work</h1>
        <p>The content here isn’t available yet, please come back later.</p>
      </div>
      <a href="${rootPath}index.html" class="btn btn--loud">Go home</a>
    </div>
    <footer class="mobile-construction__footer">
      <small>© David Montealegre 2026</small>
    </footer>
    <div class="mobile-construction__drawer" id="mobileConstructionDrawer" aria-hidden="true">
      <div class="mobile-construction__drawer-header">
        <a href="${rootPath}index.html" class="mobile-construction__logo"><img src="${rootPath}assets/Home/logo/isotipo.svg" alt=""></a>
        <button class="mobile-construction__close" type="button" aria-label="Close navigation"></button>
      </div>
      <nav>
        <a href="${rootPath}index.html#work">Selected work →</a>
        <a href="${rootPath}index.html#about">About me →</a>
        <a href="${rootPath}index.html#articles">My articles →</a>
        <a href="${rootPath}index.html#contact">Contact →</a>
      </nav>
      <div class="mobile-construction__actions">
        <div class="language-toggle" role="group" aria-label="Language selection">
          <button class="language-toggle__option" type="button" data-language="en" aria-pressed="true">EN</button>
          <button class="language-toggle__option" type="button" data-language="es" aria-pressed="false">ES</button>
        </div>
        <a href="mailto:idmr13@gmail.com" class="btn-contact">
          <div class="btn-contact__thumb"><img src="${rootPath}assets/Home/Imágenes/Img contact.png" alt="David Montealegre"></div>
          <span class="btn-contact__label">Get in touch</span>
        </a>
      </div>
    </div>`;
  document.body.prepend(overlay);
  const menu = overlay.querySelector('.mobile-construction__menu');
  const close = overlay.querySelector('.mobile-construction__close');
  const drawer = overlay.querySelector('.mobile-construction__drawer');
  function setDrawer(open) {
    drawer.classList.toggle('is-open', open);
    overlay.classList.toggle('is-drawer-open', open);
    drawer.setAttribute('aria-hidden', String(!open));
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  }
  menu.addEventListener('click', () => setDrawer(!drawer.classList.contains('is-open')));
  close.addEventListener('click', () => setDrawer(false));
})();

// ─────────────────────────────────────────
//  Home mobile — drawer navigation
// ─────────────────────────────────────────
(function initHomeMobileDrawer() {
  const header = document.querySelector('.home-header');
  const menu = header?.querySelector('.mobile-menu-toggle');
  const drawer = document.getElementById('homeMobileDrawer');
  const dimmer = document.getElementById('homeMobileDimmer');
  if (!header || !menu || !drawer) return;

  function setDrawer(open) {
    header.classList.toggle('is-mobile-drawer-open', open);
    drawer.classList.toggle('is-open', open);
    document.body.classList.toggle('is-mobile-menu-open', open);
    drawer.setAttribute('aria-hidden', String(!open));
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  }

  menu.addEventListener('click', () => setDrawer(!drawer.classList.contains('is-open')));
  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setDrawer(false));
  });
  dimmer?.addEventListener('click', () => setDrawer(false));
})();

// ─────────────────────────────────────────
//  Internal mobile — drawer navigation
// ─────────────────────────────────────────
(function initInternalMobileDrawer() {
  const header = document.querySelector('.cs-topbar');
  const menu = header?.querySelector('.mobile-menu-toggle');
  const drawer = document.getElementById('internalMobileDrawer');
  if (!header || !menu || !drawer) return;

  function setDrawer(open) {
    header.classList.toggle('is-mobile-drawer-open', open);
    drawer.classList.toggle('is-open', open);
    document.body.classList.toggle('is-mobile-menu-open', open);
    drawer.setAttribute('aria-hidden', String(!open));
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  }

  menu.addEventListener('click', () => setDrawer(!drawer.classList.contains('is-open')));
  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setDrawer(false));
  });
})();

// ─────────────────────────────────────────
//  Shared closing contact and copyright footer
// ─────────────────────────────────────────
(function initGlobalContactAndFooter() {
  const isNestedPage = window.location.pathname.includes('/work/') || window.location.pathname.includes('/articles/');
  const rootPath = isNestedPage ? '../' : '';
  const closing = document.querySelector('.section-closing, .about-closing, .cs-cierre');

  if (closing) {
    closing.id = 'contact';
    closing.className = 'section-closing';
    closing.innerHTML = `
      <div class="container">
        <div class="closing-inner reveal">
          <div class="closing-header">
            <h2 class="closing-title">Are you ready to connect?</h2>
            <div class="closing-body">
              <p>I'm looking for a place where the drive to challenge myself, grow, and solve problems I'm passionate about is just part of the job.</p>
              <p>Shall we work together?</p>
            </div>
          </div>
          <div class="closing-actions" aria-label="Contact options">
            <a class="contact-action contact-action--email" href="mailto:idmr13@gmail.com">
              <img src="${rootPath}assets/Icons/contact-email.svg" alt="" aria-hidden="true" />
              <span>Send me an email</span>
            </a>
            <a class="contact-action contact-action--linkedin" href="https://www.linkedin.com/in/david-montealegre-rey/" target="_blank" rel="noopener noreferrer">
              <img src="${rootPath}assets/Icons/contact-linkedin.svg" alt="" aria-hidden="true" />
              <span>Visit my profile</span>
            </a>
            <a class="contact-action contact-action--whatsapp" href="https://wa.me/573183922306" target="_blank" rel="noopener noreferrer">
              <img src="${rootPath}assets/Icons/contact-whatsapp.svg" alt="" aria-hidden="true" />
              <span>Send me a message</span>
            </a>
          </div>
        </div>
      </div>`;

    document.querySelectorAll('.site-header .btn-contact').forEach(button => {
      button.href = '#contact';
    });
  }

  document.querySelectorAll('.site-footer').forEach(footer => {
    footer.innerHTML = `
      <div class="site-footer__bottom">
        <span class="site-footer__copy">© David Montealegre 2026</span>
        <span class="site-footer__credit">
          <span>Website created with</span>
          <img class="site-footer__brand-icon" src="${rootPath}assets/Home/Vectores/LogoChatGPT.png" alt="" aria-hidden="true" />
          <span>ChatGPT Work</span>
        </span>
      </div>`;
  });

  document.querySelectorAll('.mobile-home-drawer__footer').forEach(footer => {
    footer.innerHTML = `
      <small class="mobile-home-drawer__copy">© David Montealegre 2026</small>
      <span class="mobile-home-drawer__credit">
        <span>Website created with</span>
        <img class="site-footer__brand-icon" src="${rootPath}assets/Home/Vectores/LogoChatGPT.png" alt="" aria-hidden="true" />
        <span>ChatGPT Work</span>
      </span>`;
  });
})();

// ─────────────────────────────────────────
//  Language toggle — shared state across pages
// ─────────────────────────────────────────
(function initLanguageToggle() {
  const toggles = document.querySelectorAll('.language-toggle');
  const supportedLanguages = ['en', 'es'];
  const storedLanguage = localStorage.getItem('portfolio-language');
  let currentLanguage = supportedLanguages.includes(storedLanguage) ? storedLanguage : 'en';

  function updateToggleVisuals(language) {
    toggles.forEach(toggle => {
      toggle.dataset.activeLanguage = language;
      if (!toggle.querySelector('.language-toggle__active-labels')) {
        const activeLabels = document.createElement('span');
        activeLabels.className = 'language-toggle__active-labels';
        activeLabels.setAttribute('aria-hidden', 'true');
        activeLabels.innerHTML = supportedLanguages
          .map(code => `<span class="language-toggle__active-label">${code.toUpperCase()}</span>`)
          .join('');
        toggle.append(activeLabels);
      }
    });
  }

  function renderLanguage(language) {
    currentLanguage = language;
    updateToggleVisuals(language);
    window.PortfolioI18n?.apply(language);
    document.querySelectorAll('[data-cv-link]').forEach(link => {
      const cvPath = language === 'es' ? link.dataset.cvEs : link.dataset.cvEn;
      link.href = cvPath;
    });
    toggles.forEach(toggle => {
      toggle.querySelectorAll('.language-toggle__option').forEach(option => {
        option.setAttribute('aria-pressed', String(option.dataset.language === language));
      });
    });
  }

  if (!toggles.length) {
    renderLanguage(currentLanguage);
    document.documentElement.classList.add('language-entered');
    return;
  }

  toggles.forEach(toggle => {
    toggle.addEventListener('click', event => {
      const option = event.target.closest('.language-toggle__option');
      if (!option || option.dataset.language === currentLanguage) return;
      const language = option.dataset.language;
      updateToggleVisuals(language);
      localStorage.setItem('portfolio-language', language);
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reducedMotion) renderLanguage(language);
      else {
        document.documentElement.classList.remove('language-entered');
        window.setTimeout(() => {
          renderLanguage(language);
          requestAnimationFrame(() => requestAnimationFrame(() => document.documentElement.classList.add('language-entered')));
        }, 180);
      }
      document.dispatchEvent(new CustomEvent('portfolio:languagechange', {
        detail: { language: option.dataset.language }
      }));
    });
  });

  renderLanguage(currentLanguage);
  document.documentElement.classList.add('language-entered');
})();

window.addEventListener('scroll', () => {
  sidenav && sidenav.classList.toggle('scrolled', window.scrollY > 40);

  // Global progress bar
  if (scrollFill) {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    scrollFill.style.width = pct + '%';
  }
}, { passive: true });

// ─────────────────────────────────────────
//  Selected work — exclusive accordion
// ─────────────────────────────────────────
(function initSelectedWorkAccordion() {
  const section = document.querySelector('.section-work');
  const items = section ? Array.from(section.querySelectorAll('.sw-item')) : [];
  if (!section || !items.length) return;

  function setExpanded(item, expanded) {
    const trigger = item.querySelector('.sw-accordion-trigger');
    const panel = item.querySelector('.sw-panel');
    item.classList.toggle('is-active', expanded);
    trigger.setAttribute('aria-expanded', String(expanded));
    panel.toggleAttribute('inert', !expanded);
  }

  items.forEach(item => {
    const trigger = item.querySelector('.sw-accordion-trigger');
    trigger.addEventListener('click', () => {
      const willExpand = trigger.getAttribute('aria-expanded') !== 'true';
      items.forEach(otherItem => setExpanded(otherItem, false));
      if (willExpand) setExpanded(item, true);
    });
  });
})();

// ─────────────────────────────────────────
//  Cursor dot
// ─────────────────────────────────────────
const dot = document.getElementById('cursorDot');
document.addEventListener('mousemove', e => {
  dot.style.left = e.clientX + 'px';
  dot.style.top  = e.clientY + 'px';
});
document.querySelectorAll('a, button, [role="link"]').forEach(el => {
  el.addEventListener('mouseenter', () => dot.classList.add('over-link'));
  el.addEventListener('mouseleave', () => dot.classList.remove('over-link'));
});

// ─────────────────────────────────────────
//  Scroll to contact
// ─────────────────────────────────────────
function scrollToContact() {
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

// ─────────────────────────────────────────
//  Facts — horizontal scroll on vertical scroll
// ─────────────────────────────────────────
(function initFacts() {
  const section  = document.querySelector('.section-facts');
  const track    = document.getElementById('factsTrack');
  const counter  = document.getElementById('factsCurrentNum');
  const slides   = track ? Array.from(track.querySelectorAll('.fact-slide')) : [];

  if (!section || !track || !slides.length) return;

  // Respect reduced motion — keep section but disable transform
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) {
    section.style.height = 'auto';
    track.style.flexDirection = 'column';
    slides.forEach(s => {
      s.style.minWidth = '100%';
      s.style.minHeight = '80vh';
      s.classList.add('is-active');
    });
    return;
  }

  function onScroll() {
    const sectionTop    = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const scrolled      = window.scrollY - sectionTop;
    const scrollable    = sectionHeight - window.innerHeight;

    // raw 0→1 progress through the section
    const raw = Math.max(0, Math.min(1, scrolled / scrollable));

    // translate track
    const trackMax = track.scrollWidth - window.innerWidth;
    track.style.transform = `translateX(${-raw * trackMax}px)`;

    // active slide — which one is centered in viewport
    const slideWidth  = window.innerWidth;
    const currentIdx  = Math.min(
      slides.length - 1,
      Math.round((raw * trackMax) / slideWidth)
    );

    slides.forEach((s, i) => {
      s.classList.toggle('is-active', i === currentIdx);
    });

    // counter
    const num = String(currentIdx + 1).padStart(2, '0');
    counter.textContent = num;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // init on load
})();


// ─────────────────────────────────────────
//  Registro ML — exclusive compounding changes accordion
// ─────────────────────────────────────────
(function initCaseChangeDisclosure() {
  const section = document.querySelector('.cs-change-disclosure');
  const items = section ? Array.from(section.querySelectorAll('.cs-change-item')) : [];
  if (!section || !items.length) return;

  function setExpanded(item, expanded) {
    const trigger = item.querySelector('.cs-change-trigger');
    const panel = item.querySelector('.cs-change-body');
    item.classList.toggle('is-active', expanded);
    trigger.setAttribute('aria-expanded', String(expanded));
    panel.toggleAttribute('inert', !expanded);
  }

  items.forEach(item => {
    const trigger = item.querySelector('.cs-change-trigger');
    trigger.addEventListener('click', () => {
      const willExpand = trigger.getAttribute('aria-expanded') !== 'true';
      items.forEach(otherItem => setExpanded(otherItem, false));
      if (willExpand) setExpanded(item, true);
    });
  });
})();

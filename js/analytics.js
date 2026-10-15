/* GA4 basic consent: no Google requests before opt-in; production public pages only. */
(() => {
  'use strict';
  const id = 'G-45WX56R7RB';
  const key = 'portfolio-analytics-consent-v1';
  const lifetime = 180 * 24 * 60 * 60 * 1000;
  const publicPaths = new Set([
    '/', '/index.html', '/about.html', '/work/registro-ml.html', '/work/motion-design-system.html', '/work/menores-mexico.html', '/articles/page-under-work.html',
    '/articles/por-que-mercado-libre-fue-el-primer-lugar-del-que-no-quise-irme.html',
    '/articles/lo-que-mi-pasion-por-los-autos-me-enseno-sobre-disenar-experiencias.html'
  ]);
  const production = location.protocol === 'https:' &&
    ['davidmontealegreux.com', 'www.davidmontealegreux.com'].includes(location.hostname);
  const measurable = production && publicPaths.has(location.pathname);
  let loaded = false;
  let previousFocus;
  let choice = readChoice();

  function readChoice() {
    try {
      const saved = JSON.parse(localStorage.getItem(key));
      if (saved && ['accepted', 'rejected'].includes(saved.value) &&
          saved.at <= Date.now() && Date.now() - saved.at < lifetime) return saved.value;
    } catch { /* A blocked store must not prevent browsing or imply acceptance. */ }
    return null;
  }

  function cleanLocation() {
    const url = new URL(location.origin + location.pathname);
    // Only campaign vocabulary, never arbitrary query data, credentials or fragments.
    for (const name of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']) {
      const value = new URL(location.href).searchParams.get(name);
      if (value && /^[a-z][a-z0-9_-]{0,79}$/i.test(value)) url.searchParams.set(name, value);
    }
    return url.href;
  }

  function loadAnalytics() {
    if (!measurable || loaded || choice !== 'accepted') return;
    loaded = true;
    window['ga-disable-' + id] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', {
      analytics_storage: 'denied', ad_storage: 'denied',
      ad_user_data: 'denied', ad_personalization: 'denied'
    });
    window.gtag('consent', 'update', { analytics_storage: 'granted' });
    window.gtag('js', new Date());
    let referrer = '';
    try { referrer = new URL(document.referrer).origin + '/'; } catch {}
    window.gtag('config', id, {
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      page_location: cleanLocation(), page_referrer: referrer,
      site_version: 'v2'
    });
    window.gtag('event', 'page_view', {
      page_location: cleanLocation(), page_referrer: referrer,
      page_title: document.title, site_version: 'v2'
    });
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
    document.head.append(script);
  }

  function clearAnalyticsCookies() {
    for (const cookie of document.cookie.split(';')) {
      const name = cookie.split('=')[0].trim();
      if (!/^_ga(?:_|$)/.test(name)) continue;
      for (const domain of ['', location.hostname, '.davidmontealegreux.com']) {
        document.cookie = name + '=; Max-Age=0; Path=/; SameSite=Lax' +
          (domain ? '; Domain=' + domain : '');
      }
    }
  }

  // Controlled identifiers only: never send link URLs, labels, emails or phone numbers.
  const casePaths = {
    '/work/registro-ml.html': 'registro_ml',
    '/work/motion-design-system.html': 'motion_level',
    '/work/menores-mexico.html': 'accounts_minors_mexico',
  };
  const projectIds = { '1': 'registro_ml', '2': 'motion_level', '3': 'accounts_minors_mexico' };
  const articlePaths = {
    '/articles/por-que-mercado-libre-fue-el-primer-lugar-del-que-no-quise-irme.html': 'mercado_libre_career',
    '/articles/lo-que-mi-pasion-por-los-autos-me-enseno-sobre-disenar-experiencias.html': 'automotive_ux',
    '/articles/page-under-work.html': 'upcoming_article'
  };

  function placementOf(element) {
    if (element.closest('.v2-mobile-drawer, .v2-drawer-contact, .mobile-home-drawer, .mobile-construction__drawer')) return 'drawer';
    if (element.closest('#hero, .v2-hero-contact')) return 'hero';
    if (element.closest('#contact, .site-footer, footer')) return 'footer';
    if (element.closest('header, .site-header')) return 'header';
    if (element.closest('.v2-project')) return 'project_card';
    if (element.closest('#about')) return 'about';
    if (element.closest('#articles')) return 'articles';
    if (element.closest('nav')) return 'navigation';
    return 'content';
  }

  function trackInteraction(event) {
    if (!measurable || !loaded || choice !== 'accepted' ||
        window['ga-disable-' + id] || document.visibilityState === 'hidden') return;
    if (event.type === 'auxclick' && event.button !== 1) return;
    const element = event.target instanceof Element ? event.target.closest('a, button') : null;
    if (!element || element.closest('#portfolio-analytics-consent, #portfolio-analytics-settings') ||
        element.closest('[hidden], [inert]') || element.matches(':disabled, [aria-disabled="true"]')) return;
    let name;
    let details;
    if (element.matches('[data-case-pending]')) {
      const caseId = projectIds[element.closest('[data-project]')?.dataset.project];
      if (!caseId) return;
      name = 'case_select';
      details = { case_id: caseId, destination_status: 'pending' };
    } else {
      if (!element.matches('a[href]')) return;
      let url;
      try { url = new URL(element.href, location.href); } catch { return; }
      const internal = url.origin === location.origin;
      if (internal && casePaths[url.pathname]) {
        name = 'case_select';
        details = { case_id: casePaths[url.pathname], destination_status: 'case_link' };
      } else if (url.protocol === 'mailto:') {
        name = 'contact_click'; details = { contact_method: 'email' };
      } else if (url.protocol === 'https:' && ['wa.me', 'api.whatsapp.com'].includes(url.hostname)) {
        name = 'contact_click'; details = { contact_method: 'whatsapp' };
      } else if (url.protocol === 'https:' && ['linkedin.com', 'www.linkedin.com'].includes(url.hostname)) {
        name = 'contact_click'; details = { contact_method: 'linkedin' };
      } else if (url.protocol === 'https:' && ['adplist.org', 'www.adplist.org'].includes(url.hostname)) {
        name = 'schedule_click'; details = { contact_method: 'adplist' };
      } else if (internal && /^\/assets\/CV\/(DavidMontealegre-CV-EN|DavidMontealegre-HV-ES)\.pdf$/.test(url.pathname)) {
        name = 'cv_open'; details = { cv_language: url.pathname.endsWith('-ES.pdf') ? 'es' : 'en' };
      } else if (internal && articlePaths[url.pathname] && url.pathname !== location.pathname) {
        name = 'article_select'; details = { article_id: articlePaths[url.pathname] };
      } else if (internal && ['/', '/index.html', location.pathname].includes(url.pathname)) {
        const sections = { '#hero': 'intro', '#about': 'about', '#work': 'work', '#articles': 'articles', '#contact': 'contact', '#case-1': 'registro_ml_preview', '#case-2': 'motion_level_preview', '#case-3': 'accounts_minors_mexico_preview' };
        if (!sections[url.hash]) return;
        name = 'navigation_click'; details = { section_id: sections[url.hash] };
      } else return;
    }
    window.gtag('event', name, {
      send_to: id, ...details, placement: placementOf(element),
      content_language: document.documentElement.lang === 'es' ? 'es' : 'en',
      page_path: location.pathname, site_version: 'v2'
    });
  }
  // Delegation also covers translated links and shared footers inserted by other scripts.
  // Capture records the action before navigation; it never delays or cancels the link.
  document.addEventListener('click', trackInteraction, true);
  document.addEventListener('auxclick', trackInteraction, true);

  function saveChoice(value) {
    choice = value;
    try { localStorage.setItem(key, JSON.stringify({ value, at: Date.now() })); } catch {}
    panel.hidden = true;
    if (value === 'accepted') loadAnalytics();
    else {
      window['ga-disable-' + id] = true;
      clearAnalyticsCookies();
      // Reload unloads Google's listeners/timers, rather than merely hiding the banner.
      if (loaded) { location.reload(); return; }
    }
    (previousFocus?.isConnected ? previousFocus : settings).focus({ preventScroll: true });
  }

  const copy = {
    en: {
      title: 'Help me improve my portfolio',
      body: 'This website uses cookies to measure page views, clicks and how people find this site. You can browse without accepting.',
      accept: 'Accept cookies', reject: 'Reject cookies', settings: 'change your preferences',
      footerBefore: 'I use cookies to understand which pages and projects attract the most interest. You can ',
      footerAfter: ' at any time.',
    },
    es: {
      title: 'Ayúdame a mejorar mi portafolio',
      body: 'Este sitio web usa cookies para medir las vistas, los clics y cómo las personas encuentran este sitio. Puedes navegar sin aceptar.',
      accept: 'Aceptar cookies', reject: 'Rechazar cookies', settings: 'cambiar tus preferencias',
      footerBefore: 'Uso cookies para entender qué páginas y proyectos generan más interés. Puedes ',
      footerAfter: ' en cualquier momento.',
    }
  };
  const panel = document.createElement('section');
  panel.id = 'portfolio-analytics-consent';
  panel.className = 'analytics-consent';
  panel.setAttribute('role', 'region');
  panel.setAttribute('aria-labelledby', 'analytics-consent-title');
  panel.hidden = Boolean(choice);
  panel.innerHTML = `
    <h2 id="analytics-consent-title" tabindex="-1"></h2>
    <p data-consent="body"></p>
    <div class="analytics-consent__actions"><button type="button" class="btn btn--mute" data-consent="reject"></button><button type="button" class="btn btn--loud" data-consent="accept"></button></div>`;
  const settingsArea = document.createElement('div');
  settingsArea.id = 'portfolio-analytics-settings';
  settingsArea.className = 'analytics-settings';
  const settings = document.createElement('button');
  settings.type = 'button';
  settings.className = 'analytics-settings__link';
  settings.setAttribute('aria-controls', panel.id);
  const footerCopy = document.createElement('p');
  const before = document.createElement('span');
  const after = document.createElement('span');
  footerCopy.append(before, settings, after);
  settingsArea.append(footerCopy);
  document.body.append(panel);
  (document.querySelector('body > .site-footer, body > footer') || document.body).append(settingsArea);

  function translate() {
    const language = document.documentElement.lang === 'es' ? 'es' : 'en';
    panel.lang = language;
    settings.lang = language;
    const text = copy[language];
    panel.querySelector('h2').textContent = text.title;
    panel.querySelectorAll('[data-consent]').forEach(el => { el.textContent = text[el.dataset.consent]; });
    settings.textContent = text.settings;
    before.textContent = text.footerBefore;
    after.textContent = text.footerAfter;
  }
  settings.addEventListener('click', () => {
    previousFocus = settings;
    panel.hidden = false;
    panel.querySelector('h2').focus({ preventScroll: true });
  });
  panel.querySelector('[data-consent="accept"]').addEventListener('click', () => saveChoice('accepted'));
  panel.querySelector('[data-consent="reject"]').addEventListener('click', () => saveChoice('rejected'));
  panel.addEventListener('keydown', event => {
    if (event.key === 'Escape' && choice) { panel.hidden = true; settings.focus({ preventScroll: true }); }
  });
  new MutationObserver(translate).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  window.addEventListener('storage', event => {
    if (event.key !== key && event.key !== null) return;
    const next = readChoice();
    if (loaded && next !== 'accepted') {
      window['ga-disable-' + id] = true;
      clearAnalyticsCookies();
      location.reload();
      return;
    }
    choice = next;
    panel.hidden = Boolean(choice);
    loadAnalytics();
  });
  translate();
  loadAnalytics();
})();

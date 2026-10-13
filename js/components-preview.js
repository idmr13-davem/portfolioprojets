// The gallery renders source variants; all state styling lives in components.css.
const preview = document.getElementById('componentPreview');
const states = ['idle', 'hover', 'clic'];
const cell = (label, markup) => `<div class="pg-cell"><span class="pg-state-tag">${label}</span>${markup}</div>`;
const section = (title, rows) => `<section class="pg-section"><h2 class="pg-section-label">${title}</h2>${rows.map(row => `<div class="pg-row">${row}</div>`).join('')}</section>`;
let markup = '';
for (const type of ['Text', 'Arrow']) {
  const rows = [];
  for (const kind of ['loud', 'mute']) for (const size of ['large', 'small']) {
    const base = type === 'Text' ? `btn btn--${kind} ${size === 'small' ? 'btn--small' : ''}` : `button-arrow button-arrow--${kind} button-arrow--${size}`;
    const content = type === 'Text' ? 'Button' : '';
    rows.push(states.map(state => cell(`${kind} · ${size} · ${state}`, `<button class="${base}" data-preview-state="${state}" aria-label="${kind} ${size} ${state} arrow">${content}</button>`)).join('') + cell('Live', `<button class="${base}" aria-label="${kind} ${size} live arrow">${content}</button>`));
  }
  markup += section(`${type} buttons`, rows);
}
markup += section('Links', [states.map(state => cell(state, `<a class="text-link" href="#" data-preview-state="${state}">Text link</a>`)).join('') + cell('Place', '<a class="text-link text-link--place" href="#">Text link</a>')]);
const rows = [];
for (const size of ['large', 'small']) for (const variant of ['touch', 'email', 'linkedin', 'whatsapp']) {
  const small = size === 'small';
  const labels = {touch:'Get in touch',email:'Send me an email',linkedin:'Visit my profile',whatsapp:'Send me a message'};
  const base = variant === 'touch' ? `btn-contact ${small ? 'btn-contact--small' : ''}` : `contact-action contact-action--${variant} ${small ? 'contact-action--small' : ''}`;
  const content = variant === 'touch' ? '<div class="btn-contact__thumb"><img src="assets/Home/v2/contact.png" alt=""></div><span class="btn-contact__label">Get in touch</span>' : `<img src="assets/Home/v2/${variant}${small ? '-small' : ''}.svg" alt=""><span>${labels[variant]}</span>`;
  rows.push(states.map(state => cell(`${variant} · ${size} · ${state}`, `<a class="${base}" href="#" data-preview-state="${state}">${content}</a>`)).join(''));
}
markup += section('Contact buttons', rows);
markup += section('Pills', ['main','alert','accent','secondary'].map(kind => ['large','small'].map(size => cell(`${kind} · ${size}`, `<span class="pill pill--${kind} ${size === 'small' ? 'pill--small' : ''}">${kind === 'secondary' ? 'Secondary pill' : 'Primary pill'}</span>`)).join('')));
markup += section('Language toggle', [cell('Live', '<div class="language-toggle" data-active-language="en" role="group" aria-label="Language selection"><button type="button" class="language-toggle__option" data-language="en" aria-label="English" aria-pressed="true"><img src="assets/Home/v2/flag-en.svg" alt=""></button><button type="button" class="language-toggle__option" data-language="es" aria-label="Español" aria-pressed="false"><img src="assets/Home/v2/flag-es-unselected.svg?v=20261013-colombia" alt=""></button></div>')]);
markup += section('Textarea', [cell('Idle / selected', '<textarea placeholder="Yo habría hecho…" aria-label="Feedback"></textarea>')]);
markup += section('Icons', ['<div class="pg-row" id="iconPreview"></div>']);
markup += section('Canonical color tokens', ['<div class="pg-row" id="tokenPreview"></div>']);
preview.innerHTML = markup;
preview.querySelector('.language-toggle').addEventListener('click', event => {
  const option = event.target.closest('[data-language]');
  if (!option) return;
  const toggle = option.parentElement;
  toggle.dataset.activeLanguage = option.dataset.language;
  toggle.querySelectorAll('[data-language]').forEach(button => button.setAttribute('aria-pressed', String(button === option)));
  toggle.querySelector('[data-language="es"] img').src = `assets/Home/v2/flag-es-${option.dataset.language === 'es' ? 'selected' : 'unselected'}.svg?v=20261013-colombia`;
});
fetch('assets/Components/library.json').then(r => r.json()).then(icons => {
  document.getElementById('iconPreview').innerHTML = icons.map(icon => cell(icon.name, `<div class="pg-icon" style="width:${icon.size}px;height:${icon.size}px"><img src="${icon.src}" alt=""></div>`)).join('');
});
fetch('css/tokens/figma-library.json').then(r => r.json()).then(data => {
  document.getElementById('tokenPreview').innerHTML = data.variables.filter(v => v.type === 'COLOR').map(v => {
    const name = '--' + v.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return cell(v.name, `<div style="width:48px;height:48px;border:1px solid var(--stroke-primary);border-radius:8px;background:var(${name})"></div>`);
  }).join('');
});

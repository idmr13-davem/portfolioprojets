# Handoff — footer-consent v1: disclaimer de analítica en el footer de V3

## Objetivo
David pidió actualizar el footer de todas las páginas V3 con el disclaimer de analítica del componente Figma `Footer` (5120:1494): copyright y crédito apilados a la izquierda; a la derecha "Uso cookies para entender qué páginas y proyectos generan más interés. Puedes [cambiar tus preferencias] en cualquier momento." con el enlace subrayado.

## Cambios
- `v3/statement/app.js`:
  - `footer()`: fila legal = `<p class="a-foot__credits">` (copyright + crédito) + `<div class="a-foot__consent" data-consent-slot>`.
  - `js/analytics.js` (compartido con la V2, sin cambios) crea una vez `#portfolio-analytics-settings` con el texto bilingüe y el botón que reabre el panel. `placeConsent()` lo mueve al slot en `DOMContentLoaded` (los scripts `defer` ya corrieron) y después de cada render. Antes de `app.innerHTML = …` se rescata a `body` si estaba dentro de `#app`, para que el re-render por cambio de idioma no destruya el nodo ni sus listeners.
- `v3/statement/styles.css`:
  - La regla de la fila legal pasa de grid 9 + 3 a flex: space-between, alineado abajo, padding inferior M (24).
  - Créditos con gap XXS (6). El strip de `css/analytics.css` se neutraliza dentro del footer: sin borde ni fondo, color y fuente heredados, enlace subrayado.
  - Tablet: una fila; el disclaimer llena el resto. Phones: apilado.
  - Separación XL (48); Figma usa 43 sin variable, así que se usó el token.
  - Desktop XL (≥1500): L (32) entre invitación y fila legal, como en Figma (`.a-foot .a-foot__legal` para ganar a la regla posterior de 3rem).
- Caché: Statement `styles.css` y `app.js` → `20261027-footer-consent` (9 HTML + `v3/build-pages.mjs` l.53 y 60). Regenerar dio páginas idénticas.
- Alcance: propuesta Statement (la del componente Figma). Stage y Poster tienen footers propios y no cargan `analytics.js`.

## Cómo verificar
- `node intercambio/evidencia/2026-10-27_footer-consent/measure.mjs` (server 3456 + Chrome):
  - Footer EN: 468 / 453.3 / 490.2 / 661 frente a Figma 468 / 454 / 492 / 658. Mobile +3 por el gap 48 en vez de 43.
  - Disclaimer dentro del footer en Home, caso 4, Página en construcción y 404 a 1600/1280/768/390.
  - Tras cambiar de idioma: 1 nodo, traducido, dentro del footer.
  - Tras rechazar, el enlace reabre el panel con foco en su título.
- Capturas: `footer-<w>-<en|es>.png`, tomadas con la elección ya guardada.
- Auditoría: `pixel-perfect/report.md`. Sin hallazgos altos. Los medios:
  - el botón inline dentro de la frase;
  - el near-miss del texto alineado a la derecha frente al 4.º botón (EN 1600);
  - el banner flotante de consentimiento y la 404, que son de otra sesión y quedan fuera del alcance.

## Supuestos y limitaciones
- No se tocó `js/analytics.js` ni `css/analytics.css` (V2 publicada).
- El banner flotante y las pantallas de estado los hizo otra sesión; no son parte de este handoff. Sin commit.

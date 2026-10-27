# Handoff — switch-codigo v1: caso de estudio 4 (Switch entre países) en V3 Statement

## Objetivo
David pidió revisar con /pixel-perfect la diagramación que Codex hizo en Figma para el caso 4 (`5170:54941`) y la entrada en la Home (`5203:74779`), y luego implementar el caso en `v3/statement`.

## Cambios
- `v3/shared/content.js`: nuevo caso `switch` (`home: 3`, slug `cambio-cuentas-paises`). EN copiado de Figma; ES de la V2 aprobada (`js/country-v2.js`) y de `js/i18n.js` para la tarjeta. Secciones: context (body), challenges (list), comparison (body + 2 videos), variants (body + list + 3 videos); final sin nota. Los videos no llevan caption visible (Figma no tiene); su descripción va en `alt` → `aria-label`.
- `v3/statement/app.js`: el caso usa `gridSection` (lista de casos con plantilla de Figma).
- `v3/build-pages.mjs`: nueva página `work/cambio-cuentas-paises.html` para las tres propuestas; versiones de caché `20261027-switch` (styles de Statement, content.js en las 27 páginas, app.js de Statement). Las páginas existentes se regeneraron idénticas salvo la versión.
- `v3/statement/styles.css`: el caso reutiliza las reglas de Menores para la banda del hero, objetivos y final (mismas alturas/paddings en Figma). Bloque nuevo al final: media a copy-block-gap (20); figuras de 3 columnas en desktop (4–6, 7–9, 10–12), proporción nativa 718×1592 / 714×1594, Radius XS, sin fondo; tablet 6 + 6 y variantes en columnas 4–9 con gap S (16); phones a 12 columnas con gap S; lista de variantes con viñetas y sin gap (un solo bloque de texto en Figma).
- Assets locales (ignorados por Git a propósito: el caso sigue protegido y fuera de publicación): `assets/Switch países/v3/hero-v3.webp` (2560), `hero-v3-mobile.webp` (1440), cinco posters `*-poster.jpg` del primer fotograma; videos en `assets/Videos/Switch/`.

## Revisión de la diagramación en Figma
`intercambio/evidencia/2026-10-27_switch-codigo/revision-figma.md` (8 hallazgos; las desviaciones intencionales del código respecto al frame 1600 están ahí).

## Cómo verificar
- `node intercambio/evidencia/2026-10-27_switch-codigo/measure.mjs` (servidor en 3456 + Chrome): medidas por sección en 1600/1280/768/390; capturas `browser-*.png`.
- Auditoría: `node .claude/skills/pixel-perfect/scripts/audit.mjs <caso> <caso?lang=es> <home> --widths 1600,1280,1024,768,390,360 ...` → `pixel-perfect/report.md`: 0 hallazgos en 18 combinaciones; overlays `pixel-perfect/*.jpg`.
- Home: la banda del caso 4 mide igual que las otras tres (media 887×665, copy 493 en col 9 a 1600; 358 a 390).
- Stage y Poster renderizan la página sin overflow.

## Supuestos y limitaciones
- 1600: los videos llenan sus 3 columnas (desviación intencional, hallazgo 1).
- Textos "On develop", "Challenges Faced", título del caso: copiados de Figma (hallazgos 6–8), pendientes de decisión de David.
- No se modificó Figma. Sin commit.
- Hay cambios de otra sesión sin commit en `v3/statement/styles.css` (contacto/blog/artículos) y `content.js` (crédito del footer): no son parte de este handoff.

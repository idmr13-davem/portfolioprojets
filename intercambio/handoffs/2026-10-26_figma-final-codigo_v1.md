# Handoff: figma-final-codigo v1

## Objetivo
Aplicar a la V3 Statement (`v3/statement/`) los ajustes estéticos finales que David hizo en Figma (`Nodyl6xcEeEwbhi0OBGFnB`, página "💻 Portafolio V3"): Home `5065:518`, Registro ML `5065:519`, Motion Level `5076:1275`, Menores `5076:2434`, Blog 1 `5095:3528`, Blog 2 `5095:4265`. Revisar que el código siga la grilla de 12 columnas.

## Contexto y restricciones
- HTML/CSS/JS planos; tokens de `css/tokens/figma.css`. Sin frameworks.
- Figma es la fuente de verdad. Regla del 26-oct: nada de anchos medidos o `ch` donde la grilla cubre la composición.
- Animar solo transform/opacity; i18n EN/ES; cache busting al cambiar hojas compartidas.
- No se hizo commit (CLAUDE.md: sin commit sin pedido de David). El punto de comparación es una copia de `v3/` y de los dos WebP nuevos en `/private/tmp/claude-501/-Users-dave--claude-spares-spare-O6LrYf/9ec49ec3-f3ff-4799-90e0-627b4c18d7bd/scratchpad/antes-codex/`. El árbol ya tenía cambios sin commit de sesiones anteriores; los de esta tarea están solo en los archivos listados abajo.

## Qué se hizo
Tabla completa de cambios y medidas en `intercambio/evidencia/2026-10-26_figma-final-codigo/medidas.md`. Resumen:
1. Home: Facts sin fondo; medios de casos, Blog y Contact sobre Background/Deep (`--surface`); video `Motion curve 1` en la tarjeta de Motion; prompt de contacto con el estilo Section title; tablet con About/Blog/Contact en columnas 2–11.
2. Footer: crédito "Website created with Claude Code + Codex" / "Sitio web creado con Claude Code + Codex".
3. Registro ML: nuevo hero exportado de Figma (`assets/Registro ML/v2/hero-v3.webp`, `hero-v3-mobile.webp`) con la misma banda que Menores (alturas 660/536/356/256 interpoladas); figuras sobre Background/Deep.
4. Menores: nota del Final outcome a 17 px en móvil.
5. Artículos: título y resumen a 12 columnas, cuerpo en columnas 3–10 en desktop, párrafos sin `62ch`, padding del cuerpo 110.
6. Cache: `?v=20261026-figma-final` en `styles.css` y `content.js` (`v3/build-pages.mjs`, shells regenerados con `node v3/build-pages.mjs`).

## Archivos a revisar
- `v3/statement/styles.css` (diff contra la copia `antes-codex/v3/statement/styles.css`)
- `v3/shared/content.js` (footer, `registro.hero`, `motion.card.video/poster`)
- `v3/build-pages.mjs` y los shells regenerados de `v3/statement/`
- `assets/Registro ML/v2/hero-v3.webp`, `hero-v3-mobile.webp`
- Evidencia: `intercambio/evidencia/2026-10-26_figma-final-codigo/` (`medidas.md`, `antes/`, `despues/`, `pixel-perfect/report.md` y overlays, `figma-home-*.png`)

## Cómo verificar
- `diff -u /private/tmp/claude-501/-Users-dave--claude-spares-spare-O6LrYf/9ec49ec3-f3ff-4799-90e0-627b4c18d7bd/scratchpad/antes-codex/v3/statement/styles.css v3/statement/styles.css`
- Comparar `antes/*/data-*.json` con `despues/*/data-*.json` y con los altos de Figma de `medidas.md`.
- `pixel-perfect/report.md` y `report.json`: 0 altos; los 24 medios están en secciones no modificadas.
- Revisar que las reglas nuevas no muevan otras páginas: `.a-ar__*` solo existe en artículos; la regla de hero ahora aplica a `.a-cs--registro` además de `.a-cs--menores`; la regla de tablet/móvil de Home se movió dentro de las mismas media queries.
- Si el sandbox permite Chrome: `node server.js` y abrir `http://127.0.0.1:3456/v3/statement/index.html`.

## Supuestos y limitaciones
- Home 390 About: no se reproduce el espacio extra de Figma (Fill de alto en `Columns`); ver `medidas.md`.
- h2 de artículos: Figma conserva saltos manuales del layout anterior; el navegador corta natural con `text-wrap: balance`.
- Tablet About: columnas 2–6 / 7–11 (gutter 16) en lugar de las mitades con gap 32 de Figma, para quedar en grilla.
- Padding del cuerpo de artículos 110 px fijo (Figma: 110 en los cuatro frames; en 1600 ligado a `section-half`).
- `content.js` es compartido: el crédito, el hero de Registro y el video de Motion también cambian en las propuestas `poster` y `stage`.
- Los páginas de estado (404, en construcción) mantienen "Website created with" + logo de Codex; no están en Figma.

## Preguntas para el revisor
1. ¿Alguna regla nueva pisa otra por orden de cascada (en especial las media queries de Home y la nota de Menores)?
2. ¿Es correcto el valor fijo de 110 px para el cuerpo de artículos, o conviene expresarlo con un token?
3. ¿Ves otra diferencia entre los PNG de Figma y el código que se haya pasado por alto?

## Respuesta a la revisión anterior (solo v2+)
| Hallazgo | Decisión | Motivo / evidencia |
|---|---|---|

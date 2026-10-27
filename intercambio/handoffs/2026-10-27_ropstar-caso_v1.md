# Handoff: Caso Ropstar UI en V3 Statement v1

## Objetivo
David pidió diseñar en código el nuevo caso del side project Ropstar UI en la V3 local (`v3/statement/`), siguiendo el diseño de Figma hecho por Codex (sección "Craft visual 01", `5276:88289`, archivo `Nodyl6xcEeEwbhi0OBGFnB`), en todas sus resoluciones, con los estándares figma-senior-build y pixel-perfect.

Criterios de aceptación:
- Página `v3/statement/work/ropstar.html` con hero (título en dos líneas, lead, tres datos), banda de imagen a sangre, Contexto, cinco capítulos con tres pantallas cada uno, Resultado final con enlaces, navegación al siguiente caso y footer, como en Figma a 1600/1280/768/390.
- EN y ES.
- Sin overflow horizontal ni errores de consola; 0 hallazgos altos en pixel-perfect.
- Ropstar no aparece como banda en la lista de casos de la Home ni en el ciclo "Next case"; el botón "See proposal" de Ropstar en la Home lleva a la página nueva.

## Contexto y restricciones
- Sin commit (David no lo pidió). Stage y Poster no reciben la página (el diseño es solo para Statement); solo se regeneran sus shells por la versión de caché.
- Frames de Figma: 1600 `5276:88757`, 1280 `5276:88362`, 768 `5276:88423`, 390 `5276:88484`. Solo se leyeron; no se escribió nada en Figma.
- Los tokens tipográficos ya existían en el CSS de Statement: título `clamp(2.75rem, 8.2vw, 8.75rem)` = 131.2/104.96/62.98/36 (Figma idéntico), lead `--step-lead` = 30.4/27.84/23.74 y 17 en móvil, títulos de sección 46.4/37.12/28, Final `--step-head` y lista `clamp(1.25rem, 2.2vw, 2.25rem)`.

## Qué se hizo
1. `v3/shared/content.js`: nuevo `cases.ropstar` con `side: true`, `titleLines`, `lead`, `facts` (Contribution/Scope/Platform), `hero`, secciones `context` (cuerpo + lista `ordered`) y cinco capítulos `inline` con 3 imágenes cada uno, `final` con dos ítems (el segundo con enlaces a Instagram y Linktree), `meta`. En `site.craft[0]` se añadió `"case": "ropstar"`.
   - ES de Contexto, títulos de capítulos y Resultado final copiados de Figma (Figma solo tiene ES en esas partes). EN de esas partes es traducción propuesta. Hero y datos: EN de Figma, ES propuesto.
   - Enlace "sitio web": Figma tiene `https://linktr.ee/somosropstar?utm_source=ig&…&fbclid=…`; se dejó `https://linktr.ee/somosropstar` sin parámetros de rastreo.
2. `v3/shared/site.js`: `caseList` excluye casos con `side`; `bullets(list, ordered)` admite `<ol>` y ítems como arreglo de textos y enlaces `{ text, href }` (target _blank, rel noopener noreferrer).
3. `v3/statement/app.js`: botón de craft enlaza `href.case` cuando hay `case`; `gridSection` acepta `s.ordered` y `s.inline` (las pantallas van dentro de `.cs-content`, en la misma fila que el título); `casePage` incluye `ropstar` en la plantilla grid, usa `titleLines`, renderiza `.a-cs__lead` y `facts`, y omite `.a-cs__goals` si no hay `objectivesTitle`.
4. `v3/statement/styles.css`: `.a-cs--ropstar` se suma a la banda del hero compartida (padding L, img 660/536 en desktop); bloque final "Ropstar side project": lead, lista ordenada (decimal, sin gap, .9em tras el párrafo), pantallas 375:812 sin fondo, tablet en columnas 4–9 y móvil 3–10 con gap gutter, altura del hero en tablet/móvil interpolada a 356/256 de Figma, lista final sin gap, enlaces subrayados.
5. `v3/build-pages.mjs`: página `work/ropstar.html` solo para statement (`only`), caché `?v=20261027-ropstar` en styles/content/app y ahora también en `site.js`.
6. Assets nuevos sin versionar (`assets/Ropstar/` ya está fuera de Git): `assets/Ropstar/v3/case/*.webp` (hero 2560 y 1440, 15 pantallas a ancho nativo), generados con `intercambio/evidencia/2026-10-27_ropstar-caso/generate-assets.mjs`. Las 15 pantallas se identificaron comparando el SHA-1 de los PNG locales con el `imageHash` de Figma (coinciden los 15).

## Archivos a revisar
- v3/shared/content.js (bloque `"ropstar": {` dentro de `cases`, y `site.craft[0].case`)
- v3/shared/site.js (líneas 21–22 y 115–117)
- v3/statement/app.js (`home` craft, `gridSection`, `casePage`)
- v3/statement/styles.css (selectores del hero `.a-cs--ropstar` y bloque final "Ropstar side project")
- v3/build-pages.mjs
- Copia previa para diff: /private/tmp/claude-501/-Users-dave--claude-spares-spare-VGMqSk/c4c6f15f-0798-4424-b63c-cba8cf207326/scratchpad/antes-codex-ropstar/v3
- Evidencia: intercambio/evidencia/2026-10-27_ropstar-caso/ (measure.mjs, ropstar-{1600,1280,768,390}-es.png, pixel-perfect/report.md y overlays)

## Medidas (código ES vs Figma)
- 1600: hero 616 vs 618; banda 724 vs 724; Contexto 596 vs 597; capítulos 1004 vs 911 (ver diferencias); Final 450 vs 451; navegación 312.5 vs 313; footer 468 vs 468.
- 1280: hero 565 vs 567; banda 600 vs 600; Contexto 641 vs 641; capítulos 802.8 vs 802.8; Final 381 vs 383; navegación 259 vs 260; footer 453 vs 454.
- 768: banda img 356 vs 356; Contexto 702.6 vs 705; capítulos 2557.1 vs 2557.6 (pantallas 360 × 779.5, x 204 = columnas 4–9); Final 271.5 vs 272.
- 390: banda img 256 vs 256; Contexto 1008 vs 1010; capítulos 1734/1761 vs 1849/1876; Final 328 vs 328; footer 661 vs 658.
- Overflow horizontal 0 en los cuatro anchos; consola sin errores.
- Pixel-perfect (1600, 1440, 1280, 1024, 768, 390, 360; Ropstar EN, ES y Home): 0 altos. Ningún hallazgo dentro del contenido del caso; los medios restantes son el banner de consentimiento, el enlace de preferencias del footer y el collage de craft de la Home, ya existentes y aceptados en el handoff de side projects.

## Cómo verificar
node server.js (127.0.0.1:3456) y:
node intercambio/evidencia/2026-10-27_ropstar-caso/measure.mjs es
node intercambio/evidencia/2026-10-27_ropstar-caso/measure.mjs en
node .claude/skills/pixel-perfect/scripts/audit.mjs http://127.0.0.1:3456/v3/statement/work/ropstar.html "http://127.0.0.1:3456/v3/statement/work/ropstar.html?lang=es" --widths 1600,1280,768,390,360 --cols 12 --margin-var --margin --gutter-var --gutter --out /tmp/pp-ropstar
Comprobar también que Registro/Motion/Menores/Switch siguen igual (cambios en `bullets` y `gridSection` son compartidos) y que la Home sigue con 4 bandas de caso.

## Supuestos y limitaciones
- Diferencias conocidas:
  - 1600: Figma deja las pantallas en 319 de ancho (y en dos capítulos una cuarta instancia, oculta o desbordada); el frame parece desactualizado frente a 1280/768/390. El código usa tres columnas de la grilla por pantalla (362), como en 1280.
  - 390: Figma pone las pantallas a 251, que no cae en columnas enteras. El código usa 8 columnas centradas (3–10, 233 × 505). La alternativa en grilla es 10 columnas (296 × 641).
  - Las traducciones EN de Contexto, capítulos y Resultado final, y las ES del hero/datos, son propuestas.
- La imagen del hero no tiene el mismo hash que la de Figma (misma proporción 2.768); se usó `assets/Ropstar/Hero/Img hero.png`.

## Preguntas para el revisor
1. ¿Los cambios en `bullets`/`gridSection`/`casePage` pueden romper algún otro caso o propuesta (stage/poster usan `V3.bullets`)?
2. ¿La exclusión `side` de `caseList` deja algún enlace o render que dependa de que Ropstar esté en `cases`?
3. ¿La lista ordenada y los enlaces del Resultado final son accesibles (foco visible, nombre del enlace, target _blank)?
4. ¿Estás de acuerdo con las decisiones de 1600 y 390 frente a Figma?

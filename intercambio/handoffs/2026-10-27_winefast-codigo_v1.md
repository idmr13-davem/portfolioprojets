# Handoff — Caso Winefast en la V3 Statement (v1)

## Contexto y alcance
David pidió implementar en la V3 (propuesta Statement) el caso Winefast diseñado en Figma (sección "Craft visual 2", 5280:90729: frames 1600 5280:91515, 1280 5310:12401, 768 5310:12524, 390 5310:12647), después de corregir él mismo la introducción y eliminar el resultado final. Reutiliza la plantilla de proyecto paralelo que otra sesión creó para Ropstar (`side: true`, `titleLines`, `lead`, `facts`, secciones `inline`). Sin commit.

## Cambios
- `v3/shared/content.js`: nuevo `cases.winefast` (título en dos líneas, lead, tres datos Focus/Scope/Platform, hero, sección `context` con dos párrafos y lista numerada de cinco capítulos, cinco secciones `inline` con 6/2/3/3/3 capturas y alt EN/ES, meta y card). Sin `final`. La entrada de la Home `site.craft[winefast]` gana `"case": "winefast"`, así que su botón lleva a `work/winefast.html`.
- `v3/statement/app.js`: `winefast` en la lista de casos de grilla; la sección `a-cs__final` solo se pinta si el caso tiene `final`.
- `v3/build-pages.mjs`: página `work/winefast.html` (solo statement); caché `?v=20261027-winefast` (antes `-ropstar`).
- `v3/statement/styles.css`: Winefast comparte la banda de hero de Ropstar/Menores/Registro/Switch (incluidas las alturas de Ropstar en tablet y mobile, que Figma repite: 356 y 256). Bloque final "Winefast side project": capturas 414×896 con radio L (32); desktop tres por fila de tres columnas en las columnas 4–12; tablet una por fila en las columnas 4–9; mobile 560 de alto centradas (regla de media mobile de David del 27-oct); filas a gutter.
- Assets nuevos sin versionar: `assets/Winefast/V3/case/` (hero 2560 y 1440, 17 capturas webp de 16–41 KB). Fuente: las imágenes de Figma, asignadas a cada capa por su tamaño en bytes (`intercambio/evidencia/2026-10-27_winefast-codigo/generate-assets.mjs`).

## Contenido
- EN: copiado de Figma. Excepción: el título del primer capítulo en Figma dice "Onboarding y registro" (en español dentro del frame en inglés); en EN uso "Onboarding and sign-up", como en la lista del contexto.
- ES: propuesto (Figma no tiene ES).
- Alt: escrito a partir de las capturas.

## Medidas (código vs Figma)
- 1280: hero 565/567, banda 600/600, contexto 498/499, onboarding 1451/1452, demás capítulos 802.5/803, navegación 259/260.
- 768: hero 512/514, banda 420/420, contexto 515/516, capítulos 4941/4944, 1761/1762, 2556/2558, navegación 179/179.
- 1600: hero 616/618, contexto 539/540. Capítulos +93 cada uno (1819 vs 1726, 1003.5 vs 910). El código usa tres columnas (362 de ancho); Figma usa 319 en todas las filas menos la segunda de onboarding, que mide 362, y 319 no cae en la grilla.
- 390: hero 578/583, contexto 625/627. Capítulos más altos (3627 vs 3528, etc.): el código usa 259×560 por la regla de media mobile; Figma usa 251×543.
- Sin overflow horizontal. Pixel-perfect (winefast EN/ES + ropstar, 1600–360): 0 altos. Los fuera de grilla de mobile son las capturas centradas de 259 (igual que Switch).
- Evidencia: `intercambio/evidencia/2026-10-27_winefast-codigo/` (measure.mjs, measure-en.txt, hero-*.png, context-*.png, pixel-perfect/report.md).

## Archivos a revisar
v3/shared/content.js (bloque `"winefast": {` y la entrada de `site.craft`), v3/statement/app.js (`casePage`), v3/statement/styles.css (las líneas con `winefast`), v3/build-pages.mjs. Copia previa: /private/tmp/claude-501/-Users-dave--claude-spares-spare-KCRqve/ddc09c22-d6f7-441b-b966-c4769dd8841f/scratchpad/antes-codex-winefast/ (tomada después de implementar; para revisar, usar `git diff` sobre las líneas `winefast` y los fragmentos citados aquí).

## Cómo verificar
Servidor en 127.0.0.1:3456. `node intercambio/evidencia/2026-10-27_winefast-codigo/measure.mjs [en|es]` y la auditoría pixel-perfect sobre `v3/statement/work/winefast.html`.

## Supuestos y limitaciones
- La plantilla y el CSS de Ropstar son de otra sesión; solo se ampliaron selectores para incluir Winefast. Ropstar en mobile sigue con capturas en las columnas 3–10 (233 de ancho), no 560 de alto; no se cambió porque es trabajo de esa sesión.
- Las traducciones ES y los textos alternativos son propuestas.

# Handoff — Home V3 Statement: Freelance and side projects + ajustes de grilla, color y espaciado (v1)

## Contexto y alcance
David pidió aplicar en la Home de la V3 (propuesta Statement, `v3/statement/`) los cambios de la sección Home de Figma (5065:518): la nueva sección "Freelance and side projects" (Ropstar y Winefast) y las modificaciones de grilla, colores y espaciados. Además, actualizar los tamaños de los assets mobile del caso 1 (Home mobile 5059:614: el video del caso mide 358×560).
Sin commit (David no lo pidió). Stage y Poster no cambian salvo por la versión de caché regenerada.

## Cambios
1. `v3/shared/content.js`: `site.craftTitle`, `site.craft[]` (ropstar, winefast: título, resumen, alt, 3 capturas), `site.craftCta`. EN copiado de Figma; ES propuesto (Figma no tiene ES): "Freelance y proyectos personales", "Diseño de UI para un marketplace de moda circular.", "Concepto de app Winefast", "Concepto de UI para descubrir y comprar vino.", "Ver propuesta".
2. `v3/statement/app.js`: sección `.a-craft` entre los casos y About; clase `a-case--<id>` en cada banda de caso. El botón "See proposal" lleva a `articles/page-under-work.html` porque no hay páginas de Ropstar ni Winefast; tiene un sufijo sr-only con el nombre del proyecto para distinguir los dos enlaces.
3. `v3/statement/styles.css`:
   - `--hero-top` (antes inline en `.a-hero`: `clamp(6rem, 15svh, 9rem)`, 14svh en mobile); Figma enlaza el padding de la lista de proyectos a la misma variable hero-top.
   - About y Blog pasan de columnas 3–10 a 2–11 en desktop (Figma 5280:92062/5280:92070); las filas del blog quedan 1/8/1 columnas.
   - Blog: fondo Background/Primary (antes Deep). Contacto sigue Deep.
   - Contacto: padding Hero (160) arriba y abajo en desktop, Mega (120) por debajo de 1024 (antes calc(section*.9)/section).
   - Mobile (Home): video de las cuatro bandas de caso a 560 de alto, Motion incluida (David lo pidió explícitamente aunque Figma Home todavía muestra 388 para Motion).
   - Switch: impacto sin tope de 28ch por debajo de 1024 (Figma 5223:11959 lo pone a todo el ancho).
   - Bloque `.a-craft*` al final: título en columnas 2–11 (12 bajo 1024), dos entradas de 6 columnas apiladas bajo 1024 con gap L; cada entrada centrada, gap L, padding XL; collage 579×500 intrínseco (excepción documentada en el componente de Figma) con las tres capturas superpuestas (lados al 40 %).
3b. Altura de media en mobile en todas las páginas V3 (pedido de David a mitad de tarea; Figma 5074:1002, 5083:1485, 5091:1498, 5203:74445): bloque final de `styles.css` (≤767). Registro ML (5 videos) y Motion Level (3 ejemplos + 2 de expresividad) a 358×560 con `contain` (antes 388 y 675); Menores y Switch muestran la grabación a 560 de alto y su ancho nativo (~251), centrada, con el botón de play en la esquina de la grabación (margin-right calculado con `cqw`). Se quitó la regla de 388 de Registro.
4. Assets nuevos (sin versionar, como el resto de assets V3 de Ropstar/Winefast): `assets/Ropstar/v3/home/{main,left,right}.webp`, `assets/Winefast/V3/home/{main,left,right}.webp`, generados con `generate-craft.mjs` (2x del tamaño mostrado).
5. Cache: `styles.css`, `app.js` y `content.js` → `?v=20261027-side-projects` en `v3/build-pages.mjs`; 27 páginas regeneradas.

## Archivos a revisar
- v3/statement/styles.css, v3/statement/app.js, v3/shared/content.js, v3/build-pages.mjs
- Copia previa para diff: /private/tmp/claude-501/-Users-dave--claude-spares-spare-KCRqve/ddc09c22-d6f7-441b-b966-c4769dd8841f/scratchpad/antes-codex-side/
- Evidencia: intercambio/evidencia/2026-10-27_home-side-projects/ (measure-before.txt, measure-after.txt, media-mobile.mjs, craft-*-{en,es}.png, case1-390.png, mobile-*.png, pixel-perfect/report.md, pixel-perfect-all/report.md)

## Medidas (código vs Figma)
- 1600: craft 1378 vs 1383; About 591 vs 592; Blog 690 vs 690; Contacto 537 vs 538.
- 1280: craft 1375 vs 1417 (Figma fija el marco de la lista en 1079; el contenido mide 120+798+120 = 1038 igual que el código); About 609 vs 614; Blog 583 vs 584; Contacto 519 vs 520.
- 768: craft 2069 vs 2069; About 640 vs 641; Contacto 421 vs 423; Switch copy 357 vs 357.
- 390: craft 1654 vs 1655; Contacto 494 vs 495; casos 1073/986/1130 vs 1071/984/1128.
- Sin overflow horizontal en ningún ancho.
- Pixel-perfect (1600–360, EN+ES): 0 altos. Medios intencionales: el collage centrado de 579 (intrínseco), el botón centrado, la diferencia de alto de Motion en mobile, el banner y el enlace del disclaimer del footer.

## Media mobile (390): código vs Figma
- Switch: bloques de comparación 1136 y variantes 1712, iguales; página 7608 vs 7614.
- Motion: ejemplos separados 651 (Figma 652), expresividad 592 cada uno; página 12680 vs 12751 (desfase previo de ~63 px arriba, anterior a este cambio).
- Registro: 10034 vs 9840; el quinto video (unificado) en Figma sigue en 388, el código usa 560 por la instrucción de David (inconsistencia de Figma).
- Menores: 8537 vs 8588; en Figma el primer marco Media mide 604 (560 + 44 sin contenido), los demás 560.
- Auditoría pixel-perfect de las 5 páginas a 1600/1280/768/390/360: 0 altos, sin overflow.
- Capturas: mobile-{home-motion,registro,motion,menores,switch}.png

## Diferencias conocidas
- Switch en la Home a 1280 y 390: Figma conserva el texto de impacto anterior ("Impacted the experience of 200k…"); el código usa la opción A que David aprobó ("Designed an experience with an estimated reach of 200k…"), una línea más larga. La entrada mobile de Figma además fija 1206 de alto con ~115 px vacíos al final.
- Collage: la sombra del de Winefast es 2px de desenfoque y la de Ropstar 5px, como en Figma.

## Cómo verificar
node server.js (127.0.0.1:3456) y:
node intercambio/evidencia/2026-10-27_home-side-projects/measure.mjs
node .claude/skills/pixel-perfect/scripts/audit.mjs http://127.0.0.1:3456/v3/statement/index.html --widths 1600,1280,768,390 --cols 12 --margin-var --margin --gutter-var --gutter --out /tmp/pp

## Supuestos y limitaciones
- El destino del botón es provisional (página en construcción) hasta que existan las páginas de Ropstar y Winefast.
- Las traducciones ES son propuestas.
- Otra sesión tocó app.js/styles.css antes (pantallas de estado, banner); no forman parte de este handoff.

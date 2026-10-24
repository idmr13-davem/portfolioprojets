# Handoff: pixel-perfect-statement-r2 v1

## Objetivo
Revisar la segunda tanda de ajustes en la propuesta V3 "Statement" (`v3/statement/`) y las ampliaciones de la skill **Pixel Perfect** (`.agents/skills/pixel-perfect/`), siguiendo el flujo de esa skill.

## Contexto y restricciones
- Branch local `exploration/v3-propuestas`. Sin commit, push ni despliegue.
- Leer `CLAUDE.md`, `AGENTS.md`, `docs/protocolo-de-revision.md`, `docs/decisiones.md` y la skill (`SKILL.md` y `references/checklist.md`).
- Ciclo anterior: `intercambio/revisiones/2026-10-23_pixel-perfect-statement_v{1,2,3}_revision.md`.
- Retícula: 12 columnas; `--margin` = `clamp(1rem, 2vw, 1.75rem)`; `--gutter` = `clamp(1rem, 2vw, 2rem)`.
- En tu sandbox `.agents/` es de solo lectura: propón ahí los parches con el diff exacto, sin escribirlos.
- Esta vez **sí hay cambios de tipografía, layout y estilo pedidos explícitamente por David**; están autorizados, no los reviertas. Revisa que estén bien ejecutados.

## Qué se hizo (todo pedido por David)
1. **"Montealegre" ajustado a la retícula en móvil** (decisión registrada en `docs/decisiones.md`): `.a-hero { container-type: inline-size }` y `.a-hero__name { font-size: calc(100cqw / 5.6492) }`, donde 5,6492 em es el ancho de tinta medido con `measureText` (Inter 700, tracking −0,05 em). Fallback `16.4vw`. Entre 320 y 767 px el último trazo termina a ≤0,05 px del margen derecho.
2. **Titulares de estado**: vuelven a 17 vw; en móvil, `app.js` los reduce solo si su línea más larga no cabe en la caja de contenido del padre. Se ejecuta tras `document.fonts.ready` y en `resize`.
3. **Eliminados**: la vista previa al pasar el cursor por las filas, la sección de la carrera (registro anterior vs actual) y las filas de la lista de casos. Queda el título "Casos de estudio" (columnas 1–8) sobre las bandas de casos.
4. **Jerarquía en las bandas de casos**: título `h3` en `clamp(2rem, 3.2vw, 3rem)` Bold; frase de resultado en `--step-lead`, peso `--body-l-font-weight` (300). A 1440 px: 46 px/700, 29 px/300, descripción 19 px/300 y rol 14 px muted.
5. **Misma diagramación en los tres casos**: video en columnas 1–7 en un contenedor 4:3, texto en 9–12; en tablet y móvil se apilan. Se eliminaron las variantes `.a-case--1` y `.a-case--2`.
6. **Contenedor del video al estilo de la referencia Floria** (https://floria-landing-page.vercel.app/):
   - Radio `--radius-xl` (40 px).
   - Fondo `radial-gradient` desde `--surface-accent` al 22 % sobre `--surface-main`, hacia `--background-deep`.
   - Velo inferior (`::after`) en degradado, con opacidad 0,8 → 1 en hover.
   - Anillo interior de 1 px al 10 % (`::before`).
   - Zoom del video `scale(1.1)` en 1000 ms en hover.
   - `mix-blend-mode: lighten` en el video, porque los pósters traen incorporado el fondo oscuro de la V2.
   - Reduced motion quita la transición.
7. **Ajustes menores**: el valor de las filas del blog puede hacer salto de línea en móvil (desbordaba a 320 px en ES). Cache busting `?v=20261023-grid-v10` en `styles.css` y `app.js`.
8. **Skill Pixel Perfect**:
   - `references/checklist.md` nuevo, con los tipos de ajuste que pidió David.
   - `SKILL.md` lo enlaza y pide auditar también en `?lang=es`.
   - `audit.mjs` suma `competing-hierarchy` (un encabezado y el texto siguiente con ratio < 1,25, mismo peso y color) e `inconsistent-repeat` (instancias con medios de una misma clase BEM con distinto ancho, alto o borde izquierdo).
   - Prueba sobre la versión anterior de Statement (commit `b57dd55`): detecta título y frase compitiendo (ratio 1,07) y las tres bandas con diagramación distinta.

## Archivos a revisar
- `v3/statement/styles.css` (al final: "case bands share one layout", "Case media in the manner of the Floria reference", `.a-case h3` / `.a-case__impact` y el bloque móvil del hero)
- `v3/statement/app.js` (sección de casos, `fitStatus`)
- `v3/build-pages.mjs`
- `.agents/skills/pixel-perfect/SKILL.md`, `references/checklist.md`, `scripts/audit.mjs`
- `docs/decisiones.md`
- Evidencia: `.pixel-perfect/final4/` (12 páginas EN/ES × 1500/1440/1024/767/414/390/360/320 = 96 combinaciones: **0 altos, 0 medios, 51 `inset` bajos**), `.pixel-perfect/selftest-old/` (prueba de los chequeos nuevos sobre la versión anterior), `.pixel-perfect/selftest/` (Stage y Poster)

## Cómo verificar
1. `node --check` de `audit.mjs`, `v3/statement/app.js` y `v3/build-pages.mjs`.
2. Si el sandbox lo permite: `node server.js` y `node .agents/skills/pixel-perfect/scripts/audit.mjs http://127.0.0.1:3456/v3/statement/index.html "http://127.0.0.1:3456/v3/statement/index.html?lang=es" --widths 1440,767,390,320 --out .pixel-perfect/codex-r2`. Si no: usar `report.json` y las capturas, y calcular desde el CSS.
3. Comprobar `calc(100cqw / 5.6492)` contra la caja de contenido del hero: 100cqw = viewport − 2 × margen.
4. Revisar los chequeos nuevos: falsos positivos (párrafos consecutivos del mismo nivel, componentes que alternan a propósito) y falsos negativos (encabezado seguido de un `div`, componentes sin medios).
5. Revisar accesibilidad del degradado: contraste del botón "Pausar" sobre el velo, `pointer-events` de los pseudoelementos y reduced motion.

## Supuestos y limitaciones
- Chrome sin interfaz no compone el video con `mix-blend-mode` en las capturas; en el navegador real del panel sí se ve el degradado (verificado a 374 px).
- La duración del zoom (1000 ms) supera los 500 ms del proyecto; David autorizó mantener duraciones mayores en la exploración V3 (`docs/decisiones.md`).
- Taste Skill prohíbe degradados; el pedido explícito de David prevalece.
- El factor 5,6492 depende de la fuente Inter cargada; con la fuente de respaldo la palabra sería algo más estrecha (no desborda).

## Preguntas para el revisor
1. ¿Hay algo de Statement fuera de retícula o inconsistente tras eliminar la lista y unificar las bandas, sobre todo a 768–1023 px?
2. ¿La implementación del degradado tiene problemas de contraste, apilamiento o interacción?
3. ¿Los chequeos nuevos del script y la lista de chequeo son correctos y generalizables?

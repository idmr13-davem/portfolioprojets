# Handoff: pixel-perfect-statement v1

## Objetivo
1. Revisar la nueva skill **Pixel Perfect** (`.agents/skills/pixel-perfect/`; enlazada en `.claude/skills/pixel-perfect`): instrucciones y script de medición contra la retícula de 12 columnas.
2. Revisar los ajustes de alineación que la skill aplicó a toda la propuesta V3 "Statement" (`v3/statement/`) y encontrar los micro desajustes que la medición no detecte.

Pedido de David: revisar absolutamente todas las alineaciones y todo lo que se vea fuera de guía o que no respete la grilla de 12 columnas, en todo el sitio, y ajustar los micro detalles.

## Contexto y restricciones
- Branch local `exploration/v3-propuestas`. Sin commit, push ni despliegue.
- Leer `CLAUDE.md`, `AGENTS.md`, `docs/v3-propuestas.md` y `docs/protocolo-de-revision.md`.
- Retícula de Statement: 12 columnas; margen `--margin` = `clamp(1rem, 2vw, 1.75rem)`; gutter `--gutter` = `clamp(1rem, 2vw, 2rem)` (en `v3/shared/base.css`). A 1440 px: margen 28 px, gutter 28,8 px, columna 88,9 px.
- No cambiar copy, colores, tamaños tipográficos ni duraciones de motion: el ajuste es solo de alineación.
- `v3/shared/site.js` y `base.css` son compartidos con `v3/stage/` y `v3/poster/`; cualquier cambio ahí no debe moverlos.

## Qué se hizo
**Skill**: `SKILL.md` (flujo: conocer la retícula → medir → juzgar con overlay → corregir con la retícula → verificar → Codex) y `scripts/audit.mjs` (Chrome headless vía el cliente CDP de taste-skill; mide cada bloque visible contra inicios/finales de columna; reporta `overflow`, `page-overflow`, `clipped`, `off-grid`, `near-miss`, `inset`; respeta `[data-grid-ignore]`; escribe `report.md`, `report.json` y capturas con columnas superpuestas).

**Ajustes en Statement** (`v3/statement/styles.css`, `app.js`):
- Lista de casos, blog y contacto: de `margin-left: 22vw` a la retícula (columna 4); la vista previa del ledger pasa a columnas 10–12.
- Filas internas con `subgrid`: ledger (nombre/rol/periodo, 2 columnas cada uno), blog (miniatura 1 columna, texto, valor al cierre), filas de contacto (etiqueta 2, valor 4).
- Panel de la carrera: relleno horizontal de una columna + gutter; etiqueta, barra y tiempo en 2/7/1 columnas.
- Cifras 10/5/1 sobre la misma retícula de 12; retrato en columnas 1–4 alineado con el "10"; lista alineada con el "5" (ajuste pedido antes por David).
- Videos del hero de Motion Level: 4 columnas cada uno, sin relleno lateral arbitrario.
- About: `column-gap` = gutter (las dos columnas de texto caen en las columnas 1 y 7).
- Enlaces del footer en móvil: dos columnas alineadas a las columnas 1 y 7.
- Máscaras de los titulares gigantes: `padding-bottom` de 0,24 em para no cortar descendentes (la "g").
- Excepciones intencionales marcadas con `data-grid-ignore`: grupo de navegación (alineado por su borde derecho), botón de reproducir superpuesto a los videos, flecha dentro del campo de contacto y nombre gigante del footer (recorte deliberado).
- También en este estado: logo productivo en el header (`assets/Home/v2/header-logo.svg`, 59×52).

**Resultado de la medición** (8 páginas × 1440/1024/768/390):
- Antes: unos 300 hallazgos (incluye 1 desborde de página de 54 px a 1024 y recortes de texto en todas las páginas): `.pixel-perfect/before/report.md`.
- Después: 0 altos, 0 medios; quedan solo `inset` (texto con relleno dentro de tarjetas o paneles con fondo: pasos de Menores, eje de Motion Level, nota de la carrera): `.pixel-perfect/after/report.md`.
- QA funcional de las tres propuestas a 1440 y 390 px sin desbordes, imágenes rotas ni errores; inspector de taste-skill con 0 FAIL en Home y caso.

## Archivos a revisar
- `.agents/skills/pixel-perfect/SKILL.md`
- `.agents/skills/pixel-perfect/scripts/audit.mjs`
- `v3/statement/styles.css` (sobre todo el bloque final "Pixel Perfect" y las reglas de `.a-work`, `.a-blog`, `.a-contact`, `.a-facts`, `.a-race`, `.a-cs__heroset`)
- `v3/statement/app.js` (atributos `data-grid-ignore`, logo, vista previa del ledger)
- `v3/shared/site.js` (solo el `data-grid-ignore` del botón de reproducir)
- Evidencia: `.pixel-perfect/before/` y `.pixel-perfect/after/` (`report.md`, `report.json` y capturas `v3-statement-*-<ancho>.jpg` con la retícula superpuesta)

## Cómo verificar
1. Si el sandbox lo permite: `node server.js` en segundo plano y `node .agents/skills/pixel-perfect/scripts/audit.mjs http://127.0.0.1:3456/v3/statement/index.html --out .pixel-perfect/codex`.
2. Si no puede abrir Chrome ni el servidor: revisar las capturas con retícula de `.pixel-perfect/after/` y `report.json`, y calcular las posiciones desde el CSS (12 columnas, valores de margen/gutter arriba).
3. Revisar el script: lógica de líneas de columna, heurística de `inset`, detección de `near-miss` y de `clipped`, y que `data-grid-ignore` se respete en todos los chequeos.
4. `node --check .agents/skills/pixel-perfect/scripts/audit.mjs v3/statement/app.js v3/shared/site.js`.

## Supuestos y limitaciones
- El script mide cajas, no ópticas: tipografía muy grande (overshoot de redondas), sujeto de una foto descentrado o iconos centrados por caja no se miden.
- `subgrid` requiere navegadores de 2023 en adelante (Chrome 117+, Safari 16+, Firefox 71+).
- Los videos se muestran con `object-fit: contain`: la caja está en la retícula, pero el teléfono dentro queda centrado.
- En móvil las columnas miden 15 px; las filas se simplifican a una o dos columnas apiladas.
- Los `inset` restantes se dejan a propósito (relleno interno de componentes).

## Preguntas para el revisor
1. ¿Queda algún bloque de Statement que no caiga en líneas de columna y que no sea una excepción defendible?
2. ¿Las reglas de `subgrid` y sus overrides en tablet y móvil producen alineaciones correctas a 768–1023 px?
3. ¿El script tiene falsos negativos importantes o heurísticas que convenga corregir para que la skill sirva en otras páginas del portafolio?

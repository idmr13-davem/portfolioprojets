# Handoff: pixel-perfect-statement v2

## Objetivo
Segunda iteración de la revisión de la skill **Pixel Perfect** y de los ajustes de alineación en `v3/statement/`. Mismo objetivo y restricciones que `intercambio/handoffs/2026-10-23_pixel-perfect-statement_v1.md` (solo alineación: sin cambios de copy, color, tipografía ni motion; sin commit, push ni despliegue).

## Contexto y restricciones
Ver v1. Revisión anterior: `intercambio/revisiones/2026-10-23_pixel-perfect-statement_v1_revision.md` (veredicto: Requiere cambios).

## Qué se hizo
**Script `.agents/skills/pixel-perfect/scripts/audit.mjs`**:
- Mide también `dt`, `dd`, `li`, `figcaption`, `output`, `canvas`, `iframe` y los `span` que son ítems de grid (los inline se descartan). La sangría normal de una lista no se reporta.
- Un medio más ancho que una columna debe ocupar columnas completas (ambos bordes); el texto sigue aceptando un borde. El centrado solo se acepta para texto.
- `inset` solo si el elemento cae exactamente en el borde de padding de un ancestro que esté en la retícula; el detalle reporta el padding. Si no, queda como `off-grid` medio.
- `overflow` revisa ambos bordes del viewport.
- `clipped` revisa los cuatro lados en todos los ancestros con overflow oculto y mide la tinta real con `measureText` (`actualBoundingBoxAscent/Descent`), en lugar del 0,06 em estimado. Corrige el falso positivo de "40 px cortados arriba" con interlineados menores a 1.
- `near-miss` agrupa por sección; compara bordes izquierdos de todo y bordes derechos solo de medios y cajas (el texto tiene borde derecho irregular).

**`SKILL.md`**: tabla de hallazgos actualizada, elementos internos, estados que hay que abrir a mano (menú, preview, diálogos, ES, 1280/≥1500/360) y referencia a `anthropic-skills:revision-con-codex` con alternativa manual (protocolo, plantillas y `codex exec -s workspace-write`).

**`v3/statement/styles.css` / `app.js`**:
- Cuerpo de los artículos en columnas 4–9 (2–11 en tablet, ancho completo en móvil).
- Pie de la carrera en el mismo subgrid: botón bajo la etiqueta (columnas 2–3) y nota bajo la barra.
- Eje de Motion Level: `column-gap` = gutter, así su segunda columna coincide con la columna 10 de los videos pareados.
- Hero en móvil: 16,4 vw (17 vw desbordaba 1 px a 360).
- Fila legal del footer en la retícula: copyright en la columna 1 y crédito en la columna 10, bajo los enlaces.
- Etiquetas del artículo marcadas `data-grid-ignore` (grupo de chips que fluye).
- Se mantiene tu corrección de los metadatos de los casos (columnas 1/5/9) y el cache busting.

**Medición** (8 páginas × 1500/1440/1280/1024/768/390/360 = 56 combinaciones, script v2): **0 altos, 0 medios, 51 `inset` bajos**, todos en el borde de padding de tarjetas o paneles alineados. Informe: `.pixel-perfect/v2/report.md`; capturas con retícula en `.pixel-perfect/v2/`. QA funcional de las tres propuestas a 1440 y 390 px sin desbordes, imágenes rotas ni errores.

## Archivos a revisar
- `.agents/skills/pixel-perfect/scripts/audit.mjs`
- `.agents/skills/pixel-perfect/SKILL.md`
- `v3/statement/styles.css` (bloques finales "Pixel Perfect", "Race foot", "Motion Level axis", "Footer legal row" y `.a-ar__body`)
- `v3/statement/app.js`
- Evidencia: `.pixel-perfect/v2/`

## Cómo verificar
1. `node --check .agents/skills/pixel-perfect/scripts/audit.mjs`.
2. Si el sandbox lo permite: servidor y auditoría como en v1. Si no: revisar `.pixel-perfect/v2/report.json` y las capturas `v3-statement-*-{1500,1440,1280,1024,768,390,360}.jpg`, y calcular desde el CSS.
3. Comprobar en el script que `data-grid-ignore` / `--ignore` se respetan en alineación, near-miss, clipping y overlay.
4. Comprobar que `.a-ar__body` usa porcentajes contra el ancho de `main` (bloque sin padding) y que coincide con las columnas indicadas.

## Supuestos y limitaciones
- `measureText` usa la métrica del texto completo del elemento para todas sus líneas; es exacto para titulares de una palabra por línea y conservador para párrafos.
- Los estados interactivos (menú abierto, preview del ledger) siguen fuera de la medición automática: la skill indica revisarlos a mano.
- La 404 y en construcción comparten el hero; sus titulares se miden igual.

## Respuesta a la revisión anterior
| Hallazgo | Decisión | Motivo / evidencia |
|---|---|---|
| 1 Metadatos de los casos | Aceptado | Tu corrección se mantiene; el script nuevo mide `dt`/`dd` y ya no lo reportaría como alineado. |
| 2 Cobertura insuficiente | Aceptado | Selector ampliado con elementos internos; sangría de listas filtrada para no generar ruido. |
| 3 Un solo borde basta | Aceptado con cambios | Los medios más anchos que una columna exigen ambos bordes; el texto conserva un borde (alineación por bandera); el centrado solo para texto. |
| 4 `inset` demasiado amplio | Aceptado | Ahora exige coincidir con el borde de padding de un ancestro alineado y reporta el padding. |
| 5 Desbordes y recortes parciales | Aceptado | Ambos bordes del viewport; recorte en cuatro lados y todos los ancestros; tinta medida con `measureText`. |
| 6 Near-miss sin contexto | Aceptado con cambios | Agrupado por sección; bordes derechos solo para medios y cajas, porque el texto tiene borde derecho irregular y generaba falsos positivos. |
| 7a Cuerpo del artículo a 2,8 px de la columna 4 | Aceptado | Ahora ocupa exactamente las columnas 4–9. |
| 7b Referencia a `revision-con-codex` | Aceptado | La skill existe en esta sesión como `anthropic-skills:revision-con-codex`; se dejó ese nombre y la alternativa manual. |

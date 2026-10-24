# Revisión: pixel-perfect-statement-r2 v1

## Veredicto

Requiere cambios

## Resumen

La ejecución de los cambios autorizados en Statement está respaldada por el CSS, los cálculos y las capturas disponibles. No encontré una desviación adicional de retícula suficientemente demostrada para corregirla. Se conservan la tipografía solicitada, la eliminación de secciones, las bandas unificadas, el degradado y el zoom de 1000 ms autorizado para V3.

Apliqué dos correcciones acotadas: completar reduced motion para el velo y evitar que cada cambio de idioma acumule otro listener de resize. Actualicé las referencias de caché de los ocho HTML de Statement. Quedan propuestas las correcciones del auditor y la sincronización del generador, fuera del directorio autorizado para cambios directos. El veredicto corresponde al conjunto del handoff, incluida la skill; no exige revertir la dirección visual.

Esta es la primera revisión de la segunda tanda, distinta del ciclo anterior de tres iteraciones. Solo modifiqué `v3/statement/` y este archivo de revisión. `.agents/` permanece intacto. No modifiqué producción ni las cinco eliminaciones de imágenes preexistentes. Sin commit, push ni despliegue.

## Hallazgos

| # | Severidad (crítica/alta/media/baja) | Archivo:línea | Hallazgo | Evidencia | Recomendación |
|---|---|---|---|---|---|
| 1 | media | `.agents/skills/pixel-perfect/scripts/audit.mjs:192` y `:197` | **Pendiente:** `competing-hierarchy` confunde niveles equivalentes y pesos distintos. | La función real extraída marca dos `h3` consecutivos de 32 px/700 y también `h3`/`p` de 32 px con pesos 400/300. `<200` no significa «mismo peso». Dos párrafos consecutivos no generan señal. Un `h3` seguido de `div` queda fuera del chequeo, aunque visualmente compitan. | Restringir la señal automática al encabezado seguido de párrafo/cita y peso computado idéntico; documentar wrappers como revisión manual. Parche exacto abajo. |
| 2 | media | `.agents/skills/pixel-perfect/scripts/audit.mjs:203–219`; `.agents/skills/pixel-perfect/references/checklist.md:15` | **Pendiente:** compartir clase BEM no demuestra que deban coincidir posición y dimensiones. | Dos tarjetas hermanas en una fila, con medios iguales en X=28 y X=500, producen `inconsistent-repeat`. Las mismas cajas sin medios no se examinan. El selftest de Poster contiene una señal sobre sus tres figuras variables; detectarla no demuestra que sea un defecto. | Mantenerlo como heurística, excluir filas hermanas del supuesto de borde izquierdo común, añadir agrupación explícita para cajas sin medios y una excepción específica para alternancias intencionales. El parche propuesto no convierte la heurística en una certificación universal. |
| 3 | baja | `v3/statement/styles.css:374` | **Corregido:** reduced motion omitía la transición del velo. | La regla anterior anulaba solo la transición del video; `::after` conservaba 500 ms de opacidad en `:hover` (`:365`, `:371`). | Se añadió el pseudoelemento a la regla de reduced motion. Se mantiene el estado visual pedido y la duración normal autorizada. |
| 4 | baja | `v3/statement/app.js:212`, `:241` | **Corregido:** cada render de idioma registraba otro listener global de resize. | `V3.onRender` vuelve a ejecutar `wire`; cada closure anterior retenía su titular desconectado. El registro previo agregaba un listener por render. Fixture con tres renders: después de la corrección queda uno; se conserva el ajuste y el restablecimiento desktop. | Se retira el listener anterior antes de registrar el actual y se descarta el callback de fuentes si su titular ya está desconectado. |
| 5 | baja | `v3/build-pages.mjs:52`, `:59` | **Propuesta pendiente:** el generador conserva la versión de caché anterior a las correcciones de esta revisión. | Los ocho HTML de Statement usan ahora `20261024-grid-r2-review`; el generador sigue emitiendo `20261023-grid-v10`. La comparación interceptada de sus 24 salidas muestra exclusivamente esas ocho diferencias de caché. | Aplicar las dos sustituciones propuestas abajo antes de regenerar. No edité el generador porque el permiso de corrección directa se limita a `v3/statement/`. |

Parches exactos **propuestos, no aplicados**. Los cambios en `.agents/` deben incorporarse fuera de esta revisión de solo lectura. La excepción de repetición afecta únicamente ese chequeo; overflow y clipping siguen activos. Los wrappers tipográficos y las alturas dependientes del contenido requieren juicio manual.

```diff
--- a/.agents/skills/pixel-perfect/scripts/audit.mjs
+++ b/.agents/skills/pixel-perfect/scripts/audit.mjs
@@ -189,27 +189,32 @@
   for (const el of document.querySelectorAll(textSel)) {
     const next = el.nextElementSibling;
     if (!next || !next.matches(textSel) || !visible(el) || !visible(next) || excluded(el) || excluded(next)) continue;
-    if (!/^H[1-6]$/.test(el.tagName) && !/^H[1-6]$/.test(next.tagName)) continue;
+    if (!/^H[1-6]$/.test(el.tagName) || !next.matches('p,blockquote')) continue;
     const a = getComputedStyle(el), b = getComputedStyle(next);
     const fa = parseFloat(a.fontSize), fb = parseFloat(b.fontSize);
     if (Math.max(fa, fb) < 20) continue;
     const ratio = Math.max(fa, fb) / Math.min(fa, fb);
-    const sameWeight = Math.abs(parseFloat(a.fontWeight) - parseFloat(b.fontWeight)) < 200;
+    const sameWeight = a.fontWeight === b.fontWeight;
     if (ratio < 1.25 && sameWeight && a.color === b.color) findings.push({ kind: 'competing-hierarchy', severity: 'medium', el: path(next), top: Math.round(next.getBoundingClientRect().top + scrollY), detail: `${el.tagName.toLowerCase()} ${fa}px/${a.fontWeight} and ${next.tagName.toLowerCase()} ${fb}px/${b.fontWeight} (ratio ${ratio.toFixed(2)}, same colour): two levels that compete` });
   }
   // Inconsistent repeats: instances of the same component (same BEM element class) that should share one
   // layout but differ in size or in the columns they occupy (e.g. case bands alternating sides or ratios).
   const groups = new Map();
-  for (const el of document.querySelectorAll('[class*="__"]')) {
-    if (!visible(el) || excluded(el)) continue;
-    const cls = [...el.classList].find(c => c.includes('__'));
-    const isBox = el.matches(mediaSel) || el.querySelector(mediaSel);
+  for (const el of document.querySelectorAll('[class*="__"], [data-grid-repeat]')) {
+    if (!visible(el) || excluded(el) || el.closest('[data-grid-repeat-ignore]')) continue;
+    const explicit = el.getAttribute('data-grid-repeat');
+    const cls = explicit || [...el.classList].find(c => c.includes('__') && !c.includes('--'));
+    const isBox = explicit || el.matches(mediaSel) || el.querySelector(mediaSel);
     if (!cls || !isBox) continue;
     if (!groups.has(cls)) groups.set(cls, []);
     groups.get(cls).push(el);
   }
   for (const [cls, list] of groups) {
     if (list.length < 2) continue;
+    // Sibling cards in one row legitimately occupy different columns. Explicit groups override this.
+    const explicit = list.every(e => e.getAttribute('data-grid-repeat'));
+    if (!explicit && list.every(e => e.parentElement === list[0].parentElement &&
+      Math.abs(e.getBoundingClientRect().top - list[0].getBoundingClientRect().top) <= tol)) continue;
     const rects = list.map(e => e.getBoundingClientRect());
     const span = k => Math.max(...rects.map(r => r[k])) - Math.min(...rects.map(r => r[k]));
     const issues = [];
--- a/.agents/skills/pixel-perfect/SKILL.md
+++ b/.agents/skills/pixel-perfect/SKILL.md
@@ -35,8 +35,8 @@
 | `clipped` | large text cut on any side by an ancestor with `overflow: hidden` (descenders, accents, long words) | high |
 | `off-grid` | text, lists or buttons with neither edge on a column line (and not centred or full-bleed), or a field, form, container or media wider than a column that does not fill whole columns; centring only excuses text | medium |
 | `near-miss` | two left or right edges 2–8px apart inside the same section: almost always meant to be one line | medium |
-| `competing-hierarchy` | a heading and the text right after it at nearly the same size (ratio under 1.25), weight and colour | medium |
-| `inconsistent-repeat` | instances of the same component with media (same BEM element class) that differ in width, height or left edge | medium |
+| `competing-hierarchy` | a heading immediately followed by a sibling p/blockquote at nearly the same size (ratio under 1.25), identical computed weight and colour; wrappers require manual review | medium |
+| `inconsistent-repeat` | heuristic candidates with the same BEM element class and media, excluding sibling cards in one row; data-grid-repeat="name" explicitly groups boxes even without media; data-grid-repeat-ignore exempts only this check | medium |
 | `inset` | sits on a positive padding edge of a containing ancestor whose same side is on the grid (card or panel padding); non-text boxes wider than a column must be inset on both sides | low |
 
 Inner layout parts are measured too (`dt`/`dd`, captions, list items, grid-item spans), because a container can sit on the grid while its fields do not. Ordinary list indentation is not reported. The clipping check estimates ink with canvas text metrics (glyph ascent/descent of the element's text in its font) rather than the font's content box: a good estimate for display lines, not an exact outline for mixed-style paragraphs. Confirm any clipping finding in the overlay before changing masks or type.
--- a/.agents/skills/pixel-perfect/references/checklist.md
+++ b/.agents/skills/pixel-perfect/references/checklist.md
@@ -12,11 +12,11 @@
 
 ## Consistency
 
-- **Repeated components share one layout.** Items of the same kind (case bands, cards, article rows) keep the same composition: same side for the media, same container size and ratio, same columns for the copy. Alternating or one-off variants need an explicit reason. **(script: inconsistent-repeat)**
+- **Repeated components share one layout.** Items of the same kind (case bands, cards, article rows) keep the same composition: same side for the media, same container size and ratio, same columns for the copy. Alternating or one-off variants need an explicit reason. **(script: inconsistent-repeat, heuristic only)** Use `data-grid-repeat="name"` for boxes expected to share dimensions and left edge, including boxes without media. Use `data-grid-repeat-ignore` for intentional variation without suppressing overflow or clipping checks. Review variable-content heights manually.
 
 ## Hierarchy
 
-- **A title and the text after it never compete.** When a heading and a highlighted statement have the same size, weight and colour, give each its own level: the title leads (bold, larger) and the statement supports it (lighter weight, lead size). Keep the order title → statement → body → metadata. **(script: competing-hierarchy)**
+- **A title and the text after it never compete.** When a heading and a highlighted statement have the same size, weight and colour, give each its own level: the title leads (bold, larger) and the statement supports it (lighter weight, lead size). Keep the order title → statement → body → metadata. **(script: competing-hierarchy for a heading immediately followed by a sibling p/blockquote with identical computed weight)** Wrappers and mixed typography need manual review; paragraphs and headings at the same level are not competing levels by themselves.
 
 ## Behaviour and content
 
--- a/v3/build-pages.mjs
+++ b/v3/build-pages.mjs
@@ -49,14 +49,14 @@
 ${p.fonts}
 <script>document.documentElement.classList.add('js')</script>
 ${p.tokens ? `<link rel="stylesheet" href="${root}css/tokens/figma.css">\n` : ''}<link rel="stylesheet" href="${base}../shared/base.css">
-<link rel="stylesheet" href="${base}styles.css${name === 'statement' ? '?v=20261023-grid-v10' : ''}">
+<link rel="stylesheet" href="${base}styles.css${name === 'statement' ? '?v=20261024-grid-r2-review' : ''}">
 </head>
 <body class="v3-${name}" data-page="${page.page}"${page.id ? ` data-id="${page.id}"` : ''}>
 <div id="app"></div>
 <noscript><p style="padding:24px">This exploration renders with JavaScript. <a href="${root}index.html">Open the published portfolio</a>.</p></noscript>
 <script src="${base}../shared/content.js"></script>
 <script src="${base}../shared/site.js"></script>
-<script src="${base}app.js${name === 'statement' ? '?v=20261023-grid-v10' : ''}"></script>
+<script src="${base}app.js${name === 'statement' ? '?v=20261024-grid-r2-review' : ''}"></script>
 </body>
 </html>
 `;
```

## Correcciones aplicadas directamente por Codex

| # | Archivo | Cambio | Motivo |
|---|---|---|---|
| 1 | `v3/statement/styles.css:374` | `transition: none` también en `.a-case__media::after` con reduced motion. | Completar la excepción para el efecto nuevo. |
| 2 | `v3/statement/app.js:212`, `:241` | Un único listener de resize vigente; callback de fuentes condicionado a `big.isConnected`. | Evitar retención y mediciones de titulares de renders anteriores. |
| 3 | Los ocho HTML bajo `v3/statement/` | CSS y app pasan a `?v=20261024-grid-r2-review`. | Evitar servir versiones anteriores de los archivos corregidos. El parche del generador queda propuesto por alcance. |

## Verificación ejecutada

- Leídos `AGENTS.md`, `CLAUDE.md`, protocolo, plantilla, handoff R2, decisiones, skill Pixel Perfect, checklist, auditor, las tres revisiones anteriores, documentación V3, CSS/app, generador y base/runtime/tokens compartidos. Rama comprobada: `exploration/v3-propuestas`.
- `node server.js` falla con **listen EPERM 127.0.0.1:3456**. El comando de auditoría del handoff, con Home EN/ES a 1440/767/390/320 y salida temporal `/tmp/pixel-perfect-codex-r2`, falla con **Chrome exited early, code null**. No se obtuvieron nuevas mediciones ni capturas. Los fallos no equivalen a cero hallazgos.
- Recontado `.pixel-perfect/final4/report.json`: **96 combinaciones = 12 URLs × 8 anchos**, no doce páginas distintas en ambos idiomas. Son ocho rutas EN y cuatro ES (Home, Menores, en construcción y 404). Anchos: **1500/1440/1024/767/414/390/360/320**. Resultado existente: **0 altos / 0 medios / 51 bajos**, todos `inset`; sus 96 capturas existen. Los bajos corresponden a 48 rellenos de pasos de Menores y tres del eje de Motion, coherentes con el CSS. No se modificaron esos informes.
- `.pixel-perfect/selftest-old/report.json`: una ejecución a 1440, **cinco medios**, tres jerarquías de ratio 1,07 y dos señales de bandas desiguales. Respalda que los nuevos chequeos detectaron el patrón anterior. `.pixel-perfect/selftest/report.json`: Stage/Poster a 1440, **3 altos / 31 medios / 42 bajos**; una sola señal es `inconsistent-repeat`, en Poster. No son pruebas de ausencia de falsos positivos ni se atribuyen sus otros hallazgos a Statement.
- Inspeccionadas seis capturas existentes: Home EN a 1024 y 767, Home ES a 320, en construcción ES a 390, Motion EN a 1024 y Menores ES a 767. Revisados además dos recortes a resolución original: bandas de Home a 767 y bloque de Menores/About de Home ES a 320. Las vistas completas largas están reducidas; no permiten certificar cada glifo. No se inspeccionaron visualmente las otras 90 capturas.
- Geometría calculada con raíz de 16 px: `M=clamp(16, .02W, 28)`, `G=clamp(16, .02W, 32)`, `C=(W−2M−11G)/12`. En desktop el medio ocupa `7C+6G` desde X=M y el texto empieza en `M+8(C+G)`, columnas 9–12. Hasta 1023 ambos ocupan la única pista disponible y filas automáticas; no quedan asignaciones a columnas 9 que creen pistas implícitas.

| Viewport | M | Ancho del medio | X del texto |
|---|---:|---:|---:|
| 320 | 16 | 288 | 16 |
| 767 | 16 | 735 | 16 |
| 768 | 16 | 736 | 16 |
| 800 | 16 | 768 | 16 |
| 1023 | 20,46 | 982,08 | 20,46 |
| 1024 | 20,48 | 564,907 | 689,493 |
| 1440 | 28 | 795,333 | 969,867 |
| 1500 | 28 | 829,833 | 1010,667 |

- La franja **768–1023 no está medida en final4**; se verificó por cascada y cálculo. Las tres bandas usan el mismo marcado, contenedor 4:3 y reglas sin variantes. El título de casos ocupa columnas 1–8 en desktop y todo el ancho hasta 1023. Confirmada la eliminación del preview, carrera e índice de casos; el valor del blog permite salto móvil. A 1440: título **46,08 px/700**, resultado **29,12 px/300**, descripción **19 px/300**, rol **14 px** muted.
- Hero móvil: el contenedor de consulta es `.a-hero`, cuyo contenido mide `W−2M`; tamaños resultantes de dividir por **5,6492**: **50,9807 / 58,0613 / 63,3718 / 67,6202 / 130,1069 px** a **320/360/390/414/767**. La fórmula respeta la decisión registrada. No se reprodujo independientemente el contorno de Inter ni la tolerancia óptica de ≤0,05 px declarada por el autor; el cálculo usa ese factor medido como premisa.
- `fitStatus` conserva 17vw cuando cabe, calcula la caja del padre descontando padding, espera fuentes y se reajusta en resize. Fixture sobre su código real: ancho de línea 400 y espacio 328 reducen 61,2 a **50,184 px**; al pasar a desktop se elimina el tamaño inline. Tres llamadas de `wire` conservan **un listener** tras la corrección. Estos fixtures simulan DOM y métricas; no sustituyen medición tipográfica en navegador.
- Degradado e interacción, por código: radio token **40 px**; `isolation:isolate`; video con `lighten`; velo en z=1 y anillo en z=2, ambos con `pointer-events:none`; botón posicionado en z=3. El botón tiene fondo opaco `--background-primary` (#171B1F) y texto #FAFAFA: contraste calculado **16,59:1**, independiente del velo. No encontré un conflicto de apilamiento o bloqueo del clic en esas reglas. La composición real del video, hover, foco y menú abierto siguen pendientes de navegador; el problema conocido de capturas headless con blend no demuestra por sí mismo cómo se ve el efecto en todos los navegadores.
- Fixtures temporales en `/tmp/codex-r2-checks.cjs`: ejecutadas las secciones reales de jerarquía/repetición con DOM sintético. Reproducidos los falsos positivos y negativos de hallazgos 1/2. El parche propuesto elimina las señales de encabezados equivalentes, pesos 300/400 y tarjetas hermanas en una fila; conserva el caso título/impacto anterior y bandas alternadas. También detecta cajas sin medios con agrupación explícita y permite la excepción específica. El `div` tipográfico sigue siendo revisión manual, como documenta el parche. No se ejecutó ese parche sobre páginas reales ni se recalcularon los 96 resultados con él.
- Pasan `node --check` por separado para auditor actual, auditor propuesto temporal, app y generador; pasa `git diff --check`. Generador ejecutado en VM con escritura interceptada: **24 shells verificados**, 16 Stage/Poster idénticos y ocho Statement distintos únicamente por los identificadores de caché documentados. No se regeneraron otros directorios.
# Revisión: figma-5059-statement v1

## Veredicto

Requiere cambios

## Resumen

La composición respeta la dirección solicitada por David. Se conservan el logo productivo, la nueva sección Sobre mí, blog y contacto en columnas 3–10, los cuatro botones del pie y el tratamiento plano solicitado para los videos.

Corregí el contraste de los botones del pie en hover/active y actualicé las referencias CSS de las ocho páginas de Statement. Quedan dos correcciones propuestas: sincronizar la caché del generador y limitar correctamente la excepción de filas de botones del auditor. Ambas están fuera del directorio autorizado para aplicar correcciones.

Revisión guardada en `intercambio/revisiones/2026-10-25_figma-5059-statement_v1_revision.md`.

El servidor fue bloqueado con `listen EPERM` y Chrome terminó antes de iniciar CDP. La verificación utiliza código, cálculo y capturas entregadas; no certifica una nueva auditoría en navegador.

## Hallazgos

| # | Severidad (crítica/alta/media/baja) | Archivo:línea | Hallazgo | Evidencia | Recomendación |
|---|---|---|---|---|---|
| 1 | alta | `v3/statement/styles.css:368` | **Corregido.** Hover y active de los botones oscuros tenían contraste insuficiente en móvil. | Texto `#FAFAFA` sobre `#1EA0A0`: **3,05:1**. A 390 px el texto mide 17 px/700 y requiere 4,5:1. | Aplicado `--text-static-inverse` en ambos estados: **5,55:1**. |
| 2 | media | `v3/build-pages.mjs:52`; `v3/statement/index.html:14` | El generador conserva la versión CSS anterior. | Ejecutado en un directorio temporal, produce `styles.css?v=20261024-mobile-blog`. Regenerar restauraría la clave antigua en los ocho HTML corregidos. | Sincronizar el generador mediante el parche propuesto. No aplicado por quedar fuera de `v3/statement`. |
| 3 | media | `.agents/skills/pixel-perfect/scripts/audit.mjs:121` | La excepción de botones no comprueba que estén en la misma fila y puede ocultar desalineaciones de botones apilados. | Anterior: `x=16..116, y=0..52`. Siguiente: `x=148..248, y=64..116`. La condición actual exime el segundo aunque esté en otra fila. | Exigir contenedor flex horizontal y solapamiento vertical. Mantener la medición del primer botón de cada fila. Parche propuesto; `.agents/` intacto. |
| 4 | baja | `.agents/skills/pixel-perfect/SKILL.md:38` | La explicación sobre botones interrumpe la tabla Markdown. | El párrafo aparece entre `near-miss` y las tres reglas restantes. | Moverlo después de la tabla y explicitar el comportamiento con wrap y botones apilados. |

Parches propuestos, **no aplicados**:

```diff
--- a/v3/build-pages.mjs
+++ b/v3/build-pages.mjs
@@
-<link rel="stylesheet" href="${base}styles.css${name === 'statement' ? '?v=20261024-mobile-blog' : ''}">
+<link rel="stylesheet" href="${base}styles.css${name === 'statement' ? '?v=20261025-figma-5059-review' : ''}">
```

```diff
--- a/.agents/skills/pixel-perfect/scripts/audit.mjs
+++ b/.agents/skills/pixel-perfect/scripts/audit.mjs
@@
     // A group of buttons in one row aligns by its first button; the rest follow the group's gap.
     const prev = el.previousElementSibling;
-    if (isControl && prev && prev.matches('button, a[class*="btn"], a[class*="button"], [role="button"]') && visible(prev) && r.left > prev.getBoundingClientRect().right - tol) continue;
+    if (isControl && prev && prev.matches('button, a[class*="btn"], a[class*="button"], [role="button"]') && visible(prev)) {
+      const pr = prev.getBoundingClientRect();
+      const hostStyle = getComputedStyle(el.parentElement);
+      const horizontalRow = ['flex', 'inline-flex'].includes(hostStyle.display) && hostStyle.flexDirection === 'row';
+      const sameRow = Math.min(r.bottom, pr.bottom) - Math.max(r.top, pr.top) > tol;
+      if (horizontalRow && sameRow && r.left >= pr.right - tol) continue;
+    }
```

```diff
--- a/.agents/skills/pixel-perfect/SKILL.md
+++ b/.agents/skills/pixel-perfect/SKILL.md
@@
 | `near-miss` | two left or right edges 2–8px apart inside the same section: almost always meant to be one line (right edges only for media and boxes, not text or buttons) | medium |
-
-A row of buttons aligns by its first button: the following buttons in the same line are not measured against the columns, because they follow the group's gap (as in Figma auto layout).
 | `competing-hierarchy` | a heading immediately followed by a sibling p/blockquote at nearly the same size (ratio under 1.25), identical computed weight and colour; wrappers require manual review | medium |
 | `inconsistent-repeat` | heuristic candidates with the same BEM element class and media, excluding sibling cards in one row; data-grid-repeat="name" explicitly groups boxes even without media; data-grid-repeat-ignore exempts only this check | medium |
 | `inset` | sits on a positive padding edge of a containing ancestor whose same side is on the grid (card or panel padding); non-text boxes wider than a column must be inset on both sides | low |
 
+A horizontal flex row of buttons aligns by its first button: subsequent buttons on that same visual row follow the group's gap. Measure the first button of every wrapped row and every vertically stacked button. This exemption applies only to column alignment; overflow, clipping and left-edge near misses remain checked.
+
 Inner layout parts are measured too (`dt`/`dd`, captions, list items, grid-item spans), because a container can sit on the grid while its fields do not. Ordinary list indentation is not reported. The clipping check estimates ink with canvas text metrics (glyph ascent/descent of the element's text in its font) rather than the font's content box: a good estimate for display lines, not an exact outline for mixed-style paragraphs. Confirm any clipping finding in the overlay before changing masks or type.
```

## Correcciones aplicadas directamente por Codex

| # | Archivo | Cambio | Motivo |
|---|---|---|---|
| 1 | `v3/statement/styles.css:368` | Hover y active de `.a-btn--dark` usan `--text-static-inverse`. | Elevar el contraste a **5,55:1**, conservando el fondo y el estado inicial. |
| 2 | Los ocho HTML de `v3/statement`: Home, 404, tres casos y tres artículos | Actualizada únicamente la referencia CSS a `20261025-figma-5059-review`. | Evitar que una hoja almacenada anteriormente oculte las correcciones. |

## Verificación ejecutada

- Leídos `AGENTS.md`, `CLAUDE.md`, protocolo, plantilla, handoff, `docs/decisiones.md`, skill Pixel Perfect, checklist, auditor, generador, CSS y controlador de Statement, base compartida, tokens y contenido utilizados. Revisadas las **17 imágenes** de `.pixel-perfect/figma-ref/` y el `report.json` entregado.
- `node --check` pasó para `v3/statement/app.js`, `v3/build-pages.mjs` y `.agents/skills/pixel-perfect/scripts/audit.mjs`. `git diff --check -- v3/statement` pasó.
- El informe previo contiene **63 combinaciones: 9 URLs × 7 anchos** —1600, 1440, 1024, 900, 768, 390 y 320— con **0 altos, 0 medios y 32 inset bajos**. Son resultados entregados por Claude, no una ejecución nueva. Los inset corresponden a rellenos internos de `cs-axis` y `cs-steps`; no justifican desplazar esos componentes.
- Retícula calculada a 1600: columna **99,333 px**, paso **131,333 px**. Inicio de columna 3: **290,667 px**; columna 7: **816 px**; columna 9: **1078,667 px**. Ocho columnas miden **1018,667 px**; cuatro, **493,333 px**; siete, **887,333 px**, con alto 4:3 de **665,5 px**. Coinciden con las columnas de About, blog, contacto y casos (`styles.css:333–358`).
- Escalas calculadas a 1600: heading **88/83,6**, caso **48/48**, impacto **30,4/38**, About **19/30,4**, botones **19/28,5**, prompt **28/33,6**, input **17/25,5**, footer **80/76** y nombre **400/320**, tracking **−24**. Los gaps antes del resumen y del rol resultan **36,8** y **32,8 px**, frente a **37,1** y **32,6**: diferencias subpíxel, sin corrección necesaria. Se conservan Mega 120, L 32, blog 110, contacto superior 198 y pie superior 128.
- Comparación visual: blog, contacto y pie a 1600 conservan composición, anchos y ritmo de sus capturas Figma. El caso conserva caja, título y posición del CTA. Las diferencias de rasterizado y compresión JPEG no permiten certificar igualdad de píxeles.
- `facts.png` muestra las cifras y el retrato, **no la nueva sección de intereses**. Falta una captura Figma de `5061:424` para certificar visualmente esa sección. Su código coincide con la estructura y medidas descritas en el handoff. La traducción ES sigue pendiente de validación editorial de David; no la alteré.
- Revisadas las capturas móviles ES de About, caso, blog, contacto y pie, además de las vistas completas con retícula a 768/900/1024/320. Los botones del pie se envuelven; a 390 se apilan por su ancho disponible. No identifico un defecto nuevo de columnas en esas evidencias. El recorte del nombre decorativo del footer es intencional y está excluido del auditor.
- El CSS actual del video contiene fondo `--surface-main`, radio XL y mezcla `lighten`, sin velo, anillo, degradado CSS ni zoom. Las capturas `mine-case-*` todavía muestran variaciones del fondo y un borde fino; no prueban por sí solas el resultado actual en navegador real. `lighten` tampoco elimina píxeles del asset más claros que el fondo. Queda pendiente comprobar video y póster con composición real; si persiste el borde, propondría corregir el asset, sin reintroducir efectos.
- Footer: el DOM mantiene invitación → email/LinkedIn/WhatsApp/ADPlist → información legal. El nombre lleva `aria-hidden="true"` y `pointer-events:none` (`app.js:42–51`, `styles.css:370`). El foco tiene outline de **2 px**, offset de **3 px** y contraste calculado **16,08:1** sobre el fondo claro (`v3/shared/base.css:46`, `v3/statement/styles.css:287`). No se comprobó mediante tabulación real.
- Ejecutado render de Home EN/ES en Node con entorno DOM simulado: cuatro enlaces de contacto, nombre decorativo oculto a accesibilidad y CV del idioma correspondiente. Comprueba el marcado; no sustituye layout ni árbol de accesibilidad del navegador.
- Ejecutado el contraejemplo geométrico de botones: el predicado actual omite tanto la fila correcta como el botón apilado desplazado; el propuesto omite solo la fila correcta. El primer botón envuelto se sigue midiendo. Falta ejecutar el auditor completo con el parche propuesto.
- Generador ejecutado únicamente en un directorio temporal para demostrar la clave obsoleta; comprobadas las ocho referencias CSS corregidas. No se regeneraron las demás propuestas.
- **Limitaciones del entorno:** `node server.js` falló con `listen EPERM: operation not permitted 127.0.0.1:3456`; `Browser.launch()` terminó con `Chrome exited early, code null`. No se intentó eludir el sandbox. Quedan sin verificar en vivo hover, foco, menú, consola, anchos intermedios 360/1280 y composición del video.
- Sin cambios en `.agents/`, `intercambio/*figma-caso1-responsive*`, `intercambio/evidencia/`, producción ni archivos preexistentes ajenos. Sin commit, push ni despliegue. Iteración **1 de 3**.
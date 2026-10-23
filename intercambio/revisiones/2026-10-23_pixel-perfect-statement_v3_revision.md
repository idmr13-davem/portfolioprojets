# Revisión: pixel-perfect-statement v3

## Veredicto

Requiere cambios

## Resumen

La ilustración y la columna de periodos móviles quedan correctamente alineadas según el código, el cálculo y la evidencia disponible. Los casos sintéticos que reproducían los principales fallos de V2 ahora producen los hallazgos esperados. No encontré una corrección adicional de alineación en Statement que fuera clara, acotada y suficientemente respaldada para aplicarla directamente.

El cierre sigue condicionado por el cambio tipográfico de 17 a 16,4 vw, reconocido en el handoff y pendiente de decisión de David. Además, el auditor conserva dos discrepancias con sus reglas documentadas: acepta cajas por un solo borde y puede identificar un borde como padding. Las propuestas exactas para `.agents/` quedan abajo, sin escribir en esa carpeta.

Esta es la tercera y última revisión del ciclo. No se solicita una cuarta iteración. No modifiqué copy, colores, tamaños tipográficos, motion, archivos de producción ni las cinco eliminaciones de imágenes preexistentes. Sin commit, push ni despliegue. El único archivo creado en el repositorio es esta revisión.

## Hallazgos

| # | Severidad (crítica/alta/media/baja) | Archivo:línea | Hallazgo | Evidencia | Recomendación |
|---|---|---|---|---|---|
| 1 | alta | `v3/statement/styles.css:279`; `intercambio/handoffs/2026-10-23_pixel-perfect-statement_v3.md:42` | **Pendiente de decisión:** permanece el cambio de tamaño tipográfico fuera del alcance autorizado. | La regla sigue en `16.4vw` y afecta tanto al nombre como a los titulares de estado. A 360 px son 59,04 px, frente a 61,2 px con 17 vw. La tabla de respuesta confirma que se escaló, pero no documenta aprobación. | Registrar la decisión explícita de David antes de dar por cumplida la restricción. No restaurar ni sustituir el tamaño durante esta revisión: ambas acciones están fuera del pedido actual. |
| 2 | media | `.agents/skills/pixel-perfect/scripts/audit.mjs:117`; `.agents/skills/pixel-perfect/SKILL.md:36` | **Propuesta:** las cajas no textuales anchas todavía pasan con un solo borde alineado. | Ejecutando la función real `measure` con DOM sintético, un `form` entre X=28 y 668 a 1440 px devuelve cero hallazgos. Su extremo derecho queda 37,6 px antes del final de columna 6. El requisito de ambos bordes solo se aplica a `isMedia`, aunque la skill y el comentario incluyen cajas. El formulario centrado entre 400 y 1040 sí se denuncia correctamente. | Extender la ocupación de columnas a elementos no textuales anchos y mantener las excepciones intencionales explícitas. Parche propuesto abajo; no aplicado ni usado para reinterpretar los conteos existentes. |
| 3 | baja | `.agents/skills/pixel-perfect/scripts/audit.mjs:125` | **Propuesta:** el supuesto padding positivo incluye el grosor del borde. | `contentBox()` suma borde y padding. Un ancestro 28–1412 con borde izquierdo de 24 px y padding cero clasifica un párrafo 52–900 como `inset; 24px padding`. Fixture ejecutado sobre `measure`. No hay evidencia de que esto explique los 50 bajos de Statement. | Leer el padding computado para exigir su positividad y describirlo correctamente. Mantener `contentBox()` para localizar su borde interior. Parche propuesto abajo. |
| 4 | baja | `intercambio/handoffs/2026-10-23_pixel-perfect-statement_v3.md:26`; `v3/statement/app.js:245` | **Límite de evidencia:** ES y los estados abiertos no tienen la misma cobertura verificable que EN. | `v3-es/report.json` tiene nueve combinaciones, incluida una señal media anterior al arreglo; `v3-es-fix/report.json` sustituye Home a 390 y añade 360 en EN/ES. Menores y artículo en ES no se midieron a 360. No hay capturas ni mediciones independientes del menú abierto o preview en las carpetas indicadas. | Conservar las comprobaciones manuales del handoff como evidencia declarada por su autor. No presentarlas como reproducidas por esta revisión ni afirmar cobertura completa ES de las ocho rutas. No bloquea por sí solo la alineación comprobada. |

Parche exacto **propuesto, no aplicado** para los hallazgos 2 y 3. Cambia el instrumento; requiere contrastar los nuevos resultados antes de corregir páginas por sus señales:

```diff
--- a/.agents/skills/pixel-perfect/scripts/audit.mjs
+++ b/.agents/skills/pixel-perfect/scripts/audit.mjs
@@
-    // Text may align by one edge; media wider than a column must fill whole columns (both edges).
+    // Text may align by one edge; non-text boxes wider than a column must fill whole columns.
@@
-    const ok = g.full || centred || (isMedia && r.width > colW + tol ? g.start && g.end : g.start || g.end);
+    const needsBoth = !isText && r.width > colW + tol;
+    const ok = g.full || centred || (needsBoth ? g.start && g.end : g.start || g.end);
@@
-    // and stays inside it. Media wider than a column need both sides inset that way.
+    // and stays inside it. Non-text boxes wider than a column need both sides inset that way.
@@
-      const padL = cb.left - hr.left, padR = hr.right - cb.right;
+      const hcs = getComputedStyle(host);
+      const padL = parseFloat(hcs.paddingLeft), padR = parseFloat(hcs.paddingRight);
@@
-      const okInset = isMedia && r.width > colW + tol ? leftInset && rightInset : leftInset || rightInset;
+      const okInset = needsBoth ? leftInset && rightInset : leftInset || rightInset;
--- a/.agents/skills/pixel-perfect/SKILL.md
+++ b/.agents/skills/pixel-perfect/SKILL.md
@@
-| `inset` | sits on a positive padding edge of a containing ancestor whose same side is on the grid (card or panel padding); media wider than a column must be inset on both sides | low |
+| `inset` | sits on a positive padding edge of a containing ancestor whose same side is on the grid (card or panel padding); non-text boxes wider than a column must be inset on both sides | low |
```

## Correcciones aplicadas directamente por Codex

| # | Archivo | Cambio | Motivo |
|---|---|---|---|
| — | Ninguno | No se aplicaron correcciones al código. | Los ajustes de alineación de V3 están respaldados; los pendientes requieren decisión de diseño o cambios propuestos al auditor de solo lectura. |

## Verificación ejecutada

- Leídos `AGENTS.md`, `CLAUDE.md`, protocolo, plantilla, los tres handoffs, las revisiones V1/V2, `docs/v3-propuestas.md`, skill Pixel Perfect, auditor, CSS/app de Statement, generador y base/runtime compartidos. Rama: `exploration/v3-propuestas`.
- Intentado `node server.js`: **listen EPERM 127.0.0.1:3456**. Intentado el auditor sobre Home con salida `/tmp/pixel-perfect-codex-v3`: **Chrome exited early, code null**. No hubo nuevas mediciones ni capturas de navegador. Los fallos no se interpretan como cero hallazgos.
- Recontados los JSON: **EN V3: 56 combinaciones, 0 altos / 0 medios / 50 bajos**, todos `inset`; **ES inicial: 9 combinaciones, 0 / 1 / 14**; **Home posterior EN/ES a 390/360: 4 combinaciones, 0 / 0 / 22**. El informe posterior respalda la eliminación del `near-miss` de 3,2 px del periodo ES a 390. No se suman ambos informes ES como si fueran una ejecución única posterior al arreglo.
- Inspeccionadas ocho capturas: en construcción EN a 1440; Home ES corregida a 390; Motion EN a 768; Registro EN a 1500; Menores ES a 1440; artículo de autos EN a 390; artículo Mercado Libre EN a 1280; 404 EN a 1024. Se examinó además un recorte del ledger ES a resolución original. Las capturas largas se muestran reducidas: permiten revisar composición, pero no certificar cada glifo. No se inspeccionaron visualmente las otras capturas.
- Reproducida la función real `measure`, extraída sin modificar `.agents/`, en una VM con DOM y métricas sintéticos. Fixtures y salida temporal en `/tmp/codex-v3-fixtures.cjs`: padding cero → `off-grid`; padding por el lado opuesto → `off-grid`; medio con ambos insets válidos → `inset`; formulario centrado → `off-grid`; texto centrado → sin señal; texto de 32 px que rebasa un panel de 500 px → `clipped`. El recorte guarda `top=480`, la coordenada del texto, y genera contorno para `strong`. Con `data-grid-ignore` se suprimen señal y contorno. Los dos casos adicionales reproducen los hallazgos 2 y 3. Son pruebas de lógica, no mediciones visuales.
- Contrastada la tabla «Respuesta a la revisión anterior»: **1** resuelve los casos de medios denunciados, con la salvedad del borde descrita arriba; **2** resuelve la ilustración; **3** corrige el centrado no textual; **4** elimina el límite de 3 em; **5 y 8** documentan la estimación; **6** usa el top del elemento, incluye `strong`/`em` y filtra excluidos en el overlay; **7** sigue pendiente; **9** mantiene caché y generador sincronizados.
- Calculada la ilustración con raíz de 16 px: `C = (W − 2M − 11G) / 12`, ancho `6C + 5G` desde X=M; en móvil ocupa `W − 2M`.

| Viewport | X inicial | Ancho de ilustración | X final |
|---|---:|---:|---:|
| 360 | 16 | 328 | 344 |
| 390 | 16 | 358 | 374 |
| 768 | 16 | 360 | 376 |
| 1024 | 20,48 | 481,28 | 501,76 |
| 1280 | 25,6 | 601,6 | 627,2 |
| 1440 | 28 | 677,6 | 705,6 |
| 1500 | 28 | 707 | 735 |

- La regla móvil final (`styles.css:373`) define una sola pista `auto` para todos los periodos y transmite sus dos columnas mediante subgrid a `li` y enlace. Sustituye el dimensionamiento independiente por fila. El recorte ES confirma el borde compartido; no exige cambiar tipografía.
- Preview: la geometría declarada de columnas 10–12 da **1087,6–1412 px a 1440**, consistente con el redondeo del handoff. `app.js:249` traslada por `row.offsetTop`; el menú usa padding lateral `--margin`, 16 px a 390. Se comprobaron reglas y cálculo, sin reproducir esos estados en navegador.
- Pasan `node --check` por separado para auditor, app, runtime y generador. Generador ejecutado en VM con escritura interceptada: **24 shells coinciden** con los archivos actuales; no se regeneraron ni modificaron Stage o Poster. Las ocho páginas de Statement conservan `styles.css` y `app.js` con `?v=20261023-grid-v3`. `git diff --check` pasa.

La evidencia respalda los ajustes de alineación descritos, con los límites anteriores. El cero del auditor no constituye una certificación global de todas las cajas, estados, idiomas ni contornos tipográficos.
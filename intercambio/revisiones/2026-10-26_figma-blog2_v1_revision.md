# Revisión: figma-blog2 v1

## Veredicto

**Aprobado con observaciones**

## Resumen

Los cuatro anchos objetivo respetan las columnas declaradas en el CSV. No detecté bloques fuera de guía, bordes casi alineados, omisiones ni recortes evidentes en los renders. La aprobación cubre la evidencia entregada; quedan pendientes la comprobación nativa de Figma y la adaptación entre anchos.

El ritmo documentado de Parts / Sections corresponde al código: **104 / 56 / 56 / 56 / 104 px** antes de los cinco h2. Los dos separadores aportan 48 px y cada h2 añade 56 px. Heading → Copy conserva 20 px, párrafos 20.9 px y listas 20 px de margen con 8 px entre ítems (`v3/statement/styles.css:212–218`). Estas cifras verifican el modelo declarado; no son mediciones independientes del canvas.

El resumen a 12 columnas, también en tablet, y el cuerpo desktop en columnas 3–10 son decisiones explícitas de la plantilla. Las diferencias frente al navegador derivadas de esos anchos no constituyen defectos.

## Hallazgos

| # | Severidad (crítica/alta/media/baja) | Archivo:línea | Hallazgo | Evidencia | Recomendación |
|---|---|---|---|---|---|
| 1 | media | `intercambio/evidencia/2026-10-26_figma-blog2/estructura.md:47` | La redimensión a 1440 conserva el inset de 1280 y pierde alineación con las columnas. | Frame `5132:1872`, Article `5132:1887`: x=234.67 y ancho calculado=970.66. Con la grilla del CSS a 1440 debería tener x=263.47 y ancho=913.07. Incluso conservando margin/gutter=25.6 del modo, debería tener x=261.33 y ancho=917.33. | Proponer adaptación del Body/Article a columnas si se exige comportamiento fluido. Mantener las medidas aprobadas en los cuatro anchos objetivo. La documentación ya aclara que ausencia de overflow no acredita alineación. |
| 2 | baja | `intercambio/evidencia/2026-10-26_figma-blog2/estructura.md:41`; `:46` | Persisten diferencias de líneas y altura del cuerpo en tablet y móvil. | El autor declara una línea adicional en un texto a 768 y en tres a 390. Body: +29 px y +89.4 px, respectivamente. Los renders conservan orden y jerarquía, pero no permiten atribuir cada diferencia a fuente o redondeo. | En frames `5132:2034` y `5132:2196`, identificar los textos afectados dentro de Article `5132:2049` y `5132:2211`. Contrastar fuente, peso, estilo y line-height **19/30.4**, conservando anchos **610.67/358**. No alterar tracking, copy ni columnas para forzar cortes. |
| 3 | baja | `intercambio/evidencia/2026-10-26_figma-blog2/inventario-grilla.csv:8`; `:15`; `:22`; `:29` | La evidencia agrupada no permite certificar cada nodo ni el estándar estructural de Figma. | Cada Article agrupa 61 nodos bajo una coordenada. Faltan caracteres, sizing, bindings, estilos e instancias por nodo. Header, navegación y footer tampoco tienen inventario individual. El checksum fuente coincide, pero falta la extracción del canvas. | Adjuntar exportación por nodo de los cuatro frames con geometría, caracteres, auto layout, Hug/Fill, variables, estilos y componente principal. |

**Propuesta sobre Blog 1:** sí conviene usar Body con padding `content-inset` y Article en Fill, siguiendo Blog 2. En frames `5111:37165` y `5111:37338`, las columnas 3–10 requieren x/ancho **290.67/1018.67** y **234.67/810.67**. Los anchos fijos declarados de 1016/810 generan diferencias totales de 2.67/0.67 px, repartidas entre ambos bordes al centrar. Propuesta sin aplicar, fuera de este encargo (`estructura.md:50`).

## Correcciones aplicadas directamente por Codex

| # | Archivo | Cambio | Motivo |
|---|---|---|---|
| 1 | `intercambio/evidencia/2026-10-26_figma-blog2/estructura.md:12` | Precisado que tablet coincide con el código en las columnas del cuerpo; el resumen sigue la plantilla a 12 columnas. | Evitar extender la equivalencia a todo el layout. |
| 2 | `intercambio/evidencia/2026-10-26_figma-blog2/estructura.md:38` | Documentados algoritmo, orden de textos y alcance de la comprobación independiente del checksum. | El resultado fuente no prueba por sí solo igualdad textual en Figma. |
| 3 | `intercambio/evidencia/2026-10-26_figma-blog2/estructura.md:47` | Añadidas las medidas esperadas a 1440 y la limitación de la prueba de redimensión. | Distinguir ausencia de overflow de alineación con la grilla. |
| 4 | `intercambio/evidencia/2026-10-26_figma-blog2/verificar-review.py`; `review-checks.json` | Añadido y ejecutado verificador reproducible de grilla, contenido fuente, CSS, dimensiones PNG y cálculo a 1440, con hashes de fuentes. | Dejar evidencia auditable. |

No se modificó ningún archivo dentro de `v3/`, ningún nodo de Figma ni Blog 1. No se hicieron commits, push ni despliegues.

Revisión guardada en [2026-10-26_figma-blog2_v1_revision.md](/Users/dave/Documents/Personal/davidmontealegreux-site/intercambio/revisiones/2026-10-26_figma-blog2_v1_revision.md).

## Verificación ejecutada

- Leídos protocolo, handoff, plantilla, AGENTS.md, CLAUDE.md, referencias de Blog 1, fuentes y skills aplicables.
- Ejecutado `verificar-review.py`: **salida 0; todas las aserciones correctas**. Segunda ejecución con resultado idéntico. `git diff --check` sin errores.
- Recalculadas **28 filas del CSV**, representativas de **268 nodos declarados**, sin verificar individualmente los agrupados. Desviación máxima de los bordes comprobados: **0.00334 px**.
- Confirmado `content-inset` para columnas **1–12 / 2–11 / 3–10 / 3–10** en 390/768/1280/1600.
- Reproducidos desde la fuente EN **40 textos, 7467 caracteres y checksum `2802487935`**: 35 textos de cuerpo, con **22 párrafos, cinco h2 y ocho ítems**; dos separadores.
- Caption vacío confirmado en `v3/shared/content.js:1920` y margen de 12 px en `v3/statement/styles.css:209`.
- Inspeccionados los **ocho PNG** en 1600, 1280, 768 y 390. Comparados título, metadata, resumen, dos tags, collage responsive, apertura, cinco secciones, viñetas, cierre, navegación y footer. Sin omisiones visuales evidentes. La reducción de los exports limita la comprobación de glifos y microdetalles.
- Recalculadas las alturas del Hero: **591.44 / 470.70 / 281.93 / 724.73 px** en 1600/1280/768/390, coherentes con lo documentado.
- No se ejecutaron nuevas pruebas de navegador, consola, interacción ni español: se revisó la entrega EN con los renders suministrados.

La lectura nativa mediante `use_figma` quedó bloqueada por exigir aprobación bajo la política `never`, aunque `create_session` sí respondió. No fue posible comprobar directamente auto layout, instancias, tokens ni geometría por nodo; se continuó con la evidencia local sin modificar el canvas.
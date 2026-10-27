# Revisión: figma-caso3-menores v1

## Veredicto

**Aprobado con observaciones**

## Resumen

La composición y los bloques inventariados son coherentes con la plantilla aprobada: títulos en tres columnas y contenido en nueve en desktop, apilado en tablet/mobile, cuatro pasos, cuatro videos y cierre con dos expectativas y la nota de proyecto activo. No se identifica un defecto visual inequívoco que justifique modificar Figma.

Se corrigió la evidencia geométrica: el CSV declaraba desviación derecha cero para 21 textos cuyo borde derecho no coincide con una columna. Son excepciones válidas de texto alineado por la izquierda; ahora figuran sus desviaciones reales y el criterio aplicable. Los 228 bloques pasan el recálculo con un máximo exigible de **0,01 px**.

La aprobación cubre la composición visible y la geometría suministrada. Las propiedades internas de Figma y la coincidencia literal de todos los textos pequeños quedan pendientes de verificación independiente.

Revisión guardada en `intercambio/revisiones/2026-10-25_figma-caso3-menores_v1_revision.md`.

## Hallazgos

| # | Severidad (crítica/alta/media/baja) | Archivo:línea | Hallazgo | Evidencia | Recomendación |
|---|---|---|---|---|---|
| 1 | baja | `intercambio/evidencia/2026-10-25_figma-caso3/inventario-grilla.csv:8`; `:12`; `:54`; `intercambio/handoffs/2026-10-25_figma-caso3-menores_v1.md:23` | **Corregido.** La comprobación original de ambos bordes no era reproducible en 21 textos: los ceros derechos ocultaban una excepción válida. | En 1600, Objectives (`5091:1117`) termina en x=464; la columna 4 termina en 521,333: diferencia de 57,333 px. Su izquierda coincide con x=28. El criterio del caso 1 permite que el texto se alinee solo por la izquierda (`intercambio/evidencia/2026-10-25_figma-caso1/estructura.md:35`). | Conservar el diseño. Usar `alignment=left` para esas 21 filas y exigir ambos bordes en los otros 207 registros. Ejecutar el verificador añadido. |
| 2 | media | `intercambio/evidencia/2026-10-25_figma-caso3/estructura.md:26`; `:34`; `:35`; `:39`; `intercambio/evidencia/2026-10-25_figma-caso3/inventario-grilla.csv:1` | La evidencia no permite certificar la estructura editable exigida por AGENTS.md. Es una carencia de verificación, no un incumplimiento demostrado de Figma. | El CSV incluye IDs y geometría horizontal, pero no auto layout, Hug/Fill, bindings, modos, estilos ni componentes principales. La redimensión 1280→1440 solo está declarada. La lectura directa de Figma fue rechazada por permisos. | Adjuntar una extracción estructural de `5091:1104`, `5091:1234`, `5091:1364` y `5091:1498`, incluyendo grillas, sizing, padding/gap, variables/modos, estilos y componentes principales. Incluir `Case step` (`5091:1093`), Journey (`5091:1096`) y comprobación de las variantes anteriores. No reconstruir sin demostrar un defecto. |
| 3 | baja | `intercambio/evidencia/2026-10-25_figma-caso3/estructura.md:49`; `:52`; `intercambio/handoffs/2026-10-25_figma-caso3-menores_v1.md:26` | La reducción de los renders impide certificar cada carácter de captions y notas en todos los breakpoints. | Mobile se entrega a 171×4000 para un frame de 390; desktop 1600, a 848×4000. El inventario trunca nombres y omite el interior de las instancias. | Exportar por secciones a 1× o extraer `characters` con ID/ruta para compararlo con `content.js`. Priorizar Journey y Final outcome en `5091:1498`. No introducir saltos manuales ni modificar copy para resolver esta limitación de evidencia. |

## Correcciones aplicadas directamente por Codex

| # | Archivo | Cambio | Motivo |
|---|---|---|---|
| 1 | `intercambio/evidencia/2026-10-25_figma-caso3/inventario-grilla.csv` | Recalculados `dev_left` y `dev_right` en 228 filas; añadida `alignment`, con 21 excepciones `left` y 207 registros `span`. Se conservaron IDs, posiciones, anchos y columnas. | Separar las desviaciones reales del criterio de aceptación sin alterar el diseño. |
| 2 | `intercambio/evidencia/2026-10-25_figma-caso3/estructura.md` | Aclarados el máximo exigible, las excepciones, el comando reproducible y los límites de la evidencia y de las alturas dependientes del viewport. | Evitar presentar el recálculo como inspección interna de Figma o equivalencia responsive completa. |
| 3 | `intercambio/handoffs/2026-10-25_figma-caso3-menores_v1.md` | Corregido el paso 1 de verificación para contemplar explícitamente los textos alineados por la izquierda. | El criterio anterior exigía ambos bordes a todos los textos. |
| 4 | `intercambio/evidencia/2026-10-25_figma-caso3/verificar-grilla.py`; `verificacion-grilla.json`; `verificacion-contenido.json` | Añadidos verificador, resultados geométricos y extracción de bloques, captions y notas de la fuente. | Dejar evidencia reproducible y distinguir datos de fuente de comprobación visual. |

No se modificaron Figma, copy ni código del sitio. No se hizo commit, push ni despliegue. Se preservaron los cambios previos del workspace.

## Verificación ejecutada

Se leyeron AGENTS.md, CLAUDE.md, el protocolo, la plantilla, el handoff, sus referencias, los documentos estructurales de los casos 1 y 2 y el checklist pixel-perfect. Se inspeccionaron los ocho PNG entregados: Figma y navegador en 1600, 1280, 768 y 390.

**1. Grilla: prueba ejecutada y aprobada tras corregir la evidencia.**

Comando:

```bash
python3 intercambio/evidencia/2026-10-25_figma-caso3/verificar-grilla.py
```

Se recalcularon:

- Columna: `C = (W − 2M − 11G) / 12`.
- Izquierda: `M + (inicio − 1)(C + G)`.
- Derecha: `M + final·C + (final − 1)G`.

Se contrastaron con `x` y `x + width`, y se verificó que las desviaciones guardadas coincidan con el cálculo.

| Frame | Margen / gutter | Filas | Excepciones derechas | Máximo exigible | Resultado |
|---|---|---|---|---|---|
| 1600 | 28 / 32 | 57 | 6 textos | 0,006667 px | Pasa |
| 1280 | 25,6 / 25,6 | 57 | 6 textos | 0,010000 px | Pasa |
| 768 | 16 / 16 | 57 | 6 textos | 0,006667 px | Pasa |
| 390 | 16 / 16 | 57 | 3 textos | 0 px | Pasa |

Ningún borde izquierdo inventariado queda fuera de tolerancia. Los contenedores de video ocupan **362 / 288 / 360 / 358 px** en 1600 / 1280 / 768 / 390, correspondientes a **3 / 3 / 6 / 12 columnas**.

No se identifica un par de bordes casi alineados inequívoco en los renders. El CSV carece de coordenada vertical y jerarquía para descartar automáticamente todos los pares a 2–8 px. Header, Footer e interiores de instancias tampoco quedan certificados por este cálculo.

**2. Contenido, orden y jerarquía: comprobación visual y extracción de fuente ejecutadas.**

Se ejecutó `v3/shared/content.js` en un contexto aislado de Node. La extracción guardada en `verificacion-contenido.json` confirma:

| Contenido | Cantidad |
|---|---|
| Secciones | 5 |
| Párrafos de contexto | 2 |
| Desafíos | 4 |
| Pasos | 4 |
| Videos con caption y descripción | 4 |
| Ítems en Advantage | 3 |
| Resultados finales | 2 |
| Nota de expectativas | 1 |

Los renders conservan esa secuencia, hero, Objectives/Outcomes, navegación al siguiente caso, contacto y footer.

Las cifras legibles mantienen **24 horas, 20 segundos, 3 minutos, 10–15 %, más de un millón y edades 13–17**. La nota de expectativas aparece en los cuatro cierres; no se convirtió el resultado esperado en resultado medido. Referencias: `v3/shared/content.js:1525`, `:1537`, `:1538` y `:1546`.

Las cuatro captions y descripciones corresponden a las entradas de `v3/shared/content.js:1448`, `:1461`, `:1474` y `:1487`. No se detectó una discrepancia en el texto legible; la igualdad literal completa queda pendiente del hallazgo 3.

La jerarquía visible distingue títulos, cuerpo, pasos y notas. Hero y flujo reutilizan una composición similar porque así lo define la fuente. El cierre en negrita de Advantage también procede del renderizador y CSS (`v3/shared/site.js:124`; `v3/statement/styles.css:170`).

**3. Tokens nuevos: contraste ejecutado con CSS y dimensiones.**

| Token / estilo | Comprobación | Resultado |
|---|---|---|
| `journey-width` | La grilla da 358 / 360 / 288 / 362 px en orden 390 / 768 / 1280 / 1600. | Coherente. |
| `flow-image-height` | Ambos assets miden 2000×980, comprobado con `sips`. Ancho × 0,49 da 175,42 / 360,64 / 602,112 / 756,56 px; el límite de 720 explica 1600. | Coherente; diferencias de redondeo de 0,01 px en mobile/tablet. |
| `journey-video-height` | CSS limita a `80svh` y usa `contain` (`styles.css:180`). 640/720 corresponden a viewports de 800/900 px de alto. El poster 1, de 716×1596, da 802,46 px a 360 px de ancho. | Referencias coherentes; no se certifican los altos efectivos de los cuatro MOV ni sus bindings. |
| `copy-block-gap` | `1.25rem × 16 = 20px` (`styles.css:169`). | Coincide. |
| `Step title` | `1.375rem = 22px`; `22 × .95 = 20,9px`; `22 × −.035 = −0,77px` (`styles.css:35`; `:175`). | Coincide. |
| `Case step` | Padding 24px, separación título/cuerpo 8px y separación entre pasos 28px (`styles.css:173`). | Coherente. |

Journey añade una nota presente en `v3/shared/site.js:111`; es una extensión razonable de `Video figure`. No hay evidencia suficiente para afirmar que sobra un componente o token.

El gap de 8px descrito para el bloque Text no reproduce el margen de caption de 12px de `styles.css:182`. Conservarlo es coherente con el componente Figma compartido, pero no equivale a copiar exactamente todo el espaciado CSS.

**4. Respuestas a las preguntas del handoff.**

1. **Grilla:** los bloques inventariados cumplen el criterio aplicable. Las 21 excepciones derechas de texto no son defectos. No se certifican todos los bordes internos.
2. **Contenido:** no se observan bloques ausentes ni cifras distintas en lo legible. La coincidencia literal completa necesita extracción de texto o renders por secciones.
3. **Componentes y tokens:** responden a necesidades de la fuente y mantienen la plantilla compartida. No se propone eliminarlos ni reconstruirlos.
4. **52ch en tablet:** **no aplicarlo únicamente a este caso**. Mantener el ancho actual conserva la consistencia aprobada. Como propuesta futura, evaluar el límite conjuntamente en los tres casos. Para `5091:1364`, Challenges/Advantage, la referencia informada es aproximadamente 575px dentro de las doce columnas. No se aplicó este cambio de diseño.

Se conservaron las diferencias declaradas: desktop 3+9, omisión de la fila vacía de Journey, listas a ancho de columna, cierre con viñetas y fondo Deep, y Play dentro del video. La superposición de Play sobre captions del navegador pertenece al código y queda fuera de este handoff de Figma.

**Pruebas bloqueadas y límites.**

`node server.js` falló con `listen EPERM ... 127.0.0.1:3456`. Se ejecutó el auditor pixel-perfect para 1600/1280/768/390, pero Chrome terminó al arrancar con `Chrome exited early, code null`. No se obtuvieron mediciones nuevas del DOM, consola, interacciones, español ni redimensión a 1440. Las capturas de navegador revisadas son las entregadas.

`git diff --check` terminó sin errores. Los archivos nuevos sin seguimiento se comprobaron mediante lectura y ejecución del verificador.

La revisión automática de permisos rechazó la lectura mediante `figma-use`: «MCP tool call requires approval, but approval policy is never». Por esa restricción no se inspeccionó ni modificó Figma directamente; las comprobaciones internas pendientes se proponen en el hallazgo 2.
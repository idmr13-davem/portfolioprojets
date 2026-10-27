# Revisión: figma-caso2-motion v2

## Veredicto

**Aprobado con observaciones**

## Resumen

La evidencia nueva resuelve el cierre mobile y confirma la alineación de los 122 bloques inventariados. El render de 390 conserva los dos resultados finales, la navegación y el footer completos. El título ocupa dos líneas y las doce muestras mantienen la disposición en dos columnas editada por David.

Retiro la corrección de v1 que proponía aumentar el hero de 1600 a 877,04 px: omitía el límite `max-height: 88svh`, que sí alcanza a esos videos.

No se requieren cambios visuales en Figma a partir de la evidencia revisada. Quedan observaciones sobre documentación y trazabilidad; la aprobación no certifica propiedades internas que el CSV y los renders no exponen.

Revisión guardada en `intercambio/revisiones/2026-10-25_figma-caso2-motion_v2_revision.md`.

## Hallazgos

| # | Severidad (crítica/alta/media/baja) | Archivo:línea | Hallazgo | Evidencia | Recomendación |
|---|---|---|---|---|---|
| 1 | baja | `intercambio/evidencia/2026-10-25_figma-caso2/estructura.md:29`; `intercambio/handoffs/2026-10-25_figma-caso2-motion_v2.md:43`; `v3/statement/styles.css:154` | La explicación nueva justifica el hero de 1600, pero la tabla anterior todavía lo describe como 9:16 y equipara 792,44 con una medición de 792. | Cuatro columnas miden 493,333 px; su alto 9:16 sería 877,037 px. Con viewport de 900 px, `88svh` limita el alto a **792 px**, no 792,44. La diferencia de 0,44 px no sustenta un defecto visual. | Frame **`5083:669`**, **Hero videos**: conservar el alto actual y retirar la propuesta de 877,04 px. Documentar `heroset-video-height` como alto de referencia limitado por viewport, indicando 1600×900 y la diferencia de 0,44 px. No cambiar Figma por esa diferencia. |
| 2 | baja | `intercambio/evidencia/2026-10-25_figma-caso2/inventario-grilla.csv:1`; `:109`; `intercambio/handoffs/2026-10-25_figma-caso2-motion_v2.md:17` | El CSV permite reproducir las desviaciones de los bloques incluidos, pero no identificar cada nodo inequívocamente ni comprobar sus bindings. | `node` contiene nombres repetidos; `binding` contiene únicamente `FILL`, `height` o `width`. Faltan IDs de nodo y variable, colección/modo, estilos, componente principal y propiedades de auto layout. Header, Footer e interior del panel de ejes están excluidos. | Completar la evidencia con **ID/ruta, layoutMode, sizing horizontal/vertical, padding/gap y bindings con colección/modo**; añadir componente/variante para instancias y estilo para textos. En **`5083:1485`**, comprobar que las muestras de **171 px** usan el sizing/token vigente. No alterar su disposición ni inferir un binding roto a partir del CSV. |

## Correcciones aplicadas directamente por Codex

| # | Archivo | Cambio | Motivo |
|---|---|---|---|
| — | — | **Ninguna corrección aplicada en Figma ni en código del sitio.** Se creó únicamente esta revisión. | No se encontró un defecto visual inequívoco que requiera intervención. Las observaciones proponen completar la evidencia. |

## Verificación ejecutada

Se leyeron el protocolo, la plantilla, AGENTS.md, CLAUDE.md, ambos handoffs, la revisión v1, `estructura.md`, el CSV y el checklist pixel-perfect. Se contrastaron el CSS, el renderizador y el contenido del caso.

Se inspeccionaron los renders Figma de 1600/1280/768, las referencias de navegador de 1280/768 y el render actual de 390. Se extrajeron recortes del PNG actual para leer el título, contenido y cierre sin depender de la miniatura completa.

**Respuesta a los cuatro puntos de v1**

| Punto anterior | Estado en v2 | Comprobación |
|---|---|---|
| 1. Proporción del hero de 1600 | **Cerrado; se retira la corrección anterior.** | `v3/statement/app.js:134` genera los videos dentro de `.a-cs__heroset` y `:146` lo inserta en `.a-cs__visual`. Se aplican tanto el 9:16 de `styles.css:157` como el límite de `:154`. La explicación del handoff es válida. |
| 2. Evidencia mobile incompleta | **Cerrado.** | El PNG mide **390×14419**. Se leen ambos resultados completos, correspondientes a `v3/shared/content.js:1222` y `:1223`; después aparecen navegación, CTA, cuatro botones y ambas líneas legales del footer. La secuencia corresponde a `v3/statement/app.js:152–163`. |
| 3. Descripción del título | **Cerrado.** | El render actual muestra **“Motion design system” / “- Motion Level”**, sin tercera línea ni recorte visible. Frame **`5083:1485`**, Hero/title. |
| 4. Grilla no reproducible | **Resuelto para los bloques inventariados; trazabilidad interna parcial.** | Se recalcularon ambos bordes en las 122 filas. Todas cumplen ≤0,05 px; el máximo independiente es **0,03 px**, coincidente con el CSV. Las propiedades internas quedan sujetas al hallazgo 2. |

**Cálculo independiente de grilla**

Se aplicaron:

- Columna: `C = (W − 2M − 11G) / 12`.
- Borde izquierdo: `M + (inicio − 1)(C + G)`.
- Borde derecho: `M + final·C + (final − 1)G`.

Se compararon con `x` y `x + width`, usando desviaciones absolutas.

| Frame | Margen / gutter | Filas comprobadas | Ancho útil |
|---|---|---|---|
| 1600 | 28 / 32 | 31 | 1544 px |
| 1280 | 25,6 / 25,6 | 31 | 1228,8 px |
| 768 | 16 / 16 | 31 | 736 px |
| 390 | 16 / 16 | 29 | 358 px |

En mobile, las muestras ocupan seis columnas: **171 + 16 + 171 = 358 px**, con inicios en **16** y **203 px** (`inventario-grilla.csv:109–120`). El render conserva Scale, Position, Opacity y Rotation con tres muestras cada uno. No se propone alterar esta edición de David.

La plantilla desktop 3 + 9 y el apilado tablet siguen siendo coherentes con la decisión aprobada.

**Contenido y lectura visual**

No se identifica un defecto visual nuevo en el mobile actual. Están presentes el hero, roadmap, benchmark, ejemplos, muestras, expresividad, panel de ejes y cierre. Las captions de los tres ejemplos corresponden a `v3/shared/content.js:935`, `:944` y `:953`. Los resultados finales no se interrumpen y el footer llega al borde inferior del frame.

Se mantienen las diferencias autorizadas respecto al navegador: plantilla desktop 3 + 9, cierre con viñetas y fondo `Background/Deep`, y gap de 12 px en expresividad. El benchmark debe conservarse en Figma aunque no aparezca en las capturas anteriores del navegador.

**Límites**

No se abrió una sesión de Figma ni se ejecutó una nueva medición de navegador. Hug/Fill de la raíz, auto layout, variables, estilos e integridad de instancias se consideran declaraciones del handoff donde no hay evidencia estructurada.

El CSV no demuestra alineación de todos los textos, ausencia de recortes internos ni comportamiento en español o al redimensionar a 1440. No se realizaron cambios de código, commit, push ni despliegue.
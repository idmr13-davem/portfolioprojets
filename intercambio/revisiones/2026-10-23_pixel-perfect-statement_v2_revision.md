# Revisión: pixel-perfect-statement v2

## Veredicto

Requiere cambios

## Resumen

La retícula de Statement mejora y los cálculos respaldan las columnas del artículo, los metadatos, la carrera y el footer. El resultado de 0 altos/0 medios del handoff sigue sin acreditar una auditoría completa: persisten excepciones que ocultan desalineaciones y recortes. La evidencia contiene cinco `inset` de 0 px correspondientes a una imagen cuyo borde derecho queda fuera de columna.

Contrasté la tabla «Respuesta a la revisión anterior»: 1, 6 y 7a están resueltos en el código; 2 amplía correctamente los selectores, pero faltan estados interactivos y ES; 3 y 4 siguen siendo parciales por las excepciones de centrado e inset; 5 mejora el overflow horizontal, pero conserva un filtro que omite recortes verticales; 7b dispone ahora de una alternativa manual utilizable.

Corregí únicamente las referencias de caché de Statement y su generador. Intenté aplicar correcciones acotadas al auditor, pero el sandbox rechazó la escritura en `.agents/`, configurado como solo lectura; el parche no se aplicó. Sus correcciones quedan especificadas abajo. No modifiqué copy, colores, tamaños tipográficos, motion ni las cinco eliminaciones de imágenes preexistentes. Sin commit, push ni despliegue. Este es el único archivo de revisión creado.

## Hallazgos

| # | Severidad (crítica/alta/media/baja) | Archivo:línea | Hallazgo | Evidencia | Recomendación |
|---|---|---|---|---|---|
| 1 | media | `.agents/skills/pixel-perfect/scripts/audit.mjs:121` | **Pendiente por sandbox:** `inset` sigue ocultando medios fuera de retícula. | Acepta padding cero, cualquier borde del ancestro y un solo borde del medio. Un caso sintético con imagen de 640 px y ancestro alineado reproduce `inset; 0px padding`. Otro acepta padding derecho de un ancestro alineado únicamente por la izquierda. | Exigir padding positivo en el lado coincidente y alineación del mismo lado del ancestro; comprobar contención. Para medios mayores que una columna, exigir ambos bordes interiores y ambos bordes del ancestro alineados. |
| 2 | media | `v3/statement/styles.css:256` | **Propuesta:** la ilustración de «en construcción» mantiene 640 px arbitrarios. | `.pixel-perfect/v2/report.json` contiene cinco `inset` de 0 px a 1500/1440/1280/1024/768. A 1440 empieza en X=28 y termina en 668; la columna 6 termina en 705,6. La captura de esa ruta a 1440 confirma la diferencia. | Definir explícitamente su ocupación en columnas o documentar una excepción editorial. No redimensioné la ilustración sin resolver esa decisión; el auditor debe reportarla como media mientras no exista una excepción justificada. |
| 3 | media | `.agents/skills/pixel-perfect/scripts/audit.mjs:114` | **Pendiente:** el centrado se permite a cualquier elemento que no sea medio, no solo al texto. | `!isMedia` incluye `form`, `input`, `button` y contenedores con `data-grid-check`. Una caja centrada de 640 px entre X=400 y 1040 pasa aunque ninguno de sus bordes coincida con la retícula de 1440. | Limitar esta excepción a bloques textuales; distinguir ocupación de cajas y alineación del texto. Revisar sus efectos con fixtures antes de generalizar a todo el portafolio. |
| 4 | media | `.agents/skills/pixel-perfect/scripts/audit.mjs:165` | **Pendiente por sandbox:** el recorte vertical solo se comprueba si el ancestro mide menos de 3 em. | Sigue presente `cr.bottom - cr.top < fs * 3`. Un caso sintético con ancestro de 500 px, fuente de 32 px y texto que rebasa su borde inferior no produce `clipped`. Contradice el cierre del hallazgo 5 anterior. | Eliminar el límite de altura y comprobar todos los ancestros que recortan cada eje. Mantenerlo independiente del tamaño del panel. |
| 5 | media | `.agents/skills/pixel-perfect/scripts/audit.mjs:157` | **Propuesta:** `measureText` no demuestra tinta exacta para cualquier titular ni para párrafos. | Aplica una sola fuente y las métricas del texto agregado a todos los rectángulos, incluidos descendientes con estilos distintos. Los límites horizontales proceden de `Range`, no de `actualBoundingBoxLeft/Right`. No incorpora todas las propiedades tipográficas del DOM. | Describirlo como estimación; validar líneas y fragmentos con su estilo real antes de afirmar exactitud. No cambiar máscaras ni tipografía basándose únicamente en este cálculo. |
| 6 | baja | `.agents/skills/pixel-perfect/scripts/audit.mjs:173` | **Pendiente por sandbox:** algunos recortes reportados no pueden localizarse en el overlay. | El hallazgo guarda el `top` del ancestro recortador; la búsqueda en línea 186 compara ese valor con el `top` del elemento. Si difieren más de 4 px no dibuja el contorno. Además, clipping incluye `em`, ausente del selector del overlay. | Guardar la coordenada del elemento, incluir todos los selectores de clipping y filtrar explícitamente `excluded` al reconstruir el overlay. |
| 7 | alta | `v3/statement/styles.css:277` | **Propuesta de resolución de alcance:** V2 reduce el tamaño del hero móvil pese a la restricción heredada. | El handoff V2, línea 24, declara pasar de 17 a 16,4 vw para resolver 1 px de overflow. A 360 son 61,2 frente a 59,04 px; la regla también afecta los titulares de estado. | Resolver la contradicción antes de cerrar la tarea: autorización explícita del ajuste tipográfico o solución de layout que conserve la escala aprobada. No cambié ni restauré tamaños porque el pedido actual lo prohíbe. |
| 8 | baja | `.agents/skills/pixel-perfect/SKILL.md:40` | **Propuesta:** la documentación todavía describe el cálculo anterior. | Afirma que añade 0,06 em; el script actual utiliza métricas de canvas. La alternativa manual de línea 71 sí resuelve la continuidad de la revisión anterior. | Actualizar la descripción y sus límites, sin presentar la estimación como medición exacta del contorno. |
| 9 | baja | `v3/build-pages.mjs:52` | **Corregido:** se conservaba la versión de caché de la revisión anterior. | Los ocho HTML seguían usando `styles.css?v=20261023-grid-meta`; `app.js` no tenía versión pese a los cambios de V2. | Mantener las nuevas referencias sincronizadas con el generador. |

## Correcciones aplicadas directamente por Codex

| # | Archivo | Cambio | Motivo |
|---|---|---|---|
| 1 | `v3/build-pages.mjs:52` y los ocho HTML de `v3/statement/` | Sustituido `styles.css?v=20261023-grid-meta` por `styles.css?v=20261023-grid-v2`. | Evitar que una caché conserve la hoja anterior a V2. |
| 2 | `v3/build-pages.mjs:59` y los mismos ocho HTML | Añadido `?v=20261023-grid-v2` a `app.js`, condicionado a Statement en el generador. | Sincronizar el marcado actualizado y conservar el cambio al regenerar. Stage y Poster mantienen sus salidas actuales. |

## Verificación ejecutada

- Leídos `AGENTS.md`, `CLAUDE.md`, protocolo, plantilla, ambos handoffs, revisión V1, `docs/v3-propuestas.md`, skill, auditor, CSS y app de Statement, base/runtime compartidos y generador. Rama: `exploration/v3-propuestas`.
- `node server.js` falla con **listen EPERM 127.0.0.1:3456**. El auditor ejecutado con salida temporal en `/tmp/pixel-perfect-codex-v2` falla con **Chrome exited early, code null**. No hubo nueva auditoría de navegador ni nuevos informes/capturas; estos fallos no equivalen a cero hallazgos.
- Comprobados los 56 registros de `.pixel-perfect/v2/report.json`: ocho rutas y siete anchos, con **0 altos, 0 medios y 51 bajos** según el instrumento anterior a esta revisión. Cinco bajos son `inset` sin padding; no son todos rellenos legítimos como afirma el handoff. Los informes originales se conservaron.
- Inspeccionadas visualmente **12 capturas** existentes: Home a 1440/1024/360; Motion a 1440/768; Registro a 1500; Menores a 768; artículo Mercado Libre a 1440; artículo autos a 390; en construcción a 1440/360; y 404 a 1280. La vista general de capturas largas permite contrastar composición, pero no certificar cada glifo a tamaño real. No se inspeccionaron visualmente las otras 44.
- Ejecutada la función real `measure` extraída del auditor en una VM con DOM y métricas sintéticos: reproducidos el falso `inset` de 0 px, el inset por el lado opuesto del ancestro y el recorte vertical omitido en un panel mayor de 3 em. Casos separados con `data-grid-ignore` y `--ignore` suprimen los hallazgos de sus descendientes. Son comprobaciones de lógica, no mediciones de navegador.
- En código, alineación y near-miss parten de nodos filtrados por `excluded`; clipping también lo consulta. El overlay reconstruye el elemento por ruta y coordenada sin repetir ese filtro. El `page-overflow` global conserva deliberadamente la señal del documento completo, aunque se ignore un elemento.
- Calculada la retícula con raíz de 16 px: `C = (W − 2M − 11G) / 12`, inicio de columna `n = M + (n−1)(C+G)`. `main.a-ar` no tiene padding ni ancho limitado; los porcentajes de `.a-ar__body` se resuelven contra el ancho de main.

| Viewport | Margen | Gutter | Columna | Artículo: X inicial / ancho |
|---|---:|---:|---:|---:|
| 1500 | 28 | 30 | 92,833 | 396,5 / 707 |
| 1440 | 28 | 28,8 | 88,933 | 381,2 / 677,6 |
| 1280 | 25,6 | 25,6 | 78,933 | 339,2 / 601,6 |
| 1024 | 20,48 | 20,48 | 63,147 | 271,36 / 481,28 |
| 768 | 16 | 16 | 46,667 | 78,667 / 610,667 |
| 390 | 16 | 16 | 15,167 | 16 / 358 |
| 360 | 16 | 16 | 12,667 | 16 / 328 |

- Confirmadas columnas 4–9 del artículo a partir de 1024, 2–11 entre 768 y 1023 y ancho interior completo en móvil. Metadatos: columnas 1/5/9 y apilado móvil. Ledger/blog/contacto conservan sus overrides de subgrid; no se identificaron columnas implícitas por esas asignaciones. La carrera usa diez columnas interiores y su pie comparte subgrid; el footer legal usa 1/10 y vuelve a flex en móvil.
- El padding simétrico del eje de Motion se cancela al calcular el inicio de su segunda mitad: con gutter común coincide con la columna 10 en desktop y la 7 en tablet, al ocupar allí todo el ancho. Los vídeos pareados comparten esos inicios. Esto verifica geometría declarada, no tamaños intrínsecos en ejecución.
- Pasan `node --check` por separado para auditor, `app.js`, `site.js` y generador, y `git diff --check`. Generador ejecutado en VM con escritura interceptada: sus **24 shells coinciden** con los archivos actuales; no se regeneraron Stage ni Poster.
- Pendiente: nueva ejecución de las ocho rutas en EN/ES y revisión real de menú abierto, preview del ledger y estados interactivos. No se certifica ausencia global de overflow ni precisión óptica a partir de la evidencia disponible.
# Revisión: switch-codigo v1

## Veredicto

Requiere cambios

## Resumen

La diagramación de Switch respeta la grilla y las desviaciones documentadas frente a Figma. El pendiente principal es editorial: Home presenta como realizado el impacto que el caso describe como esperado. Ambas formulaciones vienen de fuentes aprobadas; reconciliarlas requiere determinar cuál refleja el estado real.

Se conservan las correcciones previas de nombres accesibles y caché. No se aplicaron más cambios de implementación. Revisión guardada en `intercambio/revisiones/2026-10-27_switch-codigo_v1_revision.md`. Sin commit, push ni publicación.

## Hallazgos

| # | Severidad (crítica/alta/media/baja) | Archivo:línea | Hallazgo | Evidencia | Recomendación |
|---|---|---|---|---|---|
| 1 | alta | `v3/shared/content.js:1797`, `v3/shared/content.js:1762` | Home afirma «Impacted / Impacté» a 200k personas, pero el cierre presenta ese alcance como esperado y declara que el cambio no estaba implementado al salir del proyecto. «Outcomes / Logros» refuerza la ambigüedad. | Contradicción en EN y ES, visible en Home y caso. El cierre coincide con V2; el impacto de Home procede del copy aprobado. | Reconciliar Home, estado y cierre. Sin evidencia posterior de lanzamiento, presentar 200k como alcance estimado; si existe, contextualizar el cierre. Propuesta sin aplicar. |
| 2 | media | `v3/shared/content.js:1677`, `v3/shared/content.js:1724`; `v3/shared/site.js:108` | Faltan etiquetas visibles que distingan la experiencia previa de la propuesta y vinculen cada variante con su caso de uso. Los primeros fotogramas son muy parecidos. Los nombres accesibles resuelven la identificación para lectores de pantalla, pero no visualmente. | PNG de navegador a 1600/1280/768/390 y posters. V2 incluye captions y recorridos textuales; V3 concentra la descripción en `aria-label`, siguiendo Figma. | Proponer etiquetas breves EN/ES por figura o una indicación visible inequívoca del orden. Conservar las descripciones accesibles. Sin aplicar porque modifica la composición aprobada. |
| 3 | baja | `v3/shared/content.js:1585`, `v3/shared/content.js:1654`, `v3/shared/content.js:1666`, `v3/shared/content.js:1701` | Persisten «On develop», Title Case en dos títulos y «Comparativas experiencias». El nombre EN del caso también difiere del usado en V2. | EN reproduce Figma; el español citado ya existe en `js/country-v2.js`. Son pendientes heredados de las fuentes. | Proponer «In progress», sentence case y «Comparación de experiencias»; acordar un nombre EN común. Sin modificar copy aprobado. |

## Correcciones aplicadas directamente por Codex

| # | Archivo | Cambio | Motivo |
|---|---|---|---|
| 1 | `v3/statement/app.js:327` | Se conserva la corrección previa en `wire`: identifica cada video de Switch, conecta su botón mediante `aria-controls` y añade su descripción bilingüe a los spans Play/Pausa, también en Home. | Permite distinguir los controles en una lista de botones. Conserva el texto visible y el cambio de nombre según el estado; limita el efecto a Switch. |
| 2 | `v3/build-pages.mjs:60` y los 9 HTML de Statement | Se conserva `app.js?v=20261027-switch-review` en el generador y todas sus páginas consumidoras. | Evita reutilizar desde caché la versión anterior. Concordancia comprobada; no fue necesario regenerar páginas. |

## Verificación ejecutada

- Leídos AGENTS.md, CLAUDE.md, protocolo, plantilla, handoff, revisión de Figma, scripts de medición/posters, archivos referidos y checklist `.claude/skills/pixel-perfect/references/checklist.md`, coincidente con la copia de `.agents/skills/`.

- Revisados visualmente los PNG de navegador a 1280/768/390 y `view-1600.png`, fragmentos y vista completa de Figma 1600, overlays ES a 1600/390 y Home a 1600/390. No observé nuevas desalineaciones ópticas, cortes de descendentes, diferencias injustificadas entre figuras ni rupturas de jerarquía. El hero recortado a sangre es intencional. Los videos de 1600 llenan sus columnas y alargan las secciones frente a Figma: excepción documentada.

- Inspeccionado `pixel-perfect/report.json`: **18 combinaciones y cero hallazgos registrados**, correspondientes a Switch EN/ES y Home a 1600/1280/1024/768/390/360. Son resultados entregados, no una auditoría nueva ni una medición posterior a cambios de otras sesiones.

- Checklist: grilla, ancho por columnas, máscaras, consistencia, jerarquía y cuerpo contrastados con CSS y capturas. El encabezado usa el logo de producción; no se añadió media por hover ni una sección redundante. La identificación visual de videos queda observada en #2. Home ES, menú abierto, foco y reproducción no están demostrados por las capturas.

- Estilos compartidos: las reglas de comparación y variantes están bajo `.a-cs--switch`; añadir Switch a los selectores compartidos no modifica las declaraciones existentes de Menores. La banda de Registro corresponde al ajuste de hero registrado el 26 de octubre. **No identifiqué una regresión atribuible a Switch por inspección del CSS**, aunque no certifico una comprobación visual completa de Menores/Registro. Los cambios de otras sesiones quedan fuera de esta revisión.

- Contenido: comparación programática exacta de siete bloques ES con V2: objetivos, contexto, desafíos, comparación, introducción/lista de variantes y cierre. EN contrastado con las capturas Figma disponibles. Se mantienen 2%, 200k y la advertencia de no implementación. Comprobada la existencia de los 14 assets referidos por hero, tarjeta y figuras.

- Videos: los cinco clips internos contienen pista de video y ninguna de audio, según lectura de sus contenedores. Todos tienen descripción EN/ES y botón nativo. Por código, Play/Pausa cambia mediante eventos de reproducción, existe foco visible y `prefers-reduced-motion` evita el autoplay. Las descripciones resumen el propósito; no certifican una alternativa completa a toda la información visual. No se verificaron reproducción real, teclado ni árbol de accesibilidad en esta ejecución.

- Pasaron `node --check` de app, contenido y generador, las comprobaciones de assets/caché y `git diff --check`.

- No se relanzó la auditoría completa. El entorno rechazó iniciar `node server.js` con `listen EPERM 127.0.0.1:3456`; no se ejecutó `measure.mjs` ni se generaron nuevas capturas. El trabajo permanece local y Switch continúa fuera del alcance de publicación autorizado.
# Revisión: registro-codigo v1

## Veredicto

**Aprobado con observaciones.** Sin hallazgos críticos ni altos. Persiste una diferencia de composición de texto en Unified a 768 px. Se corrigió una referencia documental; no fue necesario modificar código.

## Resumen

Registro respeta la composición aprobada: 3 + 4 + 5 en desktop, título seguido de 6 + 6 en tablet y apilado en mobile. Las 192 cajas verificadas en EN/ES presentan una desviación máxima de 0,01 px respecto de la grilla.

La separación entre `.a-cs--grid`, `.a-cs--motion` y `.a-cs--registro` es adecuada (`v3/statement/app.js:153`, `v3/statement/styles.css:385`). Motion y Menores conservan las alturas de su referencia anterior en los 24 pares comparados en navegador.

`min(62.5cqw, 80svh)` expresa correctamente el alto desde el ancho completo de `.a-cs__body`, incluido su uso en videos estrechos. El contenedor `inline-size` está declarado (`v3/statement/styles.css:442`). No recomiendo sustituir la fórmula; quedó verificada en Chrome.

## Hallazgos

| # | Severidad (crítica/alta/media/baja) | Archivo:línea | Hallazgo | Evidencia | Recomendación |
|---|---|---|---|---|---|
| 1 | media | `intercambio/evidencia/2026-10-26_registro-codigo/medidas.md:17`; `v3/shared/content.js:544` | Unified a 768 px es 56,75 px más bajo que Figma. **Pendiente; solo propuesto.** | Chrome EN: 940,13 px; Figma entregado: 996,88 px. Copy de 360 px y video de 360 × 460 px, ambos en grilla. Los demás bloques comparados difieren como máximo 4,11 px. | Contrastar fuente, peso, tracking y composición de líneas con Figma. La diferencia excede el redondeo; no está demostrada una causa exclusivamente de rasterizado. Evitar alturas compensatorias, saltos manuales o cambios de copy. |
| 2 | baja | `intercambio/evidencia/2026-10-26_registro-codigo/medidas.md:33` | La igualdad declarada con la tabla histórica a 390 omitía el cambio de Roadmap por los pasos de 77 px. **Corregido.** | Roadmap actual y referencia anterior corregida: 954,10 px; tabla histórica: 940,10 px. | Conservar la aclaración para evitar falsos positivos de regresión. |

## Correcciones aplicadas directamente por Codex

| # | Archivo | Cambio | Motivo |
|---|---|---|---|
| 1 | `intercambio/evidencia/2026-10-26_registro-codigo/medidas.md:33` | Aclaradas las alturas de Roadmap tras la corrección anterior: 1348,19 px a 1280, 1110,19 px a 768 y 954,10 px a 390. Añadida referencia a la nueva evidencia. | Precisar la comprobación de regresión. |

No se modificaron HTML, CSS, JavaScript de la aplicación, copy ni métricas. Se añadieron evidencia reproducible y esta revisión en `intercambio/`. Cambios previos preservados. Sin commit, push ni despliegue.

## Verificación ejecutada

- Leídos protocolo, AGENTS.md, CLAUDE.md, handoff y referencias de implementación, contenido y revisión anterior. Contrastados estructura y cuatro renders entregados de Figma. No se consultó ni modificó Figma en vivo.
- **Registro EN/ES, Chrome real:** 1600×900, 1280×800, 1024×768, 768×1024, 390×844 y 360×800. Medidos mediante `getBoundingClientRect` los bloques solicitados, títulos, contenidos y cinco videos. Las alturas EN reproducen la columna código del handoff.
- **Grilla y medios:** 192 cajas verificadas; desviación máxima de 0,01 px. Altos de video: 720/640/614,40/460/223,75/205 px según resolución, con ajuste `contain`.
- **Overflow y consola:** en los doce escenarios de Registro, `scrollWidth === innerWidth`, ningún elemento de main sale horizontalmente del viewport y no se observaron errores ni advertencias.
- **Regresión:** 24 pares antes/después de Motion y Menores, en seis resoluciones y ambos idiomas, con imágenes cargadas. Alturas idénticas por sección, Final y Next; sin overflow. Motion conserva pasos de 77 px y Menores sigue sin `.a-cs--grid`.
- **Referencia anterior:** la copia temporal coincide con la entrega actual. Para comprobar regresiones se utilizó `9fdee20` más las correcciones documentadas de la revisión previa. La comparación VM confirma markup equivalente de Motion y Menores EN/ES, normalizando la clase añadida y espacios entre etiquetas. CSS anterior al bloque de plantilla, `site.js` y `content.js` intactos. [Resultados](/Users/dave/Documents/Personal/davidmontealegreux-site/intercambio/evidencia/2026-10-26_registro-codigo-review/regression.json).
- **Accesibilidad y motion:** Enter pausa el video de Agnostic a 390 y conserva foco visible. Listas y encabezados presentes en Chrome AX. Entradas de main computadas en 500 ms. Reduced motion revisado en código, sin emulación.
- **Comprobaciones estáticas:** `node --check` en `app.js`, `site.js` y `build-pages.mjs`, y `git diff --check`: pasan. Cache CSS/JS coherente en los ocho HTML y el generador.
- **Límites:** Taste inspect y pixel-perfect audit no pudieron iniciar Chrome headless; se sustituyeron por mediciones y capturas de Chrome conectado. Taste lint señaló el foco preexistente del formulario de contacto, fuera de alcance. Impeccable emitió avisos tipográficos contra DESIGN.md de V2 que no justifican cambiar la escala V3 aprobada. Safari, Firefox, lectores de pantalla y dispositivos físicos no probados.
- [Mediciones completas y método](/Users/dave/Documents/Personal/davidmontealegreux-site/intercambio/evidencia/2026-10-26_registro-codigo-review/verificacion.md). [Revisión guardada](/Users/dave/Documents/Personal/davidmontealegreux-site/intercambio/revisiones/2026-10-26_registro-codigo_v1_revision.md).
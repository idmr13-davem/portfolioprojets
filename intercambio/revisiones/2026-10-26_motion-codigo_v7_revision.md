# Revisión: motion-codigo v7

## Veredicto

**Aprobado con observaciones**

## Resumen

Los clips y posters nuevos están referenciados correctamente en Statement, Stage y Poster, en EN/ES. Statement incorpora los tres videos en mobile, los objetivos en negrita y el roadmap sin imagen ni tarjetas.

Se corrigieron el recorte de las curvas en Poster, su caché y las duraciones declaradas en el handoff. La validación independiente en navegador sigue pendiente: el entorno impide iniciar el servidor y Chrome.

Respecto a la pregunta del handoff: **el hero no genera botón Play ni controles nativos**, por lo que no existe un foco de ese botón que pueda cortarse junto al borde. Su reproducción en bucle sin control de pausa requiere una decisión adicional.

Revisión guardada en `intercambio/revisiones/2026-10-26_motion-codigo_v7_revision.md`.

## Hallazgos

| # | Severidad (crítica/alta/media/baja) | Archivo:línea | Hallazgo | Evidencia | Recomendación |
|---|---|---|---|---|---|
| 1 | media | `v3/poster/styles.css:158` | **Corregido.** Poster conservaba `9/16` y `cover` para clips de 850×860. | Ese encuadre conserva aproximadamente el 57% del ancho y recorta los extremos de las curvas. El poster inspeccionado contiene información en esos extremos. | Se añadió una regla exclusiva de Motion con proporción original y `contain`. Confirmar visualmente en navegador. |
| 2 | baja | `intercambio/handoffs/2026-10-26_motion-codigo_v7.md:17` | **Corregido.** Los clips no duran todos 2 segundos. | Metadatos `mdhd`: 2,683 / 2,183 / 3,817 segundos. | Conservar las duraciones corregidas. |
| 3 | media | `v3/statement/app.js:160`; `v3/shared/site.js:73`; `:103` | El hero hereda reproducción automática en bucle sin control de pausa. Es preexistente. | `media()` emite `loop` y `data-autoplay`; el hero no añade botón. El movimiento puede continuar más de cinco segundos. | **Propuesta, sin aplicar:** acordar un control accesible para pausar/reanudar o una reproducción finita. Mantener la alternativa estática para movimiento reducido. |
| 4 | baja | `intercambio/evidencia/2026-10-26_motion-hero-v3/measure.mjs:2`; `intercambio/evidencia/2026-10-26_motion-samples/seq-test.mjs:10` | Validación independiente en navegador pendiente. | Servidor: `listen EPERM 127.0.0.1:3456`. Ambos scripts: `Chrome exited early, code null`, exit 1. | Repetir mediciones, secuencia y comprobación visual de las tres variantes y los otros casos en un entorno habilitado. |

## Correcciones aplicadas directamente por Codex

| # | Archivo | Cambio | Motivo |
|---|---|---|---|
| 1 | `v3/poster/styles.css:159` | Añadir una regla limitada a Motion con `aspect-ratio: 850 / 860` y `object-fit: contain`. | Mostrar completas las curvas sin alterar los encuadres de otros casos. |
| 2 | `v3/build-pages.mjs:52` y ocho HTML de `v3/poster/` | Versionar CSS con `20261026-motion-curve-review`. | Evitar caché obsoleta y mantener consistente el generador. |
| 3 | `intercambio/handoffs/2026-10-26_motion-codigo_v7.md:17` | Corregir las duraciones a 2,68 / 2,18 / 3,82 segundos. | Ajustar la documentación a las fuentes. |

Se añadieron el comprobador reproducible y su salida en `intercambio/evidencia/2026-10-26_motion-hero-v3/revision-codex-v7/`.

Se conservaron los cambios ajenos preexistentes. **Sin commit, push, despliegue ni escritura en Figma.**

## Verificación ejecutada

Se leyeron AGENTS.md, CLAUDE.md, protocolo, plantilla, handoff v7, revisión v6 y los archivos implicados de contenido, estilos, renderizadores, extracción y pruebas. La evidencia local previa de Figma se usó como contexto; no se certifica el estado actual del archivo remoto.

| Comprobación | Resultado |
|---|---|
| `node --check v3/shared/content.js` | **PASS**, exit 0. |
| Sintaxis de `v3/build-pages.mjs` y `generate-posters.mjs` | **PASS**, exit 0. |
| `node …/motion-hero-v3/measure.mjs` | **Bloqueada**, exit 1 al iniciar Chrome. Alturas y overflow del autor no reproducidos. |
| `node …/motion-samples/seq-test.mjs 1600` | **Bloqueada**, exit 1 al iniciar Chrome. |
| `node server.js` | **Bloqueada**, exit 1 por `EPERM`. |
| `node …/revision-codex-v7/static-check.mjs` | **PASS**: tres clips y posters existentes; `hero` coincide con el primer elemento de `heroSet`; roadmap sin media. |
| Renderizadores reales en VM: Statement, Stage y Poster, EN/ES | **PASS**: emiten los tres clips, posters y descripción traducida; no emiten la imagen del roadmap. No certifica layout ni reproducción. |
| Registro y Menores en los tres renderizadores, EN/ES | **PASS estático**: renderizan, sus medios locales existen y no incorporan las curvas. Regresión visual pendiente. |
| Caché | **PASS**: contenido en 24/24 HTML, CSS Statement en 8/8, CSS Poster corregido en 8/8 y generador consistente. |
| Dimensiones PNG con `sips` y metadatos MOV con Python | **PASS**: tres posters y pistas de video de 850×860; códec H.264 (`avc1`). No certifica identidad del primer fotograma ni decodificación. |
| `node …/revision-codex-v4/controller-test.mjs` | **9/9 PASS**: orden, parada, reentrada, toma manual, eventos pendientes, limpieza por idioma y movimiento reducido. Simulación del controlador. |
| Inspección del primer poster y captura `hero-390.png` del autor | Curvas completas y ausencia de botón Play. Evidencia aportada, no captura nueva de Codex. |
| Detector Impeccable | Ejecutado, exit 0. Avisos tipográficos en reglas preexistentes; ninguno apunta a la corrección de Poster. |
| `git diff --check` tras las correcciones | **PASS**, exit 0. |

Se mantuvo la omisión declarada del fondo exclusivo de 1280: reconciliarla con Figma requiere una decisión de diseño. La resolución limitada de los videos de expresividad sigue fuera del alcance del nuevo hero.
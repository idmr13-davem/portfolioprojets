# Revisión: Caso Winefast en V3 Statement v1

## Veredicto

Aprobado con observaciones

## Resumen

Winefast implementa el hero, los tres datos, el contexto y los cinco capítulos con 17 capturas en EN/ES, sin resultado final. El CTA de Home abre el caso y los proyectos paralelos siguen fuera del ciclo principal. No encontré defectos funcionales bloqueantes dentro del alcance.

Corregí dos descripciones alternativas imprecisas en ambos idiomas. Quedan por decidir la navegación final respecto a Figma y la validación editorial del español. Se respetaron los cambios de otras sesiones. Sin commit.

## Hallazgos

| # | Severidad (crítica/alta/media/baja) | Archivo:línea | Hallazgo | Evidencia | Recomendación |
|---|---|---|---|---|---|
| 1 | media | `v3/statement/app.js:170`; `v3/statement/app.js:202` | El cierre hereda «Siguiente caso / Registro» y difiere del diseño. | El export `figma/export-1600.png` muestra «Explore more craft / Ropstar». Chrome confirma que el enlace actual apunta a `registro-ml.html`: Winefast no pertenece a `cases`, por lo que su índice es −1. | Proponer navegación específica hacia Ropstar, con etiqueta EN/ES y conservando el ciclo principal. No aplicado: requiere decidir el comportamiento de la plantilla. |
| 2 | baja | `v3/shared/content.js:2050`; `v3/shared/content.js:2047` | El español sigue como propuesta editorial; el inglés de origen contiene «as UI designer». | El handoff:15 identifica ES como propuesto. Ambos idiomas renderizan sin contenido ausente. | Validar ES con David; proponer «as a UI designer» y sincronizar con Figma. No se reescribió el copy aprobado. |
| 3 | baja | `v3/shared/content.js:2033`; `v3/shared/content.js:2143` | Dos alt describían incorrectamente las imágenes. **Corregido.** | El hero contiene splash, inicio, guardados, búsqueda y preferencias, no un detalle de vino sobre un viñedo. El splash muestra uvas y hojas en primer plano. | Resuelto mediante descripciones fieles a los assets, verificadas en el DOM EN/ES. |

## Correcciones aplicadas directamente por Codex

| # | Archivo | Cambio | Motivo |
|---|---|---|---|
| 1 | `v3/shared/content.js:2033` | Corregí el alt EN/ES del hero para identificar sus cinco pantallas. | Evitar información visual falsa para lectores de pantalla. |
| 2 | `v3/shared/content.js:2143` | Corregí el alt EN/ES del splash: uvas y hojas de vid en primer plano. | Describir el asset real. |
| 3 | `v3/build-pages.mjs:62` y sus 29 shells V3 | Actualicé únicamente la versión de `content.js` a `20261027-winefast-review`. | Invalidar su caché conservando los demás cambios existentes. |

## Verificación ejecutada

- Leídos protocolo, plantilla, CLAUDE.md, handoff, archivos y bloques referenciados, scripts, export Figma y evidencias locales. El diff con HEAD incluye otras sesiones; la revisión se limitó a los fragmentos atribuidos a Winefast.
- Chrome conectado sobre `127.0.0.1:3456`: Winefast EN/ES a **1600, 1280, 768, 390 y 360 px CSS**. Overflow horizontal **0** en los diez estados; título de dos líneas, lista ordenada de cinco capítulos, figuras **6/2/3/3/3** y ausencia de Final outcome. Medidas coherentes con el handoff. Viewport temporal restaurado.
- Conservadas las diferencias declaradas frente a Figma: capturas de tres columnas en desktop XL y capturas móviles centradas de aproximadamente **259 × 560**. No se modificaron dimensiones, grilla ni diseño.
- Tras las correcciones: hero y 17 capturas cargados correctamente en ES a 1280; alt corregidos confirmados en ES y EN; hero móvil correcto a 390. Consultas de consola sin warnings ni errores capturados.
- Home: CTA EN abierto mediante clic y destino ES verificado; cuatro bandas principales. Comprobación acotada a 1280 EN de Ropstar, Registro, Motion, Menores y Switch: conservan Final outcome y overflow 0. Ciclo principal intacto.
- `node --check` pasó para `content.js`, `statement/app.js` y `build-pages.mjs`. **19 assets presentes, 800612 bytes**. Generador evaluado en memoria: **29 shells coincidentes**, Winefast solo en Statement. `git diff --check` pasó.
- `measure.mjs en/es` y auditoría pixel-perfect intentados: fallaron al iniciar Chrome headless con `Chrome exited early, code null`. **No se certifica una nueva auditoría automática pixel-perfect**; el reporte del autor se consultó como evidencia previa.
- Taste lint y detector Impeccable evaluados por alcance: los avisos sobre estilos compartidos y la fuente requerida no justifican modificar otras sesiones.
- Evidencia independiente guardada en `intercambio/evidencia/2026-10-27_winefast-codigo/codex-review/browser-checks.md`. Revisión guardada en `intercambio/revisiones/2026-10-27_winefast-codigo_v1_revision.md`.
- No se modificó Figma; no se verificaron dispositivos físicos ni se afirma accesibilidad integral. Una revisión inicial y una confirmación de las correcciones. Sin commit, push ni despliegue.
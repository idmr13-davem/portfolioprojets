# Revisión: menores-codigo v6

## Veredicto

Aprobado

## Resumen

La implementación cumple el handoff: imagen nueva de Menores, franja sin márgenes laterales con padding vertical de 32 px, objetivos en Body strong y paddings correctos. Final outcome conserva margen superior 0. Las reglas están acotadas a Menores.

Los cinco posters de Registro coinciden con la resolución nativa de sus videos y cargan correctamente. Stage y Poster muestran la imagen nueva sin desbordamientos. No encontré defectos atribuibles a v6 que requieran corrección.

Mantendría el salto de **13,37 px entre 1023 y 1024**: no rompe el layout y responde a la interpolación declarada. Unificarlo cambiaría una decisión de diseño; no lo apliqué.

Los WebP conservan transparencia y no presentan defectos visibles en las vistas inspeccionadas. No certifico equivalencia de píxeles con el PNG original, que no estuvo disponible para comparación.

## Hallazgos

| # | Severidad (crítica/alta/media/baja) | Archivo:línea | Hallazgo | Evidencia | Recomendación |
|---|---|---|---|---|---|
| — | — | — | Sin defectos nuevos detectados dentro del alcance de v6. | Comprobaciones responsive, recursos y generación descritas abajo. | Mantener la implementación. |

La diferencia móvil conocida de Final outcome permanece: a 390 EN mide 540 px frente a los 518 de Figma declarados. Corresponde al salto de línea previamente documentado; no es una regresión de v6.

## Correcciones aplicadas directamente por Codex

| # | Archivo | Cambio | Motivo |
|---|---|---|---|
| — | — | Ninguna corrección a código, contenido o assets. | No se encontró un defecto claro que corregir. |

Guardé la revisión y su evidencia. Sin commit, push ni despliegue.

## Verificación ejecutada

- **Lectura:** protocolo, plantilla, AGENTS.md, CLAUDE.md, handoff v6 y antecedentes relevantes; archivos de implementación y scripts referenciados.
- **Sintaxis:** `node --check` de `content.js`, `build-pages.mjs` y `statement/app.js`: aprobados.
- **Menores:** 14 combinaciones EN/ES en 1600, 1280, 1024, 1023, 768, 390 y 360 px. Sin overflow horizontal ni warnings/errors capturados. Peso 700, gaps y paddings correctos; recurso móvil seleccionado en 390/360.

| Ancho | Franja / imagen (px) | Goals EN (px) | Final EN (px) |
|---|---:|---:|---:|
| 1600 | 724 / 660 | 412,83 | 586,37 |
| 1280 | 600 / 536 | 365,24 | 502,51 |
| 768 | 419,97 / 355,97 | 328,49 | 408,31 |
| 390 | 319,97 / 255,97 | 491,70 | 540 |

- **CSS:** reglas verificadas en `v3/statement/styles.css:507–518`; padding inferior del body y margen superior del final en 0.
- **Stage/Poster y regresiones:** Menores en ambas propuestas y Registro/Motion en Statement a cinco tamaños, sin overflow. Inspección visual de Statement desktop/tablet/mobile, Stage desktop/mobile y Poster desktop.
- **WebP:** `sips` confirma 2560×925 y 1440×520, ambos con alfa. Referencias correctas en `v3/shared/content.js:1321` y `:1327`.
- **Posters:** cinco JPEG de 712×1596, coincidentes con las dimensiones leídas de los MOV. Chrome descargó y decodificó los cinco. Referencias verificadas en `content.js:344`, `:413`, `:469`, `:535` y `:601`. El ancho de caja con `contain` no equivale al ancho efectivo de la grabación.
- **Generación/caché:** generador ejecutado en carpeta temporal; 24 HTML idénticos. Versiones correctas de contenido en 24 páginas y CSS Statement en ocho.
- **Integridad:** `git diff --check` aprobado; los tres HTML V2 y `css/case-study.css` sin diferencias frente a HEAD.
- **Limitaciones:** intenté `measure-v6.mjs`, `poster-audit.mjs` y Taste inspect; el entorno bloqueó Chrome headless y el arranque del servidor desde terminal. Sustituí esas comprobaciones por mediciones DOM en Chrome existente contra `localhost:3456`. Impeccable y Taste lint señalaron elementos fuera del bloque revisado. No consulté Figma vivo ni probé la reproducción completa de todos los videos. Restablecí el viewport y cerré la pestaña de prueba.
- **Evidencia completa:** [verificacion.md](/Users/dave/Documents/Personal/davidmontealegreux-site/intercambio/evidencia/2026-10-26_menores-codigo/revision-codex-v6/verificacion.md).
- **Revisión guardada:** [2026-10-26_menores-codigo_v6_revision.md](/Users/dave/Documents/Personal/davidmontealegreux-site/intercambio/revisiones/2026-10-26_menores-codigo_v6_revision.md).
# Revisión: menores-codigo v4

## Veredicto

Aprobado con observaciones

## Resumen

La imagen desaparece de Statement, Stage y Poster en EN/ES. Se conservan el título, los textos y los cuatro pasos. No quedan referencias al asset ni contenedores de media vacíos en V3.

La comparación estructural contra HEAD confirma que el único cambio en el contenido compartido es eliminar `media` de `menores/experience`. Registro, Motion y el resto del contenido permanecen idénticos. Apliqué la actualización de caché exigida por `CLAUDE.md:37`.

## Hallazgos

| # | Severidad (crítica/alta/media/baja) | Archivo:línea | Hallazgo | Evidencia | Recomendación |
|---|---|---|---|---|---|
| 1 | media | `v3/build-pages.mjs:57`; `v3/statement/work/menores-mexico.html:19`; `v3/stage/work/menores-mexico.html:18`; `v3/poster/work/menores-mexico.html:18` | El contenido compartido cambió sin actualizar su URL de caché. Corregido. | Los 24 HTML y el generador cargaban `content.js` sin versión. `CLAUDE.md:37` exige actualizarla al modificar scripts compartidos. | Conservar la versión aplicada en todos los consumidores y el generador. |
| 2 | baja | `intercambio/handoffs/2026-10-26_menores-codigo_v4.md:22` | No reproduje la altura orientativa de 826 px. | Statement mide 793,98 px en EN y ES con viewport CSS efectivo de 1600×900. Cuatro pasos presentes y cero `.cs-media`. El navegador tenía zoom al 90%, compensado al configurar el viewport. | Documentar el entorno si esa altura se usa como referencia. No modificar el diseño para forzarla. |

No quedan defectos funcionales identificados atribuibles a la retirada de la imagen.

El pendiente de Figma está declarado en el handoff; no se comprobó el archivo vivo ni se modificó. El inventario previo conserva «Flow image» en los cuatro tamaños (`intercambio/evidencia/2026-10-25_figma-caso3/inventario-grilla.csv:37`, `:94`, `:151`, `:208`). Propongo sincronizarlo en una tarea de diseño.

## Correcciones aplicadas directamente por Codex

| # | Archivo | Cambio | Motivo |
|---|---|---|---|
| 1 | Los ocho HTML de cada propuesta en `v3/statement/`, `v3/stage/` y `v3/poster/` —24 archivos— | Añadí `?v=20261026-menores-no-experience-image` a la carga de `shared/content.js`. | Invalidar copias anteriores del contenido compartido. |
| 2 | `v3/build-pages.mjs:57` | Añadí la misma versión al generador. | Evitar que una regeneración elimine la corrección. |

Sin cambios adicionales de copy, diseño o comportamiento. Sin commit, push ni despliegue.

## Verificación ejecutada

- **Lectura:** AGENTS.md, CLAUDE.md, protocolo, plantilla, handoff v4, revisión v3 y su evidencia. Inspeccionados contenido y renderizadores de las tres propuestas.
- **Sintaxis y diff:** `node --check v3/shared/content.js`, `node --check v3/build-pages.mjs` y `git diff --check`: aprobados.
- **Contenido:** comparación mediante Node, `vm` y `assert.deepEqual`. Tras eliminar únicamente el antiguo `media` de HEAD, ambos objetos coinciden íntegramente. Cuatro pasos conservados; diff de contenido de 12 líneas eliminadas.
- **Menores:** 30 combinaciones en Chrome: tres propuestas × EN/ES × 1600×900, 1280×800, 768×1024, 390×844 y 360×800. Todas conservan cuatro elementos en `.cs-steps`, sin referencias a `cuenta-menores-registro-app` en `img/source`, sin media ni captions dentro de `#experience` y sin overflow horizontal. Consola capturada sin warnings/errors.
- **Dependencias:** Statement conserva los pasos y condiciona la media (`v3/statement/app.js:136`, `:148`). Stage y Poster usan el renderizador compartido, que también condiciona la media (`v3/shared/site.js:118`, `:121`). No quedan alt ni captions huérfanos del bloque eliminado. El alt del hero corresponde a una imagen que sigue presente.
- **Registro/Motion:** 60 combinaciones adicionales con las mismas propuestas, idiomas y tamaños. Cero overflow, seis y ocho secciones respectivamente y consola sin warnings/errors capturados. La comparación estructural confirma que sus datos no cambiaron; no se realizó una comparación visual exhaustiva.
- **Corrección de caché:** recargados los tres casos Menores en ES. URL versionada confirmada, cuatro pasos, cero media/referencias eliminadas, cero overflow y consola limpia. Verificados los 24 consumidores.
- **Generador:** ejecutado en carpeta temporal; los 24 HTML generados coinciden byte por byte con los archivos del proyecto.
- **V2:** `git diff --exit-code -- work/menores-mexico.html` aprobado. Conserva la imagen en el hero (`:10`, `:19`), según la exclusión del handoff. Los assets no se borraron.
- **Herramientas visuales:** Impeccable context y detect ejecutados; detector sin hallazgos en el contenido. Taste lint sin fallos, con un aviso global por siete rayas largas preexistentes. Taste inspect no pudo iniciar Chrome; se usaron mediciones DOM y capturas del navegador existente. Inspección visual limitada a Statement desktop y Poster móvil; no constituye una auditoría integral de accesibilidad o animaciones.
- **Entorno:** el sandbox rechazó iniciar otro servidor (`EPERM`); las pruebas usaron el servidor existente en localhost:3456. Viewport temporal retirado y pestaña de prueba cerrada.
- **Registro:** revisión guardada en [2026-10-26_menores-codigo_v4_revision.md](/Users/dave/Documents/Personal/davidmontealegreux-site/intercambio/revisiones/2026-10-26_menores-codigo_v4_revision.md).
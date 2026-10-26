# Revisión: motion-codigo v2

## Veredicto

**Aprobado con observaciones.** Cumple el handoff y sus dos ampliaciones. Persisten diferencias de composición de texto aceptadas en v1. No encontré defectos funcionales nuevos ni regresiones fuera del cambio autorizado de Context en Registro.

## Resumen

La media de Motion respeta columnas 4–12 en desktop. Tablet y móvil conservan tarjetas de 77 px y media a 12 columnas. Las viñetas aparecen en los bloques pedidos y Final outcomes sigue al Body sin margen adicional.

Respuestas a las preguntas del handoff:

1. **Grilla:** correcta. Media x/ancho: 422/1150 a 1600; 339.203/915.203 a 1280; 271.359/732.172 a 1024. Desviación respecto al contenido inferior a 0.02 px por redondeo (`v3/statement/styles.css:417`).
2. **`ol` con viñetas:** conserva la lista nativa y resulta razonable para pasos secuenciales. Chrome expone cuatro listitems. No requiere cambiar markup ni añadir ARIA; el anuncio en lectores de pantalla queda sin verificar (`v3/statement/app.js:136`).
3. **Benchmark:** `height:80svh` está limitado a su imagen en desktop. Roadmap conserva su altura natural y los ejemplos su proporción (`v3/statement/styles.css:443`).

La regla compartida resulta proporcional a los dos consumidores actuales. Registro cambia únicamente el ancho del video Context en desktop, según la ampliación autorizada. Menores conserva sus medidas.

## Hallazgos

| # | Severidad (crítica/alta/media/baja) | Archivo:línea | Hallazgo | Evidencia | Recomendación |
|---|---|---|---|---|---|
| 1 | baja | `v3/statement/styles.css:389`; `v3/statement/app.js:128` | Dos comentarios describían media a 12 columnas en todos los tamaños. **Corregido.** | La regla desktop y las mediciones sitúan la media en columnas 4–12. | Conservar la descripción diferenciada por breakpoint. |
| 2 | media | `intercambio/evidencia/2026-10-25_motion-codigo/medidas.md:12`; `medidas.md:15` | Persisten diferencias de texto a 390 EN en Challenges y Benchmark. **Aceptadas previamente; sin cambios.** | Challenges: 635.344 frente a 662.8 px; Benchmark: 1081.375 frente a 1108 px. Anchos e imágenes coinciden. Roadmap queda a menos de 1 px de su objetivo v2. | Si se exige cerrar la fidelidad, contrastar métricas de fuente y composición de líneas con Figma. No atribuirlo exclusivamente a rasterizado ni compensarlo con alturas o saltos manuales. |
| 3 | baja | `intercambio/handoffs/2026-10-26_motion-codigo_v2.md:50`; `:51`; `:95` | El cuadro inicial conserva cifras anteriores a Surface/Main; “Registro sin cambios” queda superado por la ampliación. | A 1280, Benchmark final mide 964.984 y la página 10599, frente a 906.55/10541 del cuadro inicial. Solo cambia el ancho autorizado de Context. | Consolidar las cifras finales y aclarar la excepción de Registro en el próximo handoff. Se conserva el original como registro de entrega. |

## Correcciones aplicadas directamente por Codex

| # | Archivo | Cambio | Motivo |
|---|---|---|---|
| 1 | `v3/statement/styles.css:389` | Comentario actualizado: media en columnas 4–12 desktop y 12 columnas tablet/móvil. | Eliminar documentación contradictoria con la regla compartida. |
| 2 | `v3/statement/app.js:128` | Misma precisión en el comentario de `gridSection`. | Describir correctamente la plantilla sin cambiar el renderer. |
| 3 | `intercambio/evidencia/2026-10-26_motion-codigo-v2-review/` | Añadidas mediciones, baseline controlado y hashes del estado revisado. | Dejar evidencia y límites de las pruebas. |

## Verificación ejecutada

- Leídos AGENTS.md, CLAUDE.md, protocolo, plantilla, handoffs v1/v2, revisión v1, medidas y referencias de estructura/grilla. Inspeccionados renderer, contenido, estilos, runtime, ocho HTML y generador. **Sin consulta ni edición de Figma en vivo**; contraste contra la evidencia entregada.
- **Chrome real, Motion EN/ES:** seis viewports, doce escenarios, fuentes e imágenes cargadas. En todos: `scrollWidth === innerWidth`, ningún descendiente de main fuera del viewport horizontalmente y sin warnings/errores capturados.

| Viewport | Página EN / ES | Roadmap EN | Benchmark EN | Imagen benchmark |
|---|---:|---:|---:|---|
| 1600×900 | 12070 / 12448 | 1076.594 | 1112.234 | 1150×720 |
| 1280×800 | 10599 / 11079 | 884.875 | 964.984 | 915.203×640 |
| 1024×768 | 9483 / 10052 | 746.156 | 882.344 | 732.172×614.391 |
| 768×1024 | 10040 / 10470 | 1110.172 | 774.922 | 736×467.703 |
| 390×844 | 14300 / 15148 | 954.094 | 1081.375 | 358×675.188 |
| 360×800 | 14135 / 15360 | 937.875 | 1071.688 | 328×640 |

- **Composición:** ejemplos 362×774 en x=422/816/1210 a 1600; 288×693.75 a 1280. Gaps Roadmap/expresividad de 64/48 en 1600 y 40/12 en el resto. Tarjetas tablet/móvil de 77 px. Viñetas, fondos y ausencia de margen previo a Final outcomes comprobados. Footer EN conservado: 472.219 en tablet y 552.5 a 390.
- **Regresión:** 24 pares actual/baseline, Registro y Menores × seis tamaños × EN/ES. Baseline elimina únicamente la regla compartida de media a nueve columnas. Menores idéntico; Registro solo cambia el ancho de Context en desktop, sin alterar alturas ni otras secciones. Los cuatro pares móviles de Menores se repitieron tras cargar su imagen lazy en `#experience`; igualdad confirmada. Esta comparación aísla la ampliación, no equivale a comparar todo el sitio contra v1.
- **Accesibilidad:** listas presentes en Chrome AX; Enter reproduce y pausa el primer ejemplo, con foco visible. Reveals computados de 0.5 s. Reduced motion revisado en código, sin emulación. No probados lectores de pantalla, Safari/Firefox, zoom/texto aumentado ni dispositivo físico.
- Pasan `node --check` de `app.js`, `shared/site.js` y `build-pages.mjs`, y `git diff --check`. Caché `20261026-benchmark-surface` coherente en ocho HTML y generador. Cambios de Codex limitados a comentarios, comprobados contra la copia previa; no requieren renovar caché.
- Impeccable context y detect ejecutados. Los avisos tipográficos frente a DESIGN.md global no justifican modificar la escala V3 aprobada. Se preservaron los gaps y las diferencias desktop/tablet entregadas; propagarlas requiere una decisión de diseño.
- [Evidencia detallada](/Users/dave/Documents/Personal/davidmontealegreux-site/intercambio/evidencia/2026-10-26_motion-codigo-v2-review/verificacion.md). [Revisión guardada](/Users/dave/Documents/Personal/davidmontealegreux-site/intercambio/revisiones/2026-10-26_motion-codigo_v2_revision.md). Hashes finales estables y viewport restaurado. Cambios previos preservados. **Sin commit, push ni despliegue.**
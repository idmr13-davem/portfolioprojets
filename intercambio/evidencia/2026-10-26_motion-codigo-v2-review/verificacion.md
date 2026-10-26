# Verificación independiente — motion-codigo v2

2026-10-26. Chrome real conectado mediante cua_repl, viewports emulados. Servidor localhost:3456 existente. Sin cambios en Figma. Contraste con las tablas del handoff v2, incluidas ambas ampliaciones, y las referencias v1 (medidas, revisión, estructura y CSV de grilla).

## Motion

getBoundingClientRect para geometría, getComputedStyle para listas, fondos y gaps; offsetHeight para tarjetas. Fuentes cargadas, imágenes con complete y naturalWidth > 0. En los doce escenarios: scrollWidth = innerWidth, ningún descendiente de main fuera del viewport horizontalmente, sin warnings/errores capturados durante las navegaciones.

| Viewport | Página EN | Página ES | Roadmap EN | Benchmark EN | Building EN | Final EN | Next EN |
|---|---:|---:|---:|---:|---:|---:|---:|
| 1600×900 | 12070 | 12448 | 1076.594 | 1112.234 | 1940.844 | 546.781 | 312.5 |
| 1280×800 | 10599 | 11079 | 884.875 | 964.984 | 1775.656 | 459.141 | 258.891 |
| 1024×768 | 9483 | 10052 | 746.156 | 882.344 | 1702.656 | 377.375 | 212.141 |
| 768×1024 | 10040 | 10470 | 1110.172 | 774.922 | 1977.219 | 348.266 | 178.875 |
| 390×844 | 14300 | 15148 | 954.094 | 1081.375 | 3105.656 | 524 | 267 |
| 360×800 | 14135 | 15360 | 937.875 | 1071.688 | 3060.688 | 524 | 267 |

| Viewport | Media x | Ancho media | Alto imagen Roadmap | Alto imagen Benchmark | Ejemplos: ancho × alto de figura |
|---|---:|---:|---:|---:|---|
| 1600×900 | 422 | 1150 | 621.594 | 720 | 362×774 |
| 1280×800 | 339.203 | 915.203 | 494.688 | 640 | 288×693.75 |
| 1024×768 | 271.359 | 732.172 | 395.75 | 614.391 | 230.406×585.453 |
| 768×1024 | 16 | 736 | 397.828 | 467.703 | 234.66×593.813 |
| 390×844 | 16 | 358 | 193.5 | 675.188 | 358×726.281 |
| 360×800 | 16 | 328 | 177.281 | 640 | 328×691 |

Ejemplos de la tabla en EN. En ES algunas captions móviles ocupan menos líneas; las cajas de video conservan sus dimensiones. Todos los anchos de media coinciden en ambos idiomas. La fórmula de columnas 4–12 coincide con el contenido con desviación de redondeo inferior a 0.02 px en 1280/1024; a 1600 coincide exactamente. Los tres ejemplos de 1600 empiezan en x=422/816/1210; a 1280, 339.203/652.797/966.391.

Roadmap: gap sección 64 en 1600 y 40 en el resto; gap copy/pasos = 0 en desktop. Primera parte de expresividad: gap 48 en 1600, 12 en el resto. Benchmark: object-fit contain, fondo rgb(10,35,35) en todas las resoluciones; roadmap transparente. El height:80svh adicional solo selecciona el benchmark desktop. Roadmap conserva altura natural y ejemplos su proporción con límite de alto.

Desktop: viñetas solo en Challenges, frecuencia, pasos y Final outcomes. Objectives, Outcomes y extremos del eje sin viñetas. Tablet/mobile: tarjetas con min-height/alto medido de 77, padding 24 y fondo Deep; listas sin viñetas salvo Final outcomes. Final margin-top = 0 en todos los tamaños; comprobación directa adicional a 1280: borde final de Body = borde inicial de Final outcomes.

Footer EN: 445 a 1600, 414.469 a 1280, 389.766 a 1024, 472.219 a 768, 552.5 a 390 y 546.219 a 360. No se modificó. En español crece por el texto.

Las cifras de página a 1280 del primer cuadro del handoff son anteriores a la ampliación Surface/Main: resultado final 10599, frente a 10623.33 de Figma entregado (−24.33), no 10541. A 1600: −18.5; a 768: −16.43; a 390: −74.54. No se compensaron alturas globales. A 390 persisten Challenges 635.344 vs 662.8 (−27.456) y Benchmark 1081.375 vs 1108 (−26.625). Roadmap 954.094 vs 955 queda a menos de 1 px; no corresponde seguir considerándolo una diferencia importante. La causa de las diferencias de texto no se demuestra con estas pruebas.

## Regresión controlada: Registro y Menores

baseline.css copia el CSS al iniciar esta revisión y quita únicamente la declaración compartida `.a-cs--grid .cs-section > .cs-media` de desktop. Los HTML baseline usan base href hacia los HTML originales y los mismos app.js, content.js y site.js. Así se aísla el efecto de la ampliación 3+9 sin mezclar cambios anteriores de Registro. No representa una restauración histórica de v1.

24 pares actual/baseline: ambos casos × seis viewports × EN/ES. Comparados offsetWidth/offsetHeight de secciones y sus medios, Final/Next, alto total, overflow e imágenes cargadas.

- Menores: igualdad de tamaños de todos esos bloques y de página en los doce pares.
- Registro: solo cambia el ancho de Context en los seis pares desktop; alturas, resto de secciones, Final, Next y página idénticos. Tablet/mobile: todos los tamaños idénticos.
- Context de Registro: 1150×720 a 1600; 915×640 a 1280; 732×614 a 1024; 736×460 a 768; 358×388 a 390; 328×388 a 360 (offsetWidth/offsetHeight redondeados).
- Sin overflow de página ni descendientes de main; sin warnings/errores capturados.
- Los cuatro pares móviles de Menores se repitieron navegando a #experience: la captura fullPage inicial desde #context no había cargado la imagen lazy. Tras cargarla, complete/naturalWidth correctos en actual y baseline, igualdad completa de medidas. Página EN/ES: 9275/9585 a 390, 9358/9626 a 360. No se usaron alturas previas a la carga como evidencia final.

## Accesibilidad y controles

Chrome AX expone el roadmap como lista con cuatro listitems y viñetas en desktop. El ol sigue siendo apropiado para pasos secuenciales; list-style:disc cambia la presentación sin eliminar la lista nativa. No se añadió ARIA ni markup duplicado por breakpoint. No se verificó el anuncio concreto de numeración en un lector de pantalla.

Teclado a 1280: Enter activa el primer ejemplo, video.paused=false; otro Enter lo pausa, video.paused=true. Foco con outline solid. Duraciones computadas de reveal en main: 0.5s. Reduced motion comprobado solo en código; sin emulación ni dispositivo físico. No probados Safari, Firefox, zoom/texto aumentado o lector de pantalla.

Inspección visual de Roadmap 1600 y Benchmark 1280/360. Las capturas inmediatas pueden coincidir con el reveal de entrada; la captura posterior de Roadmap muestra el estado final. No se interpretó su opacidad transitoria como fallo.

Pasan node --check de app.js, shared/site.js y build-pages.mjs; git diff --check; caché CSS 20261026-benchmark-surface coherente en los ocho HTML y generador. No se ejecutó el generador sobre las otras propuestas. Comparación con antes-codex-motion-v2 confirma que Codex solo cambió comentarios de app.js/styles.css, sin cambio ejecutable; no requiere nueva caché.

Impeccable context y detect ejecutados. Detector: avisos tipográficos frente a DESIGN.md global; no justifican sustituir la escala V3 aprobada. No se añadieron dependencias ni refactors. snapshot.json contiene los hashes del estado revisado. Viewport restaurado. Sin commit, push ni despliegue.

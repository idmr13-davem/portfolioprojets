# Verificación independiente — registro-codigo v3

2026-10-26. Chrome real conectado mediante cua_repl; viewports emulados, no dispositivo físico. Figma consultado en solo lectura mediante get_metadata, archivo Nodyl6xcEeEwbhi0OBGFnB, frame 5074:1002. No cambios en Figma.

## Registro: estado final

Mediciones de getBoundingClientRect, getComputedStyle y documentElement.scrollHeight/scrollWidth. Fuentes cargadas. Cinco videos en cada escenario; object-fit: contain. Capturas inspeccionadas de Agnostic móvil y Context tablet/desktop. En los diez escenarios, scrollWidth = innerWidth; en la ronda inicial, ningún descendiente de main salía horizontalmente del viewport. Sin warnings ni errores capturados durante las navegaciones.

| Viewport | Alto de cada video | Ancho Context | Página EN | Página ES |
|---|---:|---:|---:|---:|
| 390×844 | 388 | 358 | 8920 | 9471 |
| 360×800 | 388 | 328 | 9098 | 9725 |
| 768×1024 | 460 | 736 | 6829 | 7340 |
| 1280×800 | 640 | 915.203 | 7878 | 8226 |
| 1600×900 | 720 | 1150 | 8760 | 8977 |

A 390: las cinco figuras son 358×419.546875, con captions de 19.546875. A 360: 328×419.5, captions de 19.5. Todas las captions EN/ES ocupan una línea.

| Sección, 390 EN | Figma en vivo | Código | Diferencia código − Figma |
|---|---:|---:|---:|
| Context | 1111.59998 | 1110.234375 | −1.37 |
| Challenges | 310.39999 | 308.984375 | −1.42 |
| Agnostic | 1023.20001 | 1021.3359375 | −1.86 |
| Form | 1218 | 1215.125 | −2.88 |
| Google | 1346.5 | 1345.1328125 | −1.37 |
| Unified | 1372.5 | 1370.6328125 | −1.87 |

Figma confirma cinco Video figure de 358×420 (5074:1037, 1063, 1085, 1109, 1133). Frame completo actual: 8939.810546875; footer 5120:1637 de 554. El handoff entregó una página de 8923.81: el snapshot de diseño cambió 16 px. La tabla de secciones del handoff sí coincide con Figma en vivo. Código frente a la página Figma actual: −19.81 px; frente al snapshot entregado: −3.81 px. No se compensaron alturas globales ni footer.

Unified EN a 768 conserva 940.125, frente a 996.88 en la evidencia anterior: −56.755. No se volvió a consultar ese frame tablet; persiste la observación histórica, sin atribuir una causa nueva.

## Cambios concurrentes

Comparación con antes-codex-registro-v3: al comenzar solo diferían las reglas Motion. Durante la revisión se añadió styles.css:414–418, regla compartida .a-cs--grid .cs-section > .cs-media: afecta al video de Context de Registro en desktop. Ancho anterior: 1544 a 1600 y 1228.8125 a 1280; actual: 1150 y 915.203. Altos sin cambios. La ampliación está documentada en el handoff motion-codigo_v2 y queda fuera del veredicto de fidelidad de esta revisión. Caché final: 20261026-grid-3-9 en ocho HTML y generador. No se revirtió ningún cambio concurrente.

## Regresión aislada

Baseline controlado: copia del CSS final quitando únicamente la declaración mobile de 388px de Registro (baseline.css). Los dos HTML baseline usan los mismos app.js, content.js y site.js actuales. Así se mantienen los cambios concurrentes Motion y se mide únicamente el efecto del override revisado. No es comparación contra la versión histórica de Motion.

20 pares actual/baseline: Motion y Menores × cinco viewports de la tabla × EN/ES. Se navegó también a #benchmark/#flows y se tomó captura fullPage para cargar imágenes. En todos: imágenes completas con naturalWidth > 0, alturas de secciones/Final/Next idénticas, altura total idéntica, sin overflow de página ni descendientes de main, consola sin warnings/errores capturados.

La primera comparación exacta de rectángulos de videos produjo diferencias por las transformaciones de entrada. Se comprobó por separado con tamaños CSS computados y offsetHeight de figura, sin depender del instante de la animación: 20/20 pares idénticos. No se presentan los rectángulos transitorios como regresión.

## Skills y controles

Pixel-perfect SKILL.md:70–71 y checklist.md:9–20 resuelven la contradicción: excepción intrínseca/restricción explícita, contenedor alineado y eliminación de topes limitada al alcance. La externa figma-senior-build corrige el estándar 5, pero su paso 3, línea 95, sigue exigiendo columnas enteras a toda variable de ancho. Propuesta: aplicar esa exigencia al contenedor; conservar la excepción intrínseca/explícita documentada. No se editó la skill externa: fuera de las raíces autorizadas para escritura.

Pasan node --check de app.js, shared/site.js y build-pages.mjs; git diff --check; coherencia de caché de ocho HTML + generador. snapshot.json registra hashes del estado medido, comprobados estables al final de las pruebas.

Taste lint: FAIL preexistente por box-shadow de foco del contacto en styles.css:131; fuera del cambio y conservado. Taste inspect no pudo iniciar Chrome headless (Chrome exited early); no se declara aprobado, sustituido por Chrome conectado. Impeccable context y detect ejecutados; detect solo devolvió avisos de escala tipográfica frente a DESIGN.md global, sin hallazgo en height:388px. No se modificó la escala V3 aprobada.

Única corrección de código: comentario de styles.css:462–464 para distinguir regla tablet/desktop y excepción mobile. Sin cambio de comportamiento ni necesidad de renovar caché por este comentario. Sin commit, push o despliegue. No probados Safari, Firefox, zoom/texto aumentado, lector de pantalla, touch físico ni reduced motion emulado. Viewport restaurado.

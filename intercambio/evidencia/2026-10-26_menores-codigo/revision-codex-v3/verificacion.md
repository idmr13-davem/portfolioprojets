# Verificación independiente — menores-codigo v3

Fecha: 2026-10-26. Chrome existente mediante extensión, localhost:3456. Página recargada; stylesheet observado: styles.css?v=20261026-menores-radius2.

## Método y alcance

DOM mediante getBoundingClientRect, getComputedStyle, videoWidth/videoHeight, scrollWidth y dimensiones reales del viewport. Menores EN/ES y Registro/Motion EN en seis tamaños. Los cambios de viewport se aplicaron a la pestaña activa; la pestaña auxiliar de regresiones se cerró antes de volver a Menores. Sin compensación de zoom: visualViewport.scale=1 y devicePixelRatio=1.

## Menores

Valores iguales en EN y ES. Cuatro videos por tamaño: 48 comprobaciones de radio, Play y separación del caption. Radio 32px, object-fit cover. Cero overflow horizontal.

| Viewport | Ancho figura | Video, ancho × alto | Inset lateral | Play derecha / abajo | Gap caption |
|---|---|---|---|---|---|
| 1600×900 | 362 | 323×719,977 | 19,500 | 11,992 / 12 | 12 |
| 1280×800 | 288,008 | 287,117×639,992 | 0,445 | 11,992 / 12 | 12 |
| 1024×768 | 230,398–230,406 | 230,391–230,406×513,547–513,586 | <0,008 | 11,992–12 / 12 | 12 |
| 768×1024 | 360 | 360×802,453 | 0 | 12 / 12 | 12 |
| 390×844 | 358 | 302,906×675,188 | 27,547 | 11,992 / 12 | 12 |
| 360×800 | 328 | 287,117×639,992 | 20,44 | 11,992 / 12 | 12 |

Captions alineados al borde izquierdo de cada figura, con igual coordenada vertical por fila. A 1024 hay una diferencia subpíxel de 0,039px entre el primer caption y los restantes, explicable por el reparto fraccionario de columnas.

Dimensiones nativas, en orden: 716×1596, 696×1516, 716×1596, 718×1592. cover llena el rectángulo sin bandas añadidas por CSS. La diferencia de proporción del segundo clip frente a 716/1596 es 2,336%; el recorte es 1,142% del ancho nativo por lado, equivalente a 4,205px de imagen escalada por lado cuando la caja mide 360px. No confundir esas dos magnitudes.

Capturas efectivamente inspeccionadas: primer video completo a 390 (esquinas redondeadas sobre la grabación y botón completo); cuatro videos a 1600 en dos encuadres (superior e inferior), con pies alineados, curvas sobre la grabación y botones completos. No se observó pérdida relevante en los fotogramas inspeccionados. Los intentos de capturar los otros videos móviles fuera del viewport devolvieron imágenes vacías y se descartaron; no constituyen evidencia visual. Capturas vistas en herramientas, sin PNG guardados. No se certifican todos los fotogramas, otros motores ni dispositivos físicos.

Pausa/reproducción ejercitada con el botón nativo. Play es hermano del video en la grilla, sin quedar dentro de su recorte; su posición se midió en ambos idiomas. No se repitió la prueba completa de teclado de v1.

## Regresiones

Registro y Motion EN: seis tamaños, todos los videos de figura con radio 0px y cero overflow horizontal.

Registro: a 1600, 1150×720 y 624,672×720; a 1280, 915,203×640 y 497,070×640; a 1024, 732,164×614,398 y 397,664×614,398; a 768, 736×460 y 360×460; a 390 y 360, ancho de columna y 388 de alto.

Motion: a 1600, verticales 362×720 y muestras 362×362; a 1280, aproximadamente 288×640 y 288×288; a 768, expresividad 234,66×521,47, muestras cuadradas y ejemplos 360×812,023; a 390, verticales 358×675,195 y muestras 171×171; a 360, verticales 328×640 y muestras 156×156. Coherentes con las referencias anteriores y las reglas existentes. También comprobado 1024: expresividad ~230,4×512, muestras ~230,4 cuadradas y ejemplos ~230,4×519,71.

Consola capturada: cero warnings/errors en Menores y en la pestaña de Registro/Motion. No equivale a auditoría de red.

## Estático y límites

- Comparación de los once archivos de la copia antes-codex-menores-v3: todos idénticos a la entrega antes de la corrección de comentario. Esa copia ya contiene v3; no permite comparación A/B con v2. Regresiones contrastadas con CSS y evidencia v1/v2.
- node --check: app.js, content.js y build-pages.mjs aprobados. git diff --check aprobado.
- Ocho HTML y generador coherentes con menores-radius2; token --radius-l:32px en css/tokens/figma.css:79.
- Impeccable context y detect ejecutados; avisos tipográficos advisory preexistentes, ninguno en el bloque Menores.
- Taste lint: un FAIL por box-shadow en styles.css:131. Inspección: indicador de foco del input, no sombra decorativa ni regla nueva; se conserva por accesibilidad.
- Taste inspect intentado: no pudo iniciar Chrome (Chrome exited early, code null). Reemplazado por las mediciones y capturas anteriores; no se presenta como aprobado.
- Sin nueva lectura de Figma ni audit de grilla completo; no forman parte de las pruebas de v3.
- Única corrección: precisión del comentario en styles.css:498, sin cambiar declaraciones CSS ni comportamiento. No requiere nueva caché por no alterar el renderizado.
- Español restaurado, viewport override retirado y pestaña auxiliar cerrada. Sin commit, push ni despliegue.

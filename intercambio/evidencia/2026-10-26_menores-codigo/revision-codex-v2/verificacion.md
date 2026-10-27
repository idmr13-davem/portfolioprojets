# Verificación independiente — menores-codigo v2

Fecha: 2026-10-26. Chrome existente mediante extensión; servidor del usuario en localhost:3456. Se recargó la página: la pestaña anterior aún cargaba `menores-play`, con radio 0. Después de recargar carga `menores-radius`, radio 32. No se reutilizaron esos valores anteriores como evidencia de la entrega actual.

## Método

DOM: getComputedStyle, getBoundingClientRect, videoWidth/videoHeight y scrollWidth. Viewports CSS exactos, confirmados con innerWidth/innerHeight. Se descartó la primera serie con compensación de zoom innecesaria; el navegador ya estaba al 100 %. Menores ES y EN en los cinco tamaños. Registro y Motion EN en esos mismos cinco tamaños. Inspección visual mediante capturas del navegador de Menores a 1600, 390 y 360; las capturas se mostraron en las herramientas y no se guardaron como archivos. No se certifica cada fotograma de las grabaciones.

## Menores

Cada fila corresponde a los cuatro videos; medidas idénticas en EN/ES. Radio computado 32 px en las 40 comprobaciones. Todos los botones están a 12 px de los bordes derecho e inferior; son hermanos del video en la grilla, no descendientes de su recorte. Overflow de figura visible. Sin recorte de Play ni de su foco en las capturas inspeccionadas.

| Viewport | Elemento video (px) | Banda lateral por lado, video 1 (px) |
|---|---|---|
| 1600 × 900 | 362 × 720 | 19,50 |
| 1280 × 800 | 288,01 × 640 | 0,45 |
| 768 × 1024 | 360 × 802,45 | ~0 |
| 390 × 844 | 358 × 675,20 | 27,55 |
| 360 × 800 | 328 × 640 | 20,44 |

Proporciones nativas leídas del navegador, en orden: 716×1596, 696×1516, 716×1596 y 718×1592. Banda calculada con scale=min(ancho/videoWidth, alto/videoHeight), por lado=(ancho-videoWidth*scale)/2. A 390 el segundo video tiene 24,01 px laterales por lado. A 768 ese segundo video tiene 9,16 px de banda superior e inferior. La máscara redondea el elemento completo, incluidas esas bandas: no produce un radio uniforme de 32 px en el contenido grabado. Las capturas muestran el resultado visual y el Play completo.

Alturas comparadas con la evidencia v1: 720, 640, ~802,45, ~675,56 y 640. La diferencia móvil de ~0,36 px respecto de aquella sesión es compatible con el redondeo/zoom documentado allí. No se ejecutó una comparación A/B con la versión previa al radio: la copia antes-codex-menores-v2 ya contiene la regla actual y coincide byte a byte en los archivos comparables. La propiedad border-radius no interviene en el cálculo de altura; no hay evidencia de regresión dimensional.

## Registro y Motion

Sin overflow horizontal, radios de todos los videos de figura 0 px en las cinco resoluciones. Registro a 1600: contexto 1150×720, restantes 624,67×720; a 768: contexto 736×460, restantes 360×460; móviles: alto 388. Motion a 1600: videos verticales 362×720 y muestras 362×362; a 1280: verticales ~288×640; a 390: verticales 358×675,20 y muestras 171×171; a 360: verticales 328×640 y muestras 156×156. Coherentes con las reglas anteriores y la referencia v1.

## Comprobaciones restantes

- Menores EN/ES y regresiones EN: scrollWidth-innerWidth=0 en todos los tamaños.
- Consola capturada mediante tab.dev.logs, niveles warn/error: [] para los tres casos. No equivale a una auditoría de red ni a reproducción completa.
- node --check: app.js, content.js y build-pages.mjs aprobados. git diff --check aprobado.
- Ocho HTML con styles.css?v=20261026-menores-radius y generador coherente. Token canónico --radius-l:32px en css/tokens/figma.css:79.
- Impeccable context y detect ejecutados una vez; detector con avisos tipográficos advisory preexistentes, ninguno referido a la regla 496.
- No se leyó Figma de nuevo ni se ejecutó el audit de grilla de v1: no los solicita este handoff. Se leyó la revisión y evidencia previa.
- El shell no pudo conectar a 127.0.0.1 y node server.js devolvió EPERM al escuchar; el navegador sí accedió al servidor existente localhost y permitió ejecutar las pruebas.
- Se restauró ES y se retiró el override de viewport. Pestaña temporal de regresión cerrada. Sin commit, push ni despliegue; código intacto.

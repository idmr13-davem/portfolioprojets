# Verificación independiente — registro-codigo v2

Chrome real conectado por cua_repl. Fecha: 2026-10-26. Sin modificación de Figma. Comparación de diseño contra la tabla v2 entregada, no contra Figma en vivo.

## Método

Viewport override con 1600×900, 1280×800, 768×1024, 390×844 y 360×800. Navegación con ?lang=en/es. Medidas de getBoundingClientRect y getComputedStyle; se leyó lang real. Scroll y capturas para revisión visual. Todas las imágenes de las lecturas aceptadas tenían complete y naturalWidth > 0. Consola del tab: sin errores ni warnings capturados.

## Final outcomes: resultados EN

| Viewport | x / ancho título, intro y lista | x / ancho ítems | Alto intro | Alto lista | Alto ítems | Alto Final |
|---|---|---|---|---|---|---|
| 1600×900 | 28 / 1544 | 80.796875 / 1491.203125 | 45.59375 | 194.296875 | 38.015625 / 38.015625 / 76.03125 | 607.484375 |
| 1280×800 | 25.59375 / 1228.8125 | 67.828125 / 1186.578125 | 41.765625 | 155.40625 | 30.40625 / 30.40625 / 60.8125 | 519.3984375 |
| 768×1024 | 16 / 736 | 46 / 706 | 35.609375 | 110.375 | 21.59375 / 21.59375 / 43.1875 | 384.703125 |
| 390×844 | 16 / 358 | 46 / 328 | 51 | 231 | 46 / 46 / 115 | 504 |
| 360×800 | 16 / 328 | 46 / 298 | 51 | 277 | 69 / 69 / 115 | 550 |

Todos los bloques solicitados tienen max-width computado none. Las medidas reproducen la tabla v2 del handoff; diferencias respecto a Figma entregado: intro ≤0.41 px y lista ≤2.95 px. La sangría es 1.5em. Desviación respecto del ancho de 12 columnas menor de 0.02 px.

## Final outcomes: resultados ES

Mismos x y anchos que EN en las cinco resoluciones.

| Ancho | Alto intro | Alto lista | Alto ítems | Alto Final |
|---|---|---|---|---|
| 1600 | 45.59375 | 232.3125 | 38.015625 / 76.03125 / 76.03125 | 645.5 |
| 1280 | 41.765625 | 185.8125 | 30.40625 / 60.8125 / 60.8125 | 549.8046875 |
| 768 | 71.21875 | 153.5625 | 21.59375 / 43.1875 / 64.78125 | 463.5 |
| 390 | 76.5 | 254 | 46 / 69 / 115 | 552.5 |
| 360 | 76.5 | 300 | 46 / 92 / 138 | 598.5 |

Registro en los diez escenarios: scrollWidth = innerWidth y ningún elemento de main fuera horizontalmente del viewport. Unified EN a 768 sigue midiendo 940.125 px frente a 996.88 entregados de Figma. Se mantiene la observación anterior, sin compensación.

## Cambio concurrente

Al comenzar, styles.css coincidía con la copia temporal v2. Durante las pruebas se añadió un override móvil de 388 px para videos, fuera del handoff. No se revirtió. Lecturas finales de los cuatro escenarios móviles: los cinco videos miden 388 px; figuras 419.546875 px a 390 y 419.5 px a 360. Altura página EN/ES: 8920/9471 a 390; 9098/9725 a 360. Final outcomes conserva exactamente las medidas anteriores. Sin overflow ni errores de consola capturados. No se certifica fidelidad de este cambio concurrente a Figma.

## Regresión

Se compararon los fixtures baseline-motion.html y baseline-menores.html de la revisión v1 con las rutas actuales, en cinco resoluciones y ambos idiomas (20 pares). Referencia: 9fdee20 más las correcciones aprobadas de Motion, documentadas en ../2026-10-26_registro-codigo-review/verificacion.md y regression.cjs. Se navegó a #benchmark / #flows y se tomó captura fullPage para cargar imágenes; se verificó complete/naturalWidth antes de aceptar las medidas.

20/20 pares: alturas idénticas de todas las .cs-section, .a-cs__final y .a-cs__next. Todas las imágenes cargadas. En los cuarenta documentos, scrollWidth = innerWidth. Consola del tab sin warnings ni errores capturados. Esto prueba regresión de layout en los escenarios indicados; no una comparación visual exhaustiva de todos los estados.

## Código, skills y controles

Plantilla styles.css:384–449: no quedan topes de ancho medidos activos para copy de Registro/Motion. Los topes base 52ch y 40ch están anulados por :401 y :411 en .a-cs--grid; Menores sigue fuera de esa clase. El override posterior de 388px limita alto, no ancho.

Cache actual coherente: ocho HTML y build-pages.mjs con 20261026-registro-mobile420. node --check: app.js, shared/site.js y build-pages.mjs pasan. git diff --check pasa.

Taste lint: FAIL preexistente por box-shadow en :131 (foco del campo de contacto), fuera del diff v2. Taste inspect y pixel-perfect audit: no pudieron iniciar Chrome (Chrome exited early); no se reportan como aprobados. Sustitución: métricas y capturas con Chrome conectado. Impeccable detect: avisos tipográficos frente al DESIGN.md global; no son evidencia para cambiar la escala V3 aprobada.

Las dos skills locales y la skill externa figma-senior-build contienen la contradicción de exigir columnas enteras a una excepción que la grilla no puede expresar. Se intentó aclarar la skill local, pero .agents es de solo lectura y la escritura falló sin cambios. La externa no se editó por instrucción del handoff. Propuesta: reservar excepción para tamaño intrínseco o restricción explícita del diseño, documentarla y alinear el contenedor a columnas. El checklist además debe acotar la eliminación de topes al alcance autorizado.

## Límites

No se consultó Figma en vivo ni se validó la nueva altura móvil contra sus frames. Safari, Firefox, lectores de pantalla, touch físico y reduced motion emulado no probados en esta iteración. No hubo cambios al código de la aplicación, copy ni métricas, ni commit/push/despliegue. Única corrección: nota temporal en medidas.md. Añadidos evidencia y revisión.

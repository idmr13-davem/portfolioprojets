# Verificación independiente de Codex — 2026-10-26

## Método y límites

Chrome conectado por la extensión, sobre el servidor existente en 127.0.0.1:3456. Medidas DOM con getBoundingClientRect, scroll por PageDown para cargar imágenes y activar reveals; consultas de paused, foco, estilo computado y consola. Se descartó una primera captura que tenía zoom 90% sin compensar y otra con imágenes aún sin cargar.

El navegador conserva zoom 90%. Se compensó el viewport solicitado multiplicando por 0.9 y redondeando a enteros; innerWidth/innerHeight confirmó 1600×900, 1280×800, 1024×768, 768×1024, 390×844 y 360×800. Puede quedar una fracción inferior a 0.6 px en el tamaño CSS real, por ejemplo 735.78 px de contenido en tablet. El override se restableció al terminar.

Se intentó ejecutar el audit con los cuatro URL (Menores EN/ES, Registro EN y Motion EN), seis anchos, --cols 12 --margin-var --margin --gutter-var --gutter. Falló antes de medir: Chrome exited early, code null, en cdp.mjs:67. No se presenta como audit aprobado. Se usó el respaldo autorizado report.json y los overlays entregados. Recuento independiente de 24 entradas: Menores 12, 0 altos/medios y 48 bajos; Registro 6, sin hallazgos; Motion 6, 0 altos/medios y 27 bajos. Los bajos corresponden a padding interior intencional. Inspeccionados los overlays Menores 1600, 768 y 390.

## Menores — alturas EN (px)

| viewport | Context | Challenges | Experience | Journey | Advantage | Final |
|---|---:|---:|---:|---:|---:|---:|
| 1600×900 | 379.58 | 425.18 | 1397.47 | 1176.63 | 567.78 | 586.36 |
| 1280×800 | 367.27 | 412.86 | 1270.10 | 1038.08 | 583.96 | 502.49 |
| 1024×768 | 354.99 | 399.51 | 1224.36 | 884.13 | 567.58 | 423.85 |
| 768×1024 | 390.84 | 433.84 | 1260.49 | 1999.73 | 597.47 | 408.30 |
| 390×844 | 533.32 | 600.72 | 1236.81 | 3297.44 | 885.47 | 539.92 |
| 360×800 | 558.82 | 651.71 | 1222.12 | 3204.18 | 936.46 | 562.92 |

Se midieron también las seis resoluciones en ES. En las doce combinaciones: scrollWidth - innerWidth = 0; cero .cs-content vacíos; cuatro videos, Play a 12 px de los bordes derecho e inferior y ninguna intersección con figcaption. Las diferencias de altura ES por longitud del contenido se mantienen fluidas, sin alturas fijas para el copy.

A 1600: videos x=27.99/422/816/1210, ancho 362.01 y alto 720. Imagen de flujo x=422.01, 1150×563.50. A 1280: imagen x=339.20, 915.20×448.45. A 768: recorrido 2×2, videos ~359.9×802.2. A 390: una columna, videos 358×675.56; a 360: 328×640.

## Regresión de plantilla

Registro EN y Motion EN medidos en los mismos seis viewports tras recorrer la página. En todas sus figuras de video: botón a 12/12, sin superposición con caption, sin overflow horizontal de página.

A 1600×900, Registro: video de Context 1150×720; restantes 625×720; figuras de 753. Motion: ejemplos de 774; expresividad de 753; muestras de 362. Coinciden con el handoff.

Primer botón de video de cada caso: Enter solicitó reproducción (paused=false) y espacio pausó (paused=true), manteniendo foco y outline sólido teal. Son botones nativos; no cambia el orden DOM. Algunos estados de etiqueta se consultaron antes de que llegara el evento asíncrono de reproducción/pausa; no se usa esa captura transitoria como defecto. La prueba no certifica reproducción completa de cada grabación.

Consola warn/error consultada por separado en Menores, Registro y Motion ES tras scroll: [] en los tres casos.

Menú Menores ES a 360: apertura/cierre por botón correctos, aria-expanded y bloqueo de scroll coherentes, sin overflow. Escape no lo cierra: comportamiento preexistente en wire(), fuera del cambio del handoff; solo se propone mejorarlo. Se dejó cerrado.

## Comprobaciones estáticas

node --check pasó para statement/app.js, shared/content.js y build-pages.mjs. git diff --check pasó. Los ocho HTML Statement contienen styles.css?v=20261026-menores-play y app.js?v=20261026-menores-5076b, coherentes con el generador. La copia de comparación de styles.css coincide con la entrega actual.

Impeccable detect ejecutado una vez sobre app.js y styles.css: avisos advisory de escalas tipográficas preexistentes; ninguno señala las reglas nuevas del Play, del gap de lista o de Menores. No se cambia tipografía aprobada basándose en el detector.

No hubo lectura nueva de Figma: comparación con medidas.md, evidencia local de Figma e inventarios suministrados. No se modificaron Figma, copy, código de producción ni archivos ajenos al alcance. Sin commit, push ni despliegue.

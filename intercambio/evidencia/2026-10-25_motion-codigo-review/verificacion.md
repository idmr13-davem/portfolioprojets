# Verificación independiente · motion-codigo v1

Fecha: 2026-10-25. Base revisada: 9fdee20; comparación anterior al handoff: a07f3ef.
Herramienta: Chrome conectado mediante cua_repl; ruta http://localhost:3456/v3/statement/work/motion-design-system.html.
Fuente Figma: estructura.md, inventario-grilla.csv y renders entregados en 2026-10-25_figma-caso2; comparación de alturas con medidas.md. No se consultó ni modificó el archivo Figma en vivo.

## Alturas finales (px, EN, imágenes cargadas)

Orden de columnas: 1600×900 / 1280×800 / 768×1024 / 390×844 / 360×800.

| Sección | 1600 | 1280 | 768 | 390 | 360 |
|---|---:|---:|---:|---:|---:|
| Context | 408.09 | 367.28 | 417.78 | 533.39 | 584.39 |
| Challenges | 436.59 | 452.78 | 498.42 | 635.38 | 686.38 |
| Roadmap | 1469 | 1348.19 | 1110.19 | 954.10 | 937.88 |
| Focus | 505.89 | 455.02 | 510.01 | 598.59 | 598.59 |
| Benchmark | 1112.23 | 964.96 | 774.95 | 1081.38 | 1071.69 |
| Examples | 1166.23 | 1018.73 | 901.06 | 2639.55 | 2533.69 |
| Properties | 2024.19 | 1702.50 | 1489.93 | 1571.59 | 1507.09 |
| Level | 1868.88 | 1775.70 | 1977.37 | 3105.73 | 3060.75 |
| Final outcomes | 546.79 | 459.15 | 348.28 | 524 | 524 |
| Case navigation | 312.50 | 258.89 | 178.88 | 267 | 267 |

El benchmark de 390 se volvió a medir tras confirmar complete=true, naturalWidth>0 y currentSrc mobile. La lectura inmediata al cambiar viewport daba 633.69 antes de cargar la variante; no es su altura final.

## Grilla y comportamiento

- 1600: título x=28, ancho=362; contenido x=422, ancho=1150; diferencia vertical título/contenido del Context tras reveal=0.
- 1280: título x=25.59375, ancho=288.00781; contenido x=339.19531, ancho=915.21094.
- 768: título/contenido x=16 y ancho=736.
- 390: título/contenido x=16 y ancho=358; muestras 171×171 en x=16/203.
- 360: título/contenido x=16 y ancho=328.
- Auditoría de bordes contra 12 columnas (tolerancia 0.1px): 47 elementos en 1600/1280/768 y 45 en 390; cero desvíos. Incluye metadatos, videos del hero visibles, títulos/contenidos, pasos, imágenes, figuras de ejemplos, muestras y videos de expresividad. El panel de ejes conserva su padding interno intencional.
- EN y ES: scrollWidth=innerWidth en los cinco tamaños; ninguna caja de main fuera del viewport en la inspección de ambas traducciones.
- Cero .cs-copy vacíos. Todos los pasos EN miden 77px tras la corrección.
- Estilos computados finales en main Motion: reveal transition-duration=0.5s; líneas del título animation-duration=0.5s; metadatos animation-duration=0.5s.
- Chrome AX conserva las listas sin viñetas como content list. Las viñetas siguen visibles en Final outcomes. No se probó lector de pantalla ni Safari.
- Teclado: Enter en el primer botón de muestra pausa su video (paused=true); botón nativo conserva el mecanismo existente.
- Imágenes del caso cargadas; comprobadas las variantes móviles de roadmap y benchmark.
- Consola de las navegaciones inspeccionadas: ninguna entrada error/warn.
- Se inspeccionaron visualmente capturas en vivo de Context/Challenges desktop y Properties mobile; composición acorde con las referencias entregadas. No se guardaron nuevas capturas en disco.

## Regresiones y comprobaciones estáticas

- Registro ML y Menores abiertos en Chrome a los cinco tamaños, EN: sin overflow, sin .a-cs--motion y sin .cs-intro; conservan 6 y 5 secciones respectivamente.
- node intercambio/evidencia/2026-10-25_motion-codigo-review/regression.cjs: pasa. Render de ambos casos EN/ES idéntico al padre del handoff al normalizar únicamente la clase adicional del main. CSS compartido anterior intacto; site.js/content.js idénticos. Resultados en regression.json.
- node --check para statement/app.js, shared/site.js y build-pages.mjs: pasa.
- git diff --check: pasa.
- Cache CSS actualizado en los ocho HTML y el generador a 20261025-motion-review1; app.js no cambió en esta revisión y conserva su versión.
- Taste lint: señala box-shadow en styles.css:131; es el foco :focus del campo de contacto preexistente, fuera del alcance, no una sombra añadida por el handoff.
- Impeccable detect: avisos tipográficos frente al DESIGN.md global; la exploración tiene escala propia documentada en Figma. No se sustituyó esa escala por la de V2.

## Límites

node server.js falló con listen EPERM en el sandbox y el inspector headless no pudo arrancar Chrome. Las pruebas dinámicas se completaron por Chrome conectado contra el servidor localhost ya disponible; no se presentan esos intentos fallidos como pruebas aprobadas del inspector.
Reduced motion se revisó en código: los overrides locales cambian duración, no habilitan animaciones fuera del media query no-preference de base.css. No se emuló esta preferencia en el navegador.
Persisten a 390 diferencias de altura frente a Figma: Challenges −27.42px y Benchmark −26.62px. Se confirma distinta composición de líneas; no queda demostrado que la causa sea exclusivamente rasterizado o text-wrap:pretty. El resto de diferencias de la tabla de referencia queda por debajo de 6px tras corregir los pasos.

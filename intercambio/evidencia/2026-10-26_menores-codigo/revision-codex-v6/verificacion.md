# Evidencia Codex — menores-codigo v6

Fecha: 2026-10-26. Revisión acotada al handoff v6. Sin commit, push ni despliegue.

## Método y límites

Se leyeron AGENTS.md, CLAUDE.md, protocolo, plantilla, handoff v6, revisión v5 y la excepción móvil documentada en v1; CSS final, contenido compartido, renderizadores de las tres propuestas, helper media, generador, encode-webp.mjs, generate-posters.mjs y poster-audit.mjs.

`node intercambio/evidencia/2026-10-26_menores-codigo/measure-v6.mjs` y `poster-audit.mjs` se intentaron: Chrome terminó antes de iniciar (`Chrome exited early, code null`). `node server.js` falló con EPERM al escuchar en 127.0.0.1:3456; curl desde la terminal tampoco accedió al puerto. Se utilizó el Chrome existente, donde http://localhost:3456 funciona. Mediciones equivalentes con getBoundingClientRect/getComputedStyle, consultas DOM de solo lectura y capacidad viewport del navegador. Idiomas pedidos explícitamente con ?lang=en/es para evitar depender del idioma persistido.

No se consultó Figma vivo ni se dispuso del PNG original de 4096×1480 para comparación de píxeles. Las cifras Figma son las del handoff. No se certifica equivalencia sin pérdida con el PNG, otros motores ni reproducción completa de todos los videos. No se modificaron preferencias de reduced motion del navegador existente; alturas de layout y estilos se verificaron independientemente de las entradas. Las capturas visuales se inspeccionaron después de completarse las entradas.

## Menores / Statement

Viewport efectivo comprobado; Inter disponible. En todas las filas: scrollWidth = innerWidth, padding-bottom del body 0, margin-top de Final outcome 0.

| Viewport | Idioma | Franja | Imagen | Goals | Final | Página |
|---|---|---:|---:|---:|---:|---:|
| 1600×900 | EN | 724 | 660 | 412.83 | 586.37 | 6269 |
| 1600×900 | ES | 724 | 660 | 441.33 | 586.37 | 6402 |
| 1280×800 | EN | 600 | 536 | 365.24 | 502.51 | 5723 |
| 1280×800 | ES | 600 | 536 | 365.24 | 532.91 | 5900 |
| 1024×768 | EN | 500.80 | 436.80 | 349.88 | 423.74 | 5267 |
| 1024×768 | ES | 500.80 | 436.80 | 349.88 | 486.75 | 5427 |
| 1023×768 | EN | 487.43 | 423.43 | 317.78 | 423.44 | 5990 |
| 1023×768 | ES | 487.43 | 423.43 | 317.78 | 486.41 | 6213 |
| 768×1024 | EN | 419.97 | 355.97 | 328.49 | 408.31 | 6438 |
| 768×1024 | ES | 419.97 | 355.97 | 328.49 | 451.50 | 6546 |
| 390×844 | EN | 319.97 | 255.97 | 491.70 | 540 | 8880 |
| 390×844 | ES | 319.97 | 255.97 | 491.70 | 642 | 9195 |
| 360×800 | EN | 312.03 | 248.03 | 491.70 | 563 | 8956 |
| 360×800 | ES | 312.03 | 248.03 | 517.20 | 642 | 9260 |

Medidas en px CSS. Diferencias con el handoff de hasta ~0.05 px en bloques y 1 px en alto de página son redondeos; no se usan para parchear alturas. Final móvil EN mantiene la excepción conocida de 22 px a 390.

- Goals: peso 700 en todas las filas; 19px en 1600/1280, 18.56 en 1024, 18.5575 en 1023, 17.92 en 768, 17 en 390/360. Line-height 1.5.
- Gaps: 18.24 / 16.704 / 15.4752 / 15.4704 / 14.2464 / 13.2 / 13.2.
- Padding superior/inferior: 120/110 en 1600; 80/80 en 1280 y 1024; 64/64 en 1023, 768, 390 y 360.
- Hero mobile efectivo en 390 y 360; desktop en el resto. Ambos recursos cargados.
- Salto de imagen 1023→1024: 13.3671875px. Es consecuencia declarada de las dos rectas; no hay overflow ni colisión. Mantener salvo decisión explícita de cambiar la interpolación.
- Inspección visual: hero de Statement a 1600 y 390, transición imagen/Goals a 768. Sin fondo opaco agregado por el archivo ni colisiones en las vistas inspeccionadas.
- Consola capturada en la matriz: cero warnings/errors.

## Stage y Poster

EN a 1600×900, 1280×800, 768×1024, 390×844 y 360×800: scrollWidth coincide con viewport. Hero nuevo presente y decodificado. En Stage desktop la copia .b-card__hero está oculta intencionalmente; se comprobó el escenario visible .b-stage__inner tras terminar la entrada: a 1600 la imagen mide 782×876 con object-fit cover. En Stage móvil a 390 mide 334×120.61, con hero-v3-mobile.webp; inspección visual correcta. El primer muestreo inmediato después de redimensionar aún conservaba currentSrc desktop; una lectura estable confirmó la selección móvil.

Poster: imagen 1472×531.88 a 1600, 1177.61×425.5 a 1280, 706.56×255.30 a 768, 358×129.27 a 390 y 328×118.44 a 360; conserva proporción y sin overflow. Inspección visual de Poster desktop: transparencia sobre su fondo rojo y cinco teléfonos visibles.

## Registro y Motion

Statement EN en los mismos cinco tamaños: sin overflow ni warnings/errors capturados. Registro renderiza exactamente legacy-hd.jpg, agnostic-hd.jpg, form-hd.jpg, google-hd.jpg y unified-hd.jpg. object-fit contain en los cinco. Alto de caja 720 en 1600×900, 640 en 1280×800, 460 en 768×1024 y 388 en móvil. No se alteró su layout.

Los cinco JPEG se abrieron individualmente mediante HTTP en Chrome: complete=true y naturalWidth/naturalHeight=712/1596. sips confirma las dimensiones. Lectura binaria del tkhd de los cinco MOV: 712×1596 (valores 16.16: 46661632 / 104595456). Son resolución nativa; el ancho de la caja de video no equivale al ancho del contenido al usar contain. Por ejemplo, una caja de 1150×720 muestra el contenido de 712×1596 a unos 321.20×720: el poster sí supera dos veces ese ancho efectivo.

Motion conserva tres videos hero visibles en desktop/tablet y uno en móvil; los pasos siguen con fondo rgb(20,25,30) en tablet/móvil y transparente en desktop. La comprobación fue de layout y recursos, no una nueva auditoría del controlador Motion.

## Recursos y verificaciones estáticas

- sips: hero-v3.webp 2560×925, hasAlpha=yes, 261088 bytes; hero-v3-mobile.webp 1440×520, hasAlpha=yes, 119550 bytes.
- No se observó un defecto visual que justifique sustituir WebP. La calidad 0.85 es con pérdida; alfa y decodificación están comprobados, equivalencia al original no.
- node --check v3/shared/content.js, v3/build-pages.mjs y v3/statement/app.js: PASS.
- Generador ejecutado en directorio temporal y comparado byte por byte: 24/24 HTML idénticos. Caché content.js correcta 24/24 y styles.css de Statement 8/8, coherentes con generador.
- Cinco referencias Registro -hd, archivos y videos locales presentes: PASS; comprobación normaliza Unicode para el MOV agnóstico.
- git diff --check: PASS.
- git diff --exit-code de los tres HTML V2 y css/case-study.css: PASS.
- Impeccable context y detect ejecutados. Avisos tipográficos fuera del bloque revisado 504–519; no implican cambiar la escala V3 aprobada.
- Taste lint ejecutado: señala el box-shadow de input:focus en styles.css:131, indicador de foco existente fuera del alcance. Taste inspect intentado: mismo bloqueo de arranque de Chrome. Se sustituyó su verificación visual por el Chrome existente; no se declara el inspector aprobado.

No se hallaron defectos nuevos atribuibles a v6. No se aplicaron cambios a código, contenido ni assets. Se guardan evidencia y revisión; viewport temporal restablecido y pestaña de prueba cerrada.

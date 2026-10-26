# Verificación independiente — Registro ML, 2026-10-26

Chrome real conectado mediante cua_repl, servidor localhost:3456 existente. Se revisaron el protocolo, CLAUDE.md, el handoff actual, el de Motion, ambas tablas de medidas, la revisión de Motion y la estructura y cuatro renders entregados de Figma del caso 1. No se consultó ni modificó Figma en vivo.

## Registro: alturas medidas (px)

| Idioma | Viewport | Context | Challenges | Agnostic | Form | Google | Unified | Final | Next |
|---|---|---|---|---|---|---|---|---|---|
| EN | 1600×900 | 1246.69 | 328.30 | 973 | 973 | 973 | 973 | 767.13 | 312.50 |
| EN | 1280×800 | 1154.26 | 287.48 | 852.07 | 852.07 | 939.52 | 968.02 | 652.38 | 258.89 |
| EN | 1024×768 | 1114.25 | 249.16 | 790.25 | 865.91 | 1000.60 | 1056.29 | 548.92 | 212.16 |
| EN | 768×1024 | 992.90 | 288.74 | 678.70 | 780.47 | 913.24 | 940.13 | 485.09 | 178.88 |
| EN | 390×844 | 945.98 | 308.98 | 857.09 | 1050.88 | 1180.88 | 1206.38 | 504 | 267 |
| EN | 360×800 | 927.19 | 308.98 | 863.79 | 1057.58 | 1187.59 | 1264.09 | 550 | 267 |
| ES | 1600×900 | 1275.19 | 328.30 | 973 | 973 | 973 | 1047.38 | 729.11 | 312.50 |
| ES | 1280×800 | 1182.76 | 287.48 | 852.07 | 852.07 | 1025.02 | 1110.52 | 621.98 | 258.89 |
| ES | 1024×768 | 1197.78 | 304.84 | 790.25 | 865.91 | 1084.13 | 1251.20 | 524.59 | 212.16 |
| ES | 768×1024 | 1046.66 | 315.63 | 678.70 | 807.35 | 993.89 | 1128.30 | 463.50 | 178.88 |
| ES | 390×844 | 1047.98 | 410.98 | 882.59 | 1076.38 | 1231.88 | 1333.88 | 552.50 | 267 |
| ES | 360×800 | 1054.69 | 410.98 | 889.29 | 1057.58 | 1265.18 | 1417.09 | 598.50 | 267 |

Las alturas EN reproducen la columna código de la entrega en los cuatro tamaños de referencia. Frente a Figma: diferencia máxima 4.11 px salvo Unified a 768 (996.88 frente a 940.13: −56.75 px). Ancho del copy de Unified: 360 px. La atribución exclusiva de la diferencia a la composición de texto requiere contrastar propiedades y fuentes de Figma; no se aplicaron compensaciones ni cambios de copy.

## Grilla

Se midieron 16 cajas por escenario: títulos, contenidos y videos de las filas intro. Total: 192 cajas EN/ES. Máxima desviación absoluta de x o ancho frente a la fórmula de las 12 columnas: 0.01 px. Margen = clamp(16, 2vw, 28), gutter = clamp(16, 2vw, 32).

| Viewport | Título x / ancho | Partes x / ancho | Video split x / ancho / alto |
|---|---|---|---|
| 1600×900 | 28 / 362 | 422 / 493.33 | 947.33 / 624.67 / 720 |
| 1280×800 | 25.59 / 288.01 | 339.20 / 392.54 | 757.33 / 497.07 / 640 |
| 1024×768 | 20.48 / 230.40 | 271.35 / 314.03 | 605.86 / 397.66 / 614.40 |
| 768×1024 | 16 / 736 | 16 / 360 | 392 / 360 / 460 |
| 390×844 | 16 / 358 | 16 / 358 | 16 / 358 / 223.75 |
| 360×800 | 16 / 328 | 16 / 328 | 16 / 328 / 205 |

Context ocupa las 12 columnas. Los cinco videos tienen la altura esperada en todos los escenarios. Contenedor computado: inline-size; ajuste del video: contain. La fórmula cqw expresa la regla del ancho completo, también para los videos estrechos de las partes; no hay otro contenedor intermedio en el markup actual. No se justifica reemplazarla por otra fórmula.

En los 12 escenarios Registro: scrollWidth = innerWidth; ningún elemento de main sale horizontalmente del viewport. Entradas computadas dentro de main: 0.5 s. Enter sobre el botón de Agnostic a 390 pausa el video, mantiene el foco y muestra su outline. Listas y títulos presentes en Chrome AX.

## Regresión independiente

La copia temporal del handoff coincide byte por byte con los app.js y styles.css entregados: sirve como snapshot previo a esta revisión, no como versión previa a la implementación de Registro. Para la regresión se usó 9fdee20 más las correcciones explícitas de la revisión anterior de Motion: entradas de 500 ms, pasos de 77 px y los tres espacios expresados con tokens. El script regression.cjs genera fixtures baseline-motion.html y baseline-menores.html con esa referencia, sin tocar las páginas originales.

VM: Motion EN/ES conserva el HTML al normalizar la clase añadida y el whitespace entre etiquetas; Menores también. CSS compartido anterior al bloque Figma, site.js y content.js coinciden con 9fdee20. Resultado: regression.json.

Comparación dinámica baseline/current: seis resoluciones × dos idiomas × dos casos = 24 pares. Se navegó a #benchmark en Motion y #flows en Menores para cargar imágenes diferidas, se tomó captura y se comprobó complete/naturalWidth antes de aceptar las alturas. Los 24 pares tienen imágenes listas y alturas idénticas para cada sección, Final y Next. Ambos lados sin overflow de página. Consola capturada sin errores ni advertencias.

| Viewport | Roadmap EN, antes corregido = actual | Benchmark EN, antes = actual | Pares iguales (Motion/Menores, EN/ES) |
|---|---|---|---|
| 1600×900 | 1469 | 1112.23 | 4/4 |
| 1280×800 | 1348.19 | 964.96 | 4/4 |
| 1024×768 | 1202.41 | 882.37 | 4/4 |
| 768×1024 | 1110.19 | 774.95 | 4/4 |
| 390×844 | 954.10 | 1081.38 | 4/4 |
| 360×800 | 937.88 | 1071.69 | 4/4 |

Las primeras lecturas rápidas antes de cargar imágenes se descartaron: alturas de imágenes lazy no son evidencia válida de regresión. Pasos de Motion: 77 px. Menores conserva a-cs--menores, sin a-cs--grid.

## Comprobaciones y límites

- node --check: statement/app.js, shared/site.js y build-pages.mjs pasan.
- git diff --check pasa.
- Cache CSS/JS coherente en los ocho HTML y generador: 20261026-registro-5065.
- Taste lint: un FAIL preexistente, foco del campo de contacto (styles.css:131). Fuera del alcance; no se cambió.
- Taste inspect y pixel-perfect audit no pudieron iniciar Chrome headless (Chrome exited early). Se sustituyeron por las mediciones y capturas del Chrome conectado; no se afirma que esos scripts pasaran.
- Impeccable detect: solo avisos tipográficos frente al DESIGN.md global de V2. No justifican cambiar la escala V3 aprobada.
- Revisión visual en Chrome de desktop, tablet y mobile, contrastada con los cuatro renders de Figma entregados. Conservadas composición y paleta aprobadas; no se hizo un rediseño.
- Reduced motion revisado en código (base.css y site.js); sin emulación. Safari, Firefox, lectores de pantalla y dispositivos físicos no probados.
- Única corrección a la entrega: precisión documental del Roadmap en medidas.md. Código, contenido, Git y publicación sin mutaciones de esta revisión. Se añadieron evidencia y revisión; cambios previos preservados.

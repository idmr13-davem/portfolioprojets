# Evidencia Codex — menores-codigo v5

Fecha: 2026-10-26. Servidor existente: http://localhost:3456.
Chrome, viewport emulado mediante capacidad viewport del navegador; innerWidth/innerHeight coinciden con cada tamaño pedido. Fuente Inter cargada, raíz 16px. Medidas DOM en píxeles CSS.

## Menores / Statement

| Viewport | Idioma | Alto sección | Alto Steps | Altos de los cuatro pasos |
|---|---|---|---|---|
| 1600×900 | EN | 710.09 | 421.59 | 105.40 / 105.40 / 105.40 / 105.40 |
| 1280×800 | EN | 697.78 | 450.09 | 105.40 / 133.90 / 105.40 / 105.40 |
| 768×1024 | EN | 776.13 | 522.66 | 130.66 / 130.66 / 130.66 / 130.66 |
| 390×844 | EN | 937.59 | 659.99 | 153.40 / 178.90 / 153.40 / 174.30 |
| 360×800 | EN | 937.59 | 659.99 | 153.40 / 178.90 / 153.40 / 174.30 |
| 1600×900 | ES | 710.09 | 421.59 | 105.40 / 105.40 / 105.40 / 105.40 |
| 1280×800 | ES | 726.28 | 478.59 | 105.40 / 105.40 / 133.90 / 133.90 |
| 768×1024 | ES | 776.13 | 522.66 | 130.66 / 130.66 / 130.66 / 130.66 |
| 390×844 | ES | 916.69 | 639.09 | 153.40 / 153.40 / 178.90 / 153.40 |
| 360×800 | ES | 942.19 | 664.59 | 178.90 / 153.40 / 178.90 / 153.40 |

En las diez combinaciones: cuatro li, gap 0px, fondo rgba(0, 0, 0, 0), padding 24px en los cuatro lados, margin-bottom del h3 8px, scrollWidth − innerWidth = 0. Cero .cs-media/img/source dentro de #experience. CSS servido: ../styles.css?v=20261026-menores-steps. document.documentElement.lang coincide con el idioma solicitado mediante ?lang=en/es. Consola capturada: cero warnings/errors.

Consulta DOM: rectángulos de #experience, #experience .cs-steps y sus hijos mediante getBoundingClientRect(); estilos mediante getComputedStyle(); overflow en document.documentElement. Las posiciones Y durante las entradas animadas no se usan para comparar separación. Gap y alturas son medidas de layout.

Inspección visual por capturas del navegador: Menores EN 390×844 y ES 1600×900. Sin tarjetas de fondo ni colisiones en la sección observada. En 1600, copy x=422 y título del paso x=446: diferencia de 24px, intencional según el handoff.

## Motion / Statement

EN, #roadmap, 768×1024 y 390×844: cuatro pasos; gap 28px; cada paso conserva background rgb(20, 25, 30) y padding 24px; overflow 0. Consola capturada sin warnings/errors.

## Verificación estática

- node --check v3/build-pages.mjs: PASS.
- git diff --check: PASS antes de escribir esta evidencia.
- Generador ejecutado en carpeta temporal mediante execFileSync, sin sobrescribir el proyecto: 24 HTML generados idénticos byte por byte a los del proyecto. Ocho consumidores Statement con styles.css?v=20261026-menores-steps. Se conserva la versión de content.js en las 24 páginas.
- git diff --exit-code -- work/menores-mexico.html: PASS; V2 sin cambios respecto a HEAD.
- Impeccable context y detect ejecutados. Detector: avisos tipográficos fuera de las reglas revisadas, ninguno en 502–503.
- Taste lint: un FAIL en styles.css:131 por box-shadow. Es un indicador de foco en input:focus, fuera de este cambio; no es una sombra decorativa en reposo. No se modifica.
- Taste inspect: no pudo iniciar Chrome (Chrome exited early, code null). Sustituido por la matriz DOM y las capturas del Chrome existente. No se presenta como aprobado.

No se consultó Figma vivo: las cifras Figma y la excepción de 768 se toman del handoff, no de una nueva medición independiente. No se audita toda la página ni otros navegadores. Viewport temporal restablecido y pestaña de prueba cerrada.

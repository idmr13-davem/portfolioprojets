# Revisión: v3-statement-tokens v1

## Veredicto

Aprobado con observaciones

## Resumen

La aplicación de colores del DS es coherente en el tema oscuro. Corregí el contraste y los estados del botón del footer, la opacidad del placeholder y un desbordamiento de los artículos.

Se conservaron copy, `font-size`, `line-height` y `letter-spacing`. No se modificaron tokens canónicos, archivos compartidos, Stage ni Poster. Sin commit, push ni despliegue.

El sandbox bloqueó el servidor y Chrome: la aprobación se sustenta en código, ejecución de plantillas y contrastes calculados; queda pendiente la validación visual e interactiva.

Revisión guardada en `intercambio/revisiones/2026-10-23_v3-statement-tokens_v1.md`.

## Hallazgos

| # | Severidad (crítica/alta/media/baja) | Archivo:línea | Hallazgo | Evidencia | Recomendación |
|---|---|---|---|---|---|
| 1 | alta | `v3/statement/styles.css:60` | **Corregido:** contraste insuficiente del botón del footer en hover y uso del token de pulsación para ese estado. | Antes: `text-static-primary` sobre `interactive-primary-clic`, **3,05:1**. Después: hover **10,48:1**, pulsación **5,55:1**. | Mantener los pares corregidos; comprobar hover y active simultáneos en navegador. |
| 2 | baja | `v3/statement/styles.css:307` | **Corregido:** el placeholder dependía de la opacidad predeterminada del navegador. | Faltaba `opacity: 1`. Con opacidad explícita, texto secundario sobre fondo del campo: **9,32:1**. No se atribuye un fallo observado a un navegador concreto. | Mantener opacidad explícita. |
| 3 | media | `v3/statement/styles.css:230` | **Corregido:** el cuerpo del artículo excedía el viewport estrecho. | `width: min(42rem, 100%)` con `content-box` sumaba padding: a 390 px, caja de **422 px**. Tras descontar el padding, mide **390 px**. | Confirmar ausencia de overflow en ambos artículos cuando sea posible abrir navegador. |
| 4 | alta | `v3/shared/base.css:30`, `v3/shared/base.css:85` | **Pendiente, preexistente y compartido:** entradas superiores al máximo de duración del proyecto. | `--t-reveal: 800ms`, animación de líneas de 900 ms y transiciones de revelado de 700/900 ms. CLAUDE.md establece ≤500 ms. Existe tratamiento de reduced motion. | Ajustar en una tarea conjunta y validar las tres propuestas. No aplicado por afectar motion compartido fuera del cambio de tokens. |
| 5 | media | `v3/statement/index.html:1` y demás páginas del handoff | **Pendiente:** validación visual y funcional real. | Servidor: `listen EPERM 127.0.0.1:3456`. Inspector: `Chrome exited early, code null`. Detector: `Failed to launch the browser process!`. | Revisar EN/ES, menú, teclado, posters y videos en 360/390, 768, 1280, 1440 y ≥1500 px. |

## Correcciones aplicadas directamente por Codex

| # | Archivo | Cambio | Motivo |
|---|---|---|---|
| 1 | `v3/statement/styles.css:60` | Hover inverso con `--accent-hover` y `--accent-ink`; regla `:active` posterior con `--accent-press` y texto oscuro. | Recuperar AA y distinguir hover de pulsación, incluso cuando coinciden. |
| 2 | `v3/statement/styles.css:307` | Añadido `opacity: 1` al placeholder. | Evitar atenuación adicional del navegador. |
| 3 | `v3/statement/styles.css:230` | Ancho del artículo cambiado a `min(42rem, calc(100% - 2 * var(--margin)))`. | Descontar el padding conservando el máximo de lectura y la tipografía. |

## Verificación ejecutada

- Leídos AGENTS.md, CLAUDE.md, protocolo, plantilla, handoff, `docs/v3-propuestas.md`, PRODUCT.md y DESIGN.md. Revisados estilos, plantillas, generador, tokens y runtime compartido. Rama comprobada: `exploration/v3-propuestas`.
- Ejecutados `curl -I --max-time 5 http://127.0.0.1:3456/v3/statement/index.html` y `node server.js`: conexión fallida y arranque bloqueado por **EPERM**.
- Ejecutado el inspector indicado en el handoff: Chrome no arrancó. No se obtuvieron capturas nuevas ni mediciones de layout.
- Ejecutado el detector indicado sobre Home y Motion; también el launcher de `.agents` con `--json` tras las correcciones: ambos bloquearon al iniciar navegador. El `[]` devuelto **no acredita ausencia de hallazgos**.
- Ejecutado el grep exacto indicado: **sin colores literales en `v3/statement/styles.css`**. Sus variables se resuelven en tokens, base o variables inline de las plantillas.
- Comprobados los ocho HTML: cargan tokens canónicos e Inter 300/400/700, según `v3/build-pages.mjs:10`. El `theme-color` coincide con el fondo oscuro.
- Ejecutados `node --check` para `app.js`, `site.js` y `build-pages.mjs`: **pasan**.
- Ejecutadas las plantillas mediante Node/VM con DOM simulado: **ocho páginas en EN/ES, 16 combinaciones**, con `main`, footer, cuatro destinos de contacto, idioma correcto y sin `undefined`. Incluye las siete rutas del handoff y el segundo artículo. Esto no prueba eventos, persistencia, layout ni carga de assets.
- Comparadas las declaraciones tipográficas antes/después: **`font-size`, `line-height` y `letter-spacing` idénticos**.
- Calculada la caja del artículo corregida: a 360/390/768 px mide respectivamente **360/390/704 px**.
- Ejecutado lint de taste-skill antes y después: **1 FAIL y 2 WARN**, revisados en contexto:
  - `box-shadow` corresponde exclusivamente al indicador de foco del input (`styles.css:146`), no a una sombra decorativa en reposo.
  - Inter es obligatoria por el pedido.
  - `padStart` formatea el reloj real (`app.js:263`), no índices decorativos.

Los contrastes siguientes se calcularon directamente desde `css/tokens/figma.css`, componiendo alfa en sRGB y aplicando luminancia relativa: `(Lmayor + 0,05) / (Lmenor + 0,05)`. Son valores calculados, no mediciones del navegador.

| Par o estado | Contraste | Resultado |
|---|---:|---|
| Texto primario / fondo principal, profundo y `surface-main` | 16,59 / 16,94 / 15,75:1 | AA |
| Texto secundario / esos mismos fondos | 9,73 / 9,88 / 9,32:1 | AA |
| Botones y selector activo: texto oscuro / idle, hover y clic | 9,44 / 10,48 / 5,55:1 | AA |
| Resaltados del About: texto oscuro / acento | 9,44:1 | AA |
| Selector inactivo, opacidad 0,85 / fondo principal | 12,20:1 | AA |
| Placeholder explícito / fondo del campo | 9,32:1 | AA |
| Texto y botón del footer en reposo / superficie inversa | 16,08:1 | AA |
| CV resaltado en reposo y hover | 16,08 / 10,48:1 | AA |
| Nota de resultados, opacidad 0,8 / `surface-main` | 10,44:1 | AA |
| Foco turquesa / fondo principal, profundo y `surface-main` | 9,24 / 9,44 / 8,77:1 | Supera 3:1 |
| Foco oscuro del footer / superficie inversa | 16,08:1 | Supera 3:1 |

`text-static-inverse` es apropiado sobre acciones y resaltados de color fijo; `text-inverse` corresponde al footer invertido. `background-deep` funciona como respaldo de medios y `surface-main` como banda de contenido. No encontré otro error semántico en esos mapeos.

El foco oscuro del footer y las barras turquesa ya estaban implementados (`styles.css:312–313`); no son correcciones de esta revisión. El acento repetido está autorizado expresamente en el handoff y no justifica cambiar la dirección sin evidencia visual.

No se certifican todavía los contrastes sobre imágenes o videos, solapamientos, estados transitorios, navegación por teclado ni ausencia global de overflow.
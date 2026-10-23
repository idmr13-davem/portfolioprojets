# Revisión: v3-statement-tokens v1

## Veredicto
Aprobado con observaciones

## Resumen
La aplicación de colores del DS es coherente en el tema oscuro. Se corrigieron el contraste y los estados del botón del footer, la opacidad del placeholder y un desbordamiento de los artículos. Se conservaron copy, `font-size`, `line-height` y `letter-spacing`. No se modificaron tokens canónicos, Stage, Poster ni archivos compartidos. Sin commit, push ni despliegue.

La aprobación corresponde a la revisión de código y contraste calculado. No certifica el resultado visual ni las interacciones en navegador: el sandbox bloqueó el servidor y Chrome. Queda pendiente la comprobación responsive real.

## Hallazgos
| # | Severidad (crítica/alta/media/baja) | Archivo:línea | Hallazgo | Evidencia | Recomendación |
|---|---|---|---|---|---|
| 1 | alta | `v3/statement/styles.css:60` | Corregido: el hover del botón del footer incumplía AA para texto normal y usaba el token de pulsación. | Antes: `text-static-primary` sobre `interactive-primary-clic`, 3,05:1. Ahora: texto oscuro sobre hover, 10,48:1; pulsación explícita, 5,55:1. | Mantener los pares corregidos y comprobar hover + active simultáneos en navegador. |
| 2 | baja | `v3/statement/styles.css:307` | Corregido: el placeholder dependía de la opacidad predeterminada del navegador. | El color ya era `text-secondary`, pero faltaba `opacity: 1`; con opacidad explícita el par sobre `background-secondary` da 9,32:1. No se atribuye un fallo observado a un navegador concreto. | Mantener la opacidad explícita. |
| 3 | media | `v3/statement/styles.css:230` | Corregido: la caja del cuerpo del artículo excedía el viewport estrecho. | `width: min(42rem, 100%)` con `content-box` sumaba padding: a 390 px, 390 + 32 = 422 px. Ahora el contenido mide 358 px y la caja 390 px; a 360/768 px, la caja calculada mide 360/704 px. | Confirmar ausencia de overflow en ambos artículos al habilitar navegador. |
| 4 | alta | `v3/shared/base.css:30`, `v3/shared/base.css:85` | Pendiente, preexistente y compartido: duraciones de entrada superiores al máximo del proyecto. | `--t-reveal: 800ms`; animación de líneas de 900 ms; revelado con transiciones de 700/900 ms. CLAUDE.md exige transiciones ≤500 ms. Existe tratamiento para reduced motion. | Proponer una tarea conjunta para limitar las entradas a ≤500 ms y revisar las tres propuestas. No se aplicó por afectar motion compartido fuera del cambio de tokens. |
| 5 | media | `v3/statement/index.html:1` y páginas indicadas en el handoff | Pendiente: validación visual y funcional real. | Servidor: `listen EPERM 127.0.0.1:3456`; inspector: `Chrome exited early, code null`; detector: `Failed to launch the browser process!`. | Revisar EN/ES, menú móvil, foco, estados, posters y videos en 360/390, 768, 1280, 1440 y ≥1500 px cuando el entorno permita navegador. |

## Correcciones aplicadas directamente por Codex
| # | Archivo | Cambio | Motivo |
|---|---|---|---|
| 1 | `v3/statement/styles.css:60` | Hover inverso con `--accent-hover` y `--accent-ink`; regla `:active` posterior con `--accent-press` y texto oscuro. | Restaurar AA y separar hover de pulsación, incluso cuando coinciden. |
| 2 | `v3/statement/styles.css:307` | Añadido `opacity: 1` al placeholder. | Evitar atenuación adicional por estilos del navegador. |
| 3 | `v3/statement/styles.css:230` | Ancho del artículo: `min(42rem, calc(100% - 2 * var(--margin)))`. | Descontar el padding conservando el máximo de lectura y la tipografía. |

## Verificación ejecutada

- Leídos AGENTS.md, CLAUDE.md, protocolo, plantilla, handoff, `docs/v3-propuestas.md`, PRODUCT.md y DESIGN.md; revisados estilos, plantillas, generador, tokens canónicos y runtime compartido. Rama comprobada: `exploration/v3-propuestas`.
- Ejecutados `curl -I --max-time 5 http://127.0.0.1:3456/v3/statement/index.html` y `node server.js`: conexión fallida y arranque bloqueado por EPERM. No se levantó un servidor.
- Ejecutado `node .agents/skills/taste-skill/scripts/inspect.mjs http://127.0.0.1:3456/v3/statement/index.html`: Chrome no arrancó; sin capturas nuevas ni medición de layout.
- Ejecutado el detector indicado del handoff sobre Home y Motion; también el launcher de `.agents` con `--json` tras las correcciones: ambos bloqueados al iniciar navegador. El `[]` devuelto no equivale a una auditoría sin hallazgos.
- Ejecutado el grep exacto de colores indicado: sin coincidencias en `v3/statement/styles.css`. Todas las referencias CSS se resuelven en tokens, base o variables inline de la plantilla. Los hex de la base compartida quedan reemplazados por los roles de Statement; `theme-color` del generador coincide con el fondo oscuro. Los ocho HTML cargan tokens e Inter 300/400/700 (`v3/build-pages.mjs:10`).
- Ejecutados `node --check` para app.js, site.js y build-pages.mjs: pasan.
- Ejecutada comprobación con Node/VM y DOM simulado: las ocho páginas, incluidos ambos artículos, renderizan sus plantillas en EN/ES (16 combinaciones), con `main`, footer, los cuatro destinos de contacto, idioma correcto y sin `undefined`. Esto no prueba eventos, layout, persistencia real ni carga de assets/fuentes.
- Comparadas las declaraciones tipográficas antes/después: `font-size`, `line-height` y `letter-spacing` idénticos. Solo tres correcciones locales en CSS; contenido y archivos compartidos intactos.
- Ejecutado lint de taste-skill antes y después: 1 FAIL y 2 WARN. Revisados como falsos positivos o restricciones explícitas: el `box-shadow` aparece exclusivamente en el foco del input (`styles.css:146`), Inter es obligatoria, y `padStart` formatea el reloj real (`app.js:263`). No se eliminaron esas funciones para satisfacer el detector.

Contrastes calculados directamente desde `css/tokens/figma.css:10` y siguientes, componiendo alfa en sRGB y aplicando luminancia relativa: `(Lmayor + 0,05) / (Lmenor + 0,05)`. Cifras redondeadas; no son mediciones del navegador.

| Par o estado | Contraste | Resultado |
|---|---:|---|
| Texto primario / fondo principal, profundo y surface-main | 16,59 / 16,94 / 15,75:1 | AA |
| Texto secundario / esos mismos fondos | 9,73 / 9,88 / 9,32:1 | AA |
| Botones, selector activo y resaltados: texto oscuro / idle, hover, clic | 9,44 / 10,48 / 5,55:1 | AA |
| Selector inactivo con opacidad 0,85 / fondo principal | 12,20:1 | AA |
| Placeholder explícito / fondo del campo | 9,32:1 | AA |
| Texto y botón del footer en reposo / superficie inversa | 16,08:1 | AA |
| CV resaltado en reposo y hover | 16,08 / 10,48:1 | AA |
| Nota de resultados con opacidad 0,8 / surface-main | 10,44:1 | AA |
| Foco turquesa / fondo principal, profundo y surface-main | 9,24 / 9,44 / 8,77:1 | Supera 3:1 |
| Foco oscuro del footer / superficie inversa | 16,08:1 | Supera 3:1 |

`text-static-inverse` es apropiado sobre acciones y resaltados de color fijo; `text-inverse` corresponde a la superficie inversa del footer. `background-deep` funciona como respaldo de medios y `surface-main` como banda de contenido. No encontré un error semántico adicional en esos mapeos. El acento repetido es una decisión explícita del handoff; no propongo cambiarla sin evidencia visual. El foco oscuro del footer y las barras turquesa ya estaban implementados (`styles.css:312–313`); no son correcciones de esta revisión. Los contrastes calculados no certifican todos los píxeles de medios, solapamientos o estados transitorios.

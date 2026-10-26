# Revisión: registro-codigo v3

## Veredicto

**Aprobado con observaciones.** El ajuste móvil cumple el handoff. Queda una contradicción residual en la skill externa y persiste la observación tablet heredada. Tercera y última iteración del protocolo.

## Resumen

Los cinco videos miden 388 px en mobile EN/ES; las figuras, aproximadamente 420 px. El alto fijo es correcto: representa la restricción explícita aprobada en Figma y mantiene `object-fit: contain`. No recomiendo sustituirlo por una fórmula fluida sin una nueva decisión de diseño.

Las dos skills locales resuelven la contradicción y acotan correctamente el alcance. El estándar 5 externo también está corregido, pero su paso 3 conserva una instrucción incompatible.

Los cambios concurrentes de Motion y de la grilla desktop se preservaron. Esta aprobación corresponde al ajuste móvil y su aislamiento; no certifica esos cambios adicionales de diseño.

## Hallazgos

| # | Severidad (crítica/alta/media/baja) | Archivo:línea | Hallazgo | Evidencia | Recomendación |
|---|---|---|---|---|---|
| 1 | baja | `/Users/dave/.claude/skills/figma-senior-build/SKILL.md:95` | El paso 3 todavía exige columnas enteras para cualquier variable de ancho, pese a las excepciones del estándar 5. | Un icono o logo de tamaño intrínseco no tiene por qué medir columnas enteras; su contenedor sí debe alinearse. | Aplicar esa exigencia al contenedor y remitir a las excepciones documentadas. Propuesto; archivo externo fuera de las raíces de escritura autorizadas. |
| 2 | media | `intercambio/evidencia/2026-10-26_registro-codigo/medidas.md:17` | Persiste la diferencia histórica de Unified EN a 768. | Chrome actual: 940.125 px; Figma entregado anteriormente: 996.88 px; diferencia −56.755 px. | Contrastar tipografía y cortes con el frame tablet en una tarea separada. Sin alturas compensatorias ni cambios de copy. |
| 3 | baja | `intercambio/handoffs/2026-10-26_registro-codigo_v3.md:65`; `v3/statement/styles.css:417` | La nota de aislamiento quedó desactualizada por una ampliación concurrente documentada en el handoff de Motion. | La regla compartida `.a-cs--grid` mueve Context de Registro a nueve columnas: 1150 px a 1600 y 915.203 px a 1280. Los altos permanecen en 720/640. | Evaluar esa ampliación en la revisión de Motion v2; no atribuirla al override móvil ni revertirla aquí. |
| 4 | baja | `intercambio/handoffs/2026-10-26_registro-codigo_v3.md:12` | La altura total de Figma entregada corresponde a un snapshot anterior. | El frame `5074:1002` mide ahora 8939.81, frente a 8923.81 entregados. Las figuras conservan 420 y las secciones reproducen la tabla. | Usar la referencia actual para comparar la página completa. Diferencia actual código/Figma: −19.81 px; no compensarla con una altura fija. |

## Correcciones aplicadas directamente por Codex

| # | Archivo | Cambio | Motivo |
|---|---|---|---|
| 1 | `v3/statement/styles.css:462` | Corregido el comentario que todavía describía videos móviles de 223.75 px; ahora distingue tablet/desktop de la excepción móvil. | Evitar documentación contradictoria sin modificar el comportamiento. |

Añadidos esta revisión y la evidencia independiente con baseline aislado y hashes. Sin cambios de copy, métricas, diseño o skills; sin commit, push ni despliegue.

## Verificación ejecutada

- Leídos AGENTS.md, CLAUDE.md, protocolo, plantilla, handoff v3, revisión v2 y referencias pertinentes, incluida la ampliación concurrente del handoff Motion v2.
- **Figma en vivo, solo lectura:** `5074:1002` confirma cinco figuras de 358×420. Las seis secciones móviles difieren del código entre 1.37 y 2.88 px.
- **Chrome real, EN/ES:** 390×844, 360×800, 768×1024, 1280×800 y 1600×900. Cinco videos de 388/388/460/640/720 px respectivamente. Figuras móviles de 419.55/419.5 px y captions de una línea. Página móvil EN/ES: 8920/9471 a 390 y 9098/9725 a 360. Sin overflow horizontal ni errores o advertencias capturados. Inspección visual móvil, tablet y desktop; viewport restaurado.
- **Regresión aislada:** 20 pares Motion/Menores, cinco resoluciones y ambos idiomas, contra el CSS final sin el override móvil de Registro. Alturas de secciones, Final, Next y página idénticas; tamaños CSS de videos idénticos; imágenes cargadas y sin overflow. Este control conserva los cambios concurrentes y no certifica equivalencia con Motion histórico.
- **Controles estáticos:** pasan `node --check` de `app.js`, `shared/site.js`, `build-pages.mjs` y `git diff --check`. Caché final coherente: `20261026-grid-3-9`, ocho HTML y generador. Hashes del estado medido estables al finalizar.
- **Herramientas auxiliares:** Taste lint conserva el FAIL preexistente de la sombra de foco en `styles.css:131`; Taste inspect no pudo iniciar Chrome headless y se sustituyó por Chrome conectado. Impeccable context/detect ejecutados: avisos tipográficos frente al DESIGN.md global, sin defecto nuevo en el cambio revisado.
- **Límites:** no probados Safari, Firefox, zoom/texto aumentado, lectores de pantalla, touch físico ni reduced motion emulado. No se volvió a consultar el frame tablet de Unified.
- Evidencia y método: [verificacion.md](/Users/dave/Documents/Personal/davidmontealegreux-site/intercambio/evidencia/2026-10-26_registro-codigo-v3-review/verificacion.md). Revisión guardada en [registro-codigo_v3_revision.md](/Users/dave/Documents/Personal/davidmontealegreux-site/intercambio/revisiones/2026-10-26_registro-codigo_v3_revision.md).
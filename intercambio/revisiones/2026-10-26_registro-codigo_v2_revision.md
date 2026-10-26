# Revisión: registro-codigo v2

## Veredicto

**Aprobado con observaciones.** Final outcomes cumple el alcance de v2; no se detectaron regresiones en Motion ni Menores. Persisten una ambigüedad en las skills y la diferencia de Unified señalada en v1. El cambio móvil aparecido durante la revisión no queda certificado contra Figma.

## Resumen

Título, intro y lista de Final outcomes llenan las 12 columnas en los diez escenarios EN/ES. Los ítems aprovechan el ancho restante tras la sangría de 1.5em.

No quedan topes de ancho medidos activos en el copy de `.a-cs--grid`: los límites base de 52ch/40ch quedan anulados en `v3/statement/styles.css:401` y `:411`. Eliminarlos globalmente afectaría páginas fuera del alcance, incluido Menores.

La regla principal de las skills es clara, pero su excepción se contradice. El intento de aclararla no pudo guardarse porque `.agents/` tiene permisos de solo lectura en esta sesión. La skill externa se leyó y no se editó.

## Hallazgos

| # | Severidad (crítica/alta/media/baja) | Archivo:línea | Hallazgo | Evidencia | Recomendación |
|---|---|---|---|---|---|
| 1 | baja | `.agents/skills/pixel-perfect/SKILL.md:70`; `.agents/skills/pixel-perfect/references/checklist.md:11` | La excepción exige que una medida que la grilla no puede expresar equivalga a columnas enteras. El checklist también ordena eliminar topes sin acotar el alcance. **Propuesto; no aplicado por permisos.** | Contradicción entre ambas condiciones. La skill externa `figma-senior-build`, estándar 5, repite la misma redacción. | Reservar la excepción para tamaños intrínsecos o restricciones explícitas; documentarla y alinear el contenedor a columnas. Limitar la eliminación de topes al alcance autorizado. |
| 2 | media | `intercambio/evidencia/2026-10-26_registro-codigo/medidas.md:17`; `v3/shared/content.js:544` | Unified EN a 768 sigue siendo 56.75 px más bajo que Figma. **Observación heredada; sin cambios.** | Chrome: 940.125 px; Figma entregado: 996.88 px. El copy conserva sus 360 px de ancho. | Contrastar propiedades tipográficas y cortes con Figma. No compensar con alturas fijas, saltos manuales ni cambios de copy. |
| 3 | baja | `v3/statement/styles.css:447`; `intercambio/handoffs/2026-10-26_registro-codigo_v2.md:20`; `intercambio/evidencia/2026-10-26_registro-codigo/medidas.md:44` | Apareció un cambio posterior no descrito en v2: videos móviles de 388 px y caché `registro-mobile420`. La tabla móvil dejó de describir el árbol actual. **Aclaración aplicada; código conservado.** | A 390, página EN actual: 8920 px frente a 8099 históricos. Final conserva la lista de 231 px. | Incorporar el cambio móvil y su evidencia Figma al siguiente handoff. No certificarlo usando la tabla v2. |

## Correcciones aplicadas directamente por Codex

| # | Archivo | Cambio | Motivo |
|---|---|---|---|
| 1 | `intercambio/evidencia/2026-10-26_registro-codigo/medidas.md:48` | Añadida nota que distingue el snapshot v2 del cambio móvil posterior, con alturas actuales EN/ES y referencia a la verificación independiente. | Evitar que la evidencia histórica se interprete como medición del código actual. |

Se añadieron evidencia independiente y esta revisión. No se modificaron código de la aplicación, copy, métricas ni skills. Cambios previos y concurrentes preservados. **Sin commit, push ni despliegue.**

## Verificación ejecutada

- Leídos AGENTS.md, CLAUDE.md, protocolo, plantilla, handoff, revisión anterior, evidencia, implementación y las tres skills referenciadas. Comparación de diseño contra la tabla entregada; sin consulta a Figma en vivo.
- **Registro en Chrome real, EN/ES:** 1600×900, 1280×800, 768×1024, 390×844 y 360×800. Título/intro/lista: 1544 / 1228.8125 / 736 / 358 / 328 px de ancho; desviación de grilla inferior a 0.02 px. `max-width` computado: `none`.
- **Alturas EN reproducidas:** intro 45.59 / 41.77 / 35.61 / 51 px; lista 194.30 / 155.41 / 110.38 / 231 px. Diferencia máxima frente a Figma entregado: 0.41 px en intro y 2.95 px en lista. Capturas revisadas en desktop, tablet y móvil, sin defectos nuevos visibles en Final.
- **Cambio móvil posterior:** repetidos los cuatro escenarios móviles EN/ES; cinco videos de 388 px y figuras de aproximadamente 420 px. Final conserva sus medidas. Altura total EN/ES: 8920/9471 px a 390 y 9098/9725 px a 360.
- **Overflow y consola:** Registro sin elementos de main fuera horizontalmente del viewport; `scrollWidth === innerWidth`. Sin errores ni advertencias capturados.
- **Regresión:** 20 pares baseline/actual de Motion y Menores, cinco resoluciones y ambos idiomas, con todas las imágenes cargadas. Alturas idénticas por sección, Final y Next; sin overflow de página. Referencia: fixtures aprobados de v1.
- **Comprobaciones estáticas:** pasan `node --check` de `app.js`, `shared/site.js` y `build-pages.mjs`, y `git diff --check`. Caché actual coherente en los ocho HTML y el generador.
- **Herramientas auxiliares:** Taste lint mantiene un FAIL preexistente por la sombra de foco del contacto (`styles.css:131`). Taste inspect y pixel-perfect audit no pudieron iniciar Chrome headless; se sustituyeron por Chrome conectado, sin declararlos aprobados. Impeccable emitió avisos tipográficos frente al DESIGN.md global que no justifican cambiar la escala V3 aprobada.
- **Límites:** sin validación Figma del cambio móvil concurrente; Safari, Firefox, lectores de pantalla, touch físico y reduced motion emulado no probados. Viewport restaurado.
- [Evidencia y método](/Users/dave/Documents/Personal/davidmontealegreux-site/intercambio/evidencia/2026-10-26_registro-codigo-v2-review/verificacion.md). [Revisión guardada](/Users/dave/Documents/Personal/davidmontealegreux-site/intercambio/revisiones/2026-10-26_registro-codigo_v2_revision.md).
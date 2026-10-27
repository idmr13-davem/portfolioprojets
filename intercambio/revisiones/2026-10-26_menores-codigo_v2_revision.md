# Revisión: menores-codigo v2

## Veredicto

Requiere cambios

## Resumen

El token y el alcance están bien implementados: los cuatro videos de `#flows` tienen radio computado de 32 px en las cinco resoluciones. Play mantiene su separación de 12 px, sin recorte visible. Registro y Motion conservan sus radios y dimensiones de referencia.

Sin embargo, el resultado no garantiza esquinas de 32 px sobre las grabaciones: `object-fit: contain` deja bandas internas y la curva se aplica al elemento completo. Corregí la afirmación documental que descartaba esas bandas. Propongo el ajuste visual sin aplicarlo porque requiere decidir cómo encajar las grabaciones conservando las alturas y el botón aprobados.

Respuesta al handoff: no observé recorte de Play ni de contenido relevante en las capturas inspeccionadas; no se certifican todos los fotogramas. El defecto comprobado es la falta de un radio visible uniforme sobre las grabaciones.

## Hallazgos

| # | Severidad (crítica/alta/media/baja) | Archivo:línea | Hallazgo | Evidencia | Recomendación |
|---|---|---|---|---|---|
| 1 | alta | `v3/statement/styles.css:496`, junto con `:180` | El radio del elemento no consigue visualmente 32 px sobre las cuatro grabaciones en todas las resoluciones. | A 390×844, el primer elemento mide 358×675,20, pero la grabación ocupa ~302,91 px de ancho: quedan bandas laterales de 27,55 px por lado. A 1600 quedan 19,50 px. Confirmado con medidas y capturas. | Propuesta, sin aplicar: conservar el espacio de cada figura, encajar cada grabación según su proporción real y redondear ese rectángulo. Mantener Play fuera del recorte y definir su anclaje. Evitar `cover` sin validar qué contenido perdería. |
| 2 | baja | `intercambio/handoffs/2026-10-26_menores-codigo_v2.md:24` | El supuesto de proporciones idénticas y llenado completo era incorrecto. Corregido. | Dimensiones nativas: 716×1596, 696×1516, 716×1596 y 718×1592. El límite `80svh` también produce bandas. | Conservar la aclaración aplicada y comprobar el rectángulo visible además del estilo computado. |

## Correcciones aplicadas directamente por Codex

| # | Archivo | Cambio | Motivo |
|---|---|---|---|
| 1 | `intercambio/handoffs/2026-10-26_menores-codigo_v2.md:24` | Sustituí el supuesto de llenado completo por las proporciones y bandas verificadas, con referencia a la evidencia independiente. | Corrección documental clara y acotada que evita una conclusión visual falsa. |

No modifiqué código, Figma ni contenido editorial. Sin commit, push ni despliegue.

## Verificación ejecutada

- Leídos AGENTS.md, CLAUDE.md, protocolo, plantilla, handoff, revisión v1 y evidencia referenciada. Inspeccionados CSS, token, generador, ocho HTML y copia de comparación.
- **Menores EN/ES:** 1600×900, 1280×800, 768×1024, 390×844 y 360×800. Radio de 32 px en las 40 comprobaciones; cero overflow horizontal. Play a 12 px de los bordes derecho e inferior en ES en los cinco tamaños.
- **Alturas:** 720 / 640 / 802,45 / 675,20 / 640 px. Coherentes con v1; la diferencia de ~0,36 px a 390 es compatible con el redondeo documentado allí. No hubo comparación A/B previa al radio: la copia suministrada ya contiene el cambio. `border-radius` no modifica el cálculo de altura.
- **Inspección visual:** capturas a 1600, 390 y 360; bandas visibles, Play y foco completos. Capturas consultadas en herramientas, sin PNG guardado.
- **Registro y Motion EN:** cinco tamaños, sin overflow y con radio de 0 px en sus videos de figura. A 1600, Registro conserva 1150×720 y ~624,67×720; Motion, verticales de 362×720 y muestras de 362×362.
- **Consola capturada:** cero warnings/errors en los tres casos. Sin certificación de reproducción completa.
- **Comprobaciones estáticas:** `node --check` aprobado para `app.js`, `content.js` y `build-pages.mjs`; `git diff --check` aprobado. Caché coherente en ocho HTML y generador. Token confirmado en `css/tokens/figma.css:79`.
- **Impeccable:** contexto y detector ejecutados; avisos tipográficos advisory preexistentes, ninguno sobre la regla nueva. Sin nueva lectura de Figma ni repetición del audit de grilla de v1.
- Evidencia guardada en [verificacion.md](/Users/dave/Documents/Personal/davidmontealegreux-site/intercambio/evidencia/2026-10-26_menores-codigo/revision-codex-v2/verificacion.md). Revisión guardada en [2026-10-26_menores-codigo_v2_revision.md](/Users/dave/Documents/Personal/davidmontealegreux-site/intercambio/revisiones/2026-10-26_menores-codigo_v2_revision.md). Navegador restaurado a ES y sin override de viewport.
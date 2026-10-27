# Revisión: figma-caso2-motion v1

## Veredicto
**Requiere cambios**

## Resumen

La adaptación a la plantilla 3 + 9 es coherente. Los títulos desktop ocupan tres columnas, las muestras completan las nueve restantes y los ejemplos conservan el ancho completo. En tablet, título y contenido se apilan correctamente.

Se requiere corregir la proporción del hero de 1600 y completar la evidencia de 390. No se modificó Figma ni código del sitio. Las propuestas respetan la edición paralela de David.

Revisión guardada en [2026-10-25_figma-caso2-motion_v1_revision.md](intercambio/revisiones/2026-10-25_figma-caso2-motion_v1_revision.md).

## Hallazgos

| # | Severidad (crítica/alta/media/baja) | Archivo:línea | Hallazgo | Evidencia | Recomendación |
|---|---|---|---|---|---|
| 1 | media | `intercambio/evidencia/2026-10-25_figma-caso2/estructura.md:29`; `v3/statement/styles.css:157` | El hero de 1600 incumple la relación 9:16 declarada. | Cuatro columnas miden 493,333 px y requieren 877,037 px de alto. El token declara 792,44 px: faltan 84,597 px, un 9,65 %. El render también muestra cajas proporcionalmente más bajas. | Frame **`5083:669`**, bloque **Hero videos**: mantener ancho **493,333 px** y cambiar `case-page/heroset-video-height`, modo 1600, a **877,04 px**. Mantener gutter 32 y padding vertical 64. Preferir relación 9:16 vinculada al ancho. En 1280, normalizar a **697,84 px** frente a 698,03; esa diferencia es solo redondeo. |
| 2 | alta | `intercambio/evidencia/2026-10-25_figma-caso2/estructura.md:25`; `v3/shared/content.js:1222`; `v3/statement/app.js:158` | La evidencia mobile no permite comprobar el cierre completo. Esto no demuestra que falten nodos en Figma. | `figma-390.png` se interrumpe visualmente dentro del primer resultado final. No permite verificar el segundo resultado, la navegación ni el footer. Además, precede a la edición de David. | Frame **`5083:1485`**: después de su edición, exportar **el frame completo a 1×**, desde Header hasta Footer. Comprobar alto **Hug** del frame raíz y de Final outcomes, sin recorte del cierre. Deben quedar **dos resultados**, navegación y footer. Si ya existen, corregir únicamente la exportación. No intervenir en las muestras mobile. |
| 3 | baja | `intercambio/evidencia/2026-10-25_figma-caso2/estructura.md:47` | La descripción del título mobile contradice el render entregado. | El PNG muestra tres líneas: “Motion design” / “system” / “- Motion Level”. La documentación afirma que “Motion design system” queda en una línea. | Frame **`5083:1485`**, **Hero/title**: actualizar captura y descripción al estado vigente. No reducir tipografía basándose en esta evidencia anterior. |
| 4 | baja | `intercambio/evidencia/2026-10-25_figma-caso2/estructura.md:45` | El resultado “0 hallazgos” de grilla no es reproducible con los archivos adjuntos. | No hay inventario de coordenadas ni reporte por nodo. Los PNG reducidos no permiten certificar todos los desvíos de 2–8 px ni propiedades internas de Figma. | Adjuntar por bloque: **nodo, x, ancho, columnas inicial/final y desviación**. Incluir evidencia de auto layout, instancias y bindings. Los bordes previstos deben coincidir con la grilla, admitiendo solo redondeo subpíxel. |

## Correcciones aplicadas directamente por Codex

| # | Archivo | Cambio | Motivo |
|---|---|---|---|
| — | — | **Ninguna corrección aplicada en Figma ni en código del sitio.** Se guardó únicamente esta revisión. | El encargo exige proponer las correcciones de Figma con frame, bloque y valor. |

## Verificación ejecutada

Se leyeron el protocolo, el handoff, `estructura.md`, la plantilla, `CLAUDE.md`, el checklist pixel-perfect y las fuentes referenciadas. También se inspeccionaron el HTML del caso y su renderizador. Se compararon los seis renders suministrados, utilizando recortes para revisar captions y contenido mobile. No se ejecutó una nueva sesión de navegador ni una auditoría dentro de Figma.

**Cálculos de columnas**

Se aplicaron:

- Columna: `C = (W − 2M − 11G) / 12`.
- Ancho de N columnas: `NC + (N − 1)G`.

Todos los valores siguientes están en píxeles y son relativos al frame:

| Frame | Margen / gutter | Columna | 3 columnas | 4 columnas | 6 columnas | 9 columnas | 12 columnas | Inicio columna 4 |
|---|---|---|---|---|---|---|---|---|
| 390 | 16 / 16 | 15,167 | 77,5 | 108,667 | 171 | 264,5 | 358 | 109,5 |
| 768 | 16 / 16 | 46,667 | 172 | 234,667 | 360 | 548 | 736 | 204 |
| 1280 | 25,6 / 25,6 | 78,933 | 288 | 392,533 | 601,6 | 915,2 | 1228,8 | 339,2 |
| 1600 | 28 / 32 | 99,333 | 362 | 493,333 | 756 | 1150 | 1544 | 422 |

**Correspondencia de bloques con la grilla**

- **Plantilla desktop:** `288 + 25,6 + 915,2 = 1228,8` en 1280; `362 + 32 + 1150 = 1544` en 1600. La división 3 + 9 completa exactamente el ancho útil.
- **Muestras:** tres cajas de 288/362 px, más dos gutters, completan las nueve columnas. Los tokens `sample-size` coinciden con el cálculo.
- **Hero y ejemplos:** tres cajas de cuatro columnas más dos gutters completan doce columnas en desktop/tablet.
- **Hero mobile/tablet:** los altos derivados son 636,444 px en 390 y 417,185 px en 768; coinciden con los tokens 636,44 y 417,18. La discrepancia sustancial está en 1600.
- **Expresividad:** dos cajas de tres columnas desktop son coherentes dentro del contenido de nueve. En tablet, `360 + 16 + 360 = 736`: completan doce columnas.
- **Panel de ejes:** ocupa nueve columnas desktop y doce en tablet/mobile. Sus insets declarados son intencionales y no constituyen desalineación.
- **Roadmap y benchmark:** el contenedor puede ocupar doce columnas mientras la imagen FIT conserva espacio interior. El borde visible de la ilustración no basta para denunciar un error de grilla.

No se identificaron pares de bordes casi alineados inequívocos. La resolución suministrada impide certificar la ausencia de diferencias de 2 px.

**Comparación con la página real**

En 1280/768 se conserva la secuencia editorial: Hero → Objectives/Outcomes → Context → Challenges → Roadmap → Focus → Benchmark → Examples → Properties → Motion Level → Final outcomes → navegación → footer.

El benchmark aparece en Figma y está definido en `v3/shared/content.js:903`, aunque su imagen no aparece en las capturas del navegador. **No debe eliminarse de Figma**; la causa de su ausencia en esas capturas queda sin determinar.

Las diferencias desktop frente al navegador —plantilla 3 + 9, viñetas y fondo `Background/Deep` del cierre— están expresamente aprobadas. No se consideran regresiones.

**Contenido y captions**

- Las tres captions de ejemplos están completas en los renders de 1280/768 y coinciden con `v3/shared/content.js:935`, `:944` y `:953`.
- “Less expressive” y “More expressive” están presentes, conforme a `:1114` y `:1123`.
- Scale, Position, Opacity y Rotation conservan tres muestras por grupo en desktop/tablet.
- El panel mantiene los cuatro signos de ejes, ambos extremos y sus ejemplos.
- Desktop/tablet conservan los dos resultados finales. El cierre mobile queda pendiente por el hallazgo 2.

**Ritmo y jerarquía**

Los títulos, subtítulos, cuerpo y captions mantienen niveles diferenciados. El gap SS de 12 px antes de los videos de expresividad está autorizado por el handoff. Las preguntas de Focus introducen los bloques posteriores; no se propone eliminarlas como información repetida.

**Límites de la verificación**

Los PNG de Figma miden 634 × 5000, 569 × 5000 y 381 × 5000 para 1600, 1280 y 768, respectivamente. Sus escalas efectivas difieren ligeramente de las cifras redondeadas del handoff.

Los renders no permiten certificar bindings a Libreria_Q3-2026, estilos, instancias, Hug/Fill, redimensión a 1440 ni comportamiento en español. Tampoco permiten validar el estado actual de 390 mientras David lo edita. No se efectuaron commit, push ni despliegue.
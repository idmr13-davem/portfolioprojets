# Revisión: figma-caso1-responsive v1

## Veredicto

**Aprobado con observaciones**

## Resumen

La adaptación respeta la composición 3 + 4 + 5 en desktop, 6 + 6 debajo del título en tablet y el apilado en mobile. Los bloques tabulados coinciden con la grilla; no encontré desalineaciones de 2–8 px.

Recomiendo conservar la composición tablet: mantiene próxima cada explicación a su video y ofrece un ancho de lectura adecuado. Hay una inconsistencia visible: las viñetas de “Final outcomes” presentes en 1600 desaparecen en los otros tres frames.

Revisión guardada en `intercambio/revisiones/2026-10-25_figma-caso1-responsive_v1_revision.md`.

## Hallazgos

| # | Severidad (crítica/alta/media/baja) | Archivo:línea | Hallazgo | Evidencia | Recomendación |
|---|---|---|---|---|---|
| 1 | media | `intercambio/evidencia/2026-10-25_figma-caso1/estructura.md:4`; `intercambio/handoffs/2026-10-25_figma-caso1-responsive_v1.md:8`; `.claude/skills/pixel-perfect/references/checklist.md:21` | “Final outcomes” pierde el formato de lista de la referencia en los tres frames adaptados. | La inspección de los cuatro renders y sus recortes confirma tres viñetas en 1600. En 1280, 768 y 390 aparecen tres párrafos en negrita sin marcadores. | En **1280 `5074:650`**, **768 `5074:826`** y **390 `5074:1002`**, bloque **Final outcomes**, establecer **tipo de lista = Bulleted**, **3 ítems**, con sangría francesa como en `5074:474`. Conservar copy, estilos tipográficos y ancho del contenedor; permitir crecimiento vertical según contenido. **Propuesta sin aplicar.** |

## Correcciones aplicadas directamente por Codex

| # | Archivo | Cambio | Motivo |
|---|---|---|---|
| — | — | **Ninguna corrección aplicada a Figma ni al código del sitio.** Solo se creó el informe de revisión. | El pedido limita las correcciones de diseño a propuestas precisas. |

## Verificación ejecutada

Leídos el protocolo, la plantilla, el handoff, `estructura.md`, `CLAUDE.md`, el checklist referenciado y las reglas de grilla de `v3/statement/styles.css`. Inspeccionados los cuatro PNG locales y recortes de “Final outcomes”.

**Cálculo independiente de columnas**

A partir de `estructura.md:11–12`:

- Ancho de columna: `c = (W − 2m − 11g) / 12`.
- Inicio de columna: `xₙ = m + (n − 1)(c + g)`.
- Ancho de un bloque de `k` columnas: `kc + (k − 1)g`.

| Frame | Columna calculada | Comprobación de bloques, en px |
|---|---:|---|
| **1600 · `5074:474`** | 99,3333 | Título: **x 28 / ancho 362**, 3 columnas. Parts: **x 422 / ancho 493,3333**, columnas 4–7. Video: **x 947,3333 / ancho 624,6667**, columnas 8–12. Copy de Context/Challenges: **x 422 / ancho 1150**, 9 columnas. Ambos terminan en **1572**. |
| **1280 · `5074:650`** | 78,9333 | Título: **x 25,6 / ancho 288**, 3 columnas. Parts: **x 339,2 / ancho 392,5333**, columnas 4–7. Video: **x 757,3333 / ancho 497,0667**, columnas 8–12. Copy de Context/Challenges: **x 339,2 / ancho 915,2**, 9 columnas. Ambos terminan en **1254,4**. |
| **768 · `5074:826`** | 46,6667 | Títulos y Context/Challenges: **x 16 / ancho 736**, 12 columnas. Parts: **x 16 / ancho 360**, 6 columnas. Video: **x 392 / ancho 360**, columnas 7–12. Gap **16**; borde derecho **752**. |
| **390 · `5074:1002`** | 15,1667 | Títulos, copy, Parts y Video: **x 16 / ancho 358**, 12 columnas. Borde derecho **374**, sin desplazamientos laterales. |

Estos resultados coinciden con `estructura.md:23–27`. Las diferencias frente a las coordenadas enteras publicadas son inferiores a **0,5 px**. El token `title-width = 287,99` de 1280 difiere **0,01 px** del cálculo: no constituye un defecto visible ni justifica redondear las variables.

El ajuste de Context/Challenges en 1600 es correcto: `28 + 362 + 32 = 422`. El gap anterior de 40 daba **430**, un desplazamiento de **8 px**. En 1280, `25,6 + 288 + 25,6 = 339,2`, inicio de la columna 4.

**Composición, ritmo y jerarquía**

- **Tablet:** conservar título arriba y Parts/Video en 6 + 6. Funciona como adaptación de la composición desktop y mantiene una relación clara entre explicación y evidencia.
- **1280:** la columna de texto más alta que el video en Google/Unified es compatible con alineación superior y altura según contenido. No recomiendo centrar verticalmente los videos ni fijar alturas.
- **Mobile:** el orden título → partes → video se conserva. No se observan títulos cortados, solapamientos ni invasión de márgenes.
- **Ritmo:** no aparece una ruptura evidente entre secciones repetidas. Faltan coordenadas Y para certificar distancias verticales exactas.
- **Fondos:** Final outcomes y Case navigation ocupan correctamente todo el frame (`estructura.md:28–29`). No son salidas de grilla.
- **Espaciado:** `section-half` corresponde exactamente a la mitad de `section`: **110/220**, **89,6/179,2** y **60/120** en tablet/mobile (`estructura.md:17`).
- **Jerarquía:** títulos, subtítulos de partes y cuerpo mantienen niveles diferenciados. El cierre resume impactos con una función editorial válida; no propongo eliminarlo por repetición ni modificar cifras.

**Tokens y límites de evidencia**

Los valores tabulados son compatibles con los tokens y sus modos. **No se puede inferir que exista un valor fijo incorrecto solo porque la tabla muestre un número.** Tampoco puede comprobarse el binding a partir de ese número.

Los PNG y las tablas no acreditan `layoutMode`, Hug/Fill, modos asignados, text styles, instancias ni bindings de colores, espaciados y radios. Estas propiedades quedan **sin certificar**, no identificadas como defectuosas. Para completar esa comprobación hace falta un inspector/export de dichas propiedades por frame y de los componentes repetidos.

La auditoría previa excluyó Header/Footer (`estructura.md:35`); su resultado de “0 hallazgos” no certifica toda la página. No se reprodujo la redimensión a 1440 ni se verificaron español, interacciones o reproducción de video con renders estáticos.

No se ejecutó el auditor web porque el sitio conserva el layout anterior (`handoff:50`) y no serviría para validar estos frames. No hubo commit, push ni despliegue.
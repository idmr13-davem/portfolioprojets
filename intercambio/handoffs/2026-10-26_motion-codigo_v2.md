# Handoff: motion-codigo v2

## Objetivo
Aplicar en código (`/v3/statement/work/motion-design-system.html`) los cambios de diseño que David hizo en Figma en el caso de estudio 2: sección `5076:1275`, frames 1600 `5083:669`, 1280 `5083:941`, 768 `5083:1213` y 390 `5083:1485`.

## Contexto y restricciones
- Lectura de Figma de solo consulta, comparada contra la versión anterior que se implementó en v1 (`intercambio/evidencia/2026-10-25_motion-codigo/medidas.md`).
- **Cambios en desktop (1600 y 1280):**
  1. **Roadmap:** las 4 tarjetas de pasos (`Roadmap step`) se eliminaron. Ahora los pasos son una lista con viñetas (UNORDERED) dentro del mismo texto, justo después del párrafo, sin separación (`paragraphSpacing` 0).
  2. **Imágenes del roadmap y del benchmark:** pasan de 12 a 9 columnas, bajo el copy (x 422 · 1150 en 1600; x 339.2 · 915 en 1280).
     - La imagen del roadmap queda con su alto natural (1150 × 621; 915 × 496).
     - La del benchmark mide 1150 × 720 en 1600 y 915 × 640 en 1280.
  3. **Ejemplos:** pasan de 3 × 4 columnas a 3 × 3 columnas dentro de las 9 de contenido (362 × 774; 287.93 × 694).
  4. **Viñetas:** las listas de Challenges y de "What does frequency mean?" ahora llevan viñetas. Objectives, Outcomes y los extremos del eje siguen sin viñetas.
- **Solo en 1600:**
  - el gap de la sección Roadmap es 64 (ligado a la variable `case-page/heroset-pad`);
  - el gap de la parte "What do we mean by expressivity?" es 48 (XL).

  El frame de 1280 mantiene 40 y 12.
- **En los 4 frames:** `Body` ya no tiene padding inferior; Final outcomes sigue directamente a la última sección. Tablet y mobile no tienen otros cambios: siguen con tarjetas de pasos, listas sin viñetas y media a 12 columnas.
- **Footer:** el de Motion se sincronizó con el de Registro en tablet (473) y mobile (554). El footer del código ya coincide (472.22 y 552.5), así que no requiere cambios.
- Sin commit (pedido de David). Copia de comparación: `/private/tmp/claude-501/-Users-dave--claude-spares-spare-KCRqve/ddc09c22-d6f7-441b-b966-c4769dd8841f/scratchpad/antes-codex-motion-v2/`.

## Qué se hizo
Todo en `v3/statement/styles.css`, bajo "Motion Level only" (salvo la regla de media a 9 columnas, que está en la plantilla compartida; ver Ampliación):
1. `.a-cs--motion .a-cs__final { margin-top: 0; }` (en todos los breakpoints).
2. `@media (min-width: 1024px)`:
   - la media de sección (`.cs-section > .cs-media`) mide 9 columnas, alineada a la derecha (`align-self: flex-end` y ancho calculado con la grilla);
   - los pasos del roadmap se muestran como lista con viñetas, sin fondo ni padding y sin gap, pegados al párrafo (`gap: 0` en `.cs-content` del roadmap);
   - las listas de Challenges y de las partes llevan viñetas (`padding-left: 1.5em`).
3. `@media (min-width: 1500px)`: gap de la sección Roadmap `--space-xxl` (64) y de la primera parte de "level" (expresividad) `--space-xl` (48).
4. Caché de `styles.css`: `?v=20261026-motion-desktop` en los 8 HTML y en `v3/build-pages.mjs`.

No se cambió el markup: los pasos siguen siendo `<ol class="cs-steps">`. En tablet y mobile conservan las tarjetas.

## Medidas (Chromium)
| Bloque | Figma | Código |
|---|---|---|
| 1600 Roadmap (sección) | 1076 | 1076.6 |
| 1600 Imagen roadmap | 422 · 1150×621 | 422 · 1150×621.6 |
| 1600 Gap copy → imagen | 64 | 64 |
| 1600 Benchmark imagen | 422 · 1150×720 | 422 · 1150×720 |
| 1600 Ejemplos | 422/816/1210 · 362×774 | 422/816/1210 · 362×774 |
| 1600 Parte expresividad | 901 | 900.3 |
| 1600 Building (sección) | 1946 | 1940.88 |
| 1600 Página | 12088.5 | 12070 |
| 1280 Roadmap | 886.2 | 884.88 |
| 1280 Imagen roadmap | 339.4 · 915×496 | 339.2 · 915.2×494.69 |
| 1280 Ejemplos | 287.93×694 | 288×693.77 |
| 1280 Benchmark (sección) | 965.2 | 906.55 * |
| 1280 Página | 10623.33 | 10541 |
| 768 Página | 10056.43 | 10040 |
| 390 Página | 14374.54 | 14300 ** |

\* (Superado por la Ampliación 2.) 1280, benchmark: Figma conserva la caja de 640 (`benchmark-image-height`, el 80svh de la versión a 12 columnas). Con 9 columnas, la imagen en FIT mide 915 × 581.6, igual que en el código, así que en Figma quedan unos 58 px vacíos dentro de la caja. En código no los agregué, siguiendo la regla de David de aprovechar el espacio y no usar tokens de medida específica. Hay que confirmarlo con David o ajustar el token en Figma.
\*\* 390: los mismos cortes de línea que se documentaron en v1 (Challenges, copy del Roadmap y del benchmark).

360×800 EN/ES: `scrollWidth` 360, sin elementos fuera del viewport y sin errores de consola.

## Ampliación: grilla 3 + 9 también en el video de Context de Registro
Después de escribir este handoff, David pidió que en Registro ML se respeten siempre las 3 columnas del título a la izquierda en desktop, también en el primer video. En Figma, Context (`5074:502` en 1600, `5074:678` en 1280) tiene ahora el `Video figure` en x 422 · 1150 × 753 (1600) y x 339.4 · 915 × 673 (1280); el alto de la media no cambia (720 / 640).
- Para eso, la regla de media a 9 columnas en desktop pasó de `.a-cs--motion` a la plantilla `.a-cs--grid` (`@media (min-width: 1024px)`, antes de las reglas de tablet). Ahora aplica a los dos casos.
- Caché: `?v=20261026-grid-3-9`.
- Medidas de Registro, Context:
  - 1600: video 422 · 1150 × 720, sección 1246.69 (Figma 1247.2).
  - 1280: 339.2 · 915.2 × 640, sección 1154.26 (Figma 1155.4).
  - 1024: título 230.4, contenido y video en 271.35 · 732.17.
  - 768 y 390: sin cambios (736 × 460; 358 × 388).
- Motion a 1600: roadmap, benchmark y ejemplos siguen en 422 · 1150.

## Ampliación 2: fondo Surface/Main en la imagen del benchmark
David envolvió la imagen del benchmark en un frame con fondo `Surface/Main` de la librería ("surface primary"): `5110:4747` "Frame 4" en 1600 (1150 × 720) y "Frame 5" en 1280 (915 × 640). La imagen va dentro en FIT. Pidió aplicarlo en todas las resoluciones.

Esto también resuelve el punto pendiente del benchmark a 1280: se mantiene la caja de 640 y la imagen (581.6 de alto natural) queda ajustada sobre Surface/Main.

En código, `.a-cs--motion .cs-section--benchmark .cs-figure img` tiene `background: var(--surface-main)` en todos los breakpoints. En ≥1024 tiene además `height: 80svh` (`object-fit: contain`, que ya venía del base). Caché: `?v=20261026-benchmark-surface`.

| Ancho | Figma | Código |
|---|---|---|
| 1600 | 422 · 1150 × 720, sección 1113 | 422 · 1150 × 720, sección 1112.23 |
| 1280 | 339.4 · 915 × 640, sección 965.2 | 339.2 · 915.2 × 640, sección 964.96 |
| 768 | 736 × 468 | 736 × 467.7 (alto natural, fondo Surface/Main) |
| 390 | 358 × 675 | 358 × 675.2 (imagen mobile, fondo Surface/Main) |

Fondo computado: `rgb(10, 35, 35)` (`--surface-main`, tema oscuro).

## Archivos a revisar
- `v3/statement/styles.css` (bloque "Motion Level only")
- Referencias: `intercambio/handoffs/2026-10-25_motion-codigo_v1.md`, `intercambio/revisiones/2026-10-25_motion-codigo_v1_revision.md`, `intercambio/evidencia/2026-10-25_motion-codigo/medidas.md`

## Cómo verificar
1. Motion a 1600×900, 1280×800, 1024×768, 768×1024, 390×844 y 360×800, EN/ES. Compara con la tabla.
2. Desktop: la imagen del roadmap, la del benchmark y los ejemplos empiezan en la columna 4 y terminan en la 12. Las viñetas solo aparecen en Challenges, frequency, pasos del roadmap y Final outcomes.
3. Tablet y mobile: tarjetas de pasos de 77 px, listas sin viñetas y media a 12 columnas, sin cambios respecto de v1, salvo los −60 px de Final outcomes.
4. Registro y Menores sin cambios. Sin overflow ni errores de consola.

## Supuestos y limitaciones
- **Gaps de 64 y 48 en 1600:** los apliqué solo a ≥1500 (el breakpoint grande del sitio), que es donde Figma los tiene. El 64 está ligado a `heroset-pad`, una variable del hero, y puede ser un enlace accidental; en código usé `--space-xxl` (64). Hay que confirmarlo con David.
- **Diferencias entre desktop y el resto:** que desktop tenga lista con viñetas y tablet/mobile tarjetas, sin viñetas, es lo que muestra Figma hoy. Puede que David todavía no haya propagado el cambio.

## Preguntas para el revisor
1. ¿La media a 9 columnas cae exactamente en la grilla (columnas 4–12) en 1024, 1280 y 1600?
2. ¿Hay algún riesgo en convertir los pasos en lista con viñetas por CSS sin cambiar el markup (accesibilidad, `ol` con viñetas)?
3. (Resuelta por David: caja de 640 sobre Surface/Main.) ¿El `height: 80svh` del benchmark en desktop está bien acotado y no afecta al roadmap ni a los ejemplos?

## Respuesta a la revisión anterior (solo v2+)
| Hallazgo (motion-codigo v1) | Decisión | Motivo / evidencia |
|---|---|---|
| 1–3 (500 ms, pasos de 77, tokens de espaciado) | Ya aplicados por Codex en v1 | Se conservan. Los 77 px siguen en tablet y mobile; en desktop los pasos ya no son tarjetas. |
| 4. Diferencias de texto a 390 | Aceptado sin cambios | Siguen documentadas. |

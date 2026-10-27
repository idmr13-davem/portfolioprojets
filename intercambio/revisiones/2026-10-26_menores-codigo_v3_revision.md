# Revisión: menores-codigo v3

## Veredicto

Aprobado

## Resumen

El hallazgo alto de v2 queda resuelto: las cuatro grabaciones llenan su caja de video y reciben el radio L de 32 px. Se conservan las alturas aprobadas, Play a 12 px y los pies alineados a sus columnas. Registro y Motion mantienen sus dimensiones y radios de referencia.

Respuesta al handoff: el centrado es aceptable. Mantiene la composición dentro de las columnas y permite que los captions conserven su alineación; no propongo mover el video a la izquierda. El recorte de `cover` es pequeño y no observé pérdida relevante en los fotogramas inspeccionados; no se certifica la grabación completa.

## Hallazgos

| # | Severidad (crítica/alta/media/baja) | Archivo:línea | Hallazgo | Evidencia | Recomendación |
|---|---|---|---|---|---|
| 1 | baja | `v3/statement/styles.css:498` | El comentario confundía la diferencia total entre proporciones con el recorte por lado. Corregido. | Para 696×1516 frente a 716×1596, la diferencia es 2,336%; `cover` recorta 1,142% del ancho nativo por lado, unos 4,21 px a 360 px de caja. | Conservar la precisión aplicada; no requiere cambiar el encaje. |

Sin defectos funcionales o visuales pendientes atribuibles al cambio revisado.

## Correcciones aplicadas directamente por Codex

| # | Archivo | Cambio | Motivo |
|---|---|---|---|
| 1 | `v3/statement/styles.css:498` | Cambié «≤1.2% ratio difference» por «crops ≤1.2% of the native width per side». | Corrección documental verificable; no modifica declaraciones CSS, diseño, contenido ni comportamiento. |

Sin commit, push ni despliegue.

## Verificación ejecutada

- Leídos AGENTS.md, CLAUDE.md, protocolo, plantilla, handoff v3, revisiones v1/v2 y evidencia v2. Inspeccionados CSS, contenido de los cuatro videos, controlador, token, generador, ocho HTML y copia de comparación.
- **Menores EN/ES:** 1600×900, 1280×800, 1024×768, 768×1024, 390×844 y 360×800. Las 48 comprobaciones dan radio 32 px, Play a 12 px —tolerancia 0,008 px—, caption 12 px debajo y cero overflow horizontal.
- **Tamaños de video:** 323×719,98; 287,12×639,99; ~230,40×513,57; 360×802,45; 302,91×675,19; 287,12×639,99 px, respectivamente. Alturas aprobadas conservadas dentro del redondeo. Captions alineados por fila; diferencia máxima subpíxel de 0,04 px a 1024.
- **Encaje:** dimensiones nativas confirmadas en navegador; `object-fit: cover` llena la caja sin bandas añadidas por CSS (`styles.css:499`). Radio resuelto mediante el token canónico (`css/tokens/figma.css:79`).
- **Inspección visual:** primer video completo a 390 y los cuatro a 1600 en encuadres superior/inferior. Esquinas visibles sobre las grabaciones, botones completos y pies alineados. Reproducción/pausa ejercitada. Sin revisión de todos los fotogramas ni nueva auditoría de teclado.
- **Registro/Motion EN:** seis tamaños, cero overflow, videos con radio 0 px y medidas coherentes con las referencias v1/v2. Reglas nuevas acotadas a Menores/flows (`styles.css:496–500`).
- **Consola:** cero warnings/errors capturados en los tres casos. **Estático:** `node --check` aprobado para `app.js`, `content.js` y `build-pages.mjs`; `git diff --check` aprobado. Caché coherente en ocho HTML y generador (`v3/build-pages.mjs:52`).
- **Herramientas de diseño:** Impeccable con avisos tipográficos preexistentes. Taste lint señala el indicador de foco del input (`styles.css:131`), conservado por accesibilidad. Taste inspect no pudo iniciar Chrome; se usó el navegador abierto para las verificaciones descritas. Sin nueva lectura de Figma.
- La copia suministrada ya contiene v3 y coincide con la entrega; no demuestra un A/B contra v2. La única modificación posterior es el comentario documentado. Español restaurado y viewport de prueba retirado.
- Evidencia detallada: [verificacion.md](/Users/dave/Documents/Personal/davidmontealegreux-site/intercambio/evidencia/2026-10-26_menores-codigo/revision-codex-v3/verificacion.md).
- Revisión guardada en [2026-10-26_menores-codigo_v3_revision.md](/Users/dave/Documents/Personal/davidmontealegreux-site/intercambio/revisiones/2026-10-26_menores-codigo_v3_revision.md).
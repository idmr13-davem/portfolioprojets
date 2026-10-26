# Revisión: motion-codigo v1

## Veredicto

**Aprobado con observaciones.** Correcciones verificadas. Persisten diferencias menores de composición de texto frente a Figma a 390 px.

## Resumen

Motion respeta la composición 3 + 9 en desktop y el apilado en tablet/mobile. No encontré bloques fuera de grilla ni regresiones en Registro ML y Menores.

La duplicación de `gridSection` es acotada y aceptable: reutiliza contenido, medios y traducciones, y solo se selecciona para Motion (`v3/statement/app.js:150`). No recomiendo refactorizar el runtime compartido para este cambio.

Las listas conservan `<ul>/<li>` y Chrome las expone en su árbol de accesibilidad. Safari y lectores de pantalla quedan sin verificar.

## Hallazgos

| # | Severidad (crítica/alta/media/baja) | Archivo:línea | Hallazgo | Evidencia | Recomendación |
|---|---|---|---|---|---|
| 1 | alta | `v3/shared/base.css:85`; `v3/statement/styles.css:385` | Entradas heredadas de 700–900 ms incumplían el límite de 500 ms. **Corregido en el main de Motion.** | Duraciones computadas finales: reveal, título y metadatos = 0.5 s. | Mantener el override local; revisar animaciones compartidas fuera de esta tarea. |
| 2 | media | `v3/statement/styles.css:401` | Pasos del roadmap inferiores a los 77 px documentados en Figma. **Corregido.** | Antes: 76.5/74.88/73.5 px; después: 77 px. Roadmap tablet: 1110.19 px frente a 1111 de Figma. | Conservar `min-height` para permitir crecimiento del texto. |
| 3 | baja | `v3/statement/styles.css:399`; `v3/statement/styles.css:422` | Espacios de 48/12/24 px repetían valores con tokens existentes. **Corregido.** | Ahora usan `--space-xl`, `--space-ss` y `--space-m`. | Mantener referencias semánticas. |
| 4 | media | `intercambio/evidencia/2026-10-25_motion-codigo/medidas.md:12`; `medidas.md:22` | Challenges y Benchmark siguen siendo más bajos que Figma a 390 px. **Pendiente; solo propuesto.** | Challenges: 635.38 frente a 662.8 px. Benchmark: 1081.38 frente a 1108 px. Los anchos coinciden. | Contrastar métricas de fuente y composición de líneas. No está demostrado que la causa sea exclusivamente rasterizado; evitar compensaciones con saltos manuales o cambios de copy. |

## Correcciones aplicadas directamente por Codex

| # | Archivo | Cambio | Motivo |
|---|---|---|---|
| 1 | `v3/statement/styles.css:385` | Entradas de contenido limitadas a 500 ms bajo `.a-cs--motion`. | Cumplir la regla de motion sin afectar otros casos. |
| 2 | `v3/statement/styles.css:401` | `min-height: 77px` en pasos del roadmap. | Respetar Figma sin recortar texto. |
| 3 | `v3/statement/styles.css:399`; `styles.css:422` | Tres espacios sustituidos por tokens existentes. | Coherencia con el design system. |
| 4 | Ocho HTML de `v3/statement/`; `v3/build-pages.mjs:52` | Cache CSS actualizado a `20261025-motion-review1`. | Cargar las correcciones en todos los consumidores. |
| 5 | `intercambio/evidencia/2026-10-25_motion-codigo-review/` | Evidencia de medidas y comprobación reproducible de regresión. | Dejar trazabilidad independiente. |

## Verificación ejecutada

- Leídos protocolo, handoff y referencias de código, contenido, medidas, estructura y CSV; contraste con los renders entregados. No se consultó ni modificó Figma en vivo.
- **Chrome real, Motion EN/ES:** 1600×900, 1280×800, 768×1024, 390×844 y 360×800. En los diez escenarios: `scrollWidth === innerWidth`, sin cajas de main fuera del viewport ni errores/advertencias de consola observados.
- **Grilla:** 47 elementos por resolución en 1600/1280/768 y 45 en 390; cero desviaciones mayores de 0.1 px. Desktop: título x=28/ancho=362 y contenido x=422/ancho=1150, alineados verticalmente. Mobile: muestras 171×171 en x=16/203. Cero `.cs-copy` vacíos.
- Medidos los diez bloques solicitados. Tras corregir los pasos, las diferencias frente a la tabla Figma quedan por debajo de 6 px salvo los dos bloques del hallazgo 4. [Mediciones completas](/Users/dave/Documents/Personal/davidmontealegreux-site/intercambio/evidencia/2026-10-25_motion-codigo-review/verificacion.md).
- **Regresión:** Registro ML y Menores abiertos en los cinco tamaños, EN, sin overflow ni renderer Motion. Comparación VM EN/ES contra `a07f3ef`: HTML idéntico normalizando únicamente la clase añadida al main; CSS compartido anterior y `site.js`/`content.js` intactos. [Resultados](/Users/dave/Documents/Personal/davidmontealegreux-site/intercambio/evidencia/2026-10-25_motion-codigo-review/regression.json).
- **Accesibilidad:** Enter pausa el primer video de muestras; listas presentes en Chrome AX. Reduced motion revisado en código, sin emulación en navegador.
- `node --check` en `app.js`, `site.js` y `build-pages.mjs`, y `git diff --check`: pasan.
- Taste lint señaló el foco preexistente del campo de contacto. Impeccable detect emitió avisos tipográficos frente al DESIGN.md global; no justifican sustituir la escala V3 aprobada.
- El servidor desde sandbox falló con `listen EPERM` y el inspector headless no arrancó. Las pruebas dinámicas se completaron mediante Chrome conectado al servidor localhost disponible.
- Revisión guardada en `intercambio/revisiones/2026-10-25_motion-codigo_v1_revision.md`. Sin commit, push ni despliegue; cambios previos preservados.
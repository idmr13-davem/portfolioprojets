# Revisión: figma-footer v1

## Veredicto

**Aprobado con observaciones**

## Resumen

Las cuatro correcciones documentadas coinciden con el CSS y las mediciones entregadas. Los renders de Home conservan composición, cortes de línea, botones, wordmark y legal sin diferencias visibles relevantes a las escalas exportadas.

La aprobación cubre Home en 768 y 390. Las otras ocho copias y las propiedades nativas de Figma quedan pendientes de verificación independiente.

## Hallazgos

| # | Severidad (crítica/alta/media/baja) | Archivo:línea | Hallazgo | Evidencia | Recomendación |
|---|---|---|---|---|---|
| 1 | media | `intercambio/handoffs/2026-10-26_figma-footer_v1.md:27`; `intercambio/evidencia/2026-10-26_figma-footer/estructura.md:28` | Falta evidencia individual de las otras ocho copias. | Solo hay renders de los dos Footer de Home; las demás alturas se declaran agrupadas. La lectura nativa fue bloqueada. | Adjuntar medidas por nodo, auto layout, sizing, estilos, componentes y variables resueltas de los diez Footer identificados en `estructura.md:7–11`. |
| 2 | media | `intercambio/handoffs/2026-10-26_figma-footer_v1.md:8`; `AGENTS.md:43` | Persiste deuda estructural por mantener el footer repetido mediante clones. | El handoff documenta diez frames independientes; AGENTS exige componentes para elementos repetidos. Es una condición previa a esta corrección. | Proponer un componente compartido con variantes por breakpoint e instancias. Preservar composición y tokens y validar los diez destinos. Sin aplicar por su alcance estructural. |
| 3 | baja | `intercambio/evidencia/2026-10-26_figma-footer/estructura.md:32` | La documentación confundía la posición de la caja del wordmark con el comienzo visible del texto y afirmaba una causa de redondeo no demostrada. | Los JSON contienen cajas de texto, sin límites de glifos ni desglose equivalente de Figma. | **Corregido:** precisar la medición y presentar el redondeo como explicación posible. |

## Correcciones aplicadas directamente por Codex

| # | Archivo | Cambio | Motivo |
|---|---|---|---|
| 1 | `intercambio/evidencia/2026-10-26_figma-footer/estructura.md:32` | Aclaradas las coordenadas del wordmark, la incertidumbre del redondeo y los límites de verificación; añadidas las sumas independientes. | Evitar conclusiones que la evidencia no demuestra. |
| 2 | `intercambio/evidencia/2026-10-26_figma-footer/estructura.md:43` | Vinculada la propuesta de componente con el estándar de AGENTS. | Documentar la deuda estructural pendiente. |
| 3 | `intercambio/evidencia/2026-10-26_figma-footer/review-checks.json` | Guardados cálculos, anchos de botones, dimensiones y SHA-256 de los cuatro PNG. | Dejar trazabilidad de la evidencia inspeccionada. |
| 4 | `intercambio/handoffs/2026-10-26_figma-footer_v1.md:27` | Corregido «otros 9 Footer» por «otros 8 Footer». | Diez copias menos los dos renders de Home dejan ocho sin render. |

No se modificó Figma ni ningún archivo dentro de `v3/`. No se hicieron commits, push ni despliegues.

## Verificación ejecutada

- Leídos AGENTS.md, CLAUDE.md, protocolo, plantilla, handoff y todos sus archivos referenciados.
- Contrastado el CSS: padding superior **128/80 px**, separación de botones **32/12 px** en ambos ejes, ancho móvil **auto**, margen legal **48 px** y padding inferior **12 px**.
- Confirmado que **L=32** y **SS=12** corresponden a los tokens CSS. Los valores documentados de `footer-top` coinciden; sus bindings y modos Figma no pudieron certificarse.
- Recalculadas las alturas:
  - Tablet: `128 + 76 + 32 + 136 + 48 + 40.224 + 12 = 472.224 px`.
  - Móvil: `80 + 81.51 + 32 + 244 + 48 + 39 + 16 + 12 = 552.51 px`.
- Ambas sumas coinciden con **472.2/552.5 px** de los JSON. Frente a los **473/554 px** declarados en Figma quedan diferencias de **0.8/1.5 px**, cuya causa no queda demostrada.
- Pasaron las aserciones de alturas de botones, gaps, separaciones entre bloques y sumas.
- Inspeccionados los cuatro PNG y comparados los renders Figma con recortes del footer del navegador. Coinciden la distribución **3+1** en tablet y las cuatro filas móviles, además de cortes y alineaciones del legal. Sin diferencias relevantes de wordmark o tipografía a estas escalas; no se certifica precisión subpíxel.
- No se ejecutaron nuevas pruebas de navegador, consola, interacción o anchos intermedios.
- Revisión guardada en `intercambio/revisiones/2026-10-26_figma-footer_v1_revision.md`.

La revisión automática de aprobación rechazó la lectura de nodos mediante `use_figma`: «MCP tool call requires approval, but approval policy is never». Por ello no se certificaron ni corrigieron propiedades nativas de Figma.
# Revisión: figma-footer-componente v1

## Veredicto

**Aprobado con observaciones**

## Resumen

Las 24 parejas de alturas documentadas coinciden antes y después. Las medidas de tablet y móvil conservan los valores del CSV anterior. Las capturas no muestran regresiones visibles a sus escalas de exportación.

La aprobación cubre esa consistencia documental y visual. El reemplazo efectivo de las 20 copias, sus vínculos, propiedades y tokens queda pendiente de certificación nativa.

Fijar los modos de `Statement · Type` y `Statement · Layout` por variante es coherente con `Device` como selector explícito. Heredar modos también admite cuatro variantes; no hace falta cambiar la estrategia actual. No hay evidencia que justifique añadir variantes.

## Hallazgos

| # | Severidad (crítica/alta/media/baja) | Archivo:línea | Hallazgo | Evidencia | Recomendación |
|---|---|---|---|---|---|
| 1 | media | `intercambio/evidencia/2026-10-26_figma-footer-componente/estructura.md:19`; `AGENTS.md:43` | Falta evidencia nativa posterior para certificar el reemplazo y el estándar de componentes. | Se declaran 20 instancias sin inventario de IDs y vínculos `mainComponent`. Las capturas no prueban bindings, estilos ni referencias TEXT. La lectura nativa fue rechazada. | Adjuntar los 20 destinos y el desglose de las variantes `5120:1448`, `5120:1463`, `5120:1478` y `5120:1493`: auto layout, sizing, modos resueltos, variables, estilos y Button anidados. Comprobar conservación de overrides al cambiar Device. Sin aplicar. |
| 2 | baja | `intercambio/evidencia/2026-10-26_figma-footer-componente/estructura.md:30` | Se afirmaba igualdad exacta entre el offset del wordmark de Figma y el navegador. | CSV previo: 86.8/477.5; JSON del navegador: 87.5/477.6. Diferencias de −0.7/−0.1 px. | **Corregido:** distinguir la coincidencia con el CSV de la comparación con el navegador. No mover el wordmark. |
| 3 | baja | `intercambio/evidencia/2026-10-26_figma-footer-componente/estructura.md:15` | No se documenta si los botones están expuestos en el panel del Footer. Es una oportunidad de mantenimiento, no un defecto demostrado. | Se enumeran Title, Copyright y Credit; los botones siguen como instancias anidadas. | Si no están expuestos, proponer exponer los cuatro Button en `5120:1494`. No añadir visibilidad, idioma ni variantes sin una necesidad definida. Sin aplicar. |

## Correcciones aplicadas directamente por Codex

| # | Archivo | Cambio | Motivo |
|---|---|---|---|
| 1 | `intercambio/evidencia/2026-10-26_figma-footer-componente/estructura.md:30` | Corregida la comparación de offsets del wordmark. | Evitar afirmar una igualdad contradicha por los JSON. |
| 2 | `intercambio/evidencia/2026-10-26_figma-footer-componente/estructura.md:38` | Añadidos resultados y límites de la verificación independiente. | Separar declaraciones del autor de comprobaciones de Codex. |
| 3 | `intercambio/handoffs/2026-10-26_figma-footer-componente_v1.md:25` | Precisado el bloqueo de lectura y aclarada la relación entre herencia de modos y variantes. | Documentar la limitación real y corregir la explicación técnica. |
| 4 | `intercambio/evidencia/2026-10-26_figma-footer-componente/review-checks.json:1` | Guardadas comprobaciones, dimensiones y hashes SHA-256 de los PNG. | Dejar trazabilidad de la evidencia. |

No se modificó Figma ni ningún archivo dentro de `v3/`. No se hicieron commits, push ni despliegues.

## Verificación ejecutada

- Leídos AGENTS.md, CLAUDE.md, protocolo, plantilla, handoff, archivos referenciados, revisión previa y JSON del navegador.
- Pasaron las aserciones de las **24 parejas de alturas**: cuatro alturas de Footer y veinte de página sin diferencias declaradas.
- Las **diez filas del CSV anterior** coinciden con las alturas **473/554** y offsets **86.8/477.5** documentados después de la conversión.
- Inspeccionados los dos PNG nuevos y los renders anteriores de tablet/móvil: se conservan botones **3+1** en tablet, cuatro filas móviles, distribución del legal y recorte del wordmark. Sin certificación subpíxel.
- Contrastadas las decisiones documentadas con `AGENTS.md:43`. Componentes, variantes, propiedades TEXT, Button anidados y overlay del wordmark son compatibles; su implementación nativa queda pendiente.
- Validado el JSON de comprobaciones; `git diff --check` sin errores.
- Revisión guardada en `intercambio/revisiones/2026-10-26_figma-footer-componente_v1_revision.md`.

La revisión automática de aprobación rechazó la lectura nativa con `use_figma`: «MCP tool call requires approval, but approval policy is never». Por ello las correcciones aplicadas son documentales; las propiedades de Figma quedan sin certificar.
# Handoff: motion-codigo v6

## Objetivo
Completar el pedido de David ("las previsualizaciones se ven pixeladas antes de que los videos se reproduzcan") en todo el caso 2. Una auditoría de posters mostró que, además de las 12 muestras de v5, los otros 8 videos de Motion tenían posters de menor resolución que su propio video.

## Contexto y restricciones
- Auditoría: `intercambio/evidencia/2026-10-26_motion-samples/poster-audit.mjs`. Compara el ancho natural del poster con el ancho mostrado × 2 (DPR 2) en Motion, Registro y Menores, a 1600 y 390.
- Antes:
  - hero 279 px (videos de 360 × 800);
  - ejemplos 169–171 px (videos de 720 × 1600 y 612 × 1376);
  - expresividad 133 px (videos de 266 × 598).
- Sin commit. Los cambios de Registro quedan fuera de alcance: sus posters son de 170 px y se reporta como propuesta.

## Qué se hizo
1. `generate-posters.mjs` (generalizado: lista de `[id, video, poster]` y filtro por id) generó posters del primer fotograma a la resolución nativa del video:
   - `poster-4793-5839-hd.jpg` y `poster-4793-5868-hd.jpg` (720 × 1600), `poster-4793-5879-hd.jpg` (612 × 1376);
   - `hero-0/1/2-hd.jpg` (360 × 800). Los tres videos comparten el primer fotograma y los posters originales también eran idénticos;
   - `expressivity-0/1-hd.jpg` (266 × 598), a partir de `assets/Videos/Motion DS/Motion DS 0x.mov`.

   Son JPEG con calidad 0.86, de 10 a 98 KB.
2. `v3/shared/content.js`: los 3 ejemplos, los 3 posters del hero (4 referencias, porque `hero-0` aparece también en `hero`) y los 2 de expresividad apuntan a los `-hd`. En total, 9 referencias.
3. Caché de `content.js`: `?v=20261026-motion-posters-hd3` en las 24 páginas V3 y en el generador.

## Resultado de la auditoría (después)
Motion: todos los posters igualan la resolución del video. Lo único que queda por debajo de lo mostrado × 2 es un límite de los videos mismos:
- hero 360 frente a 987 (1600) o 716 (390);
- expresividad 266 frente a 724 / 716;
- ejemplo 5879 612 frente a 724 / 716;
- ejemplos 5839 y 5868 720 frente a 724 (prácticamente igual).

Menores: sin faltantes. Registro: 5 posters de 170 px (fuera de alcance).

## Archivos a revisar
- `v3/shared/content.js` (sección `motion`)
- `assets/Motion DS/v2/*-hd.jpg`
- `intercambio/evidencia/2026-10-26_motion-samples/generate-posters.mjs` y `poster-audit.mjs`

## Cómo verificar
1. `node --check v3/shared/content.js`; los 8 posters nuevos existen y tienen las dimensiones indicadas (9 referencias en `content.js`, porque `hero-0` aparece dos veces).
2. Ejecuta `poster-audit.mjs` si el entorno lo permite.
3. La secuencia de muestras sigue pasando: `seq-test.mjs 1600`.

## Supuestos y limitaciones
- JPEG para capturas de pantalla y fotos; PNG para las muestras planas (v5).
- El poster del ejemplo 5879 incluye controles de reproductor, porque vienen dentro de la grabación original.

## Preguntas para el revisor
1. ¿Algún riesgo con `encodeURIComponent` en rutas con espacios y tildes del generador?

## Respuesta a la revisión anterior (solo v2+)
| Hallazgo | Decisión | Motivo / evidencia |
|---|---|---|
| 1. Importación absoluta (baja) | Aceptado | Se conserva la ruta relativa. |
| 2. Posters antiguos usados por V2 (baja) | Aceptado | No se borra ningún poster antiguo: V2 los sigue usando. |
| 3. Validación en navegador pendiente (baja) | Resuelto | Chrome real: Statement, Stage y Poster cargan los 12 HD de 1000 px. `seq-test.mjs 1600`: PASS ×6, exit 0. |

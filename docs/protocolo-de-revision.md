# Protocolo de revisión Claude → Codex

Claude ejecuta y entrega un handoff en `intercambio/handoffs/`; Codex revisa como revisor y corrector y escribe su revisión en `intercambio/revisiones/` con el formato de `plantillas/revision.md`.

- Verificar con evidencia: abrir los archivos, ejecutar las comprobaciones indicadas en el handoff y citar archivo:línea.
- Aplicar directamente solo correcciones claras, acotadas y de bajo riesgo dentro del alcance del handoff; documentar cada una.
- Proponer (sin aplicar) cambios de dirección de diseño, de contenido o de alcance.
- Respetar AGENTS.md y CLAUDE.md: no inventar métricas ni copy, no tocar contenido de producción fuera del alcance, no hacer commit, push ni despliegue.
- Severidades: crítica (rompe función o accesibilidad grave), alta (incumple el pedido o el design system), media (defecto visible), baja (pulido).
- Máximo tres iteraciones por tarea.

## Paraguay Sin Gluten — Propuesta UI/UX Landing

### Objetivo
- Maximizar el tiempo a acción útil (abrir WhatsApp/Maps/llamar).
- Reducir fricción para filtrar por cercanía y nivel de seguridad (100% SG vs Opciones).
- Aumentar confianza con señales de verificación y estados claros.

### Prioridades P0 (2–7 días)
- Hero con buscador prominente y chips: 100% SG, Opciones, Cerca de mí, Delivery, Ciudad.
- Layout split Map/List: mobile con bottom sheet; desktop en dos columnas.
- Orden por distancia si hay geolocalización; clustering de markers.
- Badges de confianza visibles (verde vs ámbar) + tooltip explicativo.
- Tarjetas con acciones persistentes: WhatsApp, Llamar, Ver en Maps.
- Estilos de mapa consistentes con tema (claro/oscuro) y marcador con borde blanco.
- Estados Empty/Error útiles con sugerencias y CTA “Sugerir un lugar”.
- Performance: carga diferida del SDK de Google Maps y popover accesible (sin HTML inline).

### Prioridades P1 (1–3 semanas)
- Onboarding 2 pasos: ubicación + preferencia (estricta vs opciones).
- Exploración guiada por “misiones” (panadería, abierto ahora, delivery rápido).
- Celia como copiloto en el buscador (sugerencias de queries + disclaimers).
- Ficha de lugar ampliada: fotos, políticas SG, reseñas con etiquetas.
- Gamificación ligera: “Verificado por x celíacos”, fecha de última verificación.
- SEO: rutas `/l/[slug]` con OpenGraph y compartir en WhatsApp.

### Quick Wins
- `Command` (shadcn) como buscador con secciones (lugares, categorías, ciudades).
- Chips de filtro con `Badge/Toggle` (shadcn).
- `Drawer` como bottom sheet en mobile para lista.
- CTA “Cerca de mí” flotante y reachable por el pulgar.
- Unificar InfoWindow en componente React con `Popover`/`Sheet` (a11y y consistencia).

### Wireframes (texto)

Mobile (map-first con bottom sheet):

```
[Header]
[Search + chips]
[Mapa full]  (CTA Cerca de mí)
╭──────── Lista (sheet) ─────╮
│ [100% SG] Nombre · 1.2 km  │
│ Acciones: WhatsApp / Maps  │
╰────────────────────────────╯
```

Desktop (split view):

```
┌───────────────┬──────────────────────┐
│  Mapa (sticky)│ Search + Lista       │
└───────────────┴──────────────────────┘
```

### Accesibilidad
- `aria-busy` en cargas, focus ring visible, navegación por teclado en lista y popovers.
- Contraste AA en badges y marcadores (borde blanco sobre mapa).

### Diseño de sistema
- Tokens: `--gf-accent: #00F879`, `--gf-amber: #F59E0B`, `--gf-blue: #2563EB`.
- Modo oscuro: fondo negro puro (HSL 0 0% 0%).

### Métricas clave
- `place_contact_clicked` (North Star), `near_me_used`, `search_performed`, `filter_applied`.

### Riesgos actuales
- HTML inline en InfoWindow (XSS/consistencia). Pasar a componente.
- Carga bloqueante del SDK Maps. Hacer lazy con intersección.


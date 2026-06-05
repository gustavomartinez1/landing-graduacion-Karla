# QA Checklist — Página de Graduación

## Pre-deploy Validation

### Frontend
- [ ] Home page carga sin errores en consola
- [ ] Galería muestra "Aún no hay fotos" cuando D1 está vacío
- [ ] Search bar filtra por nombre client-side
- [ ] Masonry grid se ve bien en mobile/tablet/desktop
- [ ] GraduateCard hover muestra glow dorado
- [ ] Lightbox: click abre, Escape cierra, flechas navegan
- [ ] not-found.tsx muestra diseño navy/gold (no default Next.js)
- [ ] Admin page redirige a login si no hay sessionStorage
- [ ] Admin login funciona con password correcto
- [ ] Admin delete tiene confirm dialog

### API (Cloudflare Functions)
- [ ] GET /api/graduates retorna array vacío o datos
- [ ] POST /api/upload sube foto + guarda en D1
- [ ] POST /api/upload rechaza archivos > 5MB
- [ ] POST /api/upload rechaza tipos inválidos
- [ ] POST /api/upload rechaza nombres vacíos
- [ ] Rate limit: 3 uploads ? 429
- [ ] DELETE /api/graduates/:id funciona con password correcto
- [ ] DELETE /api/graduates/:id retorna 401 sin password

### Rate Limiting
- [ ] 3 uploads en 10 minutos desde misma IP ? bloqueado
- [ ] Cleanup automático después de 1 hora

### Responsive
- [ ] Mobile: 1 columna
- [ ] Tablet: 2 columnas
- [ ] Desktop: 3 columnas

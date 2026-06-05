# Blueprint: Página de Graduación — Subida Pública de Fotos

## Classification
- **Base**: Landing Page (con galería interactiva + admin panel)
- **Modules**: galería pública, upload con drag&drop, admin panel, rate limiting
- **Supabase**: None — usando Cloudflare D1 + R2
- **Rendering**: CSR (galería via SWR + static shell en Cloudflare Pages)
- **Client tier**: $199/mo
- **Hosting**: Cloudflare Pages (free) + Workers (free tier) + D1 (free) + R2 (free tier 10GB)

## File Structure (FSD)

```
/
+-- .github/workflows/deploy.yml
+-- docs/
¦   +-- BLUEPRINT.md
+-- migrations/
¦   +-- 001_schema.sql
+-- public/
¦   +-- favicon.ico
+-- src/
¦   +-- app/
¦   ¦   +-- page.tsx
¦   ¦   +-- layout.tsx
¦   ¦   +-- not-found.tsx
¦   ¦   +-- globals.css
¦   ¦   +-- admin/
¦   ¦   ¦   +-- page.tsx
¦   ¦   +-- api/
¦   ¦       +-- upload-url/route.ts
¦   ¦       +-- graduates/route.ts
¦   ¦       +-- graduates/[id]/route.ts
¦   +-- middleware.ts
¦   +-- features/
¦   ¦   +-- graduates/
¦   ¦       +-- components/ (GalleryGrid, GraduateCard, UploadModal, Lightbox, AdminTable)
¦   ¦       +-- hooks/ (useGraduates.ts, useUpload.ts)
¦   ¦       +-- types.ts
¦   +-- shared/
¦   ¦   +-- lib/ (r2.ts, db.ts, env.ts)
¦   ¦   +-- ui/ (Button.tsx, Input.tsx, Modal.tsx)
¦   ¦   +-- types/index.ts
¦   +-- widgets/
¦       +-- hero/HeroSection.tsx
¦       +-- confetti/ConfettiEffect.tsx
+-- .env.example
+-- wrangler.toml
+-- next.config.ts
+-- tailwind.config.ts
+-- tsconfig.json
+-- package.json
+-- README.md
```

## Database Schema

### Tabla: graduates
| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | TEXT PRIMARY KEY | nanoid |
| name | TEXT NOT NULL | Nombre completo |
| photo_url | TEXT NOT NULL | URL pública en R2 |
| r2_key | TEXT NOT NULL | Key en R2 (para borrar) |
| created_at | TEXT DEFAULT (datetime('now')) | Fecha de subida |

### Tabla: rate_limits
| Columna | Tipo | Descripción |
|---------|------|-------------|
| ip | TEXT NOT NULL | IP del usuario |
| created_at | TEXT DEFAULT (datetime('now')) | Timestamp |

### Índices
- CREATE INDEX idx_rate_limits_ip ON rate_limits(ip);
- CREATE INDEX idx_rate_limits_created_at ON rate_limits(created_at);

## Pages/Routes
| Ruta | Tipo | Estrategia |
|------|------|-----------|
| `/` | Galería pública | CSR via SWR + static shell |
| `/admin` | Panel admin | CSR + sessionStorage redirect |
| `/api/upload-url` | POST | Edge Route Handler |
| `/api/graduates` | GET/POST | Edge Route Handler |
| `/api/graduates/[id]` | DELETE | Edge Route Handler |

## Correcciones aplicadas v2
1. Rendering: CSR (galería via SWR + static shell en Pages)
2. not-found.tsx: paleta navy/gold, NO default Next.js
3. middleware.ts: check client-side redirect en /admin
4. /admin/page.tsx: useEffect revisa sessionStorage adminPassword, null ? router.push('/')
5. @types/canvas-confetti en devDependencies
6. wrangler.toml: pages_build_output_dir = ".vercel/output/static"

## Security Requirements
- Presigned URLs para upload directo a R2
- Rate limiting (3/IP/10min)
- Password admin via header X-Admin-Password
- sessionStorage para admin password
- CORS configurado en bucket R2
- Auditoría OWASP: XSS, presigned URL expiry, rate limit bypass, header injection

## Execution Order (definitivo)
1. backend — Setup Next.js + wrangler + D1 schema + R2 client + API routes
2. frontend — Design tokens + componentes + hooks + páginas
3. security — Auditoría OWASP completa
4. qa — Smoke tests API + flujo completo
5. devops — GitHub Actions + README + env vars

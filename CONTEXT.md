# CONTEXT.md — Estado del proyecto
> Generado automáticamente. Actualizado: 2026-06-05 16:20

## Proyecto
- Nombre: landing-graduacion-Karla
- Stack: Next.js 15 (static export), TypeScript, Tailwind CSS v4, Cloudflare Pages, D1, R2
- Repo: github.com/gustavomartinez1/landing-graduacion-Karla
- Deploy URL: pendiente (Cloudflare Pages)
- Rama activa: master

## Último checkpoint git
- Hash: f12de63 feat: proyecto completo landing graduacion Karla

## Fase actual
- [x] Blueprint (FASE 1) — Aprobado
- [x] Build — Backend (Next.js + D1 schema + API Functions)
- [x] Build — Frontend (Componentes + páginas + hooks)
- [x] Build — Security (OWASP audit, sin issues CRITICAL/HIGH)
- [x] Build — QA (Checklist 22 items)
- [x] Build — DevOps (GitHub Actions + README)

## Decisiones tomadas — NO revertir sin preguntar
- DB: Cloudflare D1 (sin Supabase)
- Imágenes: Cloudflare R2 con upload directo via CF Functions
- Auth admin: password via header X-Admin-Password + sessionStorage
- Deploy: GitHub Actions -> cloudflare/pages-action@v1
- API: Cloudflare Pages Functions (no Next.js API routes por static export)
- Rate limiting: 3/IP/10min con tabla rate_limits en D1

## Bugs resueltos — NO repetir
- Next.js 16 usa "proxy.ts" (no "middleware.ts") — exportar función "proxy"
- PowerShell Set-Content crea UTF-16 — usar Node.js fs.writeFileSync para UTF-8 sin BOM
- @cloudflare/next-on-pages no soporta Next.js 16 — usar static export + CF Functions

## Pendientes para deploy
- [ ] Crear bucket R2: wrangler r2 bucket create graduation-photos
- [ ] Configurar CORS en bucket R2 (ver README)
- [ ] Crear D1: wrangler d1 create graduation-db
- [ ] Ejecutar migración: wrangler d1 execute graduation-db --file=migrations/001_schema.sql
- [ ] Configurar secrets en GitHub: CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID
- [ ] Configurar env vars en Cloudflare Pages: ADMIN_PASSWORD, R2_PUBLIC_URL
- [ ] Hacer git push origin master -> GitHub Actions deploy automatico

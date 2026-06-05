# CONTEXT.md — Estado del proyecto
> Generado automáticamente. Actualizar al terminar cada tarea.

## Proyecto
- Nombre: landing-graduacion-Karla
- Stack: Next.js 15, TypeScript, Tailwind CSS, Cloudflare Pages, Cloudflare R2, Cloudflare D1, Cloudflare Workers
- Repo: github.com/gustavomartinez1/landing-graduacion-Karla
- Deploy URL: pendiente
- Rama activa: master

## Último checkpoint git
- Hash: pendiente

## Fase actual
- [ ] Blueprint (FASE 1)
- [ ] Build — Backend
- [ ] Build — Frontend
- [ ] Build — Security
- [ ] Build — Legal
- [ ] Build — QA
- [ ] Build — DevOps

## Decisiones tomadas — NO revertir sin preguntar
- DB: Cloudflare D1 (sin Supabase)
- Imágenes: Cloudflare R2 con presigned URLs
- Auth admin: password via header X-Admin-Password (sin JWT, sin cookies)
- Deploy: Cloudflare Pages via GitHub Actions (cloudflare/pages-action@v1)
- Sin Supabase, sin wrangler-action, sin Vercel

## Bugs resueltos — NO repetir
- (vacío)

## Pendientes
- [x] Brief recibido del cliente
- [ ] Blueprint generado y aprobado
- [ ] Proyecto Next.js inicializado
- [ ] Schema SQL + migraciones D1
- [ ] API routes (upload-url, graduates CRUD)
- [ ] Componentes frontend (GalleryGrid, UploadModal, GraduateCard, Lightbox, AdminTable)
- [ ] Página admin con login por password
- [ ] Rate limiting anti-spam
- [ ] GitHub Actions workflow
- [ ] README con instrucciones de deploy
- [ ] Validaciones client-side y server-side

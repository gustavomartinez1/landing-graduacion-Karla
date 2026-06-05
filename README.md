# Página de Graduación — Galería de Fotos

Página pública donde cualquier graduado puede subir su foto + nombre.
Stack: Next.js 15 + TypeScript + Tailwind CSS + Cloudflare Pages + D1 + R2.

## Stack

- **Frontend**: Next.js 15 (static export), TypeScript, Tailwind CSS v4
- **Animaciones**: Framer Motion, canvas-confetti
- **Data fetching**: SWR
- **Hosting**: Cloudflare Pages (static)
- **API**: Cloudflare Pages Functions (Edge)
- **Database**: Cloudflare D1 (SQLite)
- **Storage**: Cloudflare R2 (imágenes)

## Requisitos

- Node.js 18+
- Cuenta de Cloudflare
- Wrangler CLI (`npm install -g wrangler`)

## Setup Local

### 1. Clonar e instalar
```bash
npm install
npm run dev
```

### 2. Crear el bucket R2
```bash
wrangler r2 bucket create graduation-photos
```

### 3. Configurar CORS en R2
En el dashboard de Cloudflare > R2 > graduation-photos > Settings > CORS:

```json
[
  {
    "AllowedOrigins": ["https://TU_DOMINIO.pages.dev", "http://localhost:3000"],
    "AllowedMethods": ["GET", "HEAD", "PUT"],
    "AllowedHeaders": ["Content-Type"],
    "MaxAgeSeconds": 3600
  }
]
```

### 4. Crear la base D1
```bash
wrangler d1 create graduation-db
```

Esto te dará un `database_id`. Ponlo en `wrangler.toml`.

### 5. Ejecutar migración
```bash
wrangler d1 execute graduation-db --file=migrations/001_schema.sql
```

### 6. Configurar Variables de Entorno
En Cloudflare Pages Dashboard > Settings > Environment variables:

| Variable | Descripción |
|----------|-------------|
| ADMIN_PASSWORD | Password para el panel admin |
| R2_PUBLIC_URL | URL pública del bucket R2 (ej: https://pub-XXXX.r2.dev) |

### 7. Desplegar
```bash
# Opción 1: Push a GitHub (recomendado)
git push origin master
# GitHub Actions despliega automáticamente

# Opción 2: Manual con wrangler
npx wrangler pages deploy out --project-name=graduation-site
```

## Variables de Entorno (GitHub Secrets)

| Secret | Valor |
|--------|-------|
| CLOUDFLARE_API_TOKEN | Token de API de Cloudflare con permisos de Pages |
| CLOUDFLARE_ACCOUNT_ID | Account ID de Cloudflare |

## Estructura del Proyecto

```
/ (static site in /out)
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── features/         # Feature modules (graduates)
│   ├── shared/           # Shared UI components
│   └── widgets/          # Composed UI sections (hero, confetti)
├── functions/            # Cloudflare Pages Functions (API)
│   └── api/
│       ├── upload.ts              # POST - upload photo
│       ├── graduates/index.ts     # GET - list graduates
│       └── graduates/[id]/        # DELETE - delete graduate
├── migrations/
│   └── 001_schema.sql
└── wrangler.toml
```

## API Endpoints

| Method | Endpoint | Descripción |
|--------|----------|-------------|
| POST | /api/upload | Sube foto (multipart: file + name) |
| GET | /api/graduates | Lista graduados |
| DELETE | /api/graduates/:id | Borra graduado (header: x-admin-password) |

## Flujo de Upload

1. Usuario selecciona foto + nombre
2. Fetch POST /api/upload con FormData
3. Cloudflare Function valida (tipo, tamaño, rate limit)
4. Guarda imagen en R2
5. Inserta registro en D1
6. Galería se refresca via SWR mutate

## Licencia

MIT

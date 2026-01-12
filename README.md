# Dinnartec Landing

Landing page principal de Dinnartec.

**Live:** [dinnartec.com](https://dinnartec.com)

## Setup

```bash
# Instalar dependencias
npm install

# Levantar dev server
npm run dev

# Build producción
npm run build
```

## Variables de entorno

Crear archivo `.env` (ver `.env.example`):

```
RESEND_API_KEY=re_xxxxxx
```

## Stack

- **Astro** — Framework
- **React** — Componentes interactivos
- **Tailwind CSS** — Estilos
- **Resend** — Envío de emails
- **Vercel** — Hosting

## Estructura

```
src/
├── components/
│   ├── layout/        # Header, Container, Footer
│   ├── sections/      # Hero, About, Solutions, etc.
│   └── ui/            # Button, Input, etc.
├── content/i18n/      # Traducciones (es.json, en.json)
├── layouts/           # BaseLayout.astro
├── lib/               # utils, constants, i18n
├── pages/
│   ├── index.astro    # Página ES (default)
│   ├── en/index.astro # Página EN
│   └── api/           # Endpoints (contact form)
└── styles/            # globals.css
```

## i18n

- Español es el idioma default (`/`)
- Inglés está en `/en`
- Traducciones en `src/content/i18n/`

Para agregar texto nuevo:
1. Agregar key en `es.json` y `en.json`
2. Usar `t('key.path')` en el componente

## Deploy

Push a `develop` → Vercel hace deploy automático.

## Docs

- `dev/CLAUDE.md` — Guía de arquitectura y convenciones
- `dev/CONTEXT.md` — Contexto de la empresa
- `dev/LANDING_PAGE_DEFINITION.md` — Especificación de la landing
- `dev/PENDING.md` — Tareas pendientes

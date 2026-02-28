# Dinnartec Landing

Main landing page for Dinnartec.

**Live:** [dinnartec.com](https://dinnartec.com)

## Setup

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Production build
npm run build
```

## Environment Variables

Create `.env` file (see `.env.example`):

```
RESEND_API_KEY=re_xxxxxx
```

## Stack

- **Astro** — Framework
- **React** — Interactive components
- **Tailwind CSS** — Styling
- **Resend** — Email sending
- **Vercel** — Hosting

## Structure

```
src/
├── components/
│   ├── layout/        # Header, Container, Footer
│   ├── sections/      # Hero, About, Solutions, etc.
│   └── ui/            # Button, Input, etc.
├── content/i18n/      # Translations (es.json, en.json)
├── layouts/           # BaseLayout.astro
├── lib/               # utils, constants, i18n
├── pages/
│   ├── index.astro    # ES page (default)
│   ├── en/index.astro # EN page
│   └── api/           # Endpoints (contact form)
└── styles/            # globals.css
```

## i18n

- Spanish is the default language (`/`)
- English is at `/en`
- Translations in `src/content/i18n/`

To add new text:
1. Add key in `es.json` and `en.json`
2. Use `t('key.path')` in the component

## Deploy

Push to `main` → Vercel auto-deploys.

## Docs

- `CLAUDE.md` — Architecture and conventions guide
- `dev/README.md` — Dev folder overview
- `dev/CONTEXT.md` — Project context
- `dev/roadmaps/` — Planning documents

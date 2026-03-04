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

- **Next.js 16** — Framework (App Router)
- **React 19** — UI
- **Tailwind CSS** — Styling
- **Resend** — Email sending
- **Vercel** — Hosting

## Structure

```
src/
├── app/
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # ES page (default)
│   ├── en/page.tsx        # EN page
│   └── api/contact/       # API route
├── components/
│   ├── HomePage.tsx       # Shared page content
│   ├── layout/            # Header, Container, Footer
│   ├── sections/          # Hero, About, Solutions, etc.
│   └── ui/                # Button, Input, etc.
├── content/i18n/          # Translations (es.json, en.json)
├── lib/                   # utils, constants, i18n
├── styles/                # globals.css
└── types/                 # TypeScript types
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

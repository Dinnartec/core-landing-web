# Migration Roadmap: Astro → Next.js

*Document version: 1.0 — March 2026*

---

## Motivation

| Reason | Detail |
|--------|--------|
| Full-stack capabilities | Next.js ofrece API routes, middleware, server actions y RSC de forma nativa |
| Ecosystem | Mayor ecosistema de librerías, ejemplos y soporte comunitario |
| Escalabilidad | La landing evolucionará hacia un sitio con dashboard, auth, blog, etc. |
| Unificación | Usar el mismo framework para landing y futuras apps internas |
| Vercel-native | Next.js es first-class citizen en Vercel (analytics, ISR, edge functions) |

---

## Análisis del Estado Actual

### Inventario de archivos a migrar

| Categoría | Archivos | Complejidad |
|-----------|----------|-------------|
| Pages | `index.astro`, `en/index.astro` | Baja (ya usan `HomePage.astro`) |
| Layout | `BaseLayout.astro` | Baja |
| Shared component | `HomePage.astro` | Media |
| React components | 12 archivos `.tsx` | Ninguna (ya son React) |
| API routes | `api/contact.ts` | Baja |
| i18n | `es.json`, `en.json`, `i18n.ts` | Media |
| Styles | `globals.css`, `tailwind.config.mjs` | Baja |
| Config | `astro.config.mjs`, `tsconfig.json` | Baja |

### Lo que NO cambia (ya es React puro)

- Todos los componentes en `src/components/` (Header, HeroSection, etc.)
- `src/lib/utils.ts` y `src/lib/constants.ts`
- `src/types/index.ts`
- Los archivos de traducción JSON
- Los assets en `public/`

---

## Arquitectura Propuesta (Next.js)

```
src/
├── app/
│   ├── layout.tsx                 # Root layout (reemplaza BaseLayout.astro)
│   ├── page.tsx                   # Landing ES (default)
│   ├── en/
│   │   └── page.tsx               # Landing EN
│   └── api/
│       └── contact/
│           └── route.ts           # API route (reemplaza api/contact.ts)
├── components/
│   ├── ui/                        # Sin cambios
│   │   ├── Button.tsx
│   │   └── index.ts
│   ├── layout/                    # Sin cambios
│   │   ├── Container.tsx
│   │   ├── Header.tsx
│   │   └── index.ts
│   └── sections/                  # Sin cambios
│       ├── HeroSection.tsx
│       ├── ExperienceBanner.tsx
│       ├── AboutSection.tsx
│       ├── SolutionsSection.tsx
│       ├── PricingSection.tsx
│       ├── FactorySection.tsx
│       ├── LabsSection.tsx
│       ├── ContactSection.tsx
│       ├── Footer.tsx
│       └── index.ts
├── content/
│   └── i18n/                      # Sin cambios
│       ├── es.json
│       └── en.json
├── lib/
│   ├── constants.ts               # Sin cambios
│   ├── i18n.ts                    # Adaptar (eliminar useTranslations, solo getTranslations)
│   └── utils.ts                   # Sin cambios
├── styles/
│   └── globals.css                # Ajustar imports de Tailwind a v4 si se actualiza
└── types/
    └── index.ts                   # Sin cambios
```

---

## Fases de Migración

### Fase 0 — Preparación (1-2 horas)

**Objetivo:** Preparar el entorno Next.js sin romper nada.

- [ ] Crear branch `feature/migration-nextjs`
- [ ] Instalar dependencias de Next.js:
  ```bash
  npm install next@latest
  npm uninstall astro @astrojs/react @astrojs/tailwind @astrojs/vercel
  ```
- [ ] Actualizar `package.json` scripts:
  ```json
  {
    "scripts": {
      "dev": "next dev",
      "build": "next build",
      "start": "next start",
      "lint": "next lint",
      "format": "prettier --write ."
    }
  }
  ```
- [ ] Crear `next.config.ts`:
  ```typescript
  import type { NextConfig } from 'next'

  const nextConfig: NextConfig = {
    reactStrictMode: true,
  }

  export default nextConfig
  ```
- [ ] Actualizar `tsconfig.json`:
  ```json
  {
    "compilerOptions": {
      "target": "ES2017",
      "lib": ["dom", "dom.iterable", "esnext"],
      "allowJs": true,
      "skipLibCheck": true,
      "strict": true,
      "noEmit": true,
      "esModuleInterop": true,
      "module": "esnext",
      "moduleResolution": "bundler",
      "resolveJsonModule": true,
      "isolatedModules": true,
      "jsx": "preserve",
      "incremental": true,
      "plugins": [{ "name": "next" }],
      "paths": {
        "@/*": ["./src/*"]
      }
    },
    "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
    "exclude": ["node_modules"]
  }
  ```
- [ ] Actualizar `tailwind.config.mjs` → `tailwind.config.ts` (opcional, mismo contenido)
- [ ] Eliminar `astro.config.mjs`
- [ ] Actualizar `.gitignore`:
  ```diff
  - # Astro
  - .astro/
  + # Next.js
  + .next/
  + out/
  ```

---

### Fase 1 — Root Layout (30 min)

**Objetivo:** Migrar `BaseLayout.astro` a `app/layout.tsx`.

**Archivo:** `src/app/layout.tsx`

```typescript
import type { Metadata } from 'next'
import { SITE_NAME, SITE_DOMAIN } from '@/lib/constants'
import '@/styles/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(`https://${SITE_DOMAIN}`),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  twitter: {
    card: 'summary_large_image',
    site: '@dinnartec',
    creator: '@dinnartec',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Archivo:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  )
}
```

**Notas:**
- El `lang` se maneja por página, no en el layout raíz (ver Fase 2)
- Las fonts se pueden migrar a `next/font` en una mejora posterior
- Los meta tags de OG se definen por página con `generateMetadata`

---

### Fase 2 — Pages (1 hora)

**Objetivo:** Migrar las dos páginas de Astro a Next.js App Router.

#### `src/app/page.tsx` (ES — default)

```typescript
import type { Metadata } from 'next'
import { getTranslations } from '@/lib/i18n'
import { HomePage } from '@/components/HomePage'

const lang = 'es'
const t = getTranslations(lang)

export const metadata: Metadata = {
  title: 'Dinnartec — Tecnología que impulsa tu empresa en la era de la IA',
  description: t('hero.description'),
  openGraph: {
    locale: 'es_ES',
  },
}

export default function Page() {
  return <HomePage lang={lang} />
}
```

#### `src/app/en/page.tsx` (EN)

```typescript
import type { Metadata } from 'next'
import { getTranslations } from '@/lib/i18n'
import { HomePage } from '@/components/HomePage'

const lang = 'en'
const t = getTranslations(lang)

export const metadata: Metadata = {
  title: 'Dinnartec — Technology that drives your company in the AI era',
  description: t('hero.description'),
  openGraph: {
    locale: 'en_US',
  },
}

export default function Page() {
  return <HomePage lang={lang} />
}
```

#### `src/components/HomePage.tsx` (migrar de `.astro` a `.tsx`)

Convertir `HomePage.astro` a un Server Component de React. La estructura interna se mantiene igual — ya es JSX puro. Solo hay que:

1. Renombrar `.astro` → `.tsx`
2. Cambiar el frontmatter de Astro a una función React
3. Marcar `Header`, `HeroSection`, `PricingSection` y `ContactSection` con un wrapper `'use client'` (son los que usan `useState`/`useEffect`)

Los componentes interactivos que actualmente usan `client:load` en Astro necesitan la directiva `'use client'` en Next.js:
- `Header.tsx` → agregar `'use client'` al inicio
- `HeroSection.tsx` → ya es estático, no necesita (no usa hooks)
- `PricingSection.tsx` → revisar si usa estado, si no, dejarlo como Server Component
- `ContactSection.tsx` → agregar `'use client'` al inicio (usa `useState`)

---

### Fase 3 — API Route (30 min)

**Objetivo:** Migrar el endpoint de contacto.

**Archivo:** `src/app/api/contact/route.ts`

```typescript
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const safeName = escapeHtml(name)
    const safeEmail = escapeHtml(email)
    const safeMessage = escapeHtml(message)

    const { error } = await resend.emails.send({
      from: 'Dinnartec Web <onboarding@resend.dev>',
      to: ['dinnartec@gmail.com'],
      replyTo: email,
      subject: `Nuevo mensaje de ${safeName}`,
      html: `
        <h2>Nuevo mensaje desde dinnartec.com</h2>
        <p><strong>Nombre:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${safeMessage.replace(/\n/g, '<br>')}</p>
      `,
    })

    if (error) {
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

**Cambios clave:**
- `import.meta.env.RESEND_API_KEY` → `process.env.RESEND_API_KEY`
- `new Response()` → `NextResponse.json()`
- Eliminar `export const prerender = false` (no existe en Next.js)
- La ruta cambia de `/api/contact` a `/api/contact` (misma, por convención de carpetas)

---

### Fase 4 — i18n (30 min)

**Objetivo:** Adaptar el sistema de i18n.

El sistema actual (`getTranslations` y `useTranslations`) ya funciona con React puro. Los cambios son mínimos:

1. Eliminar `useTranslations` si no se usa directamente en client components (actualmente las traducciones se pasan como props desde las pages)
2. Si en el futuro se necesita i18n más robusto, considerar `next-intl`

**Sin cambios necesarios** en `src/lib/i18n.ts` — la función `getTranslations` funciona tal cual.

---

### Fase 5 — Limpieza y QA (1-2 horas)

- [ ] Eliminar archivos de Astro:
  - `astro.config.mjs`
  - `src/layouts/BaseLayout.astro`
  - `src/components/HomePage.astro`
  - `src/pages/` (toda la carpeta de Astro pages)
- [ ] Eliminar `env.d.ts` de Astro si existe
- [ ] Actualizar `.env.example`:
  ```diff
  - # Resend API Key - Get it from https://resend.com/api-keys
    RESEND_API_KEY=re_xxxxxxxxx
  ```
- [ ] Ejecutar `npm run build` y verificar que no hay errores
- [ ] Probar ambas rutas: `/` (ES) y `/en` (EN)
- [ ] Probar el formulario de contacto
- [ ] Verificar SEO: meta tags, OG, canonical URLs
- [ ] Verificar que Vercel detecta el proyecto como Next.js
- [ ] Actualizar `CLAUDE.md` con el nuevo stack
- [ ] Actualizar `dev/CONTEXT.md`

---

## Mapeo de Conceptos Astro → Next.js

| Concepto Astro | Equivalente Next.js |
|----------------|---------------------|
| `src/pages/index.astro` | `src/app/page.tsx` |
| `src/pages/en/index.astro` | `src/app/en/page.tsx` |
| `src/layouts/BaseLayout.astro` | `src/app/layout.tsx` |
| `src/pages/api/contact.ts` | `src/app/api/contact/route.ts` |
| `client:load` directive | `'use client'` directive |
| `import.meta.env.*` | `process.env.*` |
| `Astro.props` | Function params / props |
| `Astro.url` | `headers()` o `usePathname()` |
| `<slot />` | `{children}` |
| `export const prerender = false` | No necesario (dinámico por defecto en App Router) |
| Astro i18n config | Middleware o `next-intl` |

---

## Estimación de Esfuerzo

| Fase | Tiempo estimado | Riesgo |
|------|----------------|--------|
| Fase 0 — Preparación | 1-2 horas | Bajo |
| Fase 1 — Root Layout | 30 min | Bajo |
| Fase 2 — Pages | 1 hora | Bajo |
| Fase 3 — API Route | 30 min | Bajo |
| Fase 4 — i18n | 30 min | Bajo |
| Fase 5 — Limpieza y QA | 1-2 horas | Medio |
| **Total** | **4-6 horas** | **Bajo** |

La migración es de bajo riesgo porque:
- Los componentes ya son React puro
- No hay data fetching complejo ni SSR dinámico
- El i18n es custom y framework-agnostic
- No hay state management global
- No hay autenticación ni rutas protegidas

---

## Mejoras Opcionales Post-Migración

Estas no son parte de la migración pero se habilitan con Next.js:

| Mejora | Beneficio | Esfuerzo |
|--------|-----------|----------|
| `next/font` para Syne y Archivo | Elimina flash de fuentes, mejor performance | 30 min |
| `next/image` para logos y hero | Optimización automática de imágenes | 1 hora |
| Middleware para i18n con redirect automático | Detectar idioma del navegador | 1-2 horas |
| `generateStaticParams` | Pre-renderizar ambos idiomas en build time | 30 min |
| Metadata API completa | Sitemap, robots.txt, OG dinámico | 1 hora |
| Analytics con `@vercel/analytics` | Tracking nativo sin JS extra | 15 min |

---

## Riesgos y Mitigaciones

| Riesgo | Probabilidad | Mitigación |
|--------|-------------|------------|
| Estilos de Tailwind no aplican | Baja | Verificar `content` en tailwind config incluye `src/app/**` |
| Componentes interactivos no hidratan | Baja | Asegurar `'use client'` en componentes con hooks |
| API route no funciona en Vercel | Baja | Next.js API routes son nativas en Vercel |
| SEO regression | Media | Comparar meta tags antes y después con herramienta de preview |
| Break en canonical URLs | Media | Verificar que las rutas `/` y `/en` se mantienen idénticas |

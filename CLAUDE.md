# CLAUDE.md — Dinnartec Landing

## Project Overview

This is the main landing page for Dinnartec, a technology company. The site must be bilingual (ES default / EN), responsive, and built with scalability and maintainability in mind.

**Domain:** dinnartec.com  
**Repository:** core-landing-web

---

## Tech Stack

- **Framework:** Astro 5
- **UI Library:** React 19 (for interactive components)
- **Icons:** React Icons
- **UI Components:** shadcn/ui (optional, use when beneficial)
- **Styling:** Tailwind CSS
- **i18n:** Custom (JSON-based)
- **Hosting:** Vercel

---

## Project Structure

```
src/
├── components/
│   ├── ui/                    # Base UI components (Button, Input, etc.)
│   ├── layout/                # Header, Footer, Section wrappers
│   └── sections/              # Page sections (Hero, About, Solutions, etc.)
├── content/
│   └── i18n/
│       ├── es.json            # Spanish translations (default)
│       └── en.json            # English translations
├── layouts/
│   └── BaseLayout.astro       # Main HTML structure
├── pages/
│   ├── index.astro            # Spanish version (default)
│   └── en/
│       └── index.astro        # English version
├── styles/
│   └── globals.css            # Global styles and Tailwind imports
├── lib/
│   ├── utils.ts               # Utility functions
│   └── constants.ts           # App-wide constants
└── types/
    └── index.ts               # TypeScript type definitions
```

---

## Architecture Principles

### 1. Component Structure

Every component follows this pattern:

```
ComponentName/
├── index.ts                   # Public export
├── ComponentName.tsx          # Main component
├── ComponentName.types.ts     # Props and types (if complex)
└── components/                # Sub-components (if needed)
```

For simple components, a single file is acceptable:

```
ComponentName.tsx
```

### 2. Separation of Concerns

- **Content lives in `/content/i18n/`** — Never hardcode text in components
- **Styling via Tailwind classes** — No inline styles, no CSS modules
- **Logic in hooks or utils** — Keep components focused on rendering
- **Types in dedicated files** — For complex components

### 3. Component Guidelines

**Do:**
- Use functional components with TypeScript
- Define explicit prop types
- Use destructuring for props
- Keep components small and focused (< 100 lines ideal)
- Use semantic HTML elements

**Don't:**
- Add comments in code
- Use `any` type
- Hardcode strings (use i18n)
- Mix layout and business logic
- Create deeply nested component trees

---

## Naming Conventions

### Files and Folders

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `HeroSection.tsx` |
| Utilities | camelCase | `formatDate.ts` |
| Constants | camelCase file, UPPER_SNAKE vars | `constants.ts` → `API_URL` |
| Types | PascalCase with suffix | `ButtonProps`, `UserType` |
| i18n keys | dot.notation | `hero.title`, `solutions.cta` |

### Component Props

```typescript
interface ComponentNameProps {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  children?: React.ReactNode
  className?: string
}
```

### CSS Classes (Tailwind)

Order classes consistently:
1. Layout (flex, grid, position)
2. Spacing (margin, padding)
3. Sizing (width, height)
4. Typography (font, text)
5. Colors (bg, text color, border)
6. Effects (shadow, opacity)
7. Transitions/Animations

---

## i18n Implementation

### Translation Files Structure

```json
{
  "nav": {
    "solutions": "Servicios",
    "pricing": "Precios",
    "factory": "Productos",
    "contact": "Contacto"
  },
  "hero": {
    "title": "Desarrollamos aplicaciones personalizadas para tu negocio",
    "description": "Ahorra tiempo y dinero automatizando procesos...",
    "cta": "Quiero ahorrar tiempo y dinero"
  },
  "solutions": {
    "titlePrefix": "Dinnartec",
    "titleHighlight": "Solutions",
    "subtitle": "Creamos software a la medida de tu negocio."
  }
}
```

### Usage in Components

```typescript
import { useTranslations } from '@/lib/i18n'

export function HeroSection() {
  const t = useTranslations()
  
  return (
    <section>
      <h1>{t('hero.tagline')}</h1>
      <p>{t('hero.description')}</p>
    </section>
  )
}
```

---

## Styling Guidelines

### Design Tokens

```css
/* In globals.css or Tailwind config */

/* Colors - Black & White only for now */
--color-primary: #000000;
--color-background: #ffffff;
--color-text: #000000;
--color-text-muted: #666666;
--color-border: #e5e5e5;

/* Typography */
--font-sans: 'Inter', system-ui, sans-serif;

/* Spacing scale */
--section-padding-y: 5rem;      /* 80px */
--section-padding-y-lg: 7.5rem; /* 120px */

/* Container */
--container-max-width: 1200px;
--container-padding: 1.5rem;    /* 24px */
```

### Responsive Breakpoints

```
Mobile: < 768px (default styles)
Tablet: >= 768px (md:)
Desktop: >= 1024px (lg:)
Large: >= 1280px (xl:)
```

### Component Styling Pattern

```typescript
import { cn } from '@/lib/utils'

interface ButtonProps {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  children: React.ReactNode
}

const variants = {
  primary: 'bg-black text-white hover:bg-gray-800',
  secondary: 'bg-white text-black border border-black hover:bg-gray-50'
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg'
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  className,
  children 
}: ButtonProps) {
  return (
    <button className={cn(variants[variant], sizes[size], className)}>
      {children}
    </button>
  )
}
```

---

## Section Components

Each landing page section should:

1. Be a standalone component in `/components/sections/`
2. Accept a `lang` prop for i18n
3. Use semantic HTML (`<section>`, `<article>`, etc.)
4. Have consistent vertical padding
5. Use the container width utility

### Section Template

```typescript
import { Container } from '@/components/layout/Container'
import { useTranslations } from '@/lib/i18n'

interface SectionProps {
  lang: 'es' | 'en'
}

export function SectionName({ lang }: SectionProps) {
  const t = useTranslations(lang)

  return (
    <section id="section-id" className="py-20 lg:py-28">
      <Container>
        {/* Section content */}
      </Container>
    </section>
  )
}
```

---

## Form Handling

### Contact Form Requirements

- Fields: name, whatsapp, message
- Validation: client-side with proper error states
- Submission: Opens WhatsApp with pre-filled message
- Feedback: Redirect to WhatsApp

### Implementation Pattern

```typescript
interface FormData {
  name: string
  whatsapp: string
  message: string
}

// Form submits by opening WhatsApp URL with message
const whatsappUrl = `https://wa.me/${PHONE}?text=${encodedMessage}`
```

---

## Performance Guidelines

- Use Astro's static generation by default
- Only use React for interactive components (form, mobile menu, language toggle)
- Optimize images with Astro's Image component
- Lazy load below-fold sections if needed
- Keep bundle size minimal

---

## Accessibility

- Use semantic HTML elements
- Ensure sufficient color contrast (especially with B&W palette)
- Add proper ARIA labels where needed
- Support keyboard navigation
- Test with screen readers

---

## Git Conventions

### Branch Naming

```
feature/[description]    → feature/hero-section
fix/[description]        → fix/mobile-menu
refactor/[description]   → refactor/i18n-structure
```

### Commit Messages

```
feat: add hero section
fix: mobile menu not closing on link click
refactor: extract button component
style: adjust section spacing
docs: update README
```

---

## Development Commands

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run linter
npm run format       # Format code with Prettier
```

---

## Adding New Sections

1. Create component in `/components/sections/NewSection.tsx`
2. Add translations to both `/content/i18n/es.json` and `/content/i18n/en.json`
3. Import and add to page files (`index.astro` and `en/index.astro`)
4. Add navigation link if needed

---

## Modifying Styles

1. **Global changes:** Update Tailwind config or `globals.css`
2. **Component changes:** Modify the component's className props
3. **New variants:** Add to the component's variants object
4. **Spacing/sizing:** Use Tailwind's scale, extend in config if needed

---

## Checklist Before Commit

- [ ] No hardcoded strings (all text in i18n files)
- [ ] No TypeScript errors
- [ ] No console.log statements
- [ ] Responsive design tested (mobile + desktop)
- [ ] Both languages tested (ES + EN)
- [ ] Accessibility basics checked
- [ ] No commented code

---

## Related Documentation

For company-wide standards and context, see [core-docs](https://github.com/Dinnartec/core-docs):

- `/company/` — Company identity, verticals, principles
- `/standards/` — Code style, git conventions, naming
- `/projects/core/core-landing-web.md` — Project overview
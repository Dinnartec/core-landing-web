# Post-Migration Improvements Roadmap

*Document version: 1.0 — March 2026*

---

## Context

After the Astro → Next.js migration, the landing is functional and deployed. This document catalogs all identified improvements, grouped by priority and area. Each item includes the problem, the fix, affected files, and estimated effort.

---

## Priority Legend

| Priority | Meaning |
|----------|---------|
| P0 | Critical — affects accessibility, SEO, or causes visible bugs for users |
| P1 | High — security issues, significant UX/performance gaps |
| P2 | Medium — code quality, optimization, dead code cleanup |
| P3 | Low — minor polish, naming, documentation consistency |

---

## Phase 1 — Critical Fixes (P0)

### 1.1 Add `lang` attribute to `<html>`

**Problem:** The `<html>` tag has no `lang` attribute. Screen readers and search engines cannot determine the page language. This is a WCAG 2.1 Level A failure and an SEO penalty.

**Solution:** Migrate to a locale-aware layout structure using `app/[lang]/layout.tsx`, or pass `lang` from each page to a wrapper that sets it on `<html>`.

**Recommended approach:**

```
src/app/
├── [lang]/
│   ├── layout.tsx          # Sets <html lang={lang}>
│   ├── page.tsx            # Landing (receives lang param)
│   └── ...
```

**Files:** `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/en/page.tsx`
**Effort:** 1-2 hours

---

### 1.2 Support `prefers-reduced-motion`

**Problem:** The hero section uses `opacity-0` with CSS animations (`animate-fade-up`). If a user has reduced motion enabled in their OS, animations may not run, leaving the hero content **permanently invisible**.

**Fix:** Add a `@media (prefers-reduced-motion: reduce)` block in `globals.css`:

```css
@media (prefers-reduced-motion: reduce) {
  .animate-fade-up,
  .animate-fade-in {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
}
```

**Files:** `src/styles/globals.css`
**Effort:** 15 min

---

### 1.3 Replace OG image format

**Problem:** The OpenGraph image (`/og-image.svg`) is SVG. Facebook, Twitter/X, LinkedIn, and WhatsApp do **not** support SVG for link previews. Social share previews show no image.

**Fix:** Convert to PNG or JPG (1200x630 recommended). Update metadata in `layout.tsx`.

**Files:** `public/og-image.svg` → `public/og-image.png`, `src/app/layout.tsx`
**Effort:** 30 min

---

### 1.4 Fix Apple touch icon

**Problem:** The `apple` icon is set to `/favicon.svg`. Safari on iOS requires PNG format for touch icons.

**Fix:** Generate a 180x180 PNG apple touch icon and reference it in the metadata.

**Files:** `public/apple-touch-icon.png` (new), `src/app/layout.tsx`
**Effort:** 15 min

---

### 1.5 Internationalize WhatsApp pre-fill message

**Problem:** `ContactSection.tsx` constructs a WhatsApp message hardcoded in Spanish (`"Hola, mi nombre es..."`). Users on the English page (`/en`) send a Spanish message.

**Fix:** Move the WhatsApp message template to the i18n JSON files and use the `lang` prop to select the correct one.

**Files:** `src/components/sections/ContactSection.tsx`, `src/content/i18n/es.json`, `src/content/i18n/en.json`
**Effort:** 30 min

---

## Phase 2 — Security & SEO (P1)

### 2.1 Decide on `/api/contact` route

**Problem:** The contact form was changed to open WhatsApp directly. The API route (`src/app/api/contact/route.ts`) is **dead code** — no component calls it. Meanwhile, it has several issues:

- No email format validation
- No input length limits
- No rate limiting
- `replyTo` uses unsanitized `email` instead of `safeEmail`
- Sender is `onboarding@resend.dev` (Resend sandbox)
- Email template hardcoded in Spanish

**Decision needed:**

| Option | Action |
|--------|--------|
| A — Remove | Delete `route.ts` and the `resend` dependency. The form uses WhatsApp only. |
| B — Fix and keep | Fix all issues above. Reintegrate into the contact form as a secondary channel (email + WhatsApp). Requires verified domain sender. |

**Files:** `src/app/api/contact/route.ts`
**Effort:** Option A: 15 min | Option B: 2-3 hours

---

### 2.2 Add `hreflang` alternate links

**Problem:** No `<link rel="alternate" hreflang="...">` tags exist. Google cannot associate the ES and EN versions of the page, potentially causing duplicate content issues.

**Fix:** Add alternate links in metadata for both pages:

```typescript
alternates: {
  canonical: 'https://dinnartec.com',
  languages: {
    'es': 'https://dinnartec.com',
    'en': 'https://dinnartec.com/en',
  },
}
```

**Files:** `src/app/page.tsx`, `src/app/en/page.tsx`
**Effort:** 30 min

---

### 2.3 Add ARIA attributes to mobile menu

**Problem:** The mobile menu overlay has no `role="dialog"`, no `aria-modal`, no `aria-expanded` on the hamburger button, and no focus trap. Fails WCAG 2.1 criterion 2.1.2.

**Fix:**
- Add `role="dialog"` and `aria-modal="true"` to the menu overlay
- Add `aria-expanded={isOpen}` to the hamburger button
- Implement a focus trap when the menu is open

**Files:** `src/components/layout/Header.tsx`
**Effort:** 1 hour

---

### 2.4 Fix `window.open` popup blocker issue

**Problem:** In `ContactSection.tsx`, `window.open` is called inside a `setTimeout`. Because it is not a direct response to a user gesture, popup blockers will block it.

**Fix:** Call `window.open` synchronously inside the form submit handler. Remove the `setTimeout` wrapper.

**Files:** `src/components/sections/ContactSection.tsx`
**Effort:** 15 min

---

### 2.5 Fix `try/catch` in ContactSection

**Problem:** The `try/catch` block only wraps synchronous operations and a `setTimeout`. The `catch` clause is **unreachable** — errors inside the timeout callback are not caught.

**Fix:** Remove the `try/catch` (there is nothing to catch), or restructure to handle `window.open` failures synchronously.

**Files:** `src/components/sections/ContactSection.tsx`
**Effort:** 15 min

---

## Phase 3 — Performance (P2)

### 3.1 Migrate to `next/font`

**Problem:** Google Fonts are loaded via `<link>` tags in `<head>`. This causes a Flash of Unstyled Text (FOUT) and blocks rendering.

**Fix:** Use `next/font/google` for Syne and Archivo:

```typescript
import { Syne, Archivo } from 'next/font/google'

const syne = Syne({ subsets: ['latin'], variable: '--font-display' })
const archivo = Archivo({ subsets: ['latin'], variable: '--font-body' })
```

**Files:** `src/app/layout.tsx`, `tailwind.config.mjs`
**Effort:** 30 min

---

### 3.2 Migrate to `next/image`

**Problem:** All images use raw `<img>` tags. No WebP conversion, no lazy loading, no size hints, causing Cumulative Layout Shift (CLS).

**Fix:**
1. Add `images.remotePatterns` to `next.config.ts` (for `placehold.co` if kept)
2. Replace `<img>` with `<Image>` in: `HeroSection.tsx`, `ExperienceBanner.tsx`, `FactorySection.tsx`
3. Add `width`, `height`, and `alt` attributes

**Files:** `next.config.ts`, `src/components/sections/HeroSection.tsx`, `src/components/sections/ExperienceBanner.tsx`, `src/components/sections/FactorySection.tsx`
**Effort:** 1-2 hours

---

### 3.3 Fix `tsconfig.json` jsx setting

**Problem:** Uses `"jsx": "react-jsx"` instead of `"jsx": "preserve"`. Next.js handles JSX transformation itself; `"preserve"` is the standard setting for App Router projects.

**Fix:** Change `"jsx": "react-jsx"` to `"jsx": "preserve"` in `tsconfig.json`.

**Files:** `tsconfig.json`
**Effort:** 5 min

---

## Phase 4 — Dead Code Cleanup (P2)

### 4.1 Remove unused `Button` component

**Problem:** `src/components/ui/Button.tsx` is defined but never imported or used anywhere. All buttons use inline Tailwind classes.

**Action:** Delete `src/components/ui/Button.tsx`. Update `src/components/ui/index.ts` barrel export.

**Effort:** 5 min

---

### 4.2 Remove unused types

**Problem:** `SectionProps`, `NavLink`, and `FormData` in `src/types/index.ts` are never used.

**Action:**
- Delete `SectionProps` and `NavLink` (dead code)
- Rename `FormData` to `ContactFormData` if kept (conflicts with Web API `FormData`)

**Effort:** 10 min

---

### 4.3 Remove unused CSS

**Problem:** `.animate-on-scroll` and `.is-visible` classes in `globals.css` are defined but never applied in any component. Also, `fade-in` and `slide-in-right` animations in `tailwind.config.mjs` are unused.

**Action:** Remove the dead CSS rules and unused Tailwind animation definitions.

**Files:** `src/styles/globals.css`, `tailwind.config.mjs`
**Effort:** 10 min

---

### 4.4 Remove unused translation keys

**Problem:** Several keys exist in both `es.json` and `en.json` but are never rendered:

| Key | Status |
|-----|--------|
| `hero.title` | Passed as prop but never rendered (only `hero.tagline` is used as `<h1>`) |
| `hero.learnMore` | Accepted in props but never rendered |
| `solutions.examples` | Exists in JSON but never passed from `HomePage.tsx` |
| `experience.text` | Shadowed by `socialProof.text` |

**Action:** Remove these keys from both JSON files, and remove corresponding props from component interfaces.

**Files:** `src/content/i18n/es.json`, `src/content/i18n/en.json`, `src/components/sections/HeroSection.tsx`
**Effort:** 20 min

---

### 4.5 Clean up unused `lang` prop

**Problem:** Seven section components accept a `lang` prop but never use it: `AboutSection`, `ExperienceBanner`, `HeroSection`, `SolutionsSection`, `LabsSection`, `PricingSection`, `FactorySection`.

**Action:** Remove `lang` from these components' props interfaces. Keep it only in `Footer` and `Header` where it is actually used. Update `HomePage.tsx` accordingly.

**Files:** All section components, `src/components/HomePage.tsx`
**Effort:** 30 min

---

### 4.6 Remove or archive `update_json.cjs`

**Problem:** One-off migration script in the project root. Contains outdated factory product data that differs from the current JSON files.

**Action:** Delete it or move to `dev/scripts/` for archival.

**Effort:** 5 min

---

## Phase 5 — Content & i18n Fixes (P2)

### 5.1 Replace placeholder product data

**Problem:** `factory.products` in both JSON files contain:
- Placeholder screenshots from `placehold.co`
- Broken link `#backoffice` pointing to a non-existent anchor

**Fix:** Replace with real product screenshots or remove the Factory products section until real data is available. Fix the product link to a valid URL or remove the CTA.

**Files:** `src/content/i18n/es.json`, `src/content/i18n/en.json`
**Effort:** 30 min (content decision required)

---

### 5.2 Translate hardcoded "Core" badge

**Problem:** In `PricingSection.tsx`, the badge text `"Core"` is hardcoded in English regardless of locale. Violates the i18n principle.

**Fix:** Add the badge text to the i18n JSON files and pass it as a translation prop.

**Files:** `src/components/sections/PricingSection.tsx`, `src/content/i18n/es.json`, `src/content/i18n/en.json`
**Effort:** 10 min

---

### 5.3 Move ExperienceBanner data to constants/i18n

**Problem:** Company logos and names (Crepes & Waffles, Rappi, Yuno, Linnda) are hardcoded inside the component. Violates the CLAUDE.md principle "Content lives in `/content/i18n/`".

**Fix:** Move company data to `constants.ts` or to the i18n JSON files.

**Files:** `src/components/sections/ExperienceBanner.tsx`, `src/lib/constants.ts`
**Effort:** 20 min

---

### 5.4 Improve hero image alt text

**Problem:** The hero image has `alt="Dinnartec"` which is not descriptive. If the image is decorative, use `alt=""`. If meaningful, describe what it shows.

**Fix:** Set `alt=""` (decorative) or provide a descriptive alt text.

**Files:** `src/components/sections/HeroSection.tsx`
**Effort:** 5 min

---

### 5.5 Use `type="tel"` for WhatsApp input

**Problem:** The WhatsApp number input uses `type="text"`. Mobile users see a full keyboard instead of a numeric keypad.

**Fix:** Change to `type="tel"`.

**Files:** `src/components/sections/ContactSection.tsx`
**Effort:** 5 min

---

### 5.6 Improve contact form error message

**Problem:** `contact.form.error` is `"Error"` in both languages — not helpful for users.

**Fix:** Update to descriptive messages like "Something went wrong. Please try again." / "Algo salió mal. Inténtalo de nuevo."

**Files:** `src/content/i18n/es.json`, `src/content/i18n/en.json`
**Effort:** 5 min

---

## Phase 6 — Minor Polish (P3)

### 6.1 Replace index-based `key` props

**Problem:** Several components use `key={index}` instead of stable identifiers.

**Files:** `FactorySection.tsx`, `LabsSection.tsx`, `PricingSection.tsx`
**Effort:** 10 min

---

### 6.2 Remove inline `animationDelay` style

**Problem:** `Header.tsx` uses inline `style={{ animationDelay }}` on mobile menu links, violating the CLAUDE.md "no inline styles" rule. Stagger utilities are already defined in `globals.css`.

**Fix:** Use the existing `stagger-1`, `stagger-2`, etc. CSS classes instead.

**Files:** `src/components/layout/Header.tsx`
**Effort:** 15 min

---

### 6.3 Add `next/image` remote patterns config

**Problem:** `next.config.ts` has no `images.remotePatterns`. Blocks migration to `next/image` for external images.

**Fix:** Add the config (even if external images are removed, this unblocks future use):

```typescript
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co' },
    ],
  },
}
```

**Files:** `next.config.ts`
**Effort:** 5 min

---

### 6.4 Add Vercel headers and redirects

**Problem:** `vercel.json` only contains `{ "framework": "nextjs" }`. No cache headers, no `www` → non-`www` redirect.

**Fix:** Add security headers and redirect configuration.

**Files:** `vercel.json`
**Effort:** 20 min

---

## Summary Table

| # | Item | Priority | Effort | Phase |
|---|------|----------|--------|-------|
| 1.1 | `lang` attribute on `<html>` | P0 | 1-2h | 1 |
| 1.2 | `prefers-reduced-motion` | P0 | 15min | 1 |
| 1.3 | OG image PNG | P0 | 30min | 1 |
| 1.4 | Apple touch icon PNG | P0 | 15min | 1 |
| 1.5 | i18n WhatsApp message | P0 | 30min | 1 |
| 2.1 | Decide on API route | P1 | 15min-3h | 2 |
| 2.2 | `hreflang` alternates | P1 | 30min | 2 |
| 2.3 | ARIA mobile menu | P1 | 1h | 2 |
| 2.4 | Fix popup blocker | P1 | 15min | 2 |
| 2.5 | Fix unreachable catch | P1 | 15min | 2 |
| 3.1 | `next/font` | P2 | 30min | 3 |
| 3.2 | `next/image` | P2 | 1-2h | 3 |
| 3.3 | Fix tsconfig jsx | P2 | 5min | 3 |
| 4.1 | Remove Button component | P2 | 5min | 4 |
| 4.2 | Remove unused types | P2 | 10min | 4 |
| 4.3 | Remove unused CSS | P2 | 10min | 4 |
| 4.4 | Remove unused translations | P2 | 20min | 4 |
| 4.5 | Clean up `lang` prop | P2 | 30min | 4 |
| 4.6 | Remove `update_json.cjs` | P2 | 5min | 4 |
| 5.1 | Replace placeholder products | P2 | 30min | 5 |
| 5.2 | Translate "Core" badge | P2 | 10min | 5 |
| 5.3 | ExperienceBanner data to i18n | P2 | 20min | 5 |
| 5.4 | Hero image alt text | P2 | 5min | 5 |
| 5.5 | `type="tel"` on WhatsApp input | P2 | 5min | 5 |
| 5.6 | Improve error message | P2 | 5min | 5 |
| 6.1 | Stable `key` props | P3 | 10min | 6 |
| 6.2 | Remove inline styles | P3 | 15min | 6 |
| 6.3 | `next/image` remote config | P3 | 5min | 6 |
| 6.4 | Vercel headers/redirects | P3 | 20min | 6 |

**Total estimated effort:** ~10-14 hours across all phases

---

## Execution Notes

- Phases 1 and 2 should be completed before any new feature work
- Phase 4 (dead code cleanup) can be done in a single session as a batch
- Phase 5 requires content decisions (product screenshots, Factory section readiness)
- Each phase can be a separate PR for clean review history

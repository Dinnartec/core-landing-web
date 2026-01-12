import { Container } from '@/components/layout/Container'
import type { Locale } from '@/types'

interface FooterProps {
  lang: Locale
  translations: {
    copyright: string
  }
  navTranslations: {
    solutions: string
    factory: string
    contact: string
  }
}

const navLinks = [
  { key: 'solutions', href: '#solutions' },
  { key: 'factory', href: '#factory' },
  { key: 'contact', href: '#contact' },
] as const

export function Footer({ lang, translations, navTranslations }: FooterProps) {
  return (
    <footer className="border-t border-border bg-white py-12 md:py-16">
      <Container>
        <div className="grid gap-12 md:grid-cols-3 md:gap-8">
          <div>
            <a
              href={lang === 'es' ? '/' : '/en'}
              className="font-display text-2xl font-bold tracking-tight"
            >
              Dinnartec
            </a>
            <p className="mt-4 max-w-xs font-body text-sm leading-relaxed text-muted">
              Innovating the future, improving the present.
            </p>
          </div>

          <nav className="flex flex-col gap-3">
            <span className="mb-2 font-body text-xs font-medium uppercase tracking-widest text-muted">
              Navigation
            </span>
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                className="font-body text-sm text-foreground transition-colors hover:text-muted"
              >
                {navTranslations[link.key as keyof typeof navTranslations]}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <span className="mb-2 font-body text-xs font-medium uppercase tracking-widest text-muted">
              Connect
            </span>
            <a
              href="mailto:dinnartec@gmail.com"
              className="font-body text-sm text-foreground transition-colors hover:text-muted"
            >
              dinnartec@gmail.com
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="font-body text-xs text-muted">{translations.copyright}</p>

          <div className="flex items-center gap-6">
            <a
              href={lang === 'es' ? '/en' : '/'}
              className="font-body text-xs font-medium uppercase tracking-widest text-muted transition-colors hover:text-foreground"
            >
              {lang === 'es' ? 'English' : 'Español'}
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}

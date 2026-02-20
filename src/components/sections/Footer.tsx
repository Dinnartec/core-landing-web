import { FaInstagram, FaXTwitter, FaTiktok } from 'react-icons/fa6'
import { Container } from '@/components/layout/Container'
import { SOCIAL_LINKS, CONTACT_EMAIL } from '@/lib/constants'
import type { Locale } from '@/types'

interface FooterProps {
  lang: Locale
  translations: {
    tagline: string
    navigation: string
    connect: string
    copyright: string
  }
  navTranslations: {
    solutions: string
    factory: string
    labs: string
    contact: string
  }
}

const navLinks = [
  { key: 'solutions', href: '#solutions' },
  { key: 'factory', href: '#factory' },
  { key: 'labs', href: '#labs' },
  { key: 'contact', href: '#contact' },
] as const

const socialLinks = [
  { name: 'Instagram', href: SOCIAL_LINKS.instagram, icon: FaInstagram },
  { name: 'X', href: SOCIAL_LINKS.x, icon: FaXTwitter },
  { name: 'TikTok', href: SOCIAL_LINKS.tiktok, icon: FaTiktok },
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
              {translations.tagline}
            </p>

            <div className="mt-6 flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center border border-border text-foreground transition-all hover:border-foreground hover:bg-foreground hover:text-white"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <nav className="flex flex-col gap-3">
            <span className="mb-2 font-body text-xs font-medium uppercase tracking-widest text-muted">
              {translations.navigation}
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
              {translations.connect}
            </span>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-body text-sm text-foreground transition-colors hover:text-muted"
            >
              {CONTACT_EMAIL}
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

import { useState, useEffect } from 'react'
import { HiOutlineMenuAlt4, HiX } from 'react-icons/hi'
import { cn } from '@/lib/utils'
import type { Locale } from '@/types'

interface HeaderProps {
  lang: Locale
  translations: {
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

export function Header({ lang, translations }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const otherLang = lang === 'es' ? 'en' : 'es'
  const otherLangHref = lang === 'es' ? '/en' : '/'

  return (
    <>
      <header
        className={cn(
          'fixed left-0 right-0 top-0 z-50 transition-all duration-300',
          isScrolled
            ? 'border-b border-border/50 bg-white/80 backdrop-blur-lg'
            : 'bg-transparent'
        )}
      >
        <div className="container flex h-16 items-center justify-between md:h-20">
          <a
            href={lang === 'es' ? '/' : '/en'}
            className="font-display text-xl font-bold tracking-tight transition-opacity hover:opacity-70 md:text-2xl"
          >
            Dinnartec
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                className="group relative font-body text-sm font-medium uppercase tracking-widest text-foreground/80 transition-colors hover:text-foreground"
              >
                {translations[link.key as keyof typeof translations]}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-foreground transition-all duration-300 group-hover:w-full" />
              </a>
            ))}

            <div className="ml-4 flex items-center border-l border-border pl-6">
              <a
                href={otherLangHref}
                className="font-body text-sm font-medium uppercase tracking-widest text-muted transition-colors hover:text-foreground"
              >
                {otherLang.toUpperCase()}
              </a>
            </div>
          </nav>

          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="flex h-10 w-10 items-center justify-center md:hidden"
            aria-label="Open menu"
          >
            <HiOutlineMenuAlt4 className="h-6 w-6" />
          </button>
        </div>
      </header>

      <div
        className={cn(
          'fixed inset-0 z-50 bg-white transition-transform duration-500 ease-out md:hidden',
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="container flex h-16 items-center justify-between">
          <span className="font-display text-xl font-bold tracking-tight">
            Dinnartec
          </span>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex h-10 w-10 items-center justify-center"
            aria-label="Close menu"
          >
            <HiX className="h-6 w-6" />
          </button>
        </div>

        <nav className="container flex flex-col gap-6 pt-12">
          {navLinks.map((link, index) => (
            <a
              key={link.key}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-display text-4xl font-bold tracking-tight transition-opacity hover:opacity-60"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {translations[link.key as keyof typeof translations]}
            </a>
          ))}

          <div className="mt-8 border-t border-border pt-8">
            <a
              href={otherLangHref}
              className="font-body text-lg font-medium uppercase tracking-widest text-muted transition-colors hover:text-foreground"
            >
              {otherLang === 'en' ? 'English' : 'Español'}
            </a>
          </div>
        </nav>
      </div>
    </>
  )
}

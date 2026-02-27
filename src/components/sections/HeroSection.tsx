import { HiArrowRight } from 'react-icons/hi'
import { Container } from '@/components/layout/Container'
import type { Locale } from '@/types'

interface HeroSectionProps {
  lang: Locale
  translations: {
    title: string
    tagline: string
    description: string
    cta: string
    learnMore: string
    badge: string
  }
}

export function HeroSection({ translations }: HeroSectionProps) {
  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden pb-8 pt-20 md:pb-12">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-gray-100 to-transparent opacity-60 blur-3xl" />
        <div className="absolute -left-20 bottom-1/4 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-gray-50 to-transparent opacity-40 blur-3xl" />
      </div>

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column - Text Content */}
          <div className="flex flex-col justify-between lg:col-span-7">
            <div>
              <div className="mb-6 inline-flex animate-fade-up">
                <span className="inline-flex items-center gap-2 border border-border bg-white px-4 py-2 font-body text-xs font-medium uppercase tracking-widest text-muted">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-black" />
                  {translations.badge}
                </span>
              </div>

              <h1 className="animate-fade-up font-display text-5xl font-bold leading-[1.1] tracking-tight opacity-0 stagger-1 md:text-6xl lg:text-7xl">
                {translations.tagline}
              </h1>

              <p className="mt-6 max-w-xl animate-fade-up font-body text-lg leading-relaxed text-muted opacity-0 stagger-2 md:text-xl">
                {translations.description}
              </p>
            </div>

            {/* CTAs - Aligned with bottom of grid */}
            <div className="mt-16 flex animate-fade-up flex-col gap-4 opacity-0 stagger-3 sm:flex-row sm:items-center lg:mt-16">
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-3 bg-black px-8 py-4 font-body text-sm font-medium uppercase tracking-widest text-white transition-all hover:gap-4 hover:bg-gray-800"
              >
                {translations.cta}
                <HiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="#solutions"
                className="inline-flex items-center justify-center px-8 py-4 font-body text-sm font-medium uppercase tracking-widest text-foreground transition-colors hover:text-muted"
              >
                {translations.learnMore}
              </a>
            </div>
          </div>

          {/* Right Column - Image graphic */}
          <div className="relative hidden lg:col-span-5 lg:flex lg:items-center lg:justify-end">
            <div className="relative h-[500px] w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              <img
                src="/images/hero_premium_bg.png"
                alt="Dinnartec Premium Technology"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute bottom-6 left-6 z-20">
                <span className="font-display text-2xl font-bold tracking-tighter text-white">
                  Dinnartec
                </span>
                <p className="font-body text-xs uppercase tracking-widest text-white/50">
                  Enterprise Technology
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 hidden -translate-x-1/2 animate-bounce lg:block">
          <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-border p-1">
            <div className="h-2 w-1 rounded-full bg-muted" />
          </div>
        </div>
      </Container>
    </section>
  )
}

import { Container } from '@/components/layout/Container'
import type { Locale } from '@/types'

interface AboutSectionProps {
  lang: Locale
  translations: {
    title: string
    description: string
    content: string
    pillars: string
    pillarsList: string
  }
}

const pillars = [
  { letter: 'D', name: 'Development' },
  { letter: 'I', name: 'Investigation' },
  { letter: 'N', name: 'Innovation' },
  { letter: 'N', name: 'Novation' },
  { letter: 'A', name: 'Adaptation' },
  { letter: 'R', name: 'Revolution' },
  { letter: 'TEC', name: 'Technology' },
]

export function AboutSection({ translations }: AboutSectionProps) {
  return (
    <section id="about" className="section relative overflow-hidden border-t border-border">
      <div className="pointer-events-none absolute left-0 top-0 h-full w-1/3 bg-gradient-to-r from-gray-50 to-transparent" />

      <Container className="relative">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <span className="font-body text-xs font-medium uppercase tracking-widest text-muted">
              01 — About
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl">
              {translations.title}
            </h2>
          </div>

          <div className="space-y-6">
            <p className="font-body text-lg leading-relaxed text-foreground md:text-xl">
              {translations.description}
            </p>
            <p className="font-body text-base leading-relaxed text-muted md:text-lg">
              {translations.content}
            </p>
          </div>
        </div>

        <div className="mt-20 border-t border-border pt-16">
          <p className="mb-10 font-body text-sm font-medium uppercase tracking-widest text-muted">
            {translations.pillars}
          </p>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
            {pillars.map((pillar, index) => (
              <div
                key={index}
                className="group relative flex flex-col items-center border border-border bg-white p-6 transition-all duration-300 hover:border-foreground hover:shadow-lg"
              >
                <span className="font-display text-3xl font-bold tracking-tight transition-transform duration-300 group-hover:scale-110 md:text-4xl">
                  {pillar.letter}
                </span>
                <span className="mt-2 font-body text-[10px] font-medium uppercase tracking-widest text-muted">
                  {pillar.name}
                </span>

                <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-5" />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

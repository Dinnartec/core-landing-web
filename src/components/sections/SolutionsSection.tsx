import { HiArrowRight } from 'react-icons/hi'
import { Container } from '@/components/layout/Container'
import type { Locale } from '@/types'

interface SolutionsSectionProps {
  lang: Locale
  translations: {
    label: string
    title: string
    subtitle: string
    description: string
    tagline: string
    cta: string
    steps: {
      diagnosis: { title: string; description: string }
      sprint: { title: string; description: string }
      support: { title: string; description: string }
    }
  }
}

export function SolutionsSection({ translations }: SolutionsSectionProps) {
  const steps = [
    {
      number: '01',
      ...translations.steps.diagnosis,
    },
    {
      number: '02',
      ...translations.steps.sprint,
    },
    {
      number: '03',
      ...translations.steps.support,
    },
  ]

  return (
    <section id="solutions" className="section relative bg-black text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 top-20 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -left-20 bottom-40 h-60 w-60 rounded-full bg-white/5 blur-3xl" />
      </div>

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <span className="font-body text-xs font-medium uppercase tracking-widest text-white/50">
              {translations.label}
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              {translations.title}
            </h2>
            <p className="mt-4 font-display text-xl font-medium text-white/70 md:text-2xl">
              {translations.subtitle}
            </p>
          </div>

          <div className="flex flex-col justify-center space-y-6">
            <p className="font-body text-lg leading-relaxed text-white/80 md:text-xl">
              {translations.description}
            </p>
            <p className="font-display text-xl font-bold tracking-tight md:text-2xl">
              {translations.tagline}
            </p>
          </div>
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="group relative border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/10 md:p-10"
            >
              <div className="mb-6 flex items-center gap-4">
                <span className="font-display text-4xl font-bold text-white/20 transition-colors duration-300 group-hover:text-white/40 md:text-5xl">
                  {step.number}
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
              </div>

              <h3 className="font-display text-xl font-bold tracking-tight md:text-2xl">
                {step.title}
              </h3>

              <p className="mt-4 font-body text-sm leading-relaxed text-white/60 md:text-base">
                {step.description}
              </p>

              <div
                className="absolute bottom-0 left-0 h-1 bg-white transition-all duration-500"
                style={{
                  width: `${((index + 1) / 3) * 100}%`,
                  opacity: 0.2,
                }}
              />
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 border border-white bg-transparent px-8 py-4 font-body text-sm font-medium uppercase tracking-widest text-white transition-all hover:bg-white hover:text-black"
          >
            {translations.cta}
            <HiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </Container>
    </section>
  )
}

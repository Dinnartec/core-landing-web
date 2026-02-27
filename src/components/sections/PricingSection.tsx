import { HiArrowRight, HiCheck } from 'react-icons/hi'
import { Container } from '@/components/layout/Container'
import type { Locale } from '@/types'

// Structure of the Tier
type Tier = {
  name: string
  price: string
  duration: string
  description: string
  features: string[]
}

interface PricingSectionProps {
  lang: Locale
  translations: {
    label: string
    title: string
    subtitle: string
    note: string
    diagnosis: {
      name: string
      description: string
      cta: string
      tiers: {
        diagnosis: Tier
        implementation: Tier
      }
    }
    retainer: {
      name: string
      description: string
      cta: string
      tiers: {
        base: Tier
      }
    }
  }
}

export function PricingSection({ translations }: PricingSectionProps) {
  const proj = translations.diagnosis
  const tOutsourcing = translations.retainer

  return (
    <section id="pricing" className="section relative overflow-hidden border-t border-border">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <Container className="relative">
        <div className="mx-auto max-w-4xl text-center">
          <span className="font-body text-xs font-medium uppercase tracking-widest text-muted">
            {translations.label}
          </span>

          <h2 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            {translations.title}
          </h2>

          <p className="mt-4 font-display text-xl font-medium text-muted md:text-2xl">
            {translations.subtitle}
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {/* Por Proyecto Card */}
          <div className="group relative flex flex-col border border-border bg-white p-8 transition-all duration-300 hover:border-foreground hover:shadow-lg">
            <div className="mb-6">
              <span className="font-body text-xs font-medium uppercase tracking-widest text-muted">
                01
              </span>
              <h3 className="mt-2 font-display text-2xl font-bold tracking-tight">
                {proj.name}
              </h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-muted">
                {proj.description}
              </p>
            </div>

            <div className="mb-8 grid gap-6 md:grid-cols-2 flex-1">
              {/* Diagnóstico */}
              <div className="border border-border p-6 bg-gray-50/50">
                 <h4 className="font-display text-lg tracking-tight font-semibold">{proj.tiers.diagnosis.name}</h4>
                 <div className="mt-2 mb-4">
                  <span className="font-display text-2xl font-bold tracking-tight">
                    {proj.tiers.diagnosis.price}
                  </span>
                  <span className="ml-2 font-body text-xs text-muted block mt-1">
                    {proj.tiers.diagnosis.duration}
                  </span>
                </div>
                <p className="mb-4 font-body text-xs text-muted">
                  {proj.tiers.diagnosis.description}
                </p>
                <ul className="space-y-2">
                  {proj.tiers.diagnosis.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <HiCheck className="mt-0.5 h-3 w-3 flex-shrink-0 text-foreground" />
                      <span className="font-body text-xs">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Implementación */}
              <div className="border border-foreground p-6 bg-white relative">
                 <div className="absolute -top-3 left-4">
                  <span className="bg-foreground px-3 py-1 font-body text-[10px] font-medium uppercase tracking-widest text-white">
                    Core
                  </span>
                </div>
                 <h4 className="font-display text-lg tracking-tight font-semibold">{proj.tiers.implementation.name}</h4>
                 <div className="mt-2 mb-4">
                  <span className="font-display text-2xl font-bold tracking-tight">
                    {proj.tiers.implementation.price}
                  </span>
                  <span className="ml-2 font-body text-xs text-muted block mt-1">
                    {proj.tiers.implementation.duration}
                  </span>
                </div>
                <p className="mb-4 font-body text-xs text-muted">
                  {proj.tiers.implementation.description}
                </p>
                <ul className="space-y-2">
                  {proj.tiers.implementation.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <HiCheck className="mt-0.5 h-3 w-3 flex-shrink-0 text-foreground" />
                      <span className="font-body text-xs">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <a
              href="#contact"
              className="mt-auto inline-flex items-center justify-center gap-2 border border-foreground bg-transparent px-6 py-4 font-body text-sm font-medium uppercase tracking-widest text-foreground transition-all hover:bg-foreground hover:text-white"
            >
              {proj.cta}
              <HiArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* Retainer Card */}
          <div className="group relative flex flex-col border border-border bg-white p-8 transition-all duration-300 hover:border-foreground hover:shadow-lg">
            <div className="mb-6">
              <span className="font-body text-xs font-medium uppercase tracking-widest text-muted">
                02
              </span>
              <h3 className="mt-2 font-display text-2xl font-bold tracking-tight">
                {tOutsourcing.name}
              </h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-muted">
                {tOutsourcing.description}
              </p>
            </div>

            <div className="mb-8 flex-1 border border-border p-6 bg-gray-50/50">
                <h4 className="font-display text-lg tracking-tight font-semibold">{tOutsourcing.tiers.base.name}</h4>
                <div className="mt-2 mb-4">
                  <span className="font-display text-2xl font-bold tracking-tight">
                    {tOutsourcing.tiers.base.price}
                  </span>
                  <span className="ml-2 font-body text-xs text-muted block mt-1">
                    {tOutsourcing.tiers.base.duration}
                  </span>
                </div>
                <p className="mb-6 font-body text-sm leading-relaxed text-muted">
                  {tOutsourcing.tiers.base.description}
                </p>

                <ul className="mb-8 space-y-3">
                  {tOutsourcing.tiers.base.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <HiCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-foreground" />
                      <span className="font-body text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
            </div>

            <a
              href="#contact"
              className="mt-auto inline-flex items-center justify-center gap-2 bg-foreground px-6 py-4 font-body text-sm font-medium uppercase tracking-widest text-white transition-all hover:bg-gray-800"
            >
              {tOutsourcing.cta}
              <HiArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* USD Note */}
        <p className="mt-12 text-center font-body text-xs text-muted">
          {translations.note}
        </p>
      </Container>
    </section>
  )
}

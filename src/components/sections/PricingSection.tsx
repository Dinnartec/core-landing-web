import { useState } from 'react'
import { HiArrowRight, HiCheck } from 'react-icons/hi'
import { Container } from '@/components/layout/Container'
import { cn } from '@/lib/utils'
import type { Locale } from '@/types'

type SprintTier = 's' | 'm' | 'l'
type RetainerTier = 'essential' | 'growth' | 'scale'

interface PricingSectionProps {
  lang: Locale
  translations: {
    label: string
    title: string
    subtitle: string
    note: string
    diagnosis: {
      name: string
      price: string
      duration: string
      description: string
      features: string[]
      cta: string
    }
    sprint: {
      name: string
      description: string
      cta: string
      tiers: {
        s: {
          name: string
          price: string
          duration: string
          description: string
          features: string[]
        }
        m: {
          name: string
          price: string
          duration: string
          description: string
          features: string[]
        }
        l: {
          name: string
          price: string
          duration: string
          description: string
          features: string[]
        }
      }
    }
    retainer: {
      name: string
      description: string
      cta: string
      tiers: {
        essential: {
          name: string
          price: string
          hours: string
          description: string
          features: string[]
        }
        growth: {
          name: string
          price: string
          hours: string
          description: string
          features: string[]
        }
        scale: {
          name: string
          price: string
          hours: string
          description: string
          features: string[]
        }
      }
    }
    packages: {
      title: string
      subtitle: string
      items: {
        starter: {
          name: string
          includes: string
          price: string
          savings: string
        }
        growth: {
          name: string
          includes: string
          price: string
          savings: string
        }
        scale: {
          name: string
          includes: string
          price: string
          savings: string
        }
      }
    }
  }
}

export function PricingSection({ translations }: PricingSectionProps) {
  const [sprintTier, setSprintTier] = useState<SprintTier>('m')
  const [retainerTier, setRetainerTier] = useState<RetainerTier>('growth')

  const currentSprint = translations.sprint.tiers[sprintTier]
  const currentRetainer = translations.retainer.tiers[retainerTier]

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

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {/* Diagnosis Card */}
          <div className="group relative flex flex-col border border-border bg-white p-8 transition-all duration-300 hover:border-foreground hover:shadow-lg">
            <div className="mb-6">
              <span className="font-body text-xs font-medium uppercase tracking-widest text-muted">
                01
              </span>
              <h3 className="mt-2 font-display text-2xl font-bold tracking-tight">
                {translations.diagnosis.name}
              </h3>
            </div>

            <div className="mb-6">
              <span className="font-display text-4xl font-bold tracking-tight">
                {translations.diagnosis.price}
              </span>
              <span className="ml-2 font-body text-sm text-muted">
                {translations.diagnosis.duration}
              </span>
            </div>

            <p className="mb-6 font-body text-sm leading-relaxed text-muted">
              {translations.diagnosis.description}
            </p>

            <ul className="mb-8 flex-1 space-y-3">
              {translations.diagnosis.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <HiCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-foreground" />
                  <span className="font-body text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 border border-foreground bg-transparent px-6 py-3 font-body text-sm font-medium uppercase tracking-widest text-foreground transition-all hover:bg-foreground hover:text-white"
            >
              {translations.diagnosis.cta}
              <HiArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* Sprint Card */}
          <div className="group relative flex flex-col border-2 border-foreground bg-white p-8 shadow-lg">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="bg-foreground px-4 py-1 font-body text-xs font-medium uppercase tracking-widest text-white">
                Popular
              </span>
            </div>

            <div className="mb-6">
              <span className="font-body text-xs font-medium uppercase tracking-widest text-muted">
                02
              </span>
              <h3 className="mt-2 font-display text-2xl font-bold tracking-tight">
                {translations.sprint.name}
              </h3>
            </div>

            {/* Sprint Tier Toggle */}
            <div className="mb-6 flex gap-1 rounded-none border border-border p-1">
              {(['s', 'm', 'l'] as const).map((tier) => (
                <button
                  key={tier}
                  onClick={() => setSprintTier(tier)}
                  className={cn(
                    'flex-1 py-2 font-body text-xs font-medium uppercase tracking-widest transition-all',
                    sprintTier === tier
                      ? 'bg-foreground text-white'
                      : 'text-muted hover:text-foreground'
                  )}
                >
                  {tier.toUpperCase()}
                </button>
              ))}
            </div>

            <div className="mb-2">
              <span className="font-display text-4xl font-bold tracking-tight">
                {currentSprint.price}
              </span>
              <span className="ml-2 font-body text-sm text-muted">
                {currentSprint.duration}
              </span>
            </div>

            <p className="mb-6 font-body text-xs text-muted">
              {currentSprint.description}
            </p>

            <ul className="mb-8 flex-1 space-y-3">
              {currentSprint.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <HiCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-foreground" />
                  <span className="font-body text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 bg-foreground px-6 py-3 font-body text-sm font-medium uppercase tracking-widest text-white transition-all hover:bg-gray-800"
            >
              {translations.sprint.cta}
              <HiArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* Retainer Card */}
          <div className="group relative flex flex-col border border-border bg-white p-8 transition-all duration-300 hover:border-foreground hover:shadow-lg">
            <div className="mb-6">
              <span className="font-body text-xs font-medium uppercase tracking-widest text-muted">
                03
              </span>
              <h3 className="mt-2 font-display text-2xl font-bold tracking-tight">
                {translations.retainer.name}
              </h3>
            </div>

            {/* Retainer Tier Toggle */}
            <div className="mb-6 flex gap-1 rounded-none border border-border p-1">
              {(['essential', 'growth', 'scale'] as const).map((tier) => (
                <button
                  key={tier}
                  onClick={() => setRetainerTier(tier)}
                  className={cn(
                    'flex-1 py-2 font-body text-[10px] font-medium uppercase tracking-wider transition-all',
                    retainerTier === tier
                      ? 'bg-foreground text-white'
                      : 'text-muted hover:text-foreground'
                  )}
                >
                  {translations.retainer.tiers[tier].name}
                </button>
              ))}
            </div>

            <div className="mb-2">
              <span className="font-display text-4xl font-bold tracking-tight">
                {currentRetainer.price}
              </span>
              <span className="ml-2 font-body text-sm text-muted">
                {currentRetainer.hours}
              </span>
            </div>

            <p className="mb-6 font-body text-xs text-muted">
              {currentRetainer.description}
            </p>

            <ul className="mb-8 flex-1 space-y-3">
              {currentRetainer.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <HiCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-foreground" />
                  <span className="font-body text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 border border-foreground bg-transparent px-6 py-3 font-body text-sm font-medium uppercase tracking-widest text-foreground transition-all hover:bg-foreground hover:text-white"
            >
              {translations.retainer.cta}
              <HiArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Packages Section */}
        <div className="mt-20 border-t border-border pt-16">
          <div className="mb-10 text-center">
            <h3 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
              {translations.packages.title}
            </h3>
            <p className="mt-2 font-body text-sm text-muted">
              {translations.packages.subtitle}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {(['starter', 'growth', 'scale'] as const).map((pkg) => {
              const item = translations.packages.items[pkg]
              return (
                <div
                  key={pkg}
                  className="group flex items-center justify-between border border-border bg-white p-6 transition-all duration-300 hover:border-foreground hover:shadow-md"
                >
                  <div>
                    <h4 className="font-display text-lg font-bold uppercase tracking-wide">
                      {item.name}
                    </h4>
                    <p className="mt-1 font-body text-xs text-muted">
                      {item.includes}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-xl font-bold">{item.price}</p>
                    <p className="font-body text-xs font-medium text-green-600">
                      {item.savings}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* USD Note */}
          <p className="mt-8 text-center font-body text-xs text-muted">
            {translations.note}
          </p>
        </div>
      </Container>
    </section>
  )
}

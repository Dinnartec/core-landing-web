import {
  HiOutlineCode,
  HiOutlineSearch,
  HiOutlineLightBulb,
  HiOutlineRefresh,
  HiOutlineLightningBolt,
  HiOutlineChip,
} from 'react-icons/hi'
import { Container } from '@/components/layout/Container'
import type { Locale } from '@/types'

interface PillarItem {
  name: string
  description: string
}

interface AboutSectionProps {
  lang: Locale
  translations: {
    label: string
    title: string
    description: string
    content: string
    pillars: string
    pillarItems: PillarItem[]
  }
}

const pillarIcons = [
  HiOutlineCode,
  HiOutlineSearch,
  HiOutlineLightBulb,
  HiOutlineRefresh,
  HiOutlineLightningBolt,
  HiOutlineChip,
]

export function AboutSection({ translations }: AboutSectionProps) {
  return (
    <section id="about" className="section relative overflow-hidden border-t border-border">
      <div className="pointer-events-none absolute left-0 top-0 h-full w-1/3 bg-gradient-to-r from-gray-50 to-transparent" />

      <Container className="relative">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <span className="font-body text-xs font-medium uppercase tracking-widest text-muted">
              {translations.label}
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

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {translations.pillarItems.map((pillar, index) => {
              const Icon = pillarIcons[index]
              return (
                <div
                  key={index}
                  className="group relative border border-border bg-white p-6 transition-all duration-300 hover:border-foreground hover:shadow-lg md:p-8"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center border border-border transition-colors duration-300 group-hover:border-foreground group-hover:bg-foreground">
                    <Icon className="h-6 w-6 text-foreground transition-colors duration-300 group-hover:text-white" />
                  </div>

                  <h3 className="font-display text-lg font-bold uppercase tracking-wide md:text-xl">
                    {pillar.name}
                  </h3>

                  <p className="mt-2 font-body text-sm leading-relaxed text-muted md:text-base">
                    {pillar.description}
                  </p>

                  <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-[0.02]" />
                </div>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}

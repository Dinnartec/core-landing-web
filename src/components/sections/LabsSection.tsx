import { HiOutlineBeaker, HiOutlineSparkles, HiOutlineCube } from 'react-icons/hi'
import { Container } from '@/components/layout/Container'
import type { Locale } from '@/types'

interface LabsSectionProps {
  lang: Locale
  translations: {
    label: string
    titlePrefix: string
    titleHighlight: string
    subtitle: string
    description: string
    content: string
    status: string
    badge: string
    areas: {
      experimental: { title: string; description: string }
      emerging: { title: string; description: string }
      capabilities: { title: string; description: string }
    }
  }
}

export function LabsSection({ translations }: LabsSectionProps) {
  const areas = [
    {
      icon: HiOutlineBeaker,
      ...translations.areas.experimental,
    },
    {
      icon: HiOutlineSparkles,
      ...translations.areas.emerging,
    },
    {
      icon: HiOutlineCube,
      ...translations.areas.capabilities,
    },
  ]

  return (
    <section id="labs" className="section relative bg-[#f5f5f5]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 top-20 h-80 w-80 rounded-full bg-black/[0.02] blur-3xl" />
        <div className="absolute -left-20 bottom-40 h-60 w-60 rounded-full bg-black/[0.02] blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <Container className="relative">
        <div className="mx-auto max-w-4xl text-center">
          <span className="font-body text-xs font-medium uppercase tracking-widest text-muted">
            {translations.label}
          </span>

          <h2 className="mt-4 font-display text-4xl leading-tight tracking-tight md:text-5xl lg:text-6xl">
            <span className="font-normal">{translations.titlePrefix}</span>{' '}
            <span className="font-bold">{translations.titleHighlight}</span>
          </h2>

          <p className="mt-4 font-display text-xl font-medium text-muted md:text-2xl">
            {translations.subtitle}
          </p>

          <div className="mx-auto mt-12 max-w-2xl space-y-6">
            <p className="font-body text-lg leading-relaxed text-foreground md:text-xl">
              {translations.description}
            </p>
            <p className="font-body text-base leading-relaxed text-muted md:text-lg">
              {translations.content}
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {areas.map((area, index) => {
            const Icon = area.icon
            return (
              <div
                key={index}
                className="group relative border border-border bg-white p-8 transition-all duration-300 hover:border-foreground hover:shadow-lg"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center border border-border transition-colors duration-300 group-hover:border-foreground group-hover:bg-foreground">
                  <Icon className="h-6 w-6 text-foreground transition-colors duration-300 group-hover:text-white" />
                </div>

                <h3 className="font-display text-lg font-bold tracking-tight md:text-xl">
                  {area.title}
                </h3>

                <p className="mt-3 font-body text-sm leading-relaxed text-muted md:text-base">
                  {area.description}
                </p>
              </div>
            )
          })}
        </div>

        <div className="mt-16 flex justify-center">
          <div className="group relative inline-flex items-center gap-4 border border-border bg-white px-8 py-6 transition-all duration-300 hover:border-foreground hover:shadow-xl">
            <div className="relative flex items-center justify-center">
              <div className="absolute h-3 w-3 animate-ping rounded-full bg-black/20" />
              <div className="relative h-3 w-3 rounded-full bg-black" />
            </div>

            <div className="text-left">
              <p className="font-display text-lg font-bold tracking-tight">
                {translations.status}
              </p>
              <p className="font-body text-xs uppercase tracking-widest text-muted">
                {translations.badge}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

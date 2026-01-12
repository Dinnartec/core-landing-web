import { Container } from '@/components/layout/Container'
import type { Locale } from '@/types'

interface FactorySectionProps {
  lang: Locale
  translations: {
    title: string
    subtitle: string
    description: string
    content: string
    status: string
  }
}

export function FactorySection({ translations }: FactorySectionProps) {
  return (
    <section id="factory" className="section relative overflow-hidden border-t border-border">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <Container className="relative">
        <div className="mx-auto max-w-4xl text-center">
          <span className="font-body text-xs font-medium uppercase tracking-widest text-muted">
            03 — Products
          </span>

          <h2 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            {translations.title}
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
                  In Development
                </p>
              </div>

              <div className="ml-4 flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="h-8 w-1 bg-black/10 transition-all duration-300 group-hover:bg-black/30"
                    style={{
                      animationDelay: `${i * 0.2}s`,
                      height: `${(i + 1) * 12}px`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

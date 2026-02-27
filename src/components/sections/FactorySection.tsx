import { HiArrowRight } from 'react-icons/hi'
import { Container } from '@/components/layout/Container'
import type { Locale, FormState } from '@/types'

// Product type
type Product = {
  name: string
  description: string
  link: string
  screenshot: string
}

interface FactorySectionProps {
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
    products: Product[]
  }
}

export function FactorySection({ translations }: FactorySectionProps) {
  return (
    <section id="factory" className="section relative overflow-hidden bg-foreground text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <Container className="relative">
        <div className="mx-auto max-w-4xl text-center mb-16">
          <span className="font-body text-xs font-medium uppercase tracking-widest text-white/60">
            {translations.label}
          </span>

          <h2 className="mt-4 font-display text-4xl leading-tight tracking-tight md:text-5xl lg:text-6xl">
            <span className="font-normal">{translations.titlePrefix}</span>{' '}
            <span className="font-bold">{translations.titleHighlight}</span>
          </h2>

          <p className="mt-4 font-display text-xl font-medium text-white/60 md:text-2xl">
            {translations.subtitle}
          </p>

          <div className="mx-auto mt-8 max-w-2xl space-y-4">
            <p className="font-body text-lg leading-relaxed text-white md:text-xl">
              {translations.description}
            </p>
            <p className="font-body text-base leading-relaxed text-white/70 md:text-lg">
              {translations.content}
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
            {translations.products && translations.products.map((product, idx) => (
                <div key={idx} className="group relative border border-white/10 bg-white/5 transition-all duration-300 hover:border-white/30 hover:bg-white/10 overflow-hidden flex flex-col">
                    <div className="h-48 w-full overflow-hidden bg-black relative">
                        <img 
                            src={product.screenshot} 
                            alt={product.name}
                            className="w-full h-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                        <h3 className="font-display text-2xl font-bold text-white mb-2">{product.name}</h3>
                        <p className="font-body text-sm text-white/70 leading-relaxed mb-6 flex-1">
                            {product.description}
                        </p>
                        <a 
                            href={product.link}
                            className="inline-flex items-center text-xs font-medium uppercase tracking-widest text-white/80 hover:text-white transition-colors"
                        >
                            View Product <HiArrowRight className="ml-2 h-4 w-4" />
                        </a>
                    </div>
                </div>
            ))}
        </div>

        <div className="mt-16 flex justify-center">
            <div className="group relative inline-flex items-center gap-4 border border-white/20 bg-white/5 px-8 py-6 transition-all duration-300 hover:border-white/40 hover:bg-white/10">
              <div className="relative flex items-center justify-center">
                <div className="absolute h-3 w-3 animate-ping rounded-full bg-white/20" />
                <div className="relative h-3 w-3 rounded-full bg-white" />
              </div>

              <div className="text-left">
                <p className="font-display text-lg font-bold tracking-tight">
                  {translations.status}
                </p>
                <p className="font-body text-xs uppercase tracking-widest text-white/60">
                  {translations.badge}
                </p>
              </div>
            </div>
          </div>
      </Container>
    </section>
  )
}

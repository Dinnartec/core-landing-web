import { Container } from '@/components/layout/Container'
import type { Locale } from '@/types'

interface ExperienceBannerProps {
  lang: Locale
  translations: {
    text: string
  }
}

const companies = [
  {
    name: 'Crepes & Waffles',
    logo: '/logos/crepes.png',
    url: 'https://crepesywaffles.com/',
  },
  {
    name: 'Rappi',
    logo: '/logos/rappi.png',
    url: 'https://www.rappi.com/',
  },
  {
    name: 'Yuno',
    logo: '/logos/yuno.png',
    url: 'https://y.uno/',
  },
  {
    name: 'Linnda',
    logo: '/logos/linnda.png',
    url: 'https://www.linnda.co/',
  },
]

export function ExperienceBanner({ translations }: ExperienceBannerProps) {
  return (
    <section className="border-b border-border bg-gray-50 py-8 md:py-10">
      <Container>
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-center md:gap-12">
          <p className="text-center font-body text-xs font-medium uppercase tracking-widest text-muted md:text-left">
            {translations.text}
          </p>

          <div className="flex items-center gap-8 md:gap-12">
            {companies.map((company) => (
              <a
                key={company.name}
                href={company.url}
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                title={company.name}
              >
                <img
                  src={company.logo}
                  alt={company.name}
                  className="h-10 w-24 object-contain md:h-12 md:w-32"
                />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

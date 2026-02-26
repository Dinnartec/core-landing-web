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
    name: 'Yuno',
    logo: '/logos/yuno.jpeg',
    url: 'https://y.uno/',
  },
  {
    name: 'Rappi',
    logo: '/logos/rappi.jpeg',
    url: 'https://www.rappi.com/',
  },
  {
    name: 'Linnda',
    logo: '/logos/linnda.jpeg',
    url: 'https://www.linnda.co/',
  },
]

export function ExperienceBanner({ translations }: ExperienceBannerProps) {
  return (
    <section className="border-b border-border bg-gray-50 py-8 md:py-10">
      <Container>
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-center md:gap-12">
          <p className="font-body text-xs font-medium uppercase tracking-widest text-muted">
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
                  className="h-10 w-auto object-contain md:h-14"
                />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

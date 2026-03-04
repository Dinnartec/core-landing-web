import type { Metadata } from 'next'
import { getTranslations } from '@/lib/i18n'
import { HomePage } from '@/components/HomePage'

const lang = 'es'
const t = getTranslations(lang)

export const metadata: Metadata = {
  title: 'Dinnartec — Tecnología que impulsa tu empresa en la era de la IA',
  description: t('hero.description'),
  openGraph: {
    locale: 'es_ES',
  },
}

export default function Page() {
  return <HomePage lang={lang} />
}

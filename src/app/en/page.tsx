import type { Metadata } from 'next'
import { getTranslations } from '@/lib/i18n'
import { HomePage } from '@/components/HomePage'

const lang = 'en'
const t = getTranslations(lang)

export const metadata: Metadata = {
  title: 'Dinnartec — Technology that drives your company in the AI era',
  description: t('hero.description'),
  openGraph: {
    locale: 'en_US',
  },
}

export default function Page() {
  return <HomePage lang={lang} />
}

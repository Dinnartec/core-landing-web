import es from '@/content/i18n/es.json'
import en from '@/content/i18n/en.json'
import type { Locale } from '@/types'

const translations = { es, en }

type TranslationKeys = typeof es

function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split('.')
  let current: unknown = obj

  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = (current as Record<string, unknown>)[key]
    } else {
      return path
    }
  }

  return typeof current === 'string' ? current : path
}

export function getTranslations(locale: Locale) {
  const t = translations[locale]

  return function translate(key: string): string {
    return getNestedValue(t as unknown as Record<string, unknown>, key)
  }
}

export function useTranslations(locale: Locale) {
  return getTranslations(locale)
}

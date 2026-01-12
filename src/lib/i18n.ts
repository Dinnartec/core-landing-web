import es from '@/content/i18n/es.json'
import en from '@/content/i18n/en.json'
import type { Locale } from '@/types'

const translations = { es, en }

function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  const keys = path.split('.')
  let current: unknown = obj

  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = (current as Record<string, unknown>)[key]
    } else {
      return path
    }
  }

  return current
}

export function getTranslations(locale: Locale) {
  const t = translations[locale]

  function translate(key: string): string {
    const value = getNestedValue(t as unknown as Record<string, unknown>, key)
    return typeof value === 'string' ? value : key
  }

  translate.array = function (key: string): string[] {
    const value = getNestedValue(t as unknown as Record<string, unknown>, key)
    return Array.isArray(value) ? value : []
  }

  return translate
}

export function useTranslations(locale: Locale) {
  return getTranslations(locale)
}

export type Locale = 'es' | 'en'

export interface SectionProps {
  lang: Locale
}

export interface NavLink {
  key: string
  href: string
}

export interface FormData {
  name: string
  email: string
  message: string
}

export interface FormState {
  status: 'idle' | 'loading' | 'success' | 'error'
  error?: string
}

import { useState } from 'react'
import { HiArrowRight, HiOutlineMail } from 'react-icons/hi'
import { Container } from '@/components/layout/Container'
import { CONTACT_EMAIL, CALENDLY_URL } from '@/lib/constants'
import type { Locale, FormState } from '@/types'

interface ContactSectionProps {
  lang: Locale
  translations: {
    label: string
    title: string
    description: string
    cta: string
    form: {
      name: string
      whatsapp: string
      message: string
      submit: string
      success: string
      error: string
    }
    alternative: string
  }
}

export function ContactSection({ translations }: ContactSectionProps) {
  const [formState, setFormState] = useState<FormState>({ status: 'idle' })
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState({ status: 'loading' })

    try {
      const text = `Hola, mi nombre es ${formData.name}. ${formData.message}`
      const waNumber = "573000000000" // Placeholder number
      const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`

      // Slight delay to show loading state
      setTimeout(() => {
        setFormState({ status: 'success' })
        setFormData({ name: '', whatsapp: '', message: '' })
        window.open(waUrl, '_blank')
      }, 500)
      
    } catch {
      setFormState({ status: 'error', error: translations.form.error })
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section id="contact" className="section relative bg-black text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-px w-1/2 bg-gradient-to-r from-white/20 to-transparent" />
        <div className="absolute bottom-0 right-1/2 h-px w-1/2 bg-gradient-to-l from-white/20 to-transparent" />
      </div>

      <Container className="relative">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <span className="font-body text-xs font-medium uppercase tracking-widest text-white/50">
              {translations.label}
            </span>

            <h2 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              {translations.title}
            </h2>

            <p className="mt-6 font-body text-lg leading-relaxed text-white/70 md:text-xl">
              {translations.description}
            </p>

            <div className="mt-12 space-y-6">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 border border-white bg-white px-8 py-4 font-body text-sm font-medium uppercase tracking-widest text-black transition-all hover:bg-transparent hover:text-white"
              >
                {translations.cta}
                <HiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>

              <div className="h-px w-full bg-white/20" />

              <div className="flex items-center gap-3">
                <HiOutlineMail className="h-5 w-5 text-white/50" />
                <span className="font-body text-sm text-white/50">
                  {translations.alternative}
                </span>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="font-body text-sm font-medium text-white underline underline-offset-4 transition-opacity hover:opacity-70"
                >
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="border border-white/10 bg-white/5 p-8 backdrop-blur-sm md:p-10">
              {formState.status === 'success' ? (
                <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
                  <div className="mb-4 flex h-16 w-16 animate-bounce items-center justify-center rounded-full border border-green-500/20 bg-green-500/10">
                    <svg
                      className="h-8 w-8 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="font-display text-xl font-bold">
                    {translations.form.success}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block font-body text-xs uppercase tracking-widest text-white/50"
                    >
                      {translations.form.name}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full border-b border-white/20 bg-transparent py-3 font-body text-white outline-none transition-colors placeholder:text-white/30 focus:border-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="whatsapp"
                      className="mb-2 block font-body text-xs uppercase tracking-widest text-white/50"
                    >
                      {translations.form.whatsapp}
                    </label>
                    <input
                      type="text"
                      id="whatsapp"
                      name="whatsapp"
                      placeholder="+57 300 000 0000"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      required
                      className="w-full border-b border-white/20 bg-transparent py-3 font-body text-white outline-none transition-colors placeholder:text-white/30 focus:border-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block font-body text-xs uppercase tracking-widest text-white/50"
                    >
                      {translations.form.message}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full resize-none border-b border-white/20 bg-transparent py-3 font-body text-white outline-none transition-colors placeholder:text-white/30 focus:border-white"
                    />
                  </div>

                  {formState.status === 'error' && (
                    <p className="font-body text-sm text-red-400">
                      {formState.error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={formState.status === 'loading'}
                    className="group flex w-full items-center justify-center gap-3 bg-white py-4 font-body text-sm font-medium uppercase tracking-widest text-black transition-all hover:bg-white/90 disabled:opacity-50"
                  >
                    {formState.status === 'loading' ? (
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-black border-t-transparent" />
                    ) : (
                      <>
                        {translations.form.submit}
                        <HiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

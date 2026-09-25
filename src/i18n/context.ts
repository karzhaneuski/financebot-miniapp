import { createContext, useContext } from 'react'
import { en, pl, ru } from './messages'
import type { MessageKey, Messages } from './messages'

export type Language = 'ru' | 'en' | 'pl'

const CATALOGS: Record<Language, Partial<Messages>> = { ru, en, pl }
const INTL_LOCALES: Record<Language, string> = { ru: 'ru-RU', en: 'en-GB', pl: 'pl-PL' }
const FALLBACK: Language = 'en'

export function normalize(code: string | null | undefined): Language | null {
  const base = (code ?? '').split('-')[0].toLowerCase()
  return base === 'ru' || base === 'en' || base === 'pl' ? base : null
}

export function telegramLanguage(): Language {
  return normalize(window.Telegram?.WebApp?.initDataUnsafe?.user?.language_code) ?? FALLBACK
}

export interface I18n {
  lang: Language
  t: (key: MessageKey) => string
  formatMoney: (amount: number, currency: string, fractionDigits?: number) => string
  formatDate: (iso: string, options: Intl.DateTimeFormatOptions) => string
}

export function makeI18n(lang: Language): I18n {
  const catalog = CATALOGS[lang]
  const locale = INTL_LOCALES[lang]
  return {
    lang,
    t: (key) => catalog[key] ?? en[key],
    formatMoney: (amount, currency, fractionDigits = 2) => {
      const digits = { minimumFractionDigits: fractionDigits, maximumFractionDigits: fractionDigits }
      try {
        return new Intl.NumberFormat(locale, { style: 'currency', currency, ...digits }).format(amount)
      } catch {
        // Not an ISO 4217 code Intl knows (e.g. the legacy "BYR").
        return `${new Intl.NumberFormat(locale, digits).format(amount)} ${currency}`
      }
    },
    formatDate: (iso, options) => new Date(iso).toLocaleDateString(locale, options),
  }
}

export const I18nContext = createContext<I18n>(makeI18n(FALLBACK))

export function useI18n(): I18n {
  return useContext(I18nContext)
}

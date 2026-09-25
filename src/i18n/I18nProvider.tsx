import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { getMe } from '../api/client'
import { I18nContext, makeI18n, normalize, telegramLanguage } from './context'
import type { Language } from './context'

/**
 * The language comes from /api/me — the one the user picked in the bot (or
 * Russian for pre-localization users). Until it arrives nothing is rendered,
 * so a Russian user never sees an English flash; if the request fails the
 * Telegram client language is used.
 */
export default function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language | null>(null)

  useEffect(() => {
    getMe()
      .then((me) => setLang(normalize(me.language) ?? telegramLanguage()))
      .catch(() => setLang(telegramLanguage()))
  }, [])

  const value = useMemo(() => (lang ? makeI18n(lang) : null), [lang])
  if (!value) return null
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

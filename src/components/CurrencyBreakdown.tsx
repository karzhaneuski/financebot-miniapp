import type { CurrencyStats } from '../api/types'

interface Props {
  data: CurrencyStats | null
  loading: boolean
}

const CURRENCY_FLAGS: Record<string, string> = {
  PLN: '🇵🇱',
  USD: '🇺🇸',
  EUR: '🇪🇺',
  CZK: '🇨🇿',
  BYN: '🇧🇾',
  TRY: '🇹🇷',
  JPY: '🇯🇵',
  GBP: '🇬🇧',
}

export default function CurrencyBreakdown({ data, loading }: Props) {
  if (!loading && (!data || data.length < 2)) return null

  return (
    <div>
      <h2
        style={{
          fontSize: 16,
          fontWeight: 600,
          color: 'var(--tg-theme-text-color, #000)',
          padding: '0 16px',
          marginBottom: 12,
        }}
      >
        💱 По валютам
      </h2>
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {loading
          ? Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="skeleton" style={{ height: 16, width: '70%' }} />
            ))
          : (data ?? []).map((c) => {
              const flag = CURRENCY_FLAGS[c.currency] ?? '💱'
              const original = c.total_original ?? 0
              const pln = c.total_pln ?? 0
              return (
                <div
                  key={c.currency}
                  style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}
                >
                  <span style={{ color: 'var(--tg-theme-text-color, #000)' }}>
                    {flag} {c.currency}
                  </span>
                  <span style={{ color: 'var(--tg-theme-hint-color, #999)' }}>
                    {original.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    {c.currency !== 'PLN' &&
                      ` (≈${pln.toLocaleString('ru-RU', { maximumFractionDigits: 0 })} PLN)`}
                  </span>
                </div>
              )
            })}
      </div>
    </div>
  )
}

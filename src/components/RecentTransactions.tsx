import type { Transaction } from '../api/types'
import { useI18n } from '../i18n/context'

interface Props {
  data: Transaction[] | null
  loading: boolean
}

const CATEGORY_EMOJI: Record<string, string> = {
  groceries: '🛒',
  cafe: '☕',
  pharmacy: '💊',
  transport: '🚗',
  electronics: '💻',
  clothing: '👕',
  household: '🏠',
  other: '📦',
}

export default function RecentTransactions({ data, loading }: Props) {
  const { t, formatMoney, formatDate } = useI18n()
  console.log('transactions:', data)

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
        {t('recent.title')}
      </h2>
      {!loading && (!data || data.length === 0) ? (
        <p style={{ fontSize: 14, color: 'var(--tg-theme-hint-color, #999)', padding: '0 16px' }}>
          {t('common.noData')}
        </p>
      ) : (
        <div
          style={{
            backgroundColor: 'var(--tg-theme-secondary-bg-color, #f0f0f0)',
            borderRadius: 14,
            margin: '0 16px',
            overflow: 'hidden',
          }}
        >
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    padding: '12px 16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: i < 5 ? '1px solid var(--tg-theme-bg-color, #fff)' : undefined,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div className="skeleton" style={{ width: 24, height: 24, borderRadius: '50%' }} />
                    <div className="skeleton" style={{ height: 14, width: 120 }} />
                  </div>
                  <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <div className="skeleton" style={{ height: 14, width: 80 }} />
                    <div className="skeleton" style={{ height: 11, width: 50 }} />
                  </div>
                </div>
              ))
            : (data ?? []).map((tx, i, arr) => {
                const emoji = tx.emoji ?? CATEGORY_EMOJI[tx.category ?? ''] ?? '📦'
                const label = tx.store || tx.source || t('recent.noName')
                const amount = tx.amount ?? 0
                const date = tx.date ?? ''
                const isForeign = !!tx.currency && tx.currency !== 'PLN'
                const primaryAmount = isForeign ? tx.original_amount ?? amount : amount
                const primaryCurrency = isForeign ? tx.currency : 'PLN'
                return (
                  <div
                    key={tx.id ?? i}
                    style={{
                      padding: '12px 16px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      borderBottom:
                        i < arr.length - 1
                          ? '1px solid var(--tg-theme-bg-color, #fff)'
                          : undefined,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: 20 }}>{emoji}</span>
                      <span
                        style={{
                          fontSize: 14,
                          color: 'var(--tg-theme-text-color, #000)',
                          maxWidth: 160,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {label}
                      </span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: 'var(--tg-theme-text-color, #000)',
                        }}
                      >
                        {formatMoney(primaryAmount, primaryCurrency)}
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--tg-theme-hint-color, #999)' }}>
                        {isForeign ? `≈${formatMoney(amount, 'PLN')} · ` : ''}
                        {date ? formatDate(date, { day: 'numeric', month: 'short' }) : ''}
                      </div>
                    </div>
                  </div>
                )
              })}
        </div>
      )}
    </div>
  )
}

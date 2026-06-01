import type { Transaction } from '../api/types'

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

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })
}

export default function RecentTransactions({ data, loading }: Props) {
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
        Последние операции
      </h2>
      {!loading && (!data || data.length === 0) ? (
        <p style={{ fontSize: 14, color: 'var(--tg-theme-hint-color, #999)', padding: '0 16px' }}>
          Нет данных
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
                const label = tx.store || tx.source || 'Без названия'
                const amount = tx.amount ?? 0
                const date = tx.date ?? ''
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
                        {amount.toFixed(2)} PLN
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--tg-theme-hint-color, #999)' }}>
                        {date ? formatDate(date) : ''}
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

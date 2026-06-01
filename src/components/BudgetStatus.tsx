import type { BudgetStats } from '../api/types'

interface Props {
  data: BudgetStats | null
  loading: boolean
}

const CATEGORY_LABELS: Record<string, string> = {
  groceries: '🛒 Продукты',
  cafe: '☕ Кафе',
  pharmacy: '💊 Аптека',
  transport: '🚗 Транспорт',
  electronics: '💻 Электроника',
  clothing: '👕 Одежда',
  household: '🏠 Жильё',
  other: '📦 Прочее',
}

function barColor(pct: number): string {
  if (pct >= 100) return '#ef4444'
  if (pct >= 80) return '#f97316'
  return '#22c55e'
}

export default function BudgetStatus({ data, loading }: Props) {
  console.log('budgets:', data)

  if (!loading && (!data || data.length === 0)) return null

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
        Бюджет
      </h2>
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {loading
          ? Array.from({ length: 2 }).map((_, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div className="skeleton" style={{ height: 14, width: '50%' }} />
                <div className="skeleton" style={{ height: 8, borderRadius: 4 }} />
              </div>
            ))
          : (data ?? []).map((b) => {
              const spent = b.spent ?? 0
              const limit = b.limit ?? 0
              const pct = Math.min(b.percentage ?? 0, 100)
              const color = barColor(b.percentage ?? 0)
              const label = b.name ?? (b.emoji ? `${b.emoji} ` : '') + (CATEGORY_LABELS[b.category] ?? b.category)
              return (
                <div key={b.category}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: 5,
                    }}
                  >
                    <span style={{ fontSize: 14, color: 'var(--tg-theme-text-color, #000)' }}>
                      {label}
                    </span>
                    <span style={{ fontSize: 13, color: 'var(--tg-theme-hint-color, #999)' }}>
                      {spent.toFixed(0)} / {limit.toFixed(0)} PLN &nbsp;
                      <span style={{ color }}>{(b.percentage ?? 0).toFixed(0)}%</span>
                    </span>
                  </div>
                  <div
                    style={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: 'var(--tg-theme-secondary-bg-color, #f0f0f0)',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        width: `${pct}%`,
                        backgroundColor: color,
                        borderRadius: 4,
                        transition: 'width 0.4s ease',
                      }}
                    />
                  </div>
                </div>
              )
            })}
      </div>
    </div>
  )
}

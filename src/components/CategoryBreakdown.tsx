import type { CategoryStats } from '../api/types'

interface Props {
  data: CategoryStats | null
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

const BAR_COLOR = 'var(--tg-theme-button-color, #2481cc)'

export default function CategoryBreakdown({ data, loading }: Props) {
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
        По категориям
      </h2>
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div className="skeleton" style={{ height: 14, width: '60%' }} />
              <div className="skeleton" style={{ height: 8, borderRadius: 4 }} />
            </div>
          ))
        ) : !data || data.length === 0 ? (
          <p style={{ fontSize: 14, color: 'var(--tg-theme-hint-color, #999)' }}>Нет данных</p>
        ) : (
          data.map((cat) => {
            const label = cat.name ?? CATEGORY_LABELS[cat.category] ?? cat.category
            const amount = cat.amount ?? 0
            const pct = cat.percentage ?? 0
            return (
              <div key={cat.category}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 5,
                  }}
                >
                  <span style={{ fontSize: 14, color: 'var(--tg-theme-text-color, #000)' }}>
                    {cat.emoji ? `${cat.emoji} ` : ''}{label}
                  </span>
                  <span style={{ fontSize: 13, color: 'var(--tg-theme-hint-color, #999)' }}>
                    {amount.toLocaleString('ru-RU', { maximumFractionDigits: 0 })} PLN &nbsp;
                    {pct.toFixed(0)}%
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
                      width: `${Math.min(pct, 100)}%`,
                      backgroundColor: BAR_COLOR,
                      borderRadius: 4,
                      transition: 'width 0.4s ease',
                    }}
                  />
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

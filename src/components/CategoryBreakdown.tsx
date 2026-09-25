import type { CategoryStats } from '../api/types'
import { useI18n } from '../i18n/context'

interface Props {
  data: CategoryStats | null
  loading: boolean
}

const BAR_COLOR = 'var(--tg-theme-button-color, #2481cc)'

export default function CategoryBreakdown({ data, loading }: Props) {
  const { t, formatMoney } = useI18n()
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
        {t('categories.title')}
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
          <p style={{ fontSize: 14, color: 'var(--tg-theme-hint-color, #999)' }}>{t('common.noData')}</p>
        ) : (
          data.map((cat) => {
            const label = cat.name ?? cat.category
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
                    {formatMoney(amount, 'PLN', 0)} &nbsp;
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

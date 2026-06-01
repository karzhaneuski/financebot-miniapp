import type { StoreStats } from '../api/types'

interface Props {
  data: StoreStats | null
  loading: boolean
}

export default function TopStores({ data, loading }: Props) {
  console.log('stores:', data)

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
        Топ магазинов
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
            ? Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    padding: '12px 16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: i < 4 ? '1px solid var(--tg-theme-bg-color, #fff)' : undefined,
                  }}
                >
                  <div className="skeleton" style={{ height: 14, width: '40%' }} />
                  <div className="skeleton" style={{ height: 14, width: '25%' }} />
                </div>
              ))
            : (data ?? []).slice(0, 5).map((store, i, arr) => (
                <div
                  key={store.store ?? i}
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
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: 'var(--tg-theme-hint-color, #999)',
                        width: 18,
                      }}
                    >
                      {i + 1}
                    </span>
                    <span style={{ fontSize: 14, color: 'var(--tg-theme-text-color, #000)' }}>
                      {store.store || 'Неизвестно'}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: 'var(--tg-theme-text-color, #000)',
                    }}
                  >
                    {(store.amount ?? 0).toLocaleString('ru-RU', { maximumFractionDigits: 0 })} PLN
                  </span>
                </div>
              ))}
        </div>
      )}
    </div>
  )
}

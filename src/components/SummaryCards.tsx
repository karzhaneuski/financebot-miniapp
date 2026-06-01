import type { Summary } from '../api/types'

interface Props {
  data: Summary | null
  loading: boolean
}

function formatAmount(n: number): string {
  return n.toLocaleString('ru-RU', { maximumFractionDigits: 0 })
}

function Card({
  emoji,
  label,
  value,
  loading,
  highlight,
}: {
  emoji: string
  label: string
  value: string
  loading: boolean
  highlight?: 'green' | 'red'
}) {
  const highlightColor =
    highlight === 'green' ? '#22c55e' : highlight === 'red' ? '#ef4444' : undefined

  return (
    <div
      style={{
        backgroundColor: 'var(--tg-theme-secondary-bg-color, #f0f0f0)',
        borderRadius: 14,
        padding: '14px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
      }}
    >
      <span style={{ fontSize: 13, color: 'var(--tg-theme-hint-color, #999)' }}>
        {emoji} {label}
      </span>
      {loading ? (
        <div className="skeleton" style={{ height: 28, width: '70%' }} />
      ) : (
        <span
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: highlightColor ?? 'var(--tg-theme-text-color, #000)',
            lineHeight: 1,
          }}
        >
          {value}
        </span>
      )}
    </div>
  )
}

export default function SummaryCards({ data, loading }: Props) {
  console.log('summary:', data)

  const balance = data?.balance ?? 0

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 10,
        padding: '0 16px',
      }}
    >
      <Card
        emoji="💸"
        label="Расходы"
        value={`${formatAmount(data?.total_spent ?? 0)} PLN`}
        loading={loading}
      />
      <Card
        emoji="💰"
        label="Доходы"
        value={`${formatAmount(data?.total_income ?? 0)} PLN`}
        loading={loading}
      />
      <Card
        emoji="📊"
        label="Баланс"
        value={`${balance >= 0 ? '+' : ''}${formatAmount(balance)} PLN`}
        loading={loading}
        highlight={balance >= 0 ? 'green' : 'red'}
      />
      <Card
        emoji="🧾"
        label="Транзакций"
        value={String(data?.transaction_count ?? 0)}
        loading={loading}
      />
    </div>
  )
}

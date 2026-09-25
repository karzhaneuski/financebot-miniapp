import type { Summary } from '../api/types'
import { useI18n } from '../i18n/context'

interface Props {
  data: Summary | null
  loading: boolean
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
  const { t, formatMoney } = useI18n()
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
        label={t('summary.expenses')}
        value={formatMoney(data?.total_spent ?? 0, 'PLN', 0)}
        loading={loading}
      />
      <Card
        emoji="💰"
        label={t('summary.income')}
        value={formatMoney(data?.total_income ?? 0, 'PLN', 0)}
        loading={loading}
      />
      <Card
        emoji="📊"
        label={t('summary.balance')}
        value={`${balance >= 0 ? '+' : ''}${formatMoney(balance, 'PLN', 0)}`}
        loading={loading}
        highlight={balance >= 0 ? 'green' : 'red'}
      />
      <Card
        emoji="🧾"
        label={t('summary.transactions')}
        value={String(data?.transaction_count ?? 0)}
        loading={loading}
      />
    </div>
  )
}

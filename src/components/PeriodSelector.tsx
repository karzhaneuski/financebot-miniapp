interface Props {
  value: string
  onChange: (period: string) => void
}

const PERIODS = [
  { key: 'day', label: 'День' },
  { key: 'week', label: 'Неделя' },
  { key: 'month', label: 'Месяц' },
  { key: 'year', label: 'Год' },
]

export default function PeriodSelector({ value, onChange }: Props) {
  return (
    <div
      style={{
        backgroundColor: 'var(--tg-theme-secondary-bg-color, #f0f0f0)',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        padding: '10px 16px',
        display: 'flex',
        gap: 8,
      }}
    >
      {PERIODS.map((p) => (
        <button
          key={p.key}
          onClick={() => onChange(p.key)}
          style={{
            flex: 1,
            padding: '8px 0',
            borderRadius: 10,
            border: 'none',
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: 500,
            transition: 'all 0.15s',
            backgroundColor:
              value === p.key
                ? 'var(--tg-theme-button-color, #2481cc)'
                : 'transparent',
            color:
              value === p.key
                ? 'var(--tg-theme-button-text-color, #ffffff)'
                : 'var(--tg-theme-hint-color, #999999)',
          }}
        >
          {p.label}
        </button>
      ))}
    </div>
  )
}

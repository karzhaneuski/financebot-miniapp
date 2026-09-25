import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import type { DayStats } from '../api/types'
import { useI18n } from '../i18n/context'

interface Props {
  data: DayStats | null
  loading: boolean
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontSize: 16,
        fontWeight: 600,
        color: 'var(--tg-theme-text-color, #000)',
        padding: '0 16px',
        marginBottom: 12,
      }}
    >
      {children}
    </h2>
  )
}

export default function SpendingChart({ data, loading }: Props) {
  const { t, formatMoney, formatDate } = useI18n()
  console.log('days:', data)

  const buttonColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--tg-theme-button-color')
    .trim() || '#2481cc'

  return (
    <div>
      <SectionTitle>{t('chart.title')}</SectionTitle>
      <div style={{ padding: '0 8px' }}>
        {loading ? (
          <div className="skeleton" style={{ height: 180, borderRadius: 12 }} />
        ) : !data || data.length === 0 ? (
          <p style={{ fontSize: 14, color: 'var(--tg-theme-hint-color, #999)', padding: '0 8px' }}>
            {t('common.noData')}
          </p>
        ) : (
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={data} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={buttonColor} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={buttonColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="date"
                tickFormatter={(v: string) => {
                  const d = new Date(v)
                  return String(d.getDate())
                }}
                tick={{ fontSize: 11, fill: 'var(--tg-theme-hint-color, #999)' }}
                axisLine={false}
                tickLine={false}
                interval="preserveStartEnd"
              />
              <YAxis
                tick={{ fontSize: 11, fill: 'var(--tg-theme-hint-color, #999)' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v: number) => (v >= 1000 ? `${(v / 1000).toFixed(1)}k` : String(v))}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--tg-theme-secondary-bg-color, #f0f0f0)',
                  border: 'none',
                  borderRadius: 10,
                  fontSize: 13,
                  color: 'var(--tg-theme-text-color, #000)',
                }}
                formatter={(value) => [formatMoney(Number(value ?? 0), 'PLN'), t('chart.spent')]}
                labelFormatter={(label) => formatDate(String(label), { day: 'numeric', month: 'short' })}
              />
              <Area
                type="monotone"
                dataKey="spent"
                stroke={buttonColor}
                strokeWidth={2}
                fill="url(#colorSpend)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}

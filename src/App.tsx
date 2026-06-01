import { useState } from 'react'
import PeriodSelector from './components/PeriodSelector'
import SummaryCards from './components/SummaryCards'
import SpendingChart from './components/SpendingChart'
import CategoryBreakdown from './components/CategoryBreakdown'
import BudgetStatus from './components/BudgetStatus'
import TopStores from './components/TopStores'
import RecentTransactions from './components/RecentTransactions'
import { useDashboard } from './hooks/useDashboard'

export default function App() {
  const [period, setPeriod] = useState('month')
  const { data, loading, error } = useDashboard(period)

  return (
    <div
      style={{
        minHeight: '100svh',
        backgroundColor: 'var(--tg-theme-bg-color, #ffffff)',
        paddingBottom: 32,
      }}
    >
      <PeriodSelector value={period} onChange={setPeriod} />

      {error && (
        <div
          style={{
            margin: '12px 16px',
            padding: '12px 16px',
            backgroundColor: '#fef2f2',
            borderRadius: 12,
            color: '#ef4444',
            fontSize: 14,
          }}
        >
          {error}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginTop: 16 }}>
        <SummaryCards data={data.summary} loading={loading} />
        <SpendingChart data={data.days} loading={loading} />
        <CategoryBreakdown data={data.categories} loading={loading} />
        <BudgetStatus data={data.budgets} loading={loading} />
        <TopStores data={data.stores} loading={loading} />
        <RecentTransactions data={data.transactions} loading={loading} />
      </div>
    </div>
  )
}

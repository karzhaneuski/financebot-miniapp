import { useState, useEffect, useCallback } from 'react'
import {
  getSummary,
  getByCategory,
  getByDay,
  getTopStores,
  getBudgets,
  getRecentTransactions,
  getByCurrency,
} from '../api/client'
import type {
  Summary,
  CategoryStats,
  DayStats,
  StoreStats,
  BudgetStats,
  Transaction,
  CurrencyStats,
} from '../api/types'

interface DashboardData {
  summary: Summary | null
  categories: CategoryStats | null
  days: DayStats | null
  stores: StoreStats | null
  budgets: BudgetStats | null
  transactions: Transaction[] | null
  currencies: CurrencyStats | null
}

export function useDashboard(period: string) {
  const [data, setData] = useState<DashboardData>({
    summary: null,
    categories: null,
    days: null,
    stores: null,
    budgets: null,
    transactions: null,
    currencies: null,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetch = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [summary, categories, days, stores, budgets, transactions, currencies] = await Promise.all([
        getSummary(period),
        getByCategory(period),
        getByDay(period),
        getTopStores(period),
        getBudgets(),
        getRecentTransactions(10),
        getByCurrency(period),
      ])
      setData({ summary, categories, days, stores, budgets, transactions, currencies })
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Ошибка загрузки данных')
    } finally {
      setLoading(false)
    }
  }, [period])

  useEffect(() => {
    fetch()
  }, [fetch])

  return { data, loading, error, refetch: fetch }
}

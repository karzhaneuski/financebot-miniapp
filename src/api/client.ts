import axios from 'axios'
import type {
  Summary,
  CategoryStats,
  DayStats,
  StoreStats,
  BudgetStats,
  Transaction,
  CurrencyStats,
} from './types'

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000'

function getAuthHeader(): string | undefined {
  try {
    const initData = window.Telegram?.WebApp?.initData
    if (initData) {
      return 'tma ' + initData
    }
  } catch {
    // not in Telegram
  }
  // Local development against a backend running with DEV_MODE=true.
  // import.meta.env.DEV is statically false in production builds, so this
  // branch — and the token — are removed from the bundle.
  if (import.meta.env.DEV) {
    return 'Bearer devsecret123'
  }
  return undefined
}

const api = axios.create({ baseURL: BASE_URL })

api.interceptors.request.use((config) => {
  const auth = getAuthHeader()
  if (auth) {
    config.headers.Authorization = auth
  }
  return config
})

export async function getSummary(period: string): Promise<Summary> {
  const { data } = await api.get('/api/stats/summary', { params: { period } })
  return data
}

export async function getByCategory(period: string): Promise<CategoryStats> {
  const { data } = await api.get('/api/stats/by-category', { params: { period } })
  return data.categories ?? []
}

export async function getByDay(period: string): Promise<DayStats> {
  const { data } = await api.get('/api/stats/by-day', { params: { period } })
  return data.days ?? []
}

export async function getTopStores(period: string): Promise<StoreStats> {
  const { data } = await api.get('/api/stats/top-stores', { params: { period } })
  return data.stores ?? []
}

export async function getBudgets(): Promise<BudgetStats> {
  const { data } = await api.get('/api/budgets')
  return data.budgets ?? []
}

export async function getRecentTransactions(limit: number): Promise<Transaction[]> {
  const { data } = await api.get('/api/transactions/recent', { params: { limit } })
  return data.transactions ?? []
}

export async function getByCurrency(period: string): Promise<CurrencyStats> {
  const { data } = await api.get('/api/stats/by-currency', { params: { period } })
  return data.currencies ?? []
}

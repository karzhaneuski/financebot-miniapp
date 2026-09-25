export interface Me {
  user_id: number
  language: string
}

export interface Summary {
  total_spent: number
  total_income: number
  balance: number
  transaction_count: number
  currency: string
}

export interface CategoryStat {
  category: string
  name?: string
  emoji?: string
  amount: number
  percentage: number
}

export type CategoryStats = CategoryStat[]

export interface DayStat {
  date: string
  spent: number
}

export type DayStats = DayStat[]

export interface StoreStat {
  store: string
  amount: number
  count: number
}

export type StoreStats = StoreStat[]

export interface BudgetStat {
  category: string
  name?: string
  emoji?: string
  limit: number
  spent: number
  percentage: number
  status?: string
}

export type BudgetStats = BudgetStat[]

export interface Transaction {
  id: number
  store: string | null
  date: string
  amount: number
  currency: string
  original_amount?: number
  category: string
  category_name?: string
  emoji?: string
  source?: string | null
}

export interface CurrencyStat {
  currency: string
  total_original: number
  total_pln: number
  count: number
}

export type CurrencyStats = CurrencyStat[]

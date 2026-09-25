// UI strings. English is the source and the fallback for missing keys.
// Category names are not here: the API returns them already localized.
export const en = {
  'period.day': 'Day',
  'period.week': 'Week',
  'period.month': 'Month',
  'period.year': 'Year',
  'summary.expenses': 'Expenses',
  'summary.income': 'Income',
  'summary.balance': 'Balance',
  'summary.transactions': 'Transactions',
  'chart.title': 'Daily spending',
  'chart.spent': 'Spent',
  'categories.title': 'By category',
  'currencies.title': '💱 By currency',
  'budget.title': 'Budget',
  'stores.title': 'Top stores',
  'stores.unknown': 'Unknown',
  'recent.title': 'Recent transactions',
  'recent.noName': 'No name',
  'common.noData': 'No data',
  'error.loading': 'Failed to load data',
} as const

export type MessageKey = keyof typeof en
export type Messages = Record<MessageKey, string>

export const ru: Messages = {
  'period.day': 'День',
  'period.week': 'Неделя',
  'period.month': 'Месяц',
  'period.year': 'Год',
  'summary.expenses': 'Расходы',
  'summary.income': 'Доходы',
  'summary.balance': 'Баланс',
  'summary.transactions': 'Транзакций',
  'chart.title': 'Расходы по дням',
  'chart.spent': 'Расходы',
  'categories.title': 'По категориям',
  'currencies.title': '💱 По валютам',
  'budget.title': 'Бюджет',
  'stores.title': 'Топ магазинов',
  'stores.unknown': 'Неизвестно',
  'recent.title': 'Последние операции',
  'recent.noName': 'Без названия',
  'common.noData': 'Нет данных',
  'error.loading': 'Ошибка загрузки данных',
}

// Filled in with the Polish translation; until then English is used.
export const pl: Partial<Messages> = {}

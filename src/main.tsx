import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import WebApp from '@twa-dev/sdk'
import './index.css'
import App from './App.tsx'
import I18nProvider from './i18n/I18nProvider'

try {
  if (window.Telegram?.WebApp) {
    WebApp.ready()
    WebApp.expand()
  }
} catch (e) {
  console.log('Not in Telegram WebView, skipping WebApp init')
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider>
      <App />
    </I18nProvider>
  </StrictMode>,
)

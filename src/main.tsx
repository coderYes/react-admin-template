import { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import '@/assets/css/index.css'
import 'virtual:svg-icons-register'
// i18n
import './locales/i18n'
import 'default-passive-events'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <Suspense>
    <App />
  </Suspense>
)

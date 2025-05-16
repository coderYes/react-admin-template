import { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import '@/assets/css/index.css'
import 'virtual:svg-icons-register'
import './style.css'
// i18n
import './locales/i18n'
// helmet -> https://github.com/staylor/react-helmet-async
import { HelmetProvider } from 'react-helmet-async'
// keep-alive -> https://github.com/CJY0208/react-activation
// import { AliveScope } from 'react-activation'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  // <AliveScope>
  <HelmetProvider>
    <Suspense>
      <App />
    </Suspense>
  </HelmetProvider>
  // </AliveScope>
)

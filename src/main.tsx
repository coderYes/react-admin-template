import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import '@/assets/css/index.css'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <ThemeProvider theme={{}}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>
)

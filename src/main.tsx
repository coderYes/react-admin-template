import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(
  <ThemeProvider theme={{}}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from 'styled-components'
import BeforeRouter from './components/boforeRouter'

const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(
  <React.StrictMode>
    <ThemeProvider theme={{}}>
      {/* <BeforeRouter> */}
      <App />
      {/* </BeforeRouter> */}
    </ThemeProvider>
  </React.StrictMode>
)

import { App as AntdApp } from 'antd'
import BrowserRouter from '@/router/BrowserRouter'
import BaseAntdConfig from '@/theme/antd'

function App() {
  console.log('app reload')
  return (
    <BaseAntdConfig>
      <AntdApp>
        <BrowserRouter />
      </AntdApp>
    </BaseAntdConfig>
  )
}

export default App

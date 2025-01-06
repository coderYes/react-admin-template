import { App as AntdApp } from 'antd'
import { Helmet } from 'react-helmet-async'
import { ToastContain, NotificationContain } from '@/components/toast'
import BrowserRouter from '@/router/BrowserRouter'
import BaseAntdConfig from '@/theme/antd'
import Logo from '@/assets/icons/ic-logo.svg'

function App() {
  console.log('app reload')
  return (
    <BaseAntdConfig>
      <AntdApp>
        <Helmet>
          <title>React Admin Template</title>
          <link rel="icon" href={Logo} />
        </Helmet>
        <ToastContain />
        <NotificationContain />

        <BrowserRouter />
      </AntdApp>
    </BaseAntdConfig>
  )
}

export default App

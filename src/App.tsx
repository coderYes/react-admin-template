import { App as AntdApp } from 'antd'
import { Helmet } from 'react-helmet-async'
import BaseNotice from '@/components/baseNotice'
import BrowserRouter from '@/router/BrowserRouter'
import BaseAntdConfig from '@/theme/antd'
import Logo from '@/assets/icons/ic-logo.svg'

function App() {
  return (
    <AntdApp>
      <BaseAntdConfig>
        <Helmet>
          <title>React Admin Template</title>
          <link rel="icon" href={Logo} />
        </Helmet>
        <BaseNotice />

        <BrowserRouter />
      </BaseAntdConfig>
    </AntdApp>
  )
}

export default App

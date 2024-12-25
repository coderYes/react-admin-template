import { App as AntdApp } from 'antd'
import { Helmet } from 'react-helmet-async'
import BrowserRouter from '@/router/BrowserRouter'
import BaseAntdConfig from '@/theme/antd'
import Logo from "@/assets/icons/ic-logo.svg";

function App() {
  console.log('app reload')
  return (
    <BaseAntdConfig>
      <AntdApp>
        <Helmet>
          <title>Slash Admin</title>
          <link rel="icon" href={Logo} />
        </Helmet>

        <BrowserRouter />
      </AntdApp>
    </BaseAntdConfig>
  )
}

export default App

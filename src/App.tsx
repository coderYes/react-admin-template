import React, { Suspense } from 'react'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import GetRoutes from './router'
function App() {
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        components: {
          Layout: {
            siderBg: '#ffffff'
          },
          Menu: {
            darkItemBg: '#242525',
            darkItemColor: 'rgba(229, 224, 216, 0.85);',
            darkItemSelectedBg: '#113545',
            darkItemSelectedColor: '#409fe7',
            darkSubMenuItemBg: '#242525'
          },
          Slider: {
            railBg: '#000000',
            railHoverBg: '#000000',
            handleColor: '#ffffff',
            handleActiveColor: '#ffffff',
            trackHoverBg: '#ffffff',
            dotSize: 4,
            trackBg: '#000000'
          },
          Tabs: {
            cardHeight: 150
          }
        }
      }}
    >
      <Suspense fallback={<div>loading...</div>}>
        <div style={{ height: '100vh', overflow: 'hidden' }}>
          <GetRoutes />
        </div>
      </Suspense>
    </ConfigProvider>
  )
}

export default App

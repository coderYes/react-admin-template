import { Content } from 'antd/es/layout/layout'
import { type CSSProperties, forwardRef } from 'react'
import { Outlet } from 'react-router-dom'
import { useResponsive, useThemeToken } from '@/theme/hooks'
import { HEADER_HEIGHT, MULTI_TABS_HEIGHT, NAV_COLLAPSED_WIDTH, NAV_WIDTH } from './config'
import { ThemeLayout } from '@/types/enum'
import rootStore from '@/store'
import MultiTabs from './multiTabs'

type Props = {
  offsetTop?: boolean
}
const Main = forwardRef<HTMLDivElement, Props>(({ offsetTop = false }, ref) => {
  const { themeStore } = rootStore
  const {
    themeSetting: { themeStretch, themeLayout, multiTab }
  } = themeStore
  const { colorBgElevated } = useThemeToken()
  const { screenMap } = useResponsive()

  const mainStyle: CSSProperties = {
    paddingTop: HEADER_HEIGHT + (multiTab ? MULTI_TABS_HEIGHT : 0),
    background: colorBgElevated,
    transition: 'padding 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    width: '100%'
  }
  if (screenMap.md) {
    mainStyle.width = `calc(100% - ${
      themeLayout === ThemeLayout.Vertical ? NAV_WIDTH : NAV_COLLAPSED_WIDTH
    })`
  } else {
    mainStyle.width = '100vw'
  }

  return (
    <Content ref={ref} style={mainStyle} className="flex overflow-auto">
      <div
        className={`m-auto h-full w-full flex-grow sm:p-2 ${themeStretch ? '' : 'xl:max-w-screen-xl'} flex-row`}
      >
        {multiTab ? (
          <>
            <MultiTabs offsetTop={offsetTop} />
            <Outlet />
          </>
        ) : (
          <Outlet />
        )}
      </div>
    </Content>
  )
})

export default Main

import { Content } from 'antd/es/layout/layout'
import { type CSSProperties, forwardRef } from 'react'
import { useOutlet } from 'react-router-dom'
import { useThemeToken } from '@/theme/hooks'
import { MULTI_TABS_HEIGHT } from './config'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { useFlattenedRoutes } from '@/router/hooks'
import { pageTransition } from '@/theme/antd/theme'
import rootStore from '@/store'
import MultiTabs from './multiTabs'
import './style.css'

type Props = {
  offsetTop?: boolean
}
const Main = forwardRef<HTMLDivElement, Props>(({ offsetTop = false }, ref) => {
  const { themeStore } = rootStore
  const {
    themeSetting: { themeStretch, multiTab, pageTransAnimation }
  } = themeStore
  const { colorBgElevated } = useThemeToken()

  const currentOutlet = useOutlet()
  const flattenedRoutes = useFlattenedRoutes()
  const { nodeRef } = flattenedRoutes.find((route) => route.path === location.pathname) ?? {}

  const mainStyle: CSSProperties = {
    paddingTop: multiTab ? MULTI_TABS_HEIGHT : 0,
    background: colorBgElevated,
    transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    width: '100%'
  }

  return (
    <Content style={mainStyle} className="flex">
      <div className="flex-grow overflow-auto size-full" ref={ref}>
        <div
          className={`m-auto size-full flex-grow p-2 ${themeStretch ? '' : 'xl:max-w-screen-xl'} flex-row`}
        >
          {multiTab ? (
            <>
              <MultiTabs offsetTop={offsetTop} />
              <SwitchTransition>
                <CSSTransition
                  key={location.pathname}
                  nodeRef={nodeRef}
                  timeout={300}
                  classNames={pageTransition[pageTransAnimation]}
                  unmountOnExit
                >
                  {() => <div ref={nodeRef}>{currentOutlet}</div>}
                </CSSTransition>
              </SwitchTransition>
            </>
          ) : (
            <SwitchTransition>
              <CSSTransition
                key={location.pathname}
                nodeRef={nodeRef}
                timeout={300}
                classNames={pageTransition[pageTransAnimation]}
                unmountOnExit
              >
                {() => <div ref={nodeRef}>{currentOutlet}</div>}
              </CSSTransition>
            </SwitchTransition>
          )}
        </div>
      </div>
    </Content>
  )
})

export default Main

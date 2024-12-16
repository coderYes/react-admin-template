import { Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { ThemeLayout, ThemeMode } from '@/types/enum'
import { useScroll } from 'motion/react'
import { CircleLoading } from '@/components/loading'
import { observer } from 'mobx-react-lite'
import { useThemeToken } from '@/theme/hooks'
import { useFullscreen, useToggle } from 'react-use'
import rootStore from '@/store'
import Header from './header'
import styled from 'styled-components'
import ProgressBar from '@/components/progress-bar'
import Nav from './nav'
import Main from './main'

const AdminLayout = () => {
  const { themeStore } = rootStore
  const {
    themeSetting: { themeLayout, themeMode }
  } = themeStore
  const { colorBgElevated, colorTextBase } = useThemeToken()

  const tabContentRef = useRef(null)
  const [fullScreen, toggleFullScreen] = useToggle(false)
  useFullscreen(tabContentRef, fullScreen, {
    onClose: () => toggleFullScreen(false)
  })

  const mainEl = useRef(null)
  const { scrollY } = useScroll({ container: mainEl })
  const [offsetTop, setOffsetTop] = useState(false)
  const onOffSetTop = useCallback(() => {
    scrollY.on('change', (scrollHeight) => {
      if (scrollHeight > 0) {
        setOffsetTop(true)
      } else {
        setOffsetTop(false)
      }
    })
  }, [scrollY])

  useEffect(() => {
    onOffSetTop()
  }, [onOffSetTop])

  return (
    <AdminLayoutWrapper $themeMode={themeMode}>
      <ProgressBar />
      <div
        ref={tabContentRef}
        className="flex h-screen overflow-hidden"
        style={{
          color: colorTextBase,
          background: colorBgElevated,
          transition:
            'color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
        }}
      >
        <Suspense fallback={<CircleLoading />}>
          <Header
            offsetTop={themeLayout === ThemeLayout.Vertical ? offsetTop : undefined}
            onToggleFullscreen={() => toggleFullScreen()}
          />
          <Nav />
          <Main ref={mainEl} offsetTop={offsetTop} />
        </Suspense>
      </div>
    </AdminLayoutWrapper>
  )
}

const AdminLayoutWrapper = styled.div<{ $themeMode?: ThemeMode }>`
  /* 设置滚动条的整体样式 */
  ::-webkit-scrollbar {
    width: 8px; /* 设置滚动条宽度 */
  }

  /* 设置滚动条轨道的样式 */
  ::-webkit-scrollbar-track {
    border-radius: 8px;
    background: ${(props) => (props.$themeMode === ThemeMode.Dark ? '#2c2c2c' : '#FAFAFA')};
  }

  /* 设置滚动条滑块的样式 */
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: ${(props) => (props.$themeMode === ThemeMode.Dark ? '#6b6b6b' : '#C1C1C1')};
  }

  /* 设置菜单滚动条样式 */
  .simplebar-scrollbar::before {
    background: ${(props) => (props.$themeMode === ThemeMode.Dark ? '#6b6b6b' : '#C1C1C1')};
  }

  /* 设置菜单滚动条透明度统一 */
  .simplebar-scrollbar.simplebar-visible:before {
    opacity: 1;
  }

  /* 设置鼠标悬停在滚动条上的样式 */
  ::-webkit-scrollbar-thumb:hover {
    background: ${(props) => (props.$themeMode === ThemeMode.Dark ? '#939393' : '##7D7D7D')};
  }
`

export default observer(AdminLayout)

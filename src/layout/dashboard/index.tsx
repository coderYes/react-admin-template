import { CSSProperties, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ThemeLayout, ThemeMode } from '@/types/enum'
import { useScroll } from 'motion/react'
import { CircleLoading } from '@/components/loading'
import { observer } from 'mobx-react-lite'
import { useResponsive } from '@/theme/hooks'
import { useFullscreen, useToggle } from 'react-use'
import { Layout } from 'antd'
import { NAV_COLLAPSED_WIDTH, NAV_WIDTH } from './config'
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
  const { screenMap } = useResponsive()

  const tabContentRef = useRef(null)
  const [fullScreen, toggleFullScreen] = useToggle(false)
  useFullscreen(tabContentRef, fullScreen, {
    onClose: () => toggleFullScreen(false)
  })

  const layoutClassName = useMemo(() => {
    return 'flex h-screen overflow-hidden flex-row'
  }, [themeLayout])

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

  const secondLayoutStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    paddingLeft: screenMap.md
      ? themeLayout === ThemeLayout.Mini
        ? NAV_COLLAPSED_WIDTH
        : NAV_WIDTH
      : 0
  }

  return (
    <AdminLayoutWrapper $themeMode={themeMode}>
      <ProgressBar />
      <div ref={tabContentRef}>
        <Layout className={layoutClassName}>
          <Suspense fallback={<CircleLoading />}>
            <Layout style={secondLayoutStyle}>
              <Header
                offsetTop={themeLayout === ThemeLayout.Vertical ? offsetTop : undefined}
                onToggleFullscreen={() => toggleFullScreen()}
              />
              <Nav />
              <Main ref={mainEl} offsetTop={offsetTop} />
            </Layout>
          </Suspense>
        </Layout>
      </div>
    </AdminLayoutWrapper>
  )
}
const scrollbarStyles = {
  dark: {
    track: '#2c2c2c',
    thumb: '#6b6b6b',
    thumbHover: '#939393'
  },
  light: {
    track: '#FAFAFA',
    thumb: '#C1C1C1',
    thumbHover: '#7D7D7D'
  }
}
const AdminLayoutWrapper = styled.div<{ $themeMode?: ThemeMode }>`
  ::-webkit-scrollbar {
    width: 8px;
    top: 32px;
  }

  ::-webkit-scrollbar-track {
    border-radius: 8px;
    background: ${({ $themeMode }) =>
      $themeMode === ThemeMode.Dark ? scrollbarStyles.dark.track : scrollbarStyles.light.track};
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: ${({ $themeMode }) =>
      $themeMode === ThemeMode.Dark ? scrollbarStyles.dark.thumb : scrollbarStyles.light.thumb};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ $themeMode }) =>
      $themeMode === ThemeMode.Dark
        ? scrollbarStyles.dark.thumbHover
        : scrollbarStyles.light.thumbHover};
  }

  .simplebar-scrollbar::before {
    background: ${({ $themeMode }) =>
      $themeMode === ThemeMode.Dark ? scrollbarStyles.dark.thumb : scrollbarStyles.light.thumb};
  }

  .simplebar-scrollbar.simplebar-visible:before {
    opacity: 1;
  }
`

export default observer(AdminLayout)

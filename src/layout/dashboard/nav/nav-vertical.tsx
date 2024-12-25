import { Layout, Menu, type MenuProps } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { useMatches, useNavigate } from 'react-router-dom'
import { usePathname } from '@/router/hooks'
import { useThemeToken } from '@/theme/hooks'
import { HEADER_HEIGHT, NAV_WIDTH } from '../config'
import { ThemeLayout, ThemeMode } from '@/types/enum'
import { observer } from 'mobx-react-lite'
import { useRouteToMenuFn } from '@/router/hooks'
import Color from 'color'
import rootStore from '@/store'
import NavLogo from './nva-logo'
import Scrollbar from '@/components/scrollbar'
const { Sider } = Layout

type Props = {
  closeSideBarDrawer?: () => void
}

const NavVertical = (props: Props) => {
  const navigate = useNavigate()
  const matches = useMatches()
  const pathname = usePathname()
  const { colorBorder } = useThemeToken()
  const routeToMenuFn = useRouteToMenuFn()

  const { themeStore, userStore } = rootStore
  const items = useMemo(() => {
    const menuList = routeToMenuFn(userStore.menuList)
    return menuList
  }, [routeToMenuFn, userStore.menuList])
  const {
    themeSetting: { themeLayout, themeMode, darkSidebar }
  } = themeStore
  const collapsed = useMemo(() => themeLayout === ThemeLayout.Mini, [themeLayout])
  const selectedKeys = useMemo(() => [pathname], [pathname])

  const [openKeys, setOpenKeys] = useState<string[]>([])
  // 首次加载时设置 openKeys
  useEffect(() => {
    if (!collapsed) {
      const keys = matches
        .filter((match) => match.pathname !== '/admin' && match.pathname !== pathname)
        .map((match) => match.pathname)
      setOpenKeys(keys)
    }
  }, [collapsed, matches, pathname])

  const handleToggleCollapsed = () => {
    themeStore.setSettings({
      themeLayout: collapsed ? ThemeLayout.Vertical : ThemeLayout.Mini
    })
  }

  const onClick: MenuProps['onClick'] = ({ key }) => {
    navigate(key)
    props?.closeSideBarDrawer?.()
  }

  const handleOpenChange: MenuProps['onOpenChange'] = (keys) => {
    setOpenKeys(keys)
  }

  const sidebarTheme = useMemo(() => {
    if (themeMode === ThemeMode.Dark) {
      return darkSidebar ? 'light' : 'dark'
    }
    return darkSidebar ? 'dark' : 'light'
  }, [themeMode, darkSidebar])

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={NAV_WIDTH}
      theme={sidebarTheme}
      className="!fixed left-0 top-0 h-screen z-30"
      style={{
        borderRight: `1px dashed ${Color(colorBorder).alpha(0.6).toString()}`
      }}
    >
      <NavLogo collapsed={collapsed} onToggle={handleToggleCollapsed} />
      <Scrollbar>
        <Menu
          style={{ paddingBottom: `${HEADER_HEIGHT}px` }}
          mode="inline"
          items={items}
          theme={sidebarTheme}
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          onOpenChange={handleOpenChange}
          className="!border-none"
          onClick={onClick}
        />
      </Scrollbar>
    </Sider>
  )
}
export default observer(NavVertical)

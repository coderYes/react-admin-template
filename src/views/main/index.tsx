import React, { useState, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import type { MenuProps } from 'antd'
import { MainWrapper } from './style'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'

import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { Layout, Button, Menu } from 'antd'
const { Header, Sider, Content } = Layout

import { requireAssetsImg } from '@/utils/common'
import { addRouteToMenu, addIconToMenu, flattenTreeByMenu, findNodeIdsByPath } from '@/utils/menu'

import rootStore from '@/store'
import { observer } from 'mobx-react-lite'
const { commonStore } = rootStore
import getRouter from '@/mock/getRouter'

export type MenuItem = Required<MenuProps>['items'][number]

interface IProps {
  children?: ReactNode
}
interface LevelKeysProps {
  key?: string
  children?: LevelKeysProps[]
}

const Home: FC<IProps> = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [menus, setMenus] = useState<MenuItem[]>([])
  const [defaultSelectedKeys, setDefaultSelectedKeys] = useState<string[]>(['100'])
  const [stateOpenKeys, setStateOpenKeys] = useState<string[]>(['100'])
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const getLevelKeys = (items1: LevelKeysProps[]) => {
    const key: Record<string, number> = {}
    const func = (items2: LevelKeysProps[], level = 1) => {
      items2.forEach((item) => {
        if (item.key) {
          key[item.key] = level
        }
        if (item.children) {
          return func(item.children, level + 1)
        }
      })
    }
    func(items1)
    return key
  }
  const levelKeys = getLevelKeys(menus as LevelKeysProps[])

  useEffect(() => {
    getRouter().then((menu: any) => {
      if (menu.code !== 200) return
      commonStore.setMune(flattenTreeByMenu(menu.data))
      commonStore.setRoutes(addRouteToMenu(menu.data))
      setMenus(addIconToMenu([...menu.data]))
      const current = commonStore.menu.findIndex((item) => item.path === pathname)
      console.log(current)

      if (current !== -1) {
        const path = commonStore.menu[current].path
        const keys = findNodeIdsByPath(menu.data, path)
        setDefaultSelectedKeys(keys)
        setStateOpenKeys(keys)
        navigate(path)
      }
    })
  }, [])

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  const onOpenChange: MenuProps['onOpenChange'] = (openKeys) => {
    const currentOpenKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1)
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey])

      setStateOpenKeys(
        openKeys
          .filter((_, index) => index !== repeatIndex)
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey])
      )
    } else {
      // close
      setStateOpenKeys(openKeys)
    }
  }
  const handleMenuOnClick: MenuProps['onClick'] = (e) => {
    setDefaultSelectedKeys(e.keyPath)
    const current = commonStore.menu.findIndex((item) => item.key === e.key)
    if (current === -1) return
    const path = commonStore.menu[current].path
    navigate(path)
  }

  return (
    <MainWrapper>
      <Layout className="h-full">
        <Sider trigger={null} collapsible width={256} collapsed={collapsed}>
          <div className="sidebar-logo-container">
            <img className="w-[32px] h-[32px]" src={requireAssetsImg('image/react.svg')} alt="" />
            {collapsed ? <></> : <div className="ml-3">admin模板</div>}
          </div>
          {menus.length && (
            <Menu
              style={{ height: '100%' }}
              defaultSelectedKeys={defaultSelectedKeys}
              openKeys={stateOpenKeys}
              mode="inline"
              // theme={state.isDark ? 'dark' : 'light'}
              onClick={handleMenuOnClick}
              onOpenChange={onOpenChange}
              items={menus}
            />
          )}
        </Sider>
        <Layout>
          <Header>
            <div className="navbar">
              <div className="hamburger-container">
                <Button type="primary" size="small" onClick={toggleCollapsed}>
                  {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </Button>
              </div>
              <div className="right-menu">
                <div className="right-menu-item">right</div>
              </div>
            </div>
          </Header>
          <Content>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </MainWrapper>
  )
}

export default observer(Home)

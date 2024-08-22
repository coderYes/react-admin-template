import React, { useState, useEffect, useRef } from 'react'
import type { FC, ReactNode } from 'react'
import type { MenuProps } from 'antd'
import type { IMenuType } from '@/utils/menu'
import { MainWrapper } from './style'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'

import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { Layout, Button, Menu, Tabs } from 'antd'
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
interface ITabsType {
  key: string
  label: string
  children: string
}

const Home: FC<IProps> = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [menus, setMenus] = useState<MenuItem[]>([])
  const [menusData, setMenusData] = useState<IMenuType[]>([])
  const [tabs, setTabs] = useState<ITabsType[]>([])
  const [activeKey, setActiveKey] = useState('')
  const [defaultSelectedKeys, setDefaultSelectedKeys] = useState<string[]>([''])
  const [stateOpenKeys, setStateOpenKeys] = useState<string[]>([''])
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
    // 获取对应路由
    getRouter().then((menu: any) => {
      if (menu.code !== 200) return
      commonStore.setMune(flattenTreeByMenu(menu.data))
      commonStore.setRoutes(addRouteToMenu(menu.data))
      setMenusData(menu.data)
      setMenus(addIconToMenu([...menu.data]))
      // 初始选中的菜单项和激活 tab 面板
      const current = commonStore.menu.findIndex((item) => item.path === pathname)
      if (current !== -1) {
        const { key, name, path } = commonStore.menu[current]
        const keys = findNodeIdsByPath(menu.data, path)
        setDefaultSelectedKeys(keys)
        setStateOpenKeys(keys)
        const tab = { key, label: name, children: '' }
        setTabs((prevTabs) => [...prevTabs, tab])
        setActiveKey(key)
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
      setStateOpenKeys(openKeys)
    }
  }
  const handleMenuOnClick: MenuProps['onClick'] = (e) => {
    setDefaultSelectedKeys(e.keyPath)
    const current = commonStore.menu.findIndex((item) => item.key === e.key)
    if (current === -1) return
    const { key, name, path } = commonStore.menu[current]
    const tabIndex = tabs.findIndex((item) => item.key === key)
    if (tabIndex === -1) {
      const tab = { key, label: name, children: '' }
      setTabs((prevTabs) => [...prevTabs, tab])
      setActiveKey(key)
    } else {
      setActiveKey(key)
    }
    const keys = findNodeIdsByPath(menusData, path)
    setDefaultSelectedKeys(keys)
    setStateOpenKeys(keys)
    navigate(path)
  }

  const onTabChange = (keys: string) => {
    const current = commonStore.menu.findIndex((item) => item.key === keys)
    if (current === -1) return
    const { key, path } = commonStore.menu[current]
    setActiveKey(key)
    navigate(path)
  }
  const onTabEdit = (
    targetKey: React.MouseEvent | React.KeyboardEvent | string,
    action: 'add' | 'remove'
  ) => {
    if (action === 'remove' && tabs.length > 1) {
      const index = tabs.findIndex((item) => item.key === targetKey)
      const activeIndex = index === 0 ? index + 1 : index - 1
      if (targetKey === activeKey) {
        const tab = tabs[activeIndex]
        onTabChange(tab.key)
        setTabs((prevTabs) => prevTabs.filter((item) => item.key !== targetKey))
      } else {
        setTabs((prevTabs) => prevTabs.filter((item) => item.key !== targetKey))
      }
    }
  }

  return (
    <MainWrapper>
      <Layout className="h-full">
        <Sider trigger={null} collapsible width={256} collapsed={collapsed}>
          <div className="sidebar-logo-container">
            <img className="w-[32px] h-[32px]" src={requireAssetsImg('image/react.svg')} alt="" />
            {collapsed ? <></> : <div className="ml-3">admin模板</div>}
          </div>
          <Menu
            defaultSelectedKeys={defaultSelectedKeys}
            openKeys={stateOpenKeys}
            mode="inline"
            onClick={handleMenuOnClick}
            onOpenChange={onOpenChange}
            items={menus}
          />
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
            <div className="tabs">
              <Tabs
                activeKey={activeKey}
                hideAdd
                type="editable-card"
                items={tabs}
                onChange={onTabChange}
                onEdit={onTabEdit}
              />
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

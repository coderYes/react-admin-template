import React, { useState, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import type { MenuProps } from 'antd'
import { MainWrapper } from './style'
import { Outlet } from 'react-router-dom'

import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { Layout, Button, Menu } from 'antd'
const { Header, Sider, Content } = Layout

import { requireAssetsImg } from '@/utils/common'
import { addRouteToMenu, addIconToMenu } from '@/utils/menu'

import rootStore from '@/store'
import { observer } from 'mobx-react-lite'
const { commonStore } = rootStore
import getRouter from '@/mock/getRouter'

export type MenuItem = Required<MenuProps>['items'][number]

interface IProps {
  children?: ReactNode
}

const Home: FC<IProps> = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [menus, setMenus] = useState<MenuItem[]>([])

  useEffect(() => {
    const menu = getRouter()
    if (menu.code !== 200) return
    commonStore.setMune(menu.data)
    commonStore.setRoutes(addRouteToMenu(menu.data))
    setMenus(addIconToMenu([...menu.data]))
  }, [])

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
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
              // defaultSelectedKeys={selectKey}
              // defaultOpenKeys={selectKey}
              mode="inline"
              // theme={state.isDark ? 'dark' : 'light'}
              // onClick={handleMenuOnClick}
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

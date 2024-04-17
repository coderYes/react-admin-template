import React, { useState } from 'react'
import type { FC, ReactNode } from 'react'
import { MainWrapper } from './style'
import { Outlet } from 'react-router-dom'
import rootStore from '@/store'
import { observer } from 'mobx-react-lite'
const { commonStore } = rootStore

import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { Layout, Button } from 'antd'
const { Header, Sider, Content } = Layout
import { requireAssetsImg } from '@/utils/common'

interface IProps {
  children?: ReactNode
}

const Home: FC<IProps> = () => {
  const [collapsed, setCollapsed] = useState(false)
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
        </Sider>
        <Layout>
          <Header>
            <div className="navbar">
              <div className="hamburger-container">
                <Button type="primary" onClick={toggleCollapsed}>
                  {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </Button>
              </div>
              <div className="right-menu">
                <div className="right-menu-item">right</div>
              </div>
            </div>
          </Header>
          <Content>Content</Content>
        </Layout>
      </Layout>
    </MainWrapper>
  )
}

export default observer(Home)

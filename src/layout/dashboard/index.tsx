import { observer } from 'mobx-react-lite'
import rootStore from '@/store'
import { ProLayout } from '@ant-design/pro-components'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { useRouteToMenuFn } from '@/router/hooks'
import { useLocation, useNavigate, useOutlet } from 'react-router-dom'
import { Dropdown, type MenuProps } from 'antd'
import { useTranslation } from 'react-i18next'
import LocalePicker from './components/locale-picker'
import { IconButton, Iconify } from '@/components/icon'
import SettingButton from './components/setting-button'
import {
  colorPrimarys,
  colorPrimarysBg,
  darkCustomizedTheme,
  pageTransition
} from '@/theme/antd/theme'
import { ThemeLayout, ThemeMode } from '@/types/enum'
import { HeaderActionItem, ProLayoutWrapper } from './style'
import Logo from '@/components/logo'
import { useMemo, useRef } from 'react'
import { useResponsive, useThemeToken } from '@/theme/hooks'
import BreadCrumb from './components/bread-crumb'
import CustomTabs from './components/tabs'
import Color from 'color'
import ProgressBar from '@/components/progress-bar'

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env

export interface CustomizeProps {
  themeMode: ThemeMode
  themeLayout: ThemeLayout
  darkSidebar?: boolean
  darkHeader?: boolean
}

const AdminLayout = () => {
  const nodeRef = useRef(null)

  const { t } = useTranslation()
  const { screenMap } = useResponsive()
  const themeToken = useThemeToken()
  const currentOutlet = useOutlet()
  const { pathname, key } = useLocation()

  const navigate = useNavigate()
  const routeToMenuFn = useRouteToMenuFn()

  const { userStore, themeStore } = rootStore
  const { menuList, avatar, name } = userStore
  const {
    themeSetting: {
      themeMode,
      themeColorPresets,
      themeLayout,
      darkSidebar,
      darkHeader,
      pageTransAnimation
    }
  } = themeStore

  const layoutToken = useMemo(() => {
    const isDarkMode = themeMode === ThemeMode.Dark
    const colorBgLayout = darkCustomizedTheme.colorBgLayout
    const darkBgContainer = darkCustomizedTheme.colorBgContainer
    const colorPrimary = colorPrimarys[themeColorPresets]
    const colorPrimaryBg = colorPrimarysBg[themeColorPresets]

    return {
      bgLayout: isDarkMode ? colorBgLayout : '#ffffff',
      sider: {
        colorMenuBackground: isDarkMode || darkSidebar ? darkBgContainer : '#ffffff', // menu 的背景颜色
        colorTextMenu:
          isDarkMode || darkSidebar ? 'rgba(242, 242, 242, 0.8)' : 'rgba(12, 3, 3, 0.65)', // menuItem 的字体颜色
        colorTextMenuSelected: isDarkMode || darkSidebar ? '#ffffff' : colorPrimary, // menuItem 的选中字体颜色
        colorTextMenuItemHover: isDarkMode || darkSidebar ? '#ffffff' : 'rgba(12, 3, 3, 0.65)', // menuItem 的 hover 字体颜色
        colorBgMenuItemHover: isDarkMode || darkSidebar ? '#2E3033' : 'rgb(244, 244, 245)', // menuItem 的 hover 背景颜色
        colorBgMenuItemSelected: isDarkMode || darkSidebar ? '#2E3033' : colorPrimaryBg, // menuItem 的选中背景颜色
        colorBgMenuItemActive: isDarkMode || darkSidebar ? '#2E3033' : 'rgb(244, 244, 245)' // menuItem 的点击时背景颜色
      },
      header: {
        colorBgHeader: isDarkMode || darkHeader ? darkBgContainer : '#ffffff', // header 的背景颜色
        colorTextMenu:
          isDarkMode || darkHeader ? 'rgba(242, 242, 242, 0.8)' : 'rgba(12, 3, 3, 0.65)', // menuItem 的字体颜色
        colorTextMenuSelected: isDarkMode || darkHeader ? '#ffffff' : colorPrimary, // menuItem 的选中字体颜色
        colorTextMenuActive: isDarkMode || darkHeader ? '#ffffff' : 'rgba(12, 3, 3, 0.65)', // menuItem hover 的选中字体颜色
        colorBgMenuItemSelected: isDarkMode || darkHeader ? '#2E3033' : colorPrimaryBg // menuItem 的选中背景颜色
      }
    }
  }, [themeMode, themeColorPresets, darkSidebar, darkHeader])

  const TitleText = ({ themeMode, themeLayout, darkSidebar, darkHeader }: CustomizeProps) => {
    const isDarkMode = themeMode === ThemeMode.Dark
    const colorText =
      isDarkMode || (darkSidebar && themeLayout === ThemeLayout.Side) || darkHeader
        ? 'rgba(242, 242, 242, 0.8)'
        : 'rgb(50, 54, 57)'

    return <span style={{ color: colorText }}>react admin</span>
  }

  const onLogout = () => {
    userStore.logout().then(() => {
      navigate('/login')
    })
  }

  const items: MenuProps['items'] = [
    {
      label: name,
      key: '0'
    },
    { type: 'divider' },
    {
      label: (
        <button className="font-bold text-warning" type="button">
          {t('sys.login.logout')}
        </button>
      ),
      key: '1',
      onClick: onLogout
    }
  ]

  return (
    <ProLayoutWrapper $themeLayout={themeLayout} $screenMap={screenMap} $themeMode={themeMode}>
      <ProgressBar />
      <ProLayout
        // ProLayout props:https://procomponents.ant.design/components/layout
        // layout 的菜单模式 side | top | mix
        layout={themeLayout}
        // siderMenuType="group"
        token={layoutToken}
        // 菜单配置,生成菜单和面包屑
        route={routeToMenuFn(menuList)}
        // 禁止自动切换到移动页面
        disableMobile={true}
        // 根据 location.pathname 自动选中菜单
        location={{
          pathname
        }}
        // 外链配置
        appList={[]}
        // @ts-ignore const titleDom = <h1>{title ?? 'Ant Design Pro'}</h1>，title暂时只支持 string | false
        title={
          <TitleText
            themeMode={themeMode}
            themeLayout={themeLayout}
            darkSidebar={darkSidebar}
            darkHeader={darkHeader}
          />
        }
        logo={<Logo />}
        // 头像配置，不同的 layout 放在不同的位置
        avatarProps={{
          src: avatar,
          size: 'default',
          render: (_, defaultDom) => {
            return <Dropdown menu={{ items }}>{defaultDom}</Dropdown>
          }
        }}
        // 自定义操作列表
        actionsRender={() => {
          const isDarkMode = themeMode === ThemeMode.Dark
          const colorText =
            isDarkMode || (darkSidebar && themeLayout === ThemeLayout.Side) || darkHeader
              ? 'rgba(255, 255, 255, 0.45)'
              : 'rgba(0, 0, 0, 0.45)'
          return [
            <HeaderActionItem $color={colorText}>
              <LocalePicker />
            </HeaderActionItem>,
            <HeaderActionItem $color={colorText}>
              <IconButton
                onClick={() => window.open('https://github.com/coderYes/react-admin-template')}
              >
                <Iconify icon="mdi:github" size={24} />
              </IconButton>
            </HeaderActionItem>,
            <HeaderActionItem $color={colorText}>
              <SettingButton />
            </HeaderActionItem>
          ]
        }}
        // antd menu 组件的 props https://ant.design/components/menu-cn
        menuProps={{
          onClick: ({ key }) => {
            navigate(key || '/')
          }
        }}
        onMenuHeaderClick={(e) => navigate(HOMEPAGE)}
        // 是否固定导航
        // fixSiderbar={true}
        contentStyle={{
          padding: `${themeLayout === ThemeLayout.Side ? '116px' : '60px'} 16px 20px`
        }}
        headerContentRender={
          themeLayout === ThemeLayout.Top
            ? false
            : (props) => {
                return (
                  <BreadCrumb
                    themeMode={themeMode}
                    themeLayout={themeLayout}
                    darkSidebar={darkSidebar}
                    darkHeader={darkHeader}
                  />
                )
              }
        }
      >
        <div>
          <div
            className="absolute top-0 left-0 w-full flex flex-col"
            style={{
              backgroundColor: Color(themeToken.colorBgElevated).alpha(1).toString()
            }}
          >
            {themeLayout === ThemeLayout.Side && (
              <div className="h-[56px] flex items-center px-6">
                <BreadCrumb
                  themeMode={themeMode}
                  themeLayout={themeLayout}
                  darkSidebar={darkSidebar}
                  darkHeader={darkHeader}
                />
              </div>
            )}
            <CustomTabs />
          </div>
          <div
            className="overflow-y-auto p-4"
            style={{
              marginTop: themeLayout === ThemeLayout.Side ? '96px' : '40px',
              height: `calc(100vh - 56px - 40px)`
            }}
          >
            <SwitchTransition>
              <CSSTransition
                key={key}
                nodeRef={nodeRef}
                timeout={500}
                classNames={pageTransition[pageTransAnimation]}
                unmountOnExit
              >
                <div ref={nodeRef} className="h-full">
                  {currentOutlet}
                </div>
              </CSSTransition>
            </SwitchTransition>
          </div>
        </div>
      </ProLayout>
    </ProLayoutWrapper>
  )
}

export default observer(AdminLayout)

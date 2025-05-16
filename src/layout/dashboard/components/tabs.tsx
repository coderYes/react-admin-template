import { CSSProperties, useCallback, useEffect, useMemo, useState } from 'react'
import { Dropdown, Tabs, type MenuProps } from 'antd'
import { useFlattenedRoutes, useRouter } from '@/router/hooks'
import { useThemeToken } from '@/theme/hooks'
import { MultiTabOperation } from '@/types/enum'
import { Iconify } from '@/components/icon'
import { useTranslation } from 'react-i18next'
import Color from 'color'
import ScrollTabs from './scroll-tabs'
import { TabWrapper } from '../style'
import { matchPath, useMatches } from 'react-router-dom'

const { VITE_ROUTER_PREFIX: PREFIX, VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env

export type TabItemType = {
  key: string
  label: string
  children?: any
  timeStamp?: string
}
export default function MultiTabs() {
  const { t } = useTranslation()
  const { push } = useRouter()
  const flattenedRoutes = useFlattenedRoutes()
  const matches = useMatches()
  const themeToken = useThemeToken()
  const [tabs, setTabs] = useState<TabItemType[]>([])
  const [hoveringTabKey, setHoveringTabKey] = useState('')
  const [openDropdownTabKey, setopenDropdownTabKey] = useState('')

  useEffect(() => {
    const lastRoute = matches.at(-1)
    if (!lastRoute) return
    const isExisted = tabs.find((item) => item.key === lastRoute.pathname)
    if (isExisted) return
    if (lastRoute.pathname === HOMEPAGE) {
      setTabs((prev) => [...prev, { key: HOMEPAGE, label: 'Home' }])
    } else {
      const matchedRouteMeta = flattenedRoutes.find((item) => {
        return matchPath(PREFIX + item.path, lastRoute.pathname)
      })
      if (matchedRouteMeta) {
        setTabs((prev) => [...prev, { key: lastRoute.pathname, label: matchedRouteMeta.name }])
      }
    }
  }, [matches])

  const activeTabRoutePath = useMemo(() => {
    return matches.at(-1)?.pathname || ''
  }, [matches])

  const calcTabStyle: (tab: TabItemType) => CSSProperties = useCallback(
    (tab) => {
      const isActive = tab.key === activeTabRoutePath || tab.key === hoveringTabKey
      const result: CSSProperties = {
        borderRadius: '8px 8px 0 0',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: themeToken.colorBorderSecondary,
        backgroundColor: themeToken.colorBgLayout,
        transition:
          'color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
      }

      if (isActive) {
        result.backgroundColor = themeToken.colorBgContainer
        result.color = themeToken.colorPrimaryText
      }
      return result
    },
    [activeTabRoutePath, hoveringTabKey, themeToken]
  )

  const handleTabClick = (tab: TabItemType) => {
    push(tab.key)
  }
  const closeTab = (path: string = activeTabRoutePath) => {
    const tempTabs = [...tabs]
    if (tempTabs.length === 1) return
    const deleteTabIndex = tempTabs.findIndex((item) => item.key === path)
    if (deleteTabIndex === -1) return

    if (deleteTabIndex > 0) {
      push(tempTabs[deleteTabIndex - 1].key)
    } else {
      push(tempTabs[deleteTabIndex + 1].key)
    }

    tempTabs.splice(deleteTabIndex, 1)
    setTabs(tempTabs)
  }

  /**
   * tab dropdown下拉选
   */
  const menuItems = useMemo<MenuProps['items']>(
    () => [
      {
        label: t(`sys.tab.${MultiTabOperation.CLOSE}`),
        key: MultiTabOperation.CLOSE,
        icon: <Iconify icon="material-symbols:close" size={18} />,
        disabled: tabs.length === 1
      },
      {
        type: 'divider'
      },
      {
        label: t(`sys.tab.${MultiTabOperation.CLOSELEFT}`),
        key: MultiTabOperation.CLOSELEFT,
        icon: (
          <Iconify
            icon="material-symbols:tab-close-right-outline"
            size={18}
            className="rotate-180"
          />
        ),
        disabled: tabs.findIndex((tab) => tab.key === openDropdownTabKey) === 0
      },
      {
        label: t(`sys.tab.${MultiTabOperation.CLOSERIGHT}`),
        key: MultiTabOperation.CLOSERIGHT,
        icon: <Iconify icon="material-symbols:tab-close-right-outline" size={18} />,
        disabled: tabs.findIndex((tab) => tab.key === openDropdownTabKey) === tabs.length - 1
      },
      {
        type: 'divider'
      },
      {
        label: t(`sys.tab.${MultiTabOperation.CLOSEOTHERS}`),
        key: MultiTabOperation.CLOSEOTHERS,
        icon: <Iconify icon="material-symbols:tab-close-outline" size={18} />,
        disabled: tabs.length === 1
      },
      {
        label: t(`sys.tab.${MultiTabOperation.CLOSEALL}`),
        key: MultiTabOperation.CLOSEALL,
        icon: <Iconify icon="mdi:collapse-all-outline" size={18} />
      }
    ],
    [openDropdownTabKey, t, tabs]
  )
  /**
   * 当前显示dorpdown的tab
   */
  const onOpenChange = (open: boolean, tab: TabItemType) => {
    if (open) {
      setopenDropdownTabKey(tab.key)
    } else {
      setopenDropdownTabKey('')
    }
  }

  /**
   * Close other tabs besides the specified tab
   */
  const closeOthersTab = useCallback(
    (path = activeTabRoutePath) => {
      setTabs((prev) => prev.filter((item) => item.key === path))
      if (path !== activeTabRoutePath) {
        push(path)
      }
    },
    [activeTabRoutePath, push]
  )

  /**
   * Close all tabs in the left of specified tab
   */
  const closeLeft = useCallback(
    (path: string) => {
      const currentTabIndex = tabs.findIndex((item) => item.key === path)
      const newTabs = tabs.slice(currentTabIndex)
      setTabs(newTabs)
      push(path)
    },
    [push, tabs]
  )

  /**
   * Close all tabs in the right of specified tab
   */
  const closeRight = useCallback(
    (path: string) => {
      const currentTabIndex = tabs.findIndex((item) => item.key === path)
      const newTabs = tabs.slice(0, currentTabIndex + 1)
      setTabs(newTabs)
      push(path)
    },
    [push, tabs]
  )

  /**
   * Close all tabs then navigate to the home page
   */
  const closeAll = useCallback(() => {
    setTabs([])
    push(HOMEPAGE)
  }, [push])

  /**
   * tab dropdown click
   */
  const menuClick = useCallback(
    (menuInfo: any, tab: TabItemType) => {
      const { key, domEvent } = menuInfo
      domEvent.stopPropagation()
      switch (key) {
        case MultiTabOperation.CLOSE:
          closeTab(tab.key)
          break
        case MultiTabOperation.CLOSEOTHERS:
          closeOthersTab(tab.key)
          break
        case MultiTabOperation.CLOSELEFT:
          closeLeft(tab.key)
          break
        case MultiTabOperation.CLOSERIGHT:
          closeRight(tab.key)
          break
        case MultiTabOperation.CLOSEALL:
          closeAll()
          break
        default:
          break
      }
    },
    [closeTab, closeOthersTab, closeLeft, closeRight, closeAll]
  )

  const renderTabLabel = useCallback(
    (tab: TabItemType) => {
      return (
        <Dropdown
          trigger={['contextMenu']}
          menu={{
            items: menuItems,
            onClick: (menuInfo) => menuClick(menuInfo, tab)
          }}
          onOpenChange={(open) => onOpenChange(open, tab)}
        >
          <div
            className="cursor-pointer relative mx-px flex select-none items-center px-4 py-1"
            style={calcTabStyle(tab)}
            onMouseEnter={() => {
              if (tab.key === activeTabRoutePath) return
              setHoveringTabKey(tab.key)
            }}
            onMouseLeave={() => setHoveringTabKey('')}
          >
            <div>{t(tab.label)}</div>
            <Iconify
              icon="ion:close-outline"
              size={18}
              className="cursor-pointer opacity-50"
              onClick={(e) => {
                e.stopPropagation()
                closeTab(tab.key)
              }}
              style={{
                visibility:
                  (tab.key !== activeTabRoutePath && tab.key !== hoveringTabKey) ||
                  tabs.length === 1
                    ? 'hidden'
                    : 'visible'
              }}
            />
          </div>
        </Dropdown>
      )
    },
    [t, activeTabRoutePath, hoveringTabKey, tabs.length, menuClick, closeTab, calcTabStyle]
  )

  const tabItems = useMemo(() => {
    return tabs?.map((tab) => ({
      label: renderTabLabel(tab),
      key: tab.key,
      closable: tabs.length > 1 // 保留一个
    }))
  }, [tabs, renderTabLabel])

  const renderTabBar = () => {
    return (
      <div
        style={{
          paddingTop: '7px',
          backgroundColor: Color(themeToken.colorBgElevated).alpha(1).toString(),
          borderBottom: `1px dashed ${Color(themeToken.colorBorder).alpha(0.6).toString()}`
        }}
        className="z-20 w-full"
      >
        <div className="flex w-full">
          <ScrollTabs tabs={tabs} activeTabRoutePath={activeTabRoutePath}>
            {tabs.map((tab, index) => (
              <div
                id={`tab-${index}`}
                className="flex-shrink-0"
                key={tab.key}
                onClick={() => handleTabClick(tab)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleTabClick(tab)
                  }
                }}
              >
                <div className="w-auto">{renderTabLabel(tab)}</div>
              </div>
            ))}
          </ScrollTabs>
        </div>
      </div>
    )
  }

  return (
    <TabWrapper>
      <Tabs
        size="small"
        type="card"
        tabBarGutter={4}
        activeKey={activeTabRoutePath}
        items={tabItems}
        renderTabBar={renderTabBar}
      />
    </TabWrapper>
  )
}

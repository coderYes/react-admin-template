import { CSSProperties, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Dropdown, Tabs, type MenuProps } from 'antd'
import { useCurrentRouteMeta, useRouter } from '@/router/hooks'
import { useResponsive, useThemeToken } from '@/theme/hooks'
import { ThemeLayout, MultiTabOperation } from '@/types/enum'
import {
  HEADER_HEIGHT,
  MULTI_TABS_HEIGHT,
  NAV_COLLAPSED_WIDTH,
  NAV_WIDTH,
  OFFSET_HEADER_HEIGHT
} from './config'
import { Iconify } from '@/components/icon'
import { replaceDynamicPath } from '@/router/hooks/use-route-to-menu'
import { useTranslation } from 'react-i18next'
import { getTimeStamp } from '@/utils/time'
import Color from 'color'
import styled from 'styled-components'
import rootStore from '@/store'
import ScrollTabs from './common/scroll-tabs'
const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env

type Props = {
  offsetTop?: boolean
}
export type TabItemType = {
  key: string
  label: string
  children: any
  timeStamp?: string
}
export default function MultiTabs({ offsetTop = false }: Props) {
  const { t } = useTranslation()
  const { push } = useRouter()

  const { themeStore } = rootStore
  const {
    themeSetting: { themeLayout }
  } = themeStore

  const [tabs, setTabs] = useState<TabItemType[]>([])
  const [hoveringTabKey, setHoveringTabKey] = useState('')
  const [openDropdownTabKey, setopenDropdownTabKey] = useState('')

  const themeToken = useThemeToken()
  const { screenMap } = useResponsive()
  const multiTabsStyle: CSSProperties = {
    position: 'fixed',
    top: offsetTop ? OFFSET_HEADER_HEIGHT : HEADER_HEIGHT,
    left: 0,
    height: MULTI_TABS_HEIGHT,
    backgroundColor: Color(themeToken.colorBgElevated).alpha(1).toString(),
    borderBottom: `1px dashed ${Color(themeToken.colorBorder).alpha(0.6).toString()}`,
    transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    width: '100%'
  }
  if (screenMap.md) {
    multiTabsStyle.right = '0px'
    multiTabsStyle.left = 'auto'
    multiTabsStyle.paddingLeft = `${
      themeLayout === ThemeLayout.Vertical ? NAV_WIDTH : NAV_COLLAPSED_WIDTH
    }px`
  }

  // current route meta
  const currentRouteMeta = useCurrentRouteMeta()

  // active tab
  const activeTabRoutePath = useMemo(() => {
    if (!currentRouteMeta) return ''
    const { path } = currentRouteMeta
    return path
  }, [currentRouteMeta])

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

  useEffect(() => {
    if (!currentRouteMeta) return
    let { outlet: children, path } = currentRouteMeta

    const isExisted = tabs.find((item) => item.key === path)
    if (!isExisted) {
      const i18Sign = replaceDynamicPath(currentRouteMeta)
      setTabs((prev) => [
        ...prev,
        { key: currentRouteMeta.path, label: i18Sign, children, timeStamp: getTimeStamp() }
      ])
    }
  }, [currentRouteMeta])

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
            className="relative mx-px flex select-none items-center px-4 py-1"
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

  /**
   * 所有tab
   */

  const tabItems = useMemo(() => {
    return tabs?.map((tab) => ({
      label: renderTabLabel(tab),
      key: tab.key,
      closable: tabs.length > 1 // 保留一个
    }))
  }, [tabs, renderTabLabel])

  const renderTabBar = () => {
    return (
      <div style={multiTabsStyle} className="z-20 w-full">
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

const TabWrapper = styled.div`
  .anticon {
    margin: 0px !important;
  }

  .ant-tabs {
    height: 100%;
    .ant-tabs-content {
      height: 100%;
    }
    .ant-tabs-tabpane {
      height: 100%;
      & > div {
        height: 100%;
      }
    }
  }

  .hide-scrollbar {
    overflow: scroll;
    flex-shrink: 0;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`

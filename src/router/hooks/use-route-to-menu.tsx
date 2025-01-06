import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Iconify } from '@/components/icon'
import { MenuItemType, MenuType, MneuItemsType } from '@/types/menus'
import rootStore from '@/store'

export const replaceDynamicPath = (item: MenuItemType) => {
  // 去除路径中的动态部分（如 :id）
  let trimmedPath = item.component.replace(/\/:[a-zA-Z]+/g, '')

  // 将斜杠替换为点
  let result = trimmedPath.replace(/\//g, '.')

  // 获取最后一个路径段
  const lastSegment = trimmedPath.split('/').pop()

  // 如果 type 为 0，则在结果末尾加上最后一个路径段
  if (item.menuType === 'M' && lastSegment) {
    result += `.${lastSegment}`
  }

  return result
}

/**
 *   routes -> menus
 */
export function useRouteToMenuFn() {
  const { t } = useTranslation()
  const { themeStore } = rootStore
  const {
    themeSetting: { themeLayout }
  } = themeStore

  const routeToMenuFn = useCallback(
    (items: MenuItemType[]): MneuItemsType[] => {
      return items
        .filter((item) => !item.hidden && item.menuType !== 'F')
        .map((item) => {
          const i18Sign = replaceDynamicPath(item)
          const transformedItem: MneuItemsType = {
            key: `/${item.component}`,
            label: (
              <div className="inline-flex items-center justify-between">
                <div className="">{t(i18Sign)}</div>
              </div>
            ),
            icon: item.meta.icon ? (
              <Iconify icon={item.meta.icon} size={24} className="ant-menu-item-icon" />
            ) : null
          }
          if (item.children && item.children.length > 0) {
            if (routeToMenuFn(item.children).length > 0) {
              transformedItem.children = routeToMenuFn(item.children)
            }
          }
          return transformedItem
        })
    },
    [t, themeLayout]
  )
  return routeToMenuFn
}

import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Iconify } from '@/components/icon'
import { MenuType, MneuItemsType } from '@/types/menus'
import rootStore from '@/store'

export const replaceDynamicPath = (item: MenuType) => {
  // 去掉开头的斜杠
  let trimmedPath = item.path.slice(1)

  // 去除路径中的动态部分（如 :id）
  trimmedPath = trimmedPath.replace(/\/:[a-zA-Z]+/g, '')

  // 将斜杠替换为点
  let result = trimmedPath.replace(/\//g, '.')

  // 获取最后一个路径段
  const lastSegment = trimmedPath.split('/').pop()

  // 如果 type 为 0，则在结果末尾加上最后一个路径段
  if (item.type === 0 && lastSegment) {
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
    (items: MenuType[]): MneuItemsType[] => {
      return items
        .filter((item) => item.hidden === 0 && item.type !== 2)
        .map((item) => {
          const i18Sign = replaceDynamicPath(item)
          const transformedItem: MneuItemsType = {
            key: item.path,
            label: (
              <div className="inline-flex items-center justify-between">
                <div className="">{t(i18Sign)}</div>
              </div>
            ),
            icon: item.icon ? (
              <Iconify icon={item.icon} size={24} className="ant-menu-item-icon" />
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

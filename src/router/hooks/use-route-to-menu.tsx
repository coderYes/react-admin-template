import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Iconify } from '@/components/icon'
import { MenuItemType, ItemType } from '@/types/menus'

/**
 *   routes -> menus
 */
export function useRouteToMenuFn() {
  const { t } = useTranslation()

  const convertToMenuItems = (items: MenuItemType[], currentPath: string = ''): ItemType[] => {
    return items
      .filter((item) => !item.hidden && item.menuType !== 'F')
      .map((item) => {
        const initialPath = currentPath ? `${currentPath}${item.path}` : item.path
        const menuItem: ItemType = {
          key: initialPath,
          label: (
            <div className="inline-flex items-center justify-between">
              <div className="">{t(item.name)}</div>
            </div>
          ),
          icon: item.meta.icon ? (
            <Iconify icon={item.meta.icon} size={22} className="ant-menu-item-icon" />
          ) : null,
          children: item.children ? convertToMenuItems(item.children, initialPath) : undefined
        }
        return menuItem
      })
  }

  const routeToMenuFn = useCallback(
    (items: MenuItemType[]): ItemType[] => {
      return convertToMenuItems(items)
    },
    [t]
  )
  return routeToMenuFn
}

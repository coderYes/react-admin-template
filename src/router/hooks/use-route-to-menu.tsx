import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Iconify } from '@/components/icon'
import { MenuItemType, RouteChild, Route } from '@/types/menus'

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env
/**
 *   routes -> menus
 */
export function useRouteToMenuFn() {
  const { t } = useTranslation()

  const convertToMenuItems = (items: MenuItemType[]): Route => {
    const menuData: Route = {
      path: '/system',
      children: [
        {
          path: HOMEPAGE,
          name: t('Home'),
          icon: <Iconify icon="majesticons:home" size={16} />
        }
      ]
    }

    const handleRoutes = (menus: MenuItemType[], currentPath: string = '') => {
      let routeChild: RouteChild[] = []
      menus
        .filter((m) => !m.hidden)
        .forEach((item) => {
          const route: RouteChild = {
            path: currentPath ? `/system${currentPath}${item.path}` : `/system${item.path}`,
            name: t(item.name),
            icon: <Iconify icon={item.meta.icon} size={16} />
          }

          if (item.children && item.children.length > 0) {
            const assembleRouteChild = handleRoutes(item.children, item.path)
            route.children = assembleRouteChild
          }
          routeChild.push(route)
        })
      return routeChild
    }

    const routeChild = handleRoutes(items)
    menuData.children?.push(...routeChild)

    return menuData
  }

  const routeToMenuFn = useCallback(
    (items: MenuItemType[]): Route => {
      return convertToMenuItems(items)
    },
    [t]
  )
  return routeToMenuFn
}

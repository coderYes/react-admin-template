import { LazyLoad, SuspenseHOC } from './LazyLoad'
import type { RouteObject } from 'react-router-dom'
import type { MenuItemType, MenuType } from '@/types/menus'
import { createRef } from 'react'
import { hasPermiOr, hasRoleOr } from './auth'

/**
 * 组装路由
 * @param menus 菜单列表
 * @returns
 */
export function assembleRouter(menus: MenuItemType[]): RouteObject[] {
  let routes: RouteObject[] = []

  menus
    .filter((item) => item.redirect)
    .forEach((item) => {
      const transformedItem: RouteObject = {
        path: item.path,
        element: item.menuType === 'M' ? SuspenseHOC() : LazyLoad(item.component)
      }

      if (item.children && item.children.length > 0) {
        transformedItem.children = assembleRouter(item.children)
      }
      routes.push(transformedItem)
    })

  return routes
}

export function flattenTree(
  menus: MenuItemType[],
  ignoreType: MenuType = 'M',
  currentPath: string = ''
): MenuItemType[] {
  let result: MenuItemType[] = []

  menus
    .filter((item) => item.redirect)
    .forEach((m) => {
      const newPath = currentPath ? `${currentPath}/${m.path}` : m.path
      if (m.menuType !== ignoreType) {
        const newNode = { ...m, nodeRef: createRef(), path: newPath }
        result.push(newNode)
      }

      if (m.children && m.children.length > 0) {
        const ft = flattenTree(m.children, ignoreType, newPath)
        result = result.concat(ft)
      }
    })
  return result
}

// 动态路由遍历，验证是否具备权限
export function filterDynamicRoutes(routes: MenuItemType[]) {
  const res: MenuItemType[] = []
  routes.forEach((route) => {
    if (route.permissions) {
      if (hasPermiOr(route.permissions)) {
        res.push(route)
      }
    } else if (route.roles) {
      if (hasRoleOr(route.roles)) {
        res.push(route)
      }
    }
  })
  return res
}

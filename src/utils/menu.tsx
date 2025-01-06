import { LazyLoad, SuspenseHOC } from './LazyLoad'
import type { RouteObject } from 'react-router-dom'
import type { MenuItemType, MenuType, MneuItemsType } from '@/types/menus'
import { Iconify } from '@/components/icon'
import { createRef } from 'react'

/**
 * 组装路由
 * @param menus 菜单列表
 * @returns
 */
export function assembleRouter(menus: MenuItemType[], currentPath: string = ''): RouteObject[] {
  let routes: RouteObject[] = []

  menus.forEach((item) => {
    const newPath = currentPath ? `${currentPath}/${item.path}` : item.path

    if (item.menuType === 'C') {
      routes.push({ path: newPath, element: LazyLoad(newPath) })
    }

    if (item.children) {
      routes = routes.concat(assembleRouter(item.children, newPath))
    }
  })

  return routes
}

export function flattenTree(menus: MenuItemType[], ignoreType: MenuType = 'M'): MenuItemType[] {
  let result: MenuItemType[] = []

  menus.forEach((m) => {
    if (m.menuType !== ignoreType) {
      const newNode = { ...m, nodeRef: createRef() }
      result.push(newNode)
    }

    if (m.children && m.children.length > 0) {
      const ft = flattenTree(m.children, ignoreType)
      result = result.concat(ft)
    }
  })
  return result
}

/**
 * 获取菜单权限
 * @param menus 菜单列表
 * @returns
 */
// export function flattenRouterAndPermission(menus: MenuType[]): {
//   menuPermissionList: string[]
//   btnPermissionList: string[]
// } {
//   const flattenList = flattenTree(menus)
//   const menuPermissionList = flattenList
//     .filter((item) => item.type === 1 && item.status === 1 && item.permission)
//     .map((item) => item.permission!)
//   const btnPermissionList = flattenList
//     .filter((item) => item.type === 2 && item.status === 1 && item.permission)
//     .map((item) => item.permission!)
//   return {
//     menuPermissionList,
//     btnPermissionList
//   }
// }

/**
 * 组装菜单
 * @param menus 菜单列表
 * @returns
 */
// export function assembleMenuTree(menus: MenuType[]): MneuItemsType[] {
//   return menus
//     .filter((item) => item.hidden === 0 && item.type !== 2)
//     .map((item) => {
//       const transformedItem: MneuItemsType = {
//         key: item.path,
//         label: item.name,
//         icon: item.icon ? <Iconify icon={item.icon} /> : null
//       }
//       if (item.children && item.children.length > 0) {
//         if (assembleMenuTree(item.children).length > 0) {
//           transformedItem.children = assembleMenuTree(item.children)
//         }
//       }
//       return transformedItem
//     })
// }

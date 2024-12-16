import { LazyLoad, SuspenseHOC } from './LazyLoad'
import type { RouteObject } from 'react-router-dom'
import type { MenuType, MneuItemsType } from '@/types/menus'
import { Iconify } from '@/components/icon'

/**
 * 组装路由
 * @param menus 菜单列表
 * @returns
 */
export function assembleRouter(menus: MenuType[]): RouteObject[] {
  return menus
    .filter((item) => item.status === 1 && item.type !== 2)
    .map((item) => {
      const transformedItem: RouteObject = {
        path: item.path,
        element: item.type === 0 ? SuspenseHOC() : LazyLoad(item.path)
      }
      if (item.children && item.children.length > 0) {
        if (assembleRouter(item.children).length > 0) {
          transformedItem.children = assembleRouter(item.children)
        }
      }
      return transformedItem
    })
}

export function flattenTree(menus: MenuType[], ignoreType: number = 0): MenuType[] {
  let result: MenuType[] = []
  menus.forEach((m) => {
    if (m.type !== ignoreType) {
      result.push(m)
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
export function flattenRouterAndPermission(menus: MenuType[]): {
  menuPermissionList: string[]
  btnPermissionList: string[]
} {
  const flattenList = flattenTree(menus)
  const menuPermissionList = flattenList
    .filter((item) => item.type === 1 && item.status === 1 && item.permission)
    .map((item) => item.permission!)
  const btnPermissionList = flattenList
    .filter((item) => item.type === 2 && item.status === 1 && item.permission)
    .map((item) => item.permission!)
  return {
    menuPermissionList,
    btnPermissionList
  }
}

/**
 * 组装菜单
 * @param menus 菜单列表
 * @returns
 */
export function assembleMenuTree(menus: MenuType[]): MneuItemsType[] {
  return menus
    .filter((item) => item.hidden === 0 && item.type !== 2)
    .map((item) => {
      const transformedItem: MneuItemsType = {
        key: item.path,
        label: item.name,
        icon: item.icon ? <Iconify icon={item.icon} /> : null
      }
      if (item.children && item.children.length > 0) {
        if (assembleMenuTree(item.children).length > 0) {
          transformedItem.children = assembleMenuTree(item.children)
        }
      }
      return transformedItem
    })
}

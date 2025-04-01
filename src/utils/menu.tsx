import { LazyLoad, SuspenseHOC } from './LazyLoad'
import type { RouteObject } from 'react-router-dom'
import type { MenuItemType, MenuNode, MenuType } from '@/types/menus'
import { createRef } from 'react'
import { hasPermiOr, hasRoleOr } from './auth'

/**
 * 组装路由
 * @param menus 菜单列表
 * @returns
 */
export function assembleRouter(menus: MenuItemType[], currentPath: string = ''): RouteObject[] {
  let routes: RouteObject[] = []

  menus.forEach((item) => {
    const transformedItem: RouteObject = {
      path: currentPath ? `${currentPath}${item.path}` : item.path,
      element: item.menuType === 'M' ? SuspenseHOC() : LazyLoad(item.component)
    }

    if (item.children && item.children.length > 0) {
      transformedItem.children = assembleRouter(item.children, item.path)
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

  menus.forEach((m) => {
    const newPath = currentPath ? `${currentPath}${m.path}` : m.path
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
// export function filterDynamicRoutes(routes: MenuItemType[]) {
//   const res: MenuItemType[] = []
//   routes.forEach((route) => {
//     if (route.permissions) {
//       if (hasPermiOr(route.permissions)) {
//         res.push(route)
//       }
//     } else if (route.roles) {
//       if (hasRoleOr(route.roles)) {
//         res.push(route)
//       }
//     }
//   })
//   return res
// }

interface Config {
  id: keyof MenuNode
  parentId: keyof MenuNode
  childrenList: string
}

export function handleTree(
  data: MenuNode[],
  id: keyof MenuNode = 'menuId',
  parentId: keyof MenuNode = 'parentId',
  children: string = 'children'
): MenuNode[] {
  const config: Config = {
    id,
    parentId,
    childrenList: children
  }

  const childrenListMap: { [key: string]: MenuNode[] } = {}
  const nodeIds: { [key: string]: MenuNode } = {}
  const tree: MenuNode[] = []

  for (const d of data) {
    const parentIdValue = d[config.parentId] as unknown as string
    if (!childrenListMap[parentIdValue]) {
      childrenListMap[parentIdValue] = []
    }
    nodeIds[d[config.id] as unknown as string] = d
    childrenListMap[parentIdValue].push(d)
  }

  for (const d of data) {
    const parentIdValue = d[config.parentId] as unknown as string
    if (!nodeIds[parentIdValue]) {
      tree.push(d)
    }
  }

  for (const t of tree) {
    adaptToChildrenList(t)
  }

  function adaptToChildrenList(node: MenuNode): void {
    const nodeId = node[config.id] as unknown as string
    if (childrenListMap[nodeId]) {
      ;(node as any)[config.childrenList] = childrenListMap[nodeId]
    }
    if ((node as any)[config.childrenList]) {
      for (const child of (node as any)[config.childrenList]) {
        adaptToChildrenList(child)
      }
    }
  }

  return tree
}

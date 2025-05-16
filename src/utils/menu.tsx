import { LazyLoad, SuspenseHOC } from './LazyLoad'
import type { RouteObject } from 'react-router-dom'
import type { MenuItemType, MenuNode, MenuType } from '@/types/menus'
import { createRef } from 'react'

interface Config {
  id: keyof MenuNode
  parentId: keyof MenuNode
  childrenList: string
}

/**
 * 组装路由
 * @param menus 路由元信息
 * @returns
 */
export function assembleRouter(menus: MenuItemType[], currentPath: string = ''): RouteObject[] {
  let routes: RouteObject[] = []

  menus.forEach((item) => {
    const transformedItem: RouteObject = {
      path: currentPath ? `/system${currentPath}${item.path}` : `/system${item.path}`,
      element: item.menuType === 'M' ? SuspenseHOC() : LazyLoad(item.component)
    }

    if (item.children && item.children.length > 0) {
      transformedItem.children = assembleRouter(item.children, item.path)
    }
    routes.push(transformedItem)
  })

  return routes
}

/**
 * 树形结构菜单 —> 扁平化菜单
 * @param menus 树形菜单数据
 * @param ignoreType 需要忽略的菜单类型，默认'M'
 * @param currentPath 当前路径前缀
 * @returns
 */
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

/**
 * 扁平化菜单 —> 树形结构菜单
 * @param data 扁平数据数组
 * @param id 节点ID字段名，默认为'menuId'
 * @param parentId 父节点ID字段名，默认为'parentId'
 * @param children 子节点列表字段名，默认为'children'
 * @returns
 */
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

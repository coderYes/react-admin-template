import { ReactNode } from 'react'

export interface ItemType {
  key: string
  label: React.ReactNode
  icon?: React.ReactNode
  children?: ItemType[]
}

export interface MetaType {
  title: string
  icon: string
  noCache: boolean
  link: string
}

export type MenuType = 'M' | 'C' | 'F' // 菜单类型（M目录 C菜单 F按钮）

export interface MenuItemType {
  name: string
  path: string
  hidden: boolean
  component: string
  query: string
  meta: MetaType
  menuType: MenuType
  children?: MenuItemType[]
}
export interface BaseMenuItemType extends MenuItemType {
  outlet?: any
}

export interface MenuNode {
  menuId: string
  menuName: string
  parentId: string
  orderNum: number
  path: string
  component: string
  query: string
  isFrame: string
  isCache: string
  menuType: MenuType
  visible: string
  status: string
  perms: string
  icon: string
  createBy: string
  createTime: string
  updateBy: string
  updateTime: string | null
  remark: string
  children?: MenuNode[]
}

export interface Route {
  path?: string
  children?: RouteChild[]
}

export interface RouteChild {
  exact?: boolean
  icon?: ReactNode
  name: string
  path: string
  children?: RouteChild[]
}

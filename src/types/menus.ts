import type { Params } from 'react-router-dom'
export interface MneuItemsType {
  key: string
  label: React.ReactNode
  icon?: React.ReactNode
  children?: MneuItemsType[]
}

export interface RouteMeta {
  key: string
  label: string
  params?: Params<string>
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
  redirect: string
  component: string
  query: string
  alwaysShow: boolean
  meta: MetaType
  status: string
  visible: string
  menuType: MenuType
  children?: MenuItemType[] | null
}
export interface BaseMenuItemType extends MenuItemType {
  outlet?: any
}

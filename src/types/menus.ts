import type { Params } from 'react-router-dom'

export interface MenuType {
  id: number
  parentId: number
  name: string
  path: string
  type: number
  hidden: number
  status: number
  icon?: string
  order: string
  permission?: string
  children?: MenuType[]
  outlet?: any
}

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

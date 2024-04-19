import React from 'react'
import LazyLoad from '@/utils/LazyLoad'
import type { RouteObject } from 'react-router-dom'
import type { MenuItem } from '@/views/main'
import * as Icons from '@ant-design/icons'
const iconList: any = Icons

export interface IMenuType {
  id: number
  name: string
  path: string
  hidden: boolean
  icon: string
  componentPath: string
  children?: IMenuType[]
}

/**
 * 添加路由配置
 * @param menu 菜单列表
 * @returns 动态路由表
 */
export function addRouteToMenu(menu: IMenuType[]): RouteObject[] {
  let temp: RouteObject[] = []
  menu.forEach((m) => {
    if (!m.children) {
      const obj = {
        path: m.path,
        element: LazyLoad(m.componentPath)
      }
      temp.push(obj)
    } else {
      const ms = addRouteToMenu(m.children)
      temp = temp.concat(ms)
    }
  })
  return temp
}

interface IMenuItem {
  key: number
  label: string
  icon: React.ReactNode
  children?: IMenuItem[]
}
/**
 * 菜单列表添加icon
 * @param menu 菜单列表
 */
export function addIconToMenu(menu: IMenuType[]): IMenuItem[] {
  const temp: IMenuItem[] = []
  menu.forEach((item) => {
    const { id, name, icon } = item
    const newItem: IMenuItem = {
      label: name,
      key: id,
      icon: icon ? React.createElement(iconList[item.icon]) : ''
    }
    if (item.children) {
      newItem.children = addIconToMenu(item.children)
    }
    temp.push(newItem)
  })

  return temp
}

import LazyLoad from '@/utils/LazyLoad'
import type { RouteObject } from 'react-router-dom'

export interface IMenuType {
  id: number
  name: string
  path: string
  hidden: boolean
  componentPath: string
  children?: IMenuType[]
}

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

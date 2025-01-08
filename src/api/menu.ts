import request, { type ResponseType } from '@/service'
import { MenuItemType } from '@/types/menus'

/**
 * 获取菜单
 * @returns
 */
export function getRouters() {
  return request.get<ResponseType<MenuItemType[]>>({
    url: '/getRouters'
  })
}

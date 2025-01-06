import request, { type ResponseType } from '@/service'
import { MenuItemType } from '@/types/menus'

export function getRouters() {
  return request.get<ResponseType<MenuItemType[]>>({
    url: '/getRouters'
  })
}

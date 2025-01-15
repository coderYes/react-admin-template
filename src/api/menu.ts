import request from '@/service'

/**
 * 获取路由
 * @returns
 */
export function getRouters() {
  return request.get({
    url: '/getRouters'
  })
}

/**
 * 查询菜单列表
 * @param params
 * @returns
 */
export function getListMenu(params: any) {
  return request.get({
    url: '/system/menu/list',
    params
  })
}

/**
 * 修改菜单
 * @param data
 * @returns
 */
export function updateMenu(data: any) {
  return request.put({
    url: '/system/menu',
    data
  })
}

/**
 * 新增菜单
 * @param data
 * @returns
 */
export function addMenu(data: any) {
  return request.post({
    url: '/system/menu',
    data
  })
}

/**
 * 删除菜单
 * @param menuId
 * @returns
 */
export function delMenu(menuId: string) {
  return request.delete({
    url: `/system/menu/${menuId}`
  })
}

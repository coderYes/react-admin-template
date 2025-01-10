import request from '@/service'

/**
 * 获取菜单
 * @returns
 */
export function getRouters() {
  return request.get({
    url: '/getRouters'
  })
}

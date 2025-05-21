import request, { IResponseType, PageResult } from '@/service'
import { IRoleType } from '@/types/user'

/**
 * 获取角色列表
 * @returns
 */
export function getRole(params: any) {
  return request.get<IResponseType<PageResult<IRoleType>>>({
    url: '/system/role/list',
    params
  })
}

/**
 * 获取所有角色列表
 * @returns
 */
export function getAllRoleList() {
  return request.get<IResponseType<IRoleType[]>>({
    url: '/system/role/getAllList'
  })
}

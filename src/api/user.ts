import request, { IResponseType, PageResult } from '@/service'
import { IUserType } from '@/types/user'

/**
 * 获取用户列表
 * @returns
 */
export function getUser(params: any) {
  return request.get<IResponseType<PageResult<IUserType>>>({
    url: '/system/user/list',
    params
  })
}

/**
 * 用户删除
 * @returns
 */
export function removeUser(ids: string) {
  return request.delete({
    url: '/system/user/delete/' + ids
  })
}

/**
 * 根据用户ID查询用户信息
 * @returns
 */
export function getUserById(id: number | string) {
  return request.get<IResponseType<IUserType>>({
    url: `/system/user/info/${id}`
  })
}

/**
 * 修改用户
 * @returns
 */
export function updateUser(data: IUserType) {
  return request.put({
    url: '/system/user/edit',
    data
  })
}

/**
 * 新增用户
 * @returns
 */
export function addUser(data: IUserType) {
  return request.post({
    url: '/system/user/add',
    data
  })
}

/**
 * 删除用户
 * @param 用户id列表
 * @returns
 */
export function delUser(userIds: string) {
  return request.delete({
    url: `/system/user/delete/${userIds}`
  })
}

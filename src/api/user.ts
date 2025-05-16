import request, { IResListType, IResponseType } from '@/service'
import { IUserType } from '@/types/user'

/**
 * 获取用户列表
 * @returns
 */
export function getUser(params: any) {
  return request.get<IResponseType<IResListType<IUserType>>>({
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

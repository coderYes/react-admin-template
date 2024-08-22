import request from '@/service/index'
import { IResponseType } from '@/types/api'

export function login(username: string, password: string) {
  return request<IResponseType>({
    url: '/login',
    headers: {
      isToken: false
    },
    method: 'post',
    data: {
      username,
      password
    }
  })
}

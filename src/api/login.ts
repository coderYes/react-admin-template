import request from '@/utils/request'
import { ResponseType } from '@/types/api'

export function login(username: string, password: string) {
  const data = {
    username,
    password
  }
  return request<ResponseType>({
    url: '/login',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}

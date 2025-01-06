import { UserType } from '@/types/user'
import Request from './request'

export interface ResponseType<T = any> {
  code: number
  data: T
  msg: string
  token?: string
  permissions?: string[]
  roles?: string[]
  user: UserType
}

const request = new Request({
  baseURL: import.meta.env.VITE_APP_BASE_API as string,
  timeout: 10000
})

export default request

import Request from './request'

export interface ResponseType<T = any> {
  code: number
  message: string
  data: T
}

const request = new Request({
  baseURL: import.meta.env.VITE_APP_BASE_API as string,
  timeout: 10000
})

export default request

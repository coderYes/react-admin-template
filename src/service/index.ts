import Request from './request'

export interface IResponseType<T = any> {
  code: number
  message: string
  data: T
}

export interface IResListType<T = any> {
  records: T[]
  total: number
  size: number
  current: number
  orders: any[]
  optimizeCountSql: boolean
  searchCount: boolean
  maxLimit?: any
  countId?: any
  pages: number
}

const request = new Request({
  baseURL: import.meta.env.VITE_APP_BASE_API as string,
  timeout: 10000
})

export default request

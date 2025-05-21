import Request from './request'

export interface IResponseType<T = any> {
  code: number
  message: string
  data: T
}

export interface PageResult<T> {
  records: T[] // 当前页数据列表
  total: number // 总条数
  size: number // 每页大小
  current: number // 当前页码
  orders: any[] // 排序字段（通常为空数组）
  optimizeCountSql: boolean // 是否优化count语句
  searchCount: boolean // 是否进行count查询
  maxLimit: null | number // 单页分页条数限制
  countId: null | string // count查询的优化ID
  pages: number // 总页数
}

const request = new Request({
  baseURL: import.meta.env.VITE_APP_BASE_API as string,
  timeout: 10000
})

export default request

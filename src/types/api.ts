export interface IResponseType<T = any> {
  code: number
  msg: string
  data: T
}

export interface ResponseType<T = any> {
  code: number
  message: string
  data: T
}

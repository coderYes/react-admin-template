export interface IVerifyCodeType {
  image: string
  key: string
  captchaEnabled?: boolean
}

export interface ILoginType {
  username: string
  password: string
  code: string
  uuid: string
}

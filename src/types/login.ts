export interface VerifyCodeType {
  image: string
  key: string
  captchaEnabled?: boolean
}

export interface LoginType {
  username: string
  password: string
  code: string
  uuid: string
}

export interface VerifyCodeType {
  img: string
  uuid: string
  captchaEnabled?: boolean
}

export interface LoginType {
  username: string
  password: string
  code: string
  uuid: string
}

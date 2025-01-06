import request, { type ResponseType } from '@/service'
import type { LoginType, VerifyCodeType } from '@/types/login'

/**
 * 用户登录
 * @param data 用户登录信息
 * @returns
 */
export function login(data: LoginType) {
  return request.post<ResponseType>({
    url: '/login',
    headers: {
      isToken: false
    },
    data
  })
}

/**
 * 获取验证码
 * @returns
 */
export function getCodeImg() {
  return request.get<ResponseType<VerifyCodeType>>({
    url: '/captchaImage',
    headers: {
      isToken: false
    },
    timeout: 20000
  })
}

/**
 * 获取用户信息
 * @returns
 */
export function getInfo() {
  return request.get<ResponseType>({
    url: '/getInfo'
  })
}

/**
 * 退出登录
 * @returns
 */
export function logout(token: string) {
  return request.post<ResponseType>({
    url: '/logout',
    data: { token }
  })
}

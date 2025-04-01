import request, { ResponseType } from '@/service'
import type { LoginType } from '@/types/login'

/**
 * 用户登录
 * @param data 用户登录信息
 * @returns
 */
export function login(data: LoginType) {
  return request.post<ResponseType<string>>({
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
  return request.get({
    url: '/captcha',
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
  return request.get({
    url: '/system/getInfo'
  })
}

/**
 * 退出登录
 * @returns
 */
export function logout(token: string) {
  return request.post({
    url: '/logout',
    data: { token }
  })
}

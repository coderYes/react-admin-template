import Cookies from 'js-cookie'
import { getCache } from './localCache'

const userInfo = getCache('userInfo')

const TokenKey = 'Admin-Token'

// 获取token
export function getToken() {
  return Cookies.get(TokenKey)
}

// 设置token
export function setToken(token: string) {
  return Cookies.set(TokenKey, token)
}

// 移除token
export function removeToken() {
  return Cookies.remove(TokenKey)
}

function authPermission(permission: string) {
  const all_permission = '*:*:*'
  const permissions = userInfo?.permissions || []
  if (permission && permission.length > 0) {
    return permissions.some((v: string) => {
      return all_permission === v || v === permission
    })
  } else {
    return false
  }
}

function authRole(role: string) {
  const super_admin = 'admin'
  const roles = userInfo?.roles || []
  if (role && role.length > 0) {
    return roles.some((v: string) => {
      return super_admin === v || v === role
    })
  } else {
    return false
  }
}

export function hasPermiOr(permissions: string[]) {
  return permissions.some((item) => {
    return authPermission(item)
  })
}

export function hasRoleOr(roles: string[]) {
  return roles.some((item) => {
    return authRole(item)
  })
}

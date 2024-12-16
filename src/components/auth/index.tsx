import { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { getCache } from '@/utils/localCache'
import { Navigate, useLocation } from 'react-router-dom'
import rootStore from '@/store'

type Props = {
  children?: ReactNode
}
const whiteList: string[] = ['/login']
const AuthHOC: FC<Props> = ({ children }) => {
  const NEXT_MAP: any = {
    NEXT: children,
    HOME: <Navigate to="/" />,
    LOGIN: <Navigate to="/login" />
  }

  let ISNEXT = 'HOME'

  const {
    userStore: { permissions }
  } = rootStore

  const { pathname } = useLocation()
  const token = getCache('token')

  if (token) {
    if (pathname === '/login') {
      ISNEXT = 'HOME'
    } else if (whiteList.includes(pathname) || pathname === '/admin') {
      ISNEXT = 'NEXT'
    } else {
      const permissionKey = pathname.split('/').filter(Boolean).join(':')
      if (permissions.menuPermissionList.includes(permissionKey)) {
        ISNEXT = 'NEXT'
      } else {
        ISNEXT = 'LOGIN'
      }
    }
  } else {
    if (whiteList.includes(pathname)) {
      ISNEXT = 'NEXT'
    } else {
      ISNEXT = 'HOME'
    }
  }

  return NEXT_MAP[ISNEXT]
}

export default memo(AuthHOC)

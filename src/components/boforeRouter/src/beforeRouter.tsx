import { memo } from 'react'
import type { FC, ReactNode } from 'react'
import localcache from '@/utils/cache'
import { Navigate, useLocation } from 'react-router-dom'

interface IProps {
  children?: ReactNode
}

const BeforeRouter: FC<IProps> = ({ children }) => {
  const { pathname } = useLocation()
  const token = localcache.getCache('token')
  if (!token && pathname !== '/login' && !pathname.includes('/tour/vr')) {
    return <Navigate to="/login" />
  } else {
    return children
  }
}

export default memo(BeforeRouter)

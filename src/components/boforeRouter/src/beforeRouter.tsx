import { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { getCache } from '@/utils/localCache'
import { Navigate, useLocation } from 'react-router-dom'

interface IProps {
  children?: ReactNode
}

const BeforeRouter: FC<IProps> = ({ children }) => {
  const { pathname } = useLocation()
  const token = getCache('token')
  if (!token && pathname !== '/login') {
    return <Navigate to="/login" />
  } else {
    return children
  }
}

export default memo(BeforeRouter)

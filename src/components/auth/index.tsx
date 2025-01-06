import { lazy, memo, useCallback, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { getToken } from '@/utils/auth'
import { isRelogin } from '@/service/request'
import rootStore from '@/store'
import { useRouter } from '@/router/hooks'
import { ErrorBoundary } from 'react-error-boundary'

const PageError = lazy(() => import('@/views/system/exception/exception404'))

type Props = {
  children?: ReactNode
}
const AuthHOC: FC<Props> = ({ children }) => {
  const router = useRouter()
  const token = getToken()

  const check = useCallback(() => {
    if (!token) {
      router.replace('/login')
    }
  }, [router, token])

  useEffect(() => {
    check()
  }, [check])

  return <ErrorBoundary FallbackComponent={PageError}>{children}</ErrorBoundary>
}

export default memo(AuthHOC)

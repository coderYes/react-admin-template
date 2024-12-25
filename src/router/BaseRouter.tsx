import { lazy } from 'react'
import { Navigate, type RouteObject } from 'react-router-dom'
import AuthHOC from '@/components/auth'

const Login = lazy(() => import('@/views/login'))
const HomePage = lazy(() => import('@/views/homepage'))
const AdminLayout = lazy(() => import('@/layout/dashboard'))

const { VITE_APP_HOMEPAGE: ADMIN_HOMEPAGE } = import.meta.env
const baseRouter: RouteObject[] = [
  {
    path: '/admin',
    element: (
      <AuthHOC>
        <AdminLayout />
      </AuthHOC>
    ),
    children: [{ index: true, element: <Navigate to={ADMIN_HOMEPAGE} replace /> }]
  },
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/login',
    element: (
      <AuthHOC>
        <Login />
      </AuthHOC>
    )
  },
  {
    path: '*',
    element: <Navigate to="/404" replace />
  }
]

export default baseRouter

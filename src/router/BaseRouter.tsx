import { lazy } from 'react'
import { Navigate, type RouteObject } from 'react-router-dom'
import AuthHOC from '@/components/auth'
import { MenuItemType } from '@/types/menus'

const Login = lazy(() => import('@/views/login'))
const AdminLayout = lazy(() => import('@/layout/dashboard'))
const Dashboard = lazy(() => import('@/views/system/dashboard/workbench'))

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env

export const baseRouter: RouteObject[] = [
  {
    path: '/',
    element: (
      <AuthHOC>
        <AdminLayout />
      </AuthHOC>
    ),
    children: [{ index: true, element: <Navigate to={HOMEPAGE} replace /> }]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '*',
    element: <Navigate to="/404" replace />
  }
]

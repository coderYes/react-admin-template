import { Navigate, type RouteObject } from 'react-router-dom'
import AuthHOC from '@/components/auth'

import Login from '@/views/login'
import AdminLayout from '@/layout/dashboard'
import Dashboard from '@/views/system/dashboard/workbench'

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env

export const baseRouter: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to={HOMEPAGE} replace />
  },
  {
    path: '/system',
    element: (
      <AuthHOC>
        <AdminLayout />
      </AuthHOC>
    ),
    children: [
      { index: true, element: <Navigate to={HOMEPAGE} replace /> },
      {
        path: HOMEPAGE,
        element: <Dashboard />
      }
    ]
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

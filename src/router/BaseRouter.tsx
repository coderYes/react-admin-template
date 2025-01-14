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
    children: [
      { index: true, element: <Navigate to={HOMEPAGE} replace /> },
      {
        path: '/system/dashboard/workbench',
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

export const dynamicRoutes: MenuItemType[] = [
  {
    name: 'DictData',
    path: '/system/dict-data/:dictType',
    hidden: true,
    redirect: 'noRedirect',
    component: 'system/dict/data',
    query: '',
    alwaysShow: false,
    meta: {
      title: '字典数据',
      icon: 'Home',
      noCache: false,
      link: ''
    },
    menuType: 'C',
    permissions: ['system:dict:list']
  }
]

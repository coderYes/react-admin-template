import React, { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
const Login = lazy(() => import('@/views/login'))
const Main = lazy(() => import('@/views/main'))
const NotFound = lazy(() => import('@/views/notFound'))
import BeforeRouter from '@/components/boforeRouter'

const baseRouter: RouteObject[] = [
  {
    path: '/',
    element: (
      <BeforeRouter>
        <Main />
      </BeforeRouter>
    ),
    children: [{ path: '*', element: <></> }]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '*',
    element: <NotFound />
  }
]

export default baseRouter

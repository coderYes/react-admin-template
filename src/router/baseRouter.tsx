import React, { lazy } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
const Login = lazy(() => import('@/views/login'))
const Main = lazy(() => import('@/views/main'))
const NotFound = lazy(() => import('@/views/notFound'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/main/*',
    element: <Main />,
    children: [{ path: '*', element: <></> }]
  },
  {
    path: '*',
    element: <NotFound />
  }
])

export default router

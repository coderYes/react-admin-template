import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

const Page403 = lazy(() => import('@/views/admin/exception/exception403'))
const Page404 = lazy(() => import('@/views/admin/exception/exception404'))
const Page500 = lazy(() => import('@/views/admin/exception/exception500'))

const errorRouter: RouteObject[] = [
  { path: '/403', element: <Page403 /> },
  { path: '/404', element: <Page404 /> },
  { path: '/500', element: <Page500 /> }
]

export default errorRouter

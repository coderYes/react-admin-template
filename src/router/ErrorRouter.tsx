import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

const Page403 = lazy(() => import('@/views/system/exception/exception403'))
const Page404 = lazy(() => import('@/views/system/exception/exception404'))
const Page500 = lazy(() => import('@/views/system/exception/exception500'))

const ErrorRoutes: RouteObject[] = [
  { path: '/403', element: <Page403 /> },
  { path: '/404', element: <Page404 /> },
  { path: '/500', element: <Page500 /> }
]

export default ErrorRoutes

import { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import { usePermissionRoutes } from './hooks'
import baseRouter from './BaseRouter'
import errorRouter from './ErrorRouter'
import rootStore from '@/store'

function BrowserRouter() {
  const [router, setRouter] = useState<any>(null)
  const { userStore } = rootStore
  const { roles } = userStore
  const permissionRoutes = usePermissionRoutes()

  useEffect(() => {
    baseRouter[0].children?.push(...permissionRoutes)
    const finalRoutes = [...baseRouter, ...errorRouter]
    const browserRouter = createBrowserRouter(finalRoutes as unknown as RouteObject[])
    setRouter(browserRouter)
  }, [roles])
  return <>{router && <RouterProvider router={router} />}</>
}

export default observer(BrowserRouter)

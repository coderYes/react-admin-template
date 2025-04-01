import { useState, useEffect, useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import { getRouters } from '@/api/menu'
import { assembleRouter } from '@/utils/menu'
import { baseRouter } from './BaseRouter'
import errorRouter from './ErrorRouter'
import rootStore from '@/store'
import { message } from 'antd'

function BrowserRouter() {
  const [router, setRouter] = useState<any>(null)
  const { userStore } = rootStore
  const { roles } = userStore

  useEffect(() => {
    initRoute()
  }, [roles])

  const initRoute = async () => {
    try {
      if (roles.length) {
        const res = await getRouters()
        userStore.setMenuList(res.data)
        const permissionRoutes = assembleRouter(res.data)
        baseRouter[0].children?.push(...permissionRoutes)
      }
      const finalRoutes = [...baseRouter, ...errorRouter]
      const browserRouter = createBrowserRouter(finalRoutes as unknown as RouteObject[])
      setRouter(browserRouter)
    } catch (error: any) {
      message.error(error)
    }
  }
  return <>{router && <RouterProvider router={router} />}</>
}

export default observer(BrowserRouter)

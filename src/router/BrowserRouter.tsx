import { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import { assembleRouter, flattenRouterAndPermission } from '@/utils/menu'
import baseRouter from './BaseRouter'
import getRouer from '@/mock'
import rootStore from '@/store'

function BrowserRouter() {
  const [router, setRouter] = useState<any>(null)
  const { userStore } = rootStore

  useEffect(() => {
    getRouer().then((res: any) => {
      userStore.setMenuList(res.data)

      // 组装路由
      const updateRouter = assembleRouter(res.data)
      baseRouter[0].children?.push(...updateRouter)

      // 获取菜单/按钮权限
      const permission = flattenRouterAndPermission(res.data)
      userStore.setPermission(permission)

      const finalRoutes = [...baseRouter]
      const browserRouter = createBrowserRouter(finalRoutes as unknown as RouteObject[])
      setRouter(browserRouter)
    })
  }, [])
  return <>{router && <RouterProvider router={router} />}</>
}

export default observer(BrowserRouter)

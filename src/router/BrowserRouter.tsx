import { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import { getRouters } from '@/api/menu'
import { assembleRouter } from '@/utils/menu'
import { MenuItemType } from '@/types/menus'
import baseRouter from './BaseRouter'
import errorRouter from './ErrorRouter'
import rootStore from '@/store'

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
        const list: MenuItemType[] = [
          {
            name: 'Home',
            path: '/system/dashboard/workbench',
            hidden: false,
            redirect: 'noRedirect',
            component: 'system/dashboard/workbench',
            query: '',
            alwaysShow: false,
            meta: {
              title: '首页',
              icon: 'Home',
              noCache: false,
              link: ''
            },
            menuType: 'C'
          },
          ...res.data
        ]
        userStore.setMenuList(list)
        const permissionRoutes = assembleRouter(list)
        baseRouter[0].children?.push(...permissionRoutes)
      }
      const finalRoutes = [...baseRouter, ...errorRouter]
      const browserRouter = createBrowserRouter(finalRoutes as unknown as RouteObject[])
      setRouter(browserRouter)
    } catch (error) {}
  }
  return <>{router && <RouterProvider router={router} />}</>
}

export default observer(BrowserRouter)

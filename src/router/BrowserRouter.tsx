import { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import { getRouters } from '@/api/menu'
import { assembleRouter, filterDynamicRoutes } from '@/utils/menu'
import { MenuItemType } from '@/types/menus'
import { baseRouter, dynamicRoutes } from './BaseRouter'
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
        const asyncRoutes = filterDynamicRoutes(dynamicRoutes)

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
          ...asyncRoutes
        ]
        userStore.setMenuList([...list, ...res.data])
        // 动态添加路由数据
        const assembleList = [...res.data, ...asyncRoutes]
        const permissionRoutes = assembleRouter(assembleList)

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

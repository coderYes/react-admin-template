import { useEffect, useState } from 'react'
import { useRouter } from './use-router'
import type { BaseMenuItemType } from '@/types/menus'
import { useMatches } from 'react-router-dom'
import { useFlattenedRoutes } from '@/router/hooks'

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env

function matchPath(pathname: string, routePath: string): boolean {
  const pathToRegexp = (path: string) => new RegExp(`^${path.replace(/:[^\s/]+/g, '([\\w-]+)')}$`)
  return pathToRegexp(routePath).test(pathname)
}

/**
 * 返回当前路由Meta信息
 */
export function useCurrentRouteMeta() {
  const { push } = useRouter()

  // 获取所有匹配的路由
  const matchs = useMatches()

  // 获取拍平后的路由菜单
  const flattenedRoutes = useFlattenedRoutes()

  const [currentRouteMeta, setCurrentRouteMeta] = useState<BaseMenuItemType>()

  useEffect(() => {
    // 获取当前匹配的路由
    const lastRoute = matchs.at(-1)
    if (!lastRoute) return

    const { pathname } = lastRoute

    const matchedRouteMeta = flattenedRoutes.find((item) => {
      return matchPath(pathname, item.path)
    })

    if (matchedRouteMeta) {
      setCurrentRouteMeta({ ...matchedRouteMeta })
    } else {
      push(HOMEPAGE)
    }
  }, [matchs])

  return currentRouteMeta
}

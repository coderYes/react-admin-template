import { useCallback, useMemo } from 'react'
import { flattenTree } from '@/utils/menu'
import rootStore from '@/store'

/**
 * 返回拍平后的菜单路由
 */
export function useFlattenedRoutes() {
  const { userStore } = rootStore
  const flattenRoutes = useCallback(flattenTree, [])
  return useMemo(() => {
    return flattenRoutes(userStore.menuList, 2)
  }, [flattenRoutes, userStore.menuList])
}

import { useCallback, useMemo } from 'react'
import { flattenTree } from '@/utils/menu'
import rootStore from '@/store'

/**
 * 返回拍平后的菜单路由
 */
export function useFlattenedRoutes() {
  const { userStore } = rootStore
  const flattenRoutesFunc = useCallback(flattenTree, [])
  return useMemo(() => {
    return flattenRoutesFunc(userStore.menuList, 'F')
  }, [flattenRoutesFunc, userStore.menuList])
}

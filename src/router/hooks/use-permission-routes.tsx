import { useMemo } from 'react'
import rootStore from '@/store'
import { assembleRouter, flattenTree } from '@/utils/menu'

export function usePermissionRoutes() {
  const {
    userStore: { menuList }
  } = rootStore
  const permissions = menuList
  return useMemo(() => {
    if (!permissions) return []
    // const flattenedPermissions = flattenTree(permissions, 'F')
    // console.log('flattenedPermissions', flattenedPermissions)
    return assembleRouter(permissions)
  }, [permissions])
}

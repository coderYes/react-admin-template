import { makeAutoObservable } from 'mobx'
import { clearCache } from '@/utils/localCache'
import { MenuType } from '@/types/menus'

class UserStore {
  userInfo = {}
  permissions: {
    menuPermissionList: string[]
    btnPermissionList: string[]
  } = {
    menuPermissionList: [],
    btnPermissionList: []
  }
  menuList: MenuType[] = []
  constructor() {
    makeAutoObservable(this)
  }

  setPermission(permissions: { menuPermissionList: string[]; btnPermissionList: string[] }) {
    this.permissions = {
      menuPermissionList: permissions.menuPermissionList,
      btnPermissionList: permissions.btnPermissionList
    }
  }

  setMenuList(menuList: MenuType[]) {
    this.menuList = menuList
  }

  logout(): Promise<void> {
    return new Promise((resolve) => {
      clearCache()
      resolve()
    })
  }
}
const usersStore = new UserStore()
export default usersStore

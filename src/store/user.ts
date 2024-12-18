import { makeAutoObservable } from 'mobx'
import { deleteCache } from '@/utils/localCache'
import { MenuType } from '@/types/menus'
import { UserInfoType } from '@/types/entity'

class UserStore {
  userInfo: Partial<UserInfoType> = {}
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
      deleteCache('token')
      deleteCache('userInfo')
      resolve()
    })
  }
}
const usersStore = new UserStore()
export default usersStore

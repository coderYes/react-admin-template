import { makeAutoObservable, runInAction } from 'mobx'
import { MenuItemType } from '@/types/menus'
import { makePersistable } from 'mobx-persist-store'
import { ILoginType } from '@/types/login'
import { getInfo, login } from '@/api/login'
import { getToken, removeToken, setToken } from '@/utils/auth'

const defAva = 'https://api.dicebear.com/7.x/miniavs/svg?seed=1'
class UserStore {
  token: string = getToken() as string
  id: string = ''
  name: string = ''
  avatar: string = ''
  roles: string[] = []
  permissions: string[] = []
  menuList: MenuItemType[] = []
  constructor() {
    makeAutoObservable(this)

    makePersistable(this, {
      name: 'userInfo',
      properties: ['id', 'name', 'avatar', 'roles', 'permissions'],
      storage: window.localStorage
    })
  }

  getInfo() {
    return new Promise((resolve, reject) => {
      getInfo()
        .then((res) => {
          const user = res.data.user
          const avatar =
            user.avatar == '' || user.avatar == null
              ? defAva
              : import.meta.env.VITE_APP_BASE_API + user.avatar
          runInAction(() => {
            this.roles =
              res.data.roles && res.data.roles.length > 0 ? res.data.roles : ['ROLE_DEFAULT']
            this.permissions = res.data.permissions || []
            this.id = String(user.id)
            this.name = user.userName
            this.avatar = avatar
          })

          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  setMenuList(menuList: MenuItemType[] = []) {
    this.menuList = menuList
  }

  login(data: ILoginType): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        // 登录
        const loginRes = await login(data)
        setToken(loginRes.data)
        this.token = loginRes.data

        // 获取用户信息
        await this.getInfo()

        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }

  logout(): Promise<void> {
    return new Promise((resolve, reject) => {
      // logout(this.token)
      //   .then(() => {
      //     this.token = ''
      //     this.roles = []
      //     this.permissions = []
      //     removeToken()
      //     resolve()
      //   })
      //   .catch((error) => {
      //     reject(error)
      //   })
      this.token = ''
      this.roles = []
      this.permissions = []
      removeToken()
      resolve()
    })
  }
}
const userStore = new UserStore()
export default userStore

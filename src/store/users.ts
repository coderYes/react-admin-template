import { computed, makeAutoObservable } from 'mobx'
import { clearCache } from '@/utils/localCache'

class UsersStore {
  userInfoMobx = {}
  constructor() {
    makeAutoObservable(this, {
      userInfo: computed
    })
  }

  logout() {
    return new Promise((resolve) => {
      clearCache()
      resolve(0)
    })
  }

  get userInfo() {
    return this.userInfoMobx
  }
}

// 创建实例化对象
const usersStore = new UsersStore()

export default usersStore

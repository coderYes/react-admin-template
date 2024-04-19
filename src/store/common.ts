import { computed, makeAutoObservable } from 'mobx'
import { IMenuType } from '@/utils/menu'
import type { RouteObject } from 'react-router-dom'

class CommonStore {
  count = 0
  menu: IMenuType[] = []
  routes: RouteObject[] = []
  constructor() {
    makeAutoObservable(this, {
      countAddOne: computed
    })
  }
  increment() {
    this.count++
  }

  get countAddOne() {
    return this.count + 1
  }
  setMune(list: IMenuType[]) {
    this.menu = list
  }
  setRoutes(list: RouteObject[]) {
    this.routes = list
  }
}

// 创建实例化对象
const commonStore = new CommonStore()

export default commonStore

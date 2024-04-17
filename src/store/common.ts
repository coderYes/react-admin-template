import { computed, makeAutoObservable } from 'mobx'

class CommonStore {
  count = 0
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
}

// 创建实例化对象
const commonStore = new CommonStore()

export default commonStore

import userStore from './user'
import themeStore from './theme'
import dictStore from './dict'
class RootStore {
  userStore: typeof userStore
  themeStore: typeof themeStore
  dictStore: typeof dictStore
  constructor() {
    this.userStore = userStore
    this.themeStore = themeStore
    this.dictStore = dictStore
  }
}
const rootStore = new RootStore()
export default rootStore

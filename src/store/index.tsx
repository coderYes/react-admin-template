import userStore from './user'
import themeStore from './theme'
class RootStore {
  userStore: typeof userStore
  themeStore: typeof themeStore
  constructor() {
    this.userStore = userStore
    this.themeStore = themeStore
  }
}
const rootStore = new RootStore()
export default rootStore

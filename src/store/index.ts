import commonStore from './common'
import usersStore from './users'
class RootStore {
  commonStore: typeof commonStore
  usersStore: typeof usersStore
  constructor() {
    this.commonStore = commonStore
    this.usersStore = usersStore
  }
}
const rootStore = new RootStore()
export default rootStore

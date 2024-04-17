import commonStore from './common'
class RootStore {
  commonStore: typeof commonStore
  constructor() {
    this.commonStore = commonStore
  }
}
const rootStore = new RootStore()
export default rootStore

import { makeAutoObservable } from 'mobx'

export interface DictType {
  key: string
  value: DictValueType[]
}

export interface DictValueType {
  label: string
  value: string
  elTagType: string
  elTagClass: string
}

class DictStore {
  dict: DictType[] = []
  constructor() {
    makeAutoObservable(this)
  }

  // 获取字典
  getDict(_key: string) {
    if (_key == null && _key == '') {
      return null
    }
    try {
      for (let i = 0; i < this.dict.length; i++) {
        if (this.dict[i].key == _key) {
          return this.dict[i].value
        }
      }
    } catch (e) {
      return null
    }
  }

  // 设置字典
  setDict(_key: string, value: DictValueType[]) {
    if (_key !== null && _key !== '') {
      this.dict.push({
        key: _key,
        value: value
      })
    }
  }

  // 删除字典
  removeDict(_key: string) {
    let bln = false
    try {
      for (let i = 0; i < this.dict.length; i++) {
        if (this.dict[i].key == _key) {
          this.dict.splice(i, 1)
          return true
        }
      }
    } catch (e) {
      bln = false
    }
    return bln
  }

  // 清空字典
  cleanDict() {
    this.dict = new Array()
  }
}
const dictStore = new DictStore()
export default dictStore

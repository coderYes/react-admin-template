import { ThemeColorPresets, ThemeLayout, ThemeMode, ThemePageTransition } from '@/types/enum'
import { makeAutoObservable } from 'mobx'
import { makePersistable } from 'mobx-persist-store'

type themeSettingType = {
  themeMode: ThemeMode
  themeColorPresets: ThemeColorPresets
  themeLayout: ThemeLayout
  darkSidebar: boolean
  darkHeader: boolean
  themeStretch: boolean
  pageTransAnimation: ThemePageTransition
}

class ThemeStore {
  themeSetting: themeSettingType = {
    themeMode: ThemeMode.Light,
    themeColorPresets: ThemeColorPresets.Default,
    themeLayout: ThemeLayout.Mix,
    darkSidebar: false,
    darkHeader: false,
    themeStretch: true,
    pageTransAnimation: ThemePageTransition.FadeIn
  }

  constructor() {
    makeAutoObservable(this)

    makePersistable(this, {
      name: 'ThemeSetting',
      properties: ['themeSetting'],
      storage: window.localStorage
    })
  }

  setSettings(settings: any) {
    this.themeSetting = { ...this.themeSetting, ...settings }
  }
}
const themeStore = new ThemeStore()
export default themeStore

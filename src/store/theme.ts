import { ThemeColorPresets, ThemeLayout, ThemeMode, ThemePageTransition } from '@/types/enum'
import { makeAutoObservable } from 'mobx'
import { makePersistable } from 'mobx-persist-store'

type themeSettingType = {
  themeMode: ThemeMode
  themeColorPresets: ThemeColorPresets
  themeLayout: ThemeLayout
  breadCrumb: boolean
  darkSidebar: boolean
  themeStretch: boolean
  multiTab: boolean
  pageTransAnimation: ThemePageTransition
}

class ThemeStore {
  themeSetting: themeSettingType = {
    themeMode: ThemeMode.Light,
    themeColorPresets: ThemeColorPresets.Default,
    themeLayout: ThemeLayout.Vertical,
    breadCrumb: true,
    darkSidebar: false,
    themeStretch: true,
    multiTab: true,
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

/**
 * 主题模式枚举
 */
export enum ThemeMode {
  Light = 'light',
  Dark = 'dark'
}

/**
 * 主题颜色预设枚举
 */
export enum ThemeColorPresets {
  Default = 'default',
  Green = 'green',
  Purple = 'purple',
  Red = 'red',
  Blue = 'blue',
  Brown = 'brown'
}

/**
 * 国际化语言枚举
 */
export enum LocalEnum {
  en_US = 'en_US',
  zh_CN = 'zh_CN'
}

/**
 * 本地存储键名枚举
 */
export enum StorageEnum {
  UserInfo = 'userInfo',
  UserToken = 'userToken',
  Settings = 'settings',
  I18N = 'i18nextLng'
}

/**
 * 主题布局枚举
 */
export enum ThemeLayout {
  Side = 'side',
  Top = 'top',
  Mix = 'mix'
}

/**
 * 多标签页操作类型枚举
 */
export enum MultiTabOperation {
  FULLSCREEN = 'fullscreen',
  REFRESH = 'refresh',
  CLOSE = 'close',
  CLOSEOTHERS = 'closeOthers',
  CLOSEALL = 'closeAll',
  CLOSELEFT = 'closeLeft',
  CLOSERIGHT = 'closeRight'
}

/**
 * 页面过渡动画枚举
 */
export enum ThemePageTransition {
  FadeIn = 'fadeIn',
  FadeDown = 'fadeDown',
  FadeRight = 'fadeRight'
}

import { ThemeConfig } from 'antd'

import { ThemeColorPresets, ThemePageTransition } from '@/types/enum'
/**
 * Antd theme editor: https://ant.design/theme-editor-cn
 */
const customThemeTokenConfig: ThemeConfig['token'] = {
  colorSuccess: '#22c55e',
  colorWarning: '#ff7849',
  colorError: '#ff5630',
  colorInfo: '#00b8d9',

  // 线性化
  wireframe: false,

  borderRadiusSM: 2,
  borderRadius: 4,
  borderRadiusLG: 8
}

const colorPrimarys: {
  [k in ThemeColorPresets]: string
} = {
  default: '#006be6',
  green: '#0d9496',
  purple: '#7166f0',
  red: '#bb1b1b',
  blue: '#0960be',
  brown: '#efbd48'
}

const colorPrimarysBg: {
  [k in ThemeColorPresets]: string
} = {
  default: '#D9E9FB',
  green: '#DBEFF0',
  purple: '#EAE8FD',
  red: '#F6E3DB',
  blue: '#DAE7F5',
  brown: '#FDF5E4'
}

const darkCustomizedTheme = {
  colorBgLayout: '#14161A',
  colorBgContainer: '#1C1E23',
  colorBgElevated: '#1C1E23'
}

const customComponentConfig: ThemeConfig['components'] = {
  Breadcrumb: {
    fontSize: 12,
    separatorMargin: 4
  }
}

const themeModeToken: Record<'dark' | 'light', ThemeConfig> = {
  dark: {
    token: {
      colorBgLayout: darkCustomizedTheme.colorBgLayout,
      colorBgContainer: darkCustomizedTheme.colorBgContainer,
      colorBgElevated: darkCustomizedTheme.colorBgElevated
    },
    components: {
      Modal: {
        headerBg: '#1C1E23',
        contentBg: '#1C1E23',
        footerBg: '#1C1E23'
      },
      Notification: {}
    }
  },
  light: {}
}

const pageTransition: {
  [k in ThemePageTransition]: string
} = {
  fadeIn: 'fade-in',
  fadeDown: 'fade-down',
  fadeRight: 'fade-right'
}

export {
  customThemeTokenConfig,
  customComponentConfig,
  colorPrimarys,
  colorPrimarysBg,
  themeModeToken,
  pageTransition,
  darkCustomizedTheme
}

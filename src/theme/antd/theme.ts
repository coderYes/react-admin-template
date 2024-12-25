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

const customComponentConfig: ThemeConfig['components'] = {
  Breadcrumb: {
    fontSize: 12,
    separatorMargin: 4
  },
  Menu: {
    fontSize: 14,
    colorFillAlter: 'transparent',
    itemColor: 'rgb(145, 158, 171)',
    motionDurationMid: '0.125s',
    motionDurationSlow: '0.125s'
  }
}

const colorPrimarys: {
  [k in ThemeColorPresets]: string
} = {
  default: '#4096ff',
  green: '#00A76F',
  purple: '#722ed1',
  red: '#cf1322',
  blue: '#2f54eb',
  brown: '#fda92d'
}

const themeModeToken: Record<'dark' | 'light', ThemeConfig> = {
  dark: {
    token: {
      colorBgLayout: '#161c24',
      colorBgContainer: '#212b36',
      colorBgElevated: '#161c24'
    },
    components: {
      Modal: {
        headerBg: '#212b36',
        contentBg: '#212b36',
        footerBg: '#212b36'
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
  themeModeToken,
  pageTransition
}

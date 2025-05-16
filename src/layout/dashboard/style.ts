import { ThemeLayout, ThemeMode } from '@/types/enum'
import { ScreenMap } from 'antd/es/_util/responsiveObserver'
import styled from 'styled-components'
import { CustomizeProps } from '.'
const scrollbarStyles = {
  dark: {
    track: '#2c2c2c',
    thumb: '#6b6b6b',
    thumbHover: '#939393'
  },
  light: {
    track: '#FAFAFA',
    thumb: '#C1C1C1',
    thumbHover: '#7D7D7D'
  }
}
export const ProLayoutWrapper = styled.div<{
  $themeLayout?: ThemeLayout
  $screenMap?: ScreenMap
  $themeMode?: ThemeMode
}>`
  height: 100vh;
  overflow: hidden;

  .fade-in-enter {
    opacity: 0;
  }
  .fade-in-enter-active {
    opacity: 1;
    transition: opacity 300ms;
  }
  .fade-in-exit {
    opacity: 1;
  }
  .fade-in-exit-active {
    opacity: 0;
    transition: opacity 300ms;
  }

  .fade-down-enter {
    opacity: 0;
    transform: translateY(20%);
  }
  .fade-down-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition:
      opacity 300ms,
      transform 300ms;
  }
  .fade-down-exit {
    opacity: 1;
    transform: translateY(0%);
  }
  .fade-down-exit-active {
    opacity: 0;
    transform: translateY(20%);
    transition:
      opacity 300ms,
      transform 300ms;
  }

  .fade-right-enter {
    opacity: 0;
    transform: translateX(-30px);
  }
  .fade-right-enter-active {
    opacity: 1;
    transform: translateX(0);
    transition:
      opacity 300ms,
      transform 300ms;
  }
  .fade-right-exit {
    opacity: 1;
    transform: translateX(0);
  }
  .fade-right-exit-active {
    opacity: 0;
    transform: translateX(30px);
    transition:
      opacity 300ms,
      transform 300ms;
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    top: 32px;
  }

  ::-webkit-scrollbar-track {
    border-radius: 8px;
    background: ${({ $themeMode }) =>
      $themeMode === ThemeMode.Dark ? scrollbarStyles.dark.track : scrollbarStyles.light.track};
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: ${({ $themeMode }) =>
      $themeMode === ThemeMode.Dark ? scrollbarStyles.dark.thumb : scrollbarStyles.light.thumb};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ $themeMode }) =>
      $themeMode === ThemeMode.Dark
        ? scrollbarStyles.dark.thumbHover
        : scrollbarStyles.light.thumbHover};
  }

  .ant-pro-layout .ant-pro-layout-content {
    box-sizing: border-box;
    padding: 0px 0px 20px !important;
    position: relative;
  }

  .ant-layout-sider-children {
    padding-inline: 4px !important;
  }
  .ant-pro-base-menu-inline .ant-pro-base-menu-inline-submenu-has-icon > .ant-menu-sub {
    padding: 0 !important;
  }
  .ant-menu .ant-menu-item {
    border-radius: 8px;
  }
  .ant-pro-layout .ant-pro-sider-logo {
    height: 56px;
  }
  .ant-pro-global-header-logo {
    width: ${(props) =>
      (props.$themeLayout === ThemeLayout.Mix || props.$themeLayout === ThemeLayout.Top) &&
      props.$screenMap?.md
        ? 'calc(215px - 16px)'
        : 'auto'};
  }
`

export const HeaderActionItem = styled.div<{ $color: string }>`
  color: ${(props) => props.$color};
`
export const TabWrapper = styled.div`
  width: 100%;
  height: 40px;
  .ant-tabs {
    height: 100%;
    .ant-tabs-content {
      height: 100%;
    }
    .ant-tabs-tabpane {
      height: 100%;
      & > div {
        height: 100%;
      }
    }
  }
`

export const BreadCrumbWrapper = styled.div<{ $attribute: CustomizeProps }>`
  .ant-breadcrumb li:last-child {
    color: ${(props) =>
      props.$attribute.themeMode === ThemeMode.Dark || props.$attribute.darkHeader
        ? 'rgba(255, 255, 255, 0.85)'
        : 'rgba(0, 0, 0, 0.88)'};
  }
  .ant-breadcrumb,
  .ant-breadcrumb a {
    color: ${(props) =>
      props.$attribute.themeMode === ThemeMode.Dark || props.$attribute.darkHeader
        ? 'rgba(255, 255, 255, 0.45)'
        : 'rgba(0, 0, 0, 0.45)'};
  }
  .ant-breadcrumb-separator {
    color: ${(props) =>
      props.$attribute.themeMode === ThemeMode.Dark || props.$attribute.darkHeader
        ? 'rgba(255, 255, 255, 0.45)'
        : 'rgba(0, 0, 0, 0.45)'};
  }
`

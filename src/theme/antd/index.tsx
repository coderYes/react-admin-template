import { ConfigProvider, theme } from 'antd'
import { ThemeProvider } from 'styled-components'
import { ThemeMode } from '@/types/enum'
import {
  colorPrimarys,
  customComponentConfig,
  customThemeTokenConfig,
  themeModeToken
} from './theme'
import type { ReactNode } from 'react'
import { observer } from 'mobx-react-lite'
import rootStore from '@/store'
import useLocale from '@/locales/useLocale'

type Props = {
  children: ReactNode
}
const AntdConfig = ({ children }: Props) => {
  const { themeStore } = rootStore
  const {
    themeSetting: { themeMode, themeColorPresets }
  } = themeStore
  const { language } = useLocale()

  const algorithm = themeMode === ThemeMode.Light ? theme.defaultAlgorithm : theme.darkAlgorithm
  const colorPrimary = colorPrimarys[themeColorPresets]

  return (
    <ConfigProvider
      locale={language.antdLocal}
      theme={{
        token: { colorPrimary, ...customThemeTokenConfig, ...themeModeToken[themeMode].token },
        components: { ...customComponentConfig, ...themeModeToken[themeMode].components },
        algorithm
      }}
    >
      <ThemeProvider theme={{}}>{children}</ThemeProvider>
    </ConfigProvider>
  )
}
export default observer(AntdConfig)

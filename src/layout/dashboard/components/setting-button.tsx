import { IconButton, Iconify, SvgIcon } from '@/components/icon'
import { useThemeToken } from '@/theme/hooks'
import { Card, Drawer, Select, Switch } from 'antd'
import { CSSProperties, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ThemeColorPresets, ThemeLayout, ThemeMode } from '@/types/enum'
import { colorPrimarys, darkCustomizedTheme, pageTransition } from '@/theme/antd/theme'
import Color from 'color'
import rootStore from '@/store'

export default function SettingButton() {
  const { t } = useTranslation()
  const { themeStore } = rootStore
  const {
    themeSetting: {
      themeMode,
      themeColorPresets,
      themeLayout,
      darkHeader,
      darkSidebar,
      pageTransAnimation
    }
  } = themeStore
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { colorPrimary, colorBgBase, colorTextSecondary, colorTextTertiary, colorBgContainer } =
    useThemeToken()

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--ant-menu-submenu',
      (darkSidebar && themeLayout !== ThemeLayout.Top) ||
        (darkHeader && themeLayout === ThemeLayout.Top) ||
        themeMode === ThemeMode.Dark
        ? darkCustomizedTheme.colorBgContainer
        : '#ffffff'
    )
  }, [darkSidebar, darkHeader, themeLayout, themeMode])

  const style: CSSProperties = {
    backdropFilter: 'blur(20px)',
    backgroundRepeat: 'no-repeat, no-repeat',
    backgroundColor: Color(colorBgContainer).alpha(0.9).toString(),
    backgroundPosition: 'right top, left bottom',
    backgroundSize: '50, 50%'
  }
  const setThemeMode = (themeMode: ThemeMode) => {
    themeStore.setSettings({
      themeMode
    })
  }
  const setThemeLayout = (themeLayout: ThemeLayout, darkHeader: boolean) => {
    let isDarkHeader = false
    if (darkHeader) {
      isDarkHeader = themeLayout === ThemeLayout.Side ? false : true
    }
    themeStore.setSettings({
      themeLayout,
      darkHeader: isDarkHeader
    })
  }
  const setThemeColorPresets = (themeColorPresets: ThemeColorPresets) => {
    themeStore.setSettings({
      themeColorPresets
    })
  }

  const setDarkSidebar = (checked: boolean) => {
    themeStore.setSettings({
      darkSidebar: checked
    })
  }

  const setDarkHeader = (checked: boolean) => {
    themeStore.setSettings({
      darkHeader: checked
    })
  }

  const setPageTransition = (value: string) => {
    themeStore.setSettings({
      pageTransAnimation: value
    })
  }

  const layoutBackground = (layout: ThemeLayout) =>
    themeLayout === layout
      ? `linear-gradient(135deg, ${colorBgBase} 0%, ${colorPrimary} 100%)`
      : '#919eab'

  return (
    <>
      <div className="flex items-center justify-center">
        <IconButton className="h-10 w-10" onClick={() => setDrawerOpen(true)}>
          <SvgIcon icon="ic-setting" size="24" />
        </IconButton>
      </div>
      <Drawer
        placement="right"
        title={t('sys.setting.setting')}
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        closable={false}
        width={280}
        styles={{
          body: { padding: 0 },
          mask: { backgroundColor: 'transparent' }
        }}
        style={style}
        extra={
          <IconButton onClick={() => setDrawerOpen(false)} className="h-9 w-9 hover:scale-105">
            <Iconify icon="material-symbols:close" size={24} />
          </IconButton>
        }
      >
        <div className="flex flex-col gap-6 p-6">
          {/* theme mode */}
          <div>
            <div className="mb-3 text-base font-semibold" style={{ color: colorTextSecondary }}>
              {t('sys.setting.themeMode')}
            </div>
            <div className="flex flex-row gap-4">
              <Card
                onClick={() => setThemeMode(ThemeMode.Light)}
                className="flex h-20 w-full cursor-pointer items-center justify-center"
              >
                <SvgIcon
                  icon="ic-settings-mode-light"
                  size="24"
                  color={themeMode === ThemeMode.Light ? colorPrimary : ''}
                />
              </Card>
              <Card
                onClick={() => setThemeMode(ThemeMode.Dark)}
                className="flex h-20 w-full cursor-pointer items-center justify-center"
              >
                <SvgIcon
                  icon="ic-settings-mode-dark"
                  size="24"
                  color={themeMode === ThemeMode.Dark ? colorPrimary : ''}
                />
              </Card>
            </div>
          </div>

          {/* theme layout */}
          <div>
            <div className="mb-3 text-base font-semibold" style={{ color: colorTextSecondary }}>
              {t('sys.setting.layout')}
            </div>
            <div className="grid grid-cols-3 gap-2">
              <Card
                onClick={() => setThemeLayout(ThemeLayout.Mix, darkHeader)}
                className="h-12 cursor-pointer"
                style={{ flexGrow: 1, flexShrink: 0 }}
                styles={{
                  body: {
                    padding: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%'
                  }
                }}
              >
                <div className="flex h-4 w-full items-center justify-between px-1">
                  <div className="flex items-center gap-0.5">
                    <div
                      className="h-1.5 w-1.5 shrink-0 rounded"
                      style={{
                        background: layoutBackground(ThemeLayout.Mix)
                      }}
                    />
                    <div
                      className="h-[3px] w-2 shrink-0 rounded opacity-50"
                      style={{
                        background: layoutBackground(ThemeLayout.Mix)
                      }}
                    />
                  </div>
                  <div
                    className="h-1.5 w-1.5 shrink-0 rounded"
                    style={{
                      background: layoutBackground(ThemeLayout.Mix)
                    }}
                  />
                </div>
                <div className="flex items-center gap-1 h-full w-full flex-1 grow px-1 pb-1">
                  <div className="flex h-full flex-shrink-0 flex-col gap-1 w-3.5 pt-0.5">
                    <div
                      className="h-[3px] w-full flex-shrink-0 rounded opacity-50"
                      style={{ background: layoutBackground(ThemeLayout.Mix) }}
                    />
                    <div
                      className="h-[3px] max-w-[10px] flex-shrink-0 rounded opacity-20"
                      style={{ background: layoutBackground(ThemeLayout.Mix) }}
                    />
                    <div
                      className="h-[3px] max-w-[10px] flex-shrink-0 rounded opacity-10"
                      style={{ background: layoutBackground(ThemeLayout.Mix) }}
                    />
                  </div>
                  <div
                    className="h-full w-full rounded opacity-20"
                    style={{
                      background: layoutBackground(ThemeLayout.Mix)
                    }}
                  />
                </div>
              </Card>
              <Card
                onClick={() => setThemeLayout(ThemeLayout.Side, darkHeader)}
                className="h-12 cursor-pointer"
                style={{ flexGrow: 1, flexShrink: 0 }}
                styles={{
                  body: {
                    padding: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%'
                  }
                }}
              >
                <div className="flex h-full flex-shrink-0 flex-col justify-between gap-1 py-1 pl-1">
                  <div className="flex items-center gap-0.5">
                    <div
                      className="h-1.5 w-1.5 shrink-0 rounded"
                      style={{
                        background: layoutBackground(ThemeLayout.Side)
                      }}
                    />
                    <div
                      className="h-[3px] w-2 shrink-0 rounded opacity-50"
                      style={{
                        background: layoutBackground(ThemeLayout.Side)
                      }}
                    />
                  </div>
                  <div className="flex flex-shrink-0 flex-col gap-1 w-3.5">
                    <div
                      className="h-[3px] w-full flex-shrink-0 rounded opacity-50"
                      style={{ background: layoutBackground(ThemeLayout.Side) }}
                    />
                    <div
                      className="h-[3px] max-w-[10px] flex-shrink-0 rounded opacity-20"
                      style={{ background: layoutBackground(ThemeLayout.Side) }}
                    />
                  </div>
                  <div className="flex items-center">
                    <div
                      className="h-1.5 w-1.5 shrink-0 rounded"
                      style={{
                        background: layoutBackground(ThemeLayout.Side)
                      }}
                    />
                  </div>
                </div>
                <div className="h-full w-full flex-1 flex-grow p-1">
                  <div
                    className="h-full w-full rounded opacity-20"
                    style={{ background: layoutBackground(ThemeLayout.Side) }}
                  />
                </div>
              </Card>
              <Card
                onClick={() => setThemeLayout(ThemeLayout.Top, darkHeader)}
                className="h-12 cursor-pointer"
                style={{ flexGrow: 1, flexShrink: 0 }}
                styles={{
                  body: {
                    padding: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%'
                  }
                }}
              >
                <div className="flex h-4 w-full items-center justify-between px-1">
                  <div className="flex items-center gap-0.5">
                    <div
                      className="h-1.5 w-1.5 shrink-0 rounded"
                      style={{
                        background: layoutBackground(ThemeLayout.Top)
                      }}
                    />
                    <div
                      className="h-[3px] w-2 shrink-0 rounded opacity-50"
                      style={{
                        background: layoutBackground(ThemeLayout.Top)
                      }}
                    />
                    <div
                      className="h-[3px] w-6 shrink-0 rounded opacity-30"
                      style={{
                        background: layoutBackground(ThemeLayout.Top)
                      }}
                    />
                  </div>
                  <div
                    className="h-1.5 w-1.5 shrink-0 rounded"
                    style={{
                      background: layoutBackground(ThemeLayout.Top)
                    }}
                  />
                </div>
                <div className="flex items-center h-full w-full flex-1 grow px-1 pb-1">
                  <div
                    className="h-full w-full rounded opacity-20"
                    style={{
                      background: layoutBackground(ThemeLayout.Top)
                    }}
                  />
                </div>
              </Card>
            </div>
          </div>

          {/* theme presets */}
          <div>
            <div className="mb-3 text-base font-semibold" style={{ color: colorTextSecondary }}>
              {t('sys.setting.themeColor')}
            </div>
            <div className="grid grid-cols-3 gap-x-4 gap-y-3">
              {Object.entries(colorPrimarys).map(([preset, color]) => (
                <Card
                  key={preset}
                  className="flex h-14 w-full cursor-pointer items-center justify-center"
                  style={{
                    backgroundColor: themeColorPresets === preset ? `${color}14` : ''
                  }}
                  onClick={() => setThemeColorPresets(preset as ThemeColorPresets)}
                >
                  <div style={{ color }}>
                    <Iconify
                      icon="material-symbols:circle"
                      color={color}
                      size={themeColorPresets === preset ? 24 : 12}
                      className="transition-all duration-200 ease-in-out transform origin-center"
                    />
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Page config */}
          <div>
            <div className="mb-3 text-base font-semibold" style={{ color: colorTextSecondary }}>
              {t('sys.setting.page')}
            </div>
            <div className="flex flex-col gap-2">
              <div
                className="flex items-center justify-between"
                style={{ color: colorTextTertiary }}
              >
                <div>{t('sys.setting.darkSidebar')}</div>
                <Switch
                  size="small"
                  checked={darkSidebar}
                  onChange={(checked) => setDarkSidebar(checked)}
                />
              </div>
              {themeLayout !== ThemeLayout.Side && (
                <div
                  className="flex items-center justify-between"
                  style={{ color: colorTextTertiary }}
                >
                  <div>{t('sys.setting.darkHeader')}</div>
                  <Switch
                    size="small"
                    checked={darkHeader}
                    onChange={(checked) => setDarkHeader(checked)}
                  />
                </div>
              )}

              <div
                className="flex items-center justify-between"
                style={{ color: colorTextTertiary }}
              >
                <div>{t('sys.setting.transition.label')}</div>
                <Select
                  defaultValue={pageTransAnimation}
                  style={{ width: 120 }}
                  size="small"
                  options={Object.entries(pageTransition).map(([k, v]) => ({
                    label: t(`sys.setting.transition.${k}`),
                    value: k
                  }))}
                  onChange={(value) => setPageTransition(value)}
                />
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  )
}

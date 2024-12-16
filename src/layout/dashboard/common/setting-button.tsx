import { IconButton, Iconify, SvgIcon } from '@/components/icon'
import { useThemeToken } from '@/theme/hooks'
import { Card, Drawer, Switch } from 'antd'
import { CSSProperties, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ThemeColorPresets, ThemeLayout, ThemeMode } from '@/types/enum'
import { colorPrimarys } from '@/theme/antd/theme'
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
      breadCrumb,
      multiTab,
      darkSidebar
    }
  } = themeStore
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { colorPrimary, colorBgBase, colorTextSecondary, colorTextTertiary, colorBgContainer } =
    useThemeToken()

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
  const setThemeLayout = (themeLayout: ThemeLayout) => {
    themeStore.setSettings({
      themeLayout
    })
  }
  const setThemeColorPresets = (themeColorPresets: ThemeColorPresets) => {
    themeStore.setSettings({
      themeColorPresets
    })
  }
  const setBreadCrumn = (checked: boolean) => {
    themeStore.setSettings({
      breadCrumb: checked
    })
  }
  const setMultiTab = (checked: boolean) => {
    themeStore.setSettings({
      multiTab: checked
    })
  }
  const setDarkSidebar = (checked: boolean) => {
    themeStore.setSettings({
      darkSidebar: checked
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
            <div className="grid grid-cols-2 gap-4">
              <Card
                onClick={() => setThemeLayout(ThemeLayout.Vertical)}
                className="h-24 cursor-pointer"
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
                <div className="flex h-full w-7 flex-shrink-0 flex-col gap-1 p-1">
                  <div
                    className="h-2 w-2 flex-shrink-0 rounded"
                    style={{
                      background: layoutBackground(ThemeLayout.Vertical)
                    }}
                  />
                  <div
                    className="h-1 w-full flex-shrink-0 rounded opacity-50"
                    style={{
                      background: layoutBackground(ThemeLayout.Vertical)
                    }}
                  />
                  <div
                    className="h-1 max-w-[12px] flex-shrink-0 rounded opacity-20"
                    style={{
                      background: layoutBackground(ThemeLayout.Vertical)
                    }}
                  />
                </div>
                <div className="h-full w-full flex-1 flex-grow p-1">
                  <div
                    className="h-full w-full rounded opacity-20"
                    style={{
                      background: layoutBackground(ThemeLayout.Vertical)
                    }}
                  />
                </div>
              </Card>
              <Card
                onClick={() => setThemeLayout(ThemeLayout.Mini)}
                className="h-24 cursor-pointer"
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
                <div className="flex h-full flex-shrink-0 flex-col gap-1 p-1">
                  <div
                    className="h-2 w-2 flex-shrink-0 rounded"
                    style={{ background: layoutBackground(ThemeLayout.Mini) }}
                  />
                  <div
                    className="h-1 w-full flex-shrink-0 rounded opacity-50"
                    style={{ background: layoutBackground(ThemeLayout.Mini) }}
                  />
                  <div
                    className="h-1 max-w-[12px] flex-shrink-0 rounded opacity-20"
                    style={{ background: layoutBackground(ThemeLayout.Mini) }}
                  />
                </div>
                <div className="h-full w-full flex-1 flex-grow p-1">
                  <div
                    className="h-full w-full rounded opacity-20"
                    style={{ background: layoutBackground(ThemeLayout.Mini) }}
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
                <div>{t('sys.setting.breadCrumb')}</div>
                <Switch
                  size="small"
                  checked={breadCrumb}
                  onChange={(checked) => setBreadCrumn(checked)}
                />
              </div>
              <div
                className="flex items-center justify-between"
                style={{ color: colorTextTertiary }}
              >
                <div>{t('sys.setting.tabs')}</div>
                <Switch
                  size="small"
                  checked={multiTab}
                  onChange={(checked) => setMultiTab(checked)}
                />
              </div>
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
            </div>
          </div>
        </div>
      </Drawer>
    </>
  )
}

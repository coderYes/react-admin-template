import { CSSProperties, useState } from 'react'
import { useThemeToken } from '@/theme/hooks'
import { HEADER_HEIGHT, OFFSET_HEADER_HEIGHT } from './config'
import { observer } from 'mobx-react-lite'
import { Drawer } from 'antd'
import { IconButton, Iconify, SvgIcon } from '@/components/icon'
import type { LocalEnum } from '@/types/enum'
import Color from 'color'
import rootStore from '@/store'
import BreadCrumb from './common/bread-crumb'
import NavVertical from './nav/nav-vertical'
import LocalePicker from './common/locale-picker'
import SettingButton from './common/setting-button'
import AccountDropdown from './common/account-dropdown'

export type Locale = keyof typeof LocalEnum

type Props = {
  offsetTop?: boolean
  onToggleFullscreen: Function
}
const Header = ({ offsetTop = false, onToggleFullscreen }: Props) => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { themeStore } = rootStore
  const {
    themeSetting: { breadCrumb }
  } = themeStore
  const { colorBgElevated } = useThemeToken()

  const headerStyle: CSSProperties = {
    backgroundColor: Color(colorBgElevated).alpha(1).toString(),
    width: '100%'
  }

  return (
    <>
      <header className="sticky top-0 right-0 left-auto" style={headerStyle}>
        <div
          className="flex flex-grow items-center justify-between px-4 text-[#637381] backdrop-blur xl:px-6 2xl:px-10"
          style={{
            height: offsetTop ? OFFSET_HEADER_HEIGHT : HEADER_HEIGHT,
            transition: 'height 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
          }}
        >
          <div className="flex items-baseline">
            <IconButton onClick={() => setDrawerOpen(true)} className="h-10 w-10 md:hidden">
              <SvgIcon icon="ic-menu" size="24" />
            </IconButton>
            <div className="ml-4 hidden md:block">{breadCrumb ? <BreadCrumb /> : null}</div>
          </div>

          <div className="flex">
            <LocalePicker />
            <IconButton
              onClick={() => window.open('https://github.com/coderYes/react-admin-template')}
            >
              <Iconify icon="mdi:github" size={24} />
            </IconButton>
            <IconButton onClick={() => onToggleFullscreen()}>
              <Iconify icon="solar:full-screen-bold-duotone" size={24} />
            </IconButton>
            <SettingButton />
            <AccountDropdown />
          </div>
        </div>
      </header>
      <Drawer
        placement="left"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        closeIcon={false}
        styles={{
          header: {
            display: 'none'
          },
          body: {
            padding: 0,
            overflow: 'hidden'
          }
        }}
        width="auto"
      >
        <NavVertical closeSideBarDrawer={() => setDrawerOpen(false)} />
      </Drawer>
    </>
  )
}
export default observer(Header)

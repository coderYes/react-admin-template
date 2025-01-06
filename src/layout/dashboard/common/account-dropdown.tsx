import React from 'react'
import rootStore from '@/store'
import { IconButton } from '@/components/icon'
import { Divider, Dropdown, type MenuProps } from 'antd'
import { useThemeToken } from '@/theme/hooks'
import { NavLink, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env
export default function AccountDropdown() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { colorBgElevated, borderRadiusLG, boxShadowSecondary } = useThemeToken()
  const { userStore } = rootStore
  const { avatar, name } = userStore

  const contentStyle: React.CSSProperties = {
    backgroundColor: colorBgElevated,
    borderRadius: borderRadiusLG,
    boxShadow: boxShadowSecondary
  }

  const menuStyle: React.CSSProperties = {
    boxShadow: 'none'
  }

  const onLogout = () => {
    userStore.logout().then(() => {
      navigate('/')
    })
  }

  const items: MenuProps['items'] = [
    {
      label: <NavLink to={HOMEPAGE}>{t('admin.dashboard.workbench')}</NavLink>,
      key: '0'
    },
    { type: 'divider' },
    {
      label: (
        <button className="font-bold text-warning" type="button">
          {t('sys.login.logout')}
        </button>
      ),
      key: '2',
      onClick: onLogout
    }
  ]
  return (
    <Dropdown
      menu={{ items }}
      trigger={['click']}
      dropdownRender={(menu) => (
        <div style={contentStyle}>
          <div className="flex flex-col items-start p-4">
            <div>{name}</div>
            {/* <div className="text-gray">{email}</div> */}
          </div>
          <Divider style={{ margin: 0 }} />
          {React.cloneElement(menu as React.ReactElement, { style: menuStyle })}
        </div>
      )}
    >
      <IconButton className="h-10 w-10 transform-none px-0 hover:scale-105">
        <img className="h-8 w-8 rounded-full" src={avatar} alt="" />
      </IconButton>
    </Dropdown>
  )
}

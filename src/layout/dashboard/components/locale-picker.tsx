import { Dropdown, Space } from 'antd'
import useLocale, { LANGUAGE_MAP } from '@/locales/useLocale'
import type { MenuProps } from 'antd'
import { IconButton, SvgIcon } from '@/components/icon'
import { LocalEnum } from '@/types/enum'

/**
 * Locale Picker
 */
type Locale = keyof typeof LocalEnum
export default function LocalePicker() {
  const { setLocale } = useLocale()

  const localeList: MenuProps['items'] = Object.values(LANGUAGE_MAP).map((item) => {
    return {
      key: item.locale,
      label: (
        <Space>
          <span className="text-xs">{item.abbr}</span>
          <span className="text-sm">{item.label}</span>
        </Space>
      )
    }
  })

  return (
    <Dropdown
      placement="bottomRight"
      trigger={['click']}
      menu={{
        items: localeList,
        onClick: (e) => setLocale(e.key as Locale)
      }}
    >
      <div>
        <IconButton className="h-10 w-10 hover:scale-105">
          <SvgIcon icon="ic-language" size="24" className="rounded-md" />
        </IconButton>
      </div>
    </Dropdown>
  )
}

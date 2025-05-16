import { IconButton, Iconify } from '@/components/icon'
import LocalePicker from './locale-picker'
import SettingButton from './setting-button'

export default function HeaderContentRender() {
  return (
    <div className="flex items-center">
      <LocalePicker />
      <IconButton onClick={() => window.open('https://github.com/coderYes/react-admin-template')}>
        <Iconify icon="mdi:github" size={24} />
      </IconButton>
      <SettingButton />
    </div>
  )
}

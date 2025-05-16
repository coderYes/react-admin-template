import { NavLink } from 'react-router-dom'

import { useThemeToken } from '@/theme/hooks'

import { Iconify } from '../icon'

interface Props {
  size?: number | string
}
function Logo({ size = 32 }: Props) {
  const { colorPrimary } = useThemeToken()

  return <Iconify icon="simple-icons:odysee" color={colorPrimary} size={size} />
}

export default Logo

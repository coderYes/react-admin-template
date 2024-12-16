import { useResponsive } from '@/theme/hooks'
import NavVertical from './nav-vertical'

export default function Nav() {
  const { screenMap } = useResponsive()
  if (screenMap.md) return <NavVertical />
  return null
}

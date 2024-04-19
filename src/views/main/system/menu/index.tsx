import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
interface IProps {
  children?: ReactNode
}

const Menu: FC<IProps> = () => {
  return <div>Menu</div>
}

export default memo(Menu)

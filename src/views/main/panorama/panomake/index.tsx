import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
interface IProps {
  children?: ReactNode
}

const Panomake: FC<IProps> = () => {
  return <div>Panomake</div>
}

export default memo(Panomake)

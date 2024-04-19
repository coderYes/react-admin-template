import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
interface IProps {
  children?: ReactNode
}

const Test3: FC<IProps> = () => {
  return <div>Test3</div>
}

export default memo(Test3)

import { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}

const NotFound: FC<IProps> = () => {
  return (
    <div
      className="w100 h100 flex-row j-c-center a-i-center"
      style={{ fontSize: '100px', fontWeight: 'bold' }}
    >
      404 Not Found
    </div>
  )
}

export default memo(NotFound)

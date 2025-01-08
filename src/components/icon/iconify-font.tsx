import styled from 'styled-components'
import { createFromIconfontCN } from '@ant-design/icons'

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_2298093_rnp72ifj3ba.js'
})

interface Props {
  icon: string
  size?: string | number
  className?: string
  other?: any
}
export default function Iconify({ icon, size = '1em', className = '', ...other }: Props) {
  return (
    <StyledIconify className="anticon">
      {/* https://www.iconfont.cn/ */}
      <IconFont
        type={icon}
        width={size}
        height={size}
        className={`m-auto ${className}`}
        {...other}
      />
    </StyledIconify>
  )
}

const StyledIconify = styled.div`
  display: inline-flex;
  vertical-align: middle;
  svg {
    display: inline-block;
  }
`

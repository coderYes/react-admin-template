import React, { forwardRef, useImperativeHandle } from 'react'
import { useThemeToken } from '@/theme/hooks'
import { Col, Divider, Row, Tooltip, Typography } from 'antd'
import { icons } from './icon'
import { Iconify } from '@/components/icon'
import { cn } from '@/utils'

type Props = {
  className?: string
  value?: string
  onChoose?: (icon: string) => void
}

const IconPopover = forwardRef(({ className, value, onChoose }: Props, ref) => {
  const { colorPrimary } = useThemeToken()

  const onIconClick = (icon: string) => {
    if (!onChoose) return
    onChoose(icon)
  }

  useImperativeHandle(ref, () => ({}))

  return (
    <div
      className={cn(
        'absolute left-1/2 transform -translate-x-1/2 w-3/5 box-border p-2 bg-white rounded-lg',
        className
      )}
      style={{
        boxShadow:
          '0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)'
      }}
    >
      <div className="h-7 flex justify-between items-center">
        <div>请选择图标</div>
        <Typography.Link
          href="https://icon-sets.iconify.design/"
          target="_blank"
          style={{ color: colorPrimary }}
        >
          more
        </Typography.Link>
      </div>
      <Divider className="my-1" />
      <div className="h-48 overflow-y-auto">
        <Row>
          {icons.map((item, index) => (
            <Col span={4} key={index}>
              <div className="relative pt-full" onClick={() => onIconClick(item)}>
                <div className="absolute top-0 left-0 w-full h-full box-border p-1">
                  <Tooltip title={item}>
                    <div
                      className={cn(
                        value === item ? 'border-[#fda92d]' : '',
                        'cursor-pointer w-full h-full rounded-md border-x border-y flex justify-center items-center hover:border-slate-400'
                      )}
                    >
                      <Iconify
                        size={20}
                        icon={item}
                        className={cn(value === item ? 'text-[#fda92d]' : '', 'w-full h-full')}
                      />
                    </div>
                  </Tooltip>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  )
})

export default IconPopover

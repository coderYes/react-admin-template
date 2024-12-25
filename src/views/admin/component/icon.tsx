import { StepBackwardOutlined } from '@ant-design/icons'
import { Card, Space, Typography } from 'antd'

import { Iconify, SvgIcon } from '@/components/icon'
import { useThemeToken } from '@/theme/hooks'

export default function IconPage() {
  const { colorPrimary, colorInfo, colorSuccess, colorWarning, colorError } = useThemeToken()
  return (
    <Space direction="vertical" style={{ display: 'flex' }}>
      <Card title="Antd Icons">
        <span className="mr-1">For more info</span>
        <Typography.Link
          href="https://ant.design/components/icon-cn"
          style={{ color: colorPrimary }}
        >
          click here
        </Typography.Link>

        <p className="mt-2 flex flex-col text-sky-500">
          <code>{`import { StepBackwardOutlined } from '@ant-design/icons';`}</code>
          <code>{'<StepBackwardOutlined /> '}</code>
        </p>

        <div className="mt-4">
          <StepBackwardOutlined width={24} />
        </div>
      </Card>
      <Card title="Iconify Icons">
        <span className="mr-1">Simply beautiful open source icons. For more info</span>
        <Typography.Link href="https://iconify.design/" style={{ color: colorPrimary }}>
          click here
        </Typography.Link>

        <p className="mt-2">
          <code className="text-sky-500">{` <Iconify icon="mdi:emoji-robot" size={24} color={colorPrimary} /> `}</code>
        </p>

        <div className="mt-4 flex gap-4">
          <Iconify icon="mdi:emoji-robot" size={24} color={colorPrimary} />
          <Iconify icon="mdi:emoji-robot" size={24} color={colorInfo} />
          <Iconify icon="mdi:emoji-robot" size={24} color={colorSuccess} />
          <Iconify icon="mdi:emoji-robot" size={24} color={colorWarning} />
          <Iconify icon="mdi:emoji-robot" size={24} color={colorError} />
        </div>
      </Card>
      <Card title="Svg Icons">
        <span className="mr-1">For more info</span>
        <Typography.Link
          href="https://github.com/vbenjs/vite-plugin-svg-icons"
          style={{ color: colorPrimary }}
        >
          click here
        </Typography.Link>

        <p className="mt-2">
          <code className="text-sky-500">{`<SvgIcon icon="ic-people" size={24} color={colorPrimary} />`}</code>
        </p>

        <div className="mt-4 flex gap-4">
          <SvgIcon icon="ic-people" size={24} color={colorPrimary} />
          <SvgIcon icon="ic-people" size={24} color={colorInfo} />
          <SvgIcon icon="ic-people" size={24} color={colorSuccess} />
          <SvgIcon icon="ic-people" size={24} color={colorWarning} />
          <SvgIcon icon="ic-people" size={24} color={colorError} />
        </div>
      </Card>
    </Space>
  )
}

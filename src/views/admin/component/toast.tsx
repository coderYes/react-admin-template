import { toast, notice } from '@/components/toast'
import { Button, Card, Col, Row, Space, Collapse } from 'antd'
import { customThemeTokenConfig } from '@/theme/antd/theme'
import { useThemeToken } from '@/theme/hooks'
import { useTranslation } from 'react-i18next'
import { Iconify } from '@/components/icon'
function Toast() {
  const { t } = useTranslation()
  const { colorBgBase, colorPrimary } = useThemeToken()

  const btn = (
    <Space>
      <Button type="link" size="small" onClick={() => {}}>
        {t('sys.admin.component.toast.destroy')}
      </Button>
      <Button type="primary" size="small" onClick={() => {}}>
        {t('sys.admin.component.toast.confirm')}
      </Button>
    </Space>
  )

  return (
    <Row gutter={16}>
      <Col className="mb-2" span={24}>
        <Collapse
          defaultActiveKey={['1']}
          items={[
            {
              key: '1',
              label: t('sys.admin.component.toast.message'),
              showArrow: false,
              children: (
                <Space wrap>
                  <Button
                    style={{ background: customThemeTokenConfig?.colorInfo, color: colorBgBase }}
                    onClick={() => {
                      toast('Message Default')
                    }}
                  >
                    Default
                  </Button>
                  <Button
                    style={{ background: customThemeTokenConfig?.colorSuccess, color: colorBgBase }}
                    onClick={() => {
                      toast({
                        content: 'Message Success',
                        type: 'success',
                        duration: 2
                      })
                    }}
                  >
                    Success
                  </Button>
                  <Button
                    style={{ background: customThemeTokenConfig?.colorError, color: colorBgBase }}
                    onClick={() => {
                      toast({
                        content: 'Message Error',
                        type: 'error',
                        duration: 2
                      })
                    }}
                  >
                    Error
                  </Button>
                  <Button
                    style={{ background: customThemeTokenConfig?.colorWarning, color: colorBgBase }}
                    onClick={() => {
                      toast({
                        content: 'Message Warning',
                        type: 'warning',
                        duration: 2
                      })
                    }}
                  >
                    Warning
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => {
                      toast({
                        content: 'Action in progress..',
                        type: 'loading'
                      }).then(() => {
                        toast({
                          content: 'Loading finished',
                          type: 'success'
                        })
                      })
                    }}
                  >
                    Promise
                  </Button>
                </Space>
              )
            }
          ]}
        />
      </Col>
      <Col className="mb-2" span={24}>
        <Collapse
          defaultActiveKey={['1']}
          items={[
            {
              key: '1',
              label: t('sys.admin.component.toast.notification'),
              showArrow: false,
              children: (
                <Row gutter={16}>
                  <Col className="mb-2" span={12}>
                    <Card title={t('sys.admin.component.toast.simple')}>
                      <Space wrap>
                        <Button
                          style={{
                            background: customThemeTokenConfig?.colorInfo,
                            color: colorBgBase
                          }}
                          onClick={() => {
                            notice({
                              message: 'Notification Default',
                              description: 'Notification Default Description'
                            })
                          }}
                        >
                          Info
                        </Button>
                        <Button
                          style={{
                            background: customThemeTokenConfig?.colorSuccess,
                            color: colorBgBase
                          }}
                          onClick={() => {
                            notice({
                              message: 'Notification Success',
                              description: 'Notification Success Description',
                              type: 'success'
                            })
                          }}
                        >
                          Success
                        </Button>
                        <Button
                          style={{
                            background: customThemeTokenConfig?.colorError,
                            color: colorBgBase
                          }}
                          onClick={() => {
                            notice({
                              message: 'Notification Error',
                              description: 'Notification Error Description',
                              type: 'error'
                            })
                          }}
                        >
                          Error
                        </Button>
                        <Button
                          style={{
                            background: customThemeTokenConfig?.colorWarning,
                            color: colorBgBase
                          }}
                          onClick={() => {
                            notice({
                              message: 'Notification Warning',
                              description: 'Notification Warning Description',
                              type: 'warning'
                            })
                          }}
                        >
                          Warning
                        </Button>
                      </Space>
                    </Card>
                  </Col>
                  <Col className="mb-2" span={12}>
                    <Card title={t('sys.admin.component.toast.action')}>
                      <Space wrap>
                        <Button
                          style={{
                            background: customThemeTokenConfig?.colorInfo,
                            color: colorBgBase
                          }}
                          onClick={() => {
                            notice({
                              message: 'Notification Default',
                              description: 'Notification Default Description',
                              btn
                            })
                          }}
                        >
                          Info
                        </Button>
                        <Button
                          style={{
                            background: customThemeTokenConfig?.colorSuccess,
                            color: colorBgBase
                          }}
                          onClick={() => {
                            notice({
                              message: 'Notification Success',
                              description: 'Notification Success Description',
                              type: 'success',
                              btn
                            })
                          }}
                        >
                          Success
                        </Button>
                        <Button
                          style={{
                            background: customThemeTokenConfig?.colorError,
                            color: colorBgBase
                          }}
                          onClick={() => {
                            notice({
                              message: 'Notification Error',
                              description: 'Notification Error Description',
                              type: 'error',
                              btn
                            })
                          }}
                        >
                          Error
                        </Button>
                        <Button
                          style={{
                            background: customThemeTokenConfig?.colorWarning,
                            color: colorBgBase
                          }}
                          onClick={() => {
                            notice({
                              message: 'Notification Warning',
                              description: 'Notification Warning Description',
                              type: 'warning',
                              btn
                            })
                          }}
                        >
                          Warning
                        </Button>
                      </Space>
                    </Card>
                  </Col>
                  <Col className="mb-2" span={12}>
                    <Card title={t('sys.admin.component.toast.position')}>
                      <Space wrap>
                        <Button
                          type="primary"
                          onClick={() => {
                            notice({
                              message: 'Notification Top',
                              description: 'Notification Top Description',
                              placement: 'top'
                            })
                          }}
                        >
                          Top
                        </Button>
                        <Button
                          type="primary"
                          onClick={() => {
                            notice({
                              message: 'Notification TopLeft',
                              description: 'Notification TopLeft Description',
                              placement: 'topLeft'
                            })
                          }}
                        >
                          TopLeft
                        </Button>
                        <Button
                          type="primary"
                          onClick={() => {
                            notice({
                              message: 'Notification TopRight',
                              description: 'Notification TopRight Description',
                              placement: 'topRight'
                            })
                          }}
                        >
                          TopRight
                        </Button>
                        <Button
                          type="primary"
                          onClick={() => {
                            notice({
                              message: 'Notification Bottom',
                              description: 'Notification Bottom Description',
                              placement: 'bottom'
                            })
                          }}
                        >
                          Bottom
                        </Button>
                        <Button
                          type="primary"
                          onClick={() => {
                            notice({
                              message: 'Notification BottomLeft',
                              description: 'Notification BottomLeft Description',
                              placement: 'bottomLeft'
                            })
                          }}
                        >
                          BottomLeft
                        </Button>
                        <Button
                          type="primary"
                          onClick={() => {
                            notice({
                              message: 'Notification BottomRight',
                              description: 'Notification BottomRight Description',
                              placement: 'bottomRight'
                            })
                          }}
                        >
                          BottomRight
                        </Button>
                      </Space>
                    </Card>
                  </Col>
                  <Col className="mb-2" span={12}>
                    <Card title={t('sys.admin.component.toast.promise')}>
                      <Space wrap>
                        <Button
                          type="primary"
                          onClick={() => {
                            notice({
                              message: 'Notification Promise',
                              description: 'Notification Promise Description',
                              duration: 2,
                              closeIcon: true,
                              icon: (
                                <Iconify icon="svg-spinners:6-dots-rotate" color={colorPrimary} />
                              )
                            }).then(() => {
                              toast({
                                content: 'Loading finished',
                                type: 'success'
                              })
                            })
                          }}
                        >
                          Promise
                        </Button>
                      </Space>
                    </Card>
                  </Col>
                </Row>
              )
            }
          ]}
        />
      </Col>
    </Row>
  )
}
export default Toast

import Scrollbar from '@/components/scrollbar'
import { useThemeToken } from '@/theme/hooks'
import { Card, Col, Row, Typography } from 'antd'

function ScrollbarView() {
  const { colorPrimary } = useThemeToken()
  return (
    <>
      <Typography.Link
        href="https://grsmto.github.io/simplebar/"
        style={{ color: colorPrimary }}
        className="mb-4 block"
      >
        https://grsmto.github.io/simplebar/
      </Typography.Link>
      <Row gutter={[16, 16]} justify="center">
        <Col span={23} lg={12}>
          <Card title="Vertical">
            <div className="h-80">
              <Scrollbar>
                <div>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, ex est magni
                  error at distinctio deserunt sit provident nulla explicabo eum inventore illum
                  earum corporis nemo illo blanditiis consequatur itaque. Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Temporibus, ex est magni error at distinctio
                  deserunt sit provident nulla explicabo eum inventore illum earum corporis nemo
                  illo blanditiis consequatur itaque. Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Temporibus, ex est magni error at distinctio deserunt sit
                  provident nulla explicabo eum inventore illum earum corporis nemo illo blanditiis
                  consequatur itaque. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Temporibus, ex est magni error at distinctio deserunt sit provident nulla
                  explicabo eum inventore illum earum corporis nemo illo blanditiis consequatur
                  itaque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, ex
                  est magni error at distinctio deserunt sit provident nulla explicabo eum inventore
                  illum earum corporis nemo illo blanditiis consequatur itaque. Lorem ipsum dolor
                  sit amet consectetur adipisicing elit. Temporibus, ex est magni error at
                  distinctio deserunt sit provident nulla explicabo eum inventore illum earum
                  corporis nemo illo blanditiis consequatur itaque. Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Temporibus, ex est magni error at distinctio
                  deserunt sit provident nulla explicabo eum inventore illum earum corporis nemo
                  illo blanditiis consequatur itaque. Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Temporibus, ex est magni error at distinctio deserunt sit
                  provident nulla explicabo eum inventore illum earum corporis nemo illo blanditiis
                  consequatur itaque. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Temporibus, ex est magni error at distinctio deserunt sit provident nulla
                  explicabo eum inventore illum earum corporis nemo illo blanditiis consequatur
                  itaque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, ex
                  est magni error at distinctio deserunt sit provident nulla explicabo eum inventore
                  illum earum corporis nemo illo blanditiis consequatur itaque.
                </div>
              </Scrollbar>
            </div>
          </Card>
        </Col>
        <Col span={23} lg={12}>
          <Card title="Horizontal">
            <Scrollbar>
              <div style={{ width: '200%' }}>
                <div>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, ex est magni
                  error at distinctio deserunt sit provident nulla explicabo eum inventore illum
                  earum corporis nemo illo blanditiis consequatur itaque. Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Temporibus, ex est magni error at distinctio
                  deserunt sit provident nulla explicabo eum inventore illum earum corporis nemo
                  illo blanditiis consequatur itaque. Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Temporibus, ex est magni error at distinctio deserunt sit
                  provident nulla explicabo eum inventore illum earum corporis nemo illo blanditiis
                  consequatur itaque. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Temporibus, ex est magni error at distinctio deserunt sit provident nulla
                  explicabo eum inventore illum earum corporis nemo illo blanditiis consequatur
                  itaque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, ex
                  est magni error at distinctio deserunt sit provident nulla explicabo eum inventore
                  illum earum corporis nemo illo blanditiis consequatur itaque. Lorem ipsum dolor
                  sit amet consectetur adipisicing elit. Temporibus, ex est magni error at
                  distinctio deserunt sit provident nulla explicabo eum inventore illum earum
                  corporis nemo illo blanditiis consequatur itaque. Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Temporibus, ex est magni error at distinctio
                  deserunt sit provident nulla explicabo eum inventore illum earum corporis nemo
                  illo blanditiis consequatur itaque. Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Temporibus, ex est magni error at distinctio deserunt sit
                  provident nulla explicabo eum inventore illum earum corporis nemo illo blanditiis
                  consequatur itaque. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Temporibus, ex est magni error at distinctio deserunt sit provident nulla
                  explicabo eum inventore illum earum corporis nemo illo blanditiis consequatur
                  itaque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, ex
                  est magni error at distinctio deserunt sit provident nulla explicabo eum inventore
                  illum earum corporis nemo illo blanditiis consequatur itaque. Lorem ipsum dolor
                  sit amet consectetur adipisicing elit. Temporibus, ex est magni error at
                  distinctio deserunt sit provident nulla explicabo eum inventore illum earum
                  corporis nemo illo blanditiis consequatur itaque.
                </div>
              </div>
            </Scrollbar>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default ScrollbarView

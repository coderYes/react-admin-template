import { CircleLoading } from '@/components/loading'
import { useThemeToken } from '@/theme/hooks'
import { Card, Divider, Typography } from 'antd'
import { useState } from 'react'
import InfiniteScrollCpn from 'react-infinite-scroll-component'
function InfiniteScroll() {
  const { colorPrimary } = useThemeToken()
  const [list, setList] = useState(Array(10).fill(0))

  const onNext = () => {
    setTimeout(() => {
      setList((prevList) => [...prevList, ...Array(10).fill(0)])
    }, 3000) // 模拟网络请求延迟
  }
  return (
    <>
      <Typography.Link
        href="https://github.com/ankeetmaini/react-infinite-scroll-component"
        style={{ color: colorPrimary }}
        className="mb-4 block"
      >
        https://github.com/ankeetmaini/react-infinite-scroll-component
      </Typography.Link>
      <InfiniteScrollCpn
        dataLength={list.length}
        next={onNext}
        hasMore={true}
        height={'90vh'}
        loader={<CircleLoading other="h-[auto!important]" />}
        endMessage={<Divider plain>已全部加载完毕🤐</Divider>}
      >
        {list.map((_, index) => {
          return (
            <div key={index} className="mb-5 flex justify-center">
              <Card title={`Vertical-${index}`} className="w-full md:w-1/2">
                <div>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum quos velit sed
                    expedita repellendus totam ea illo, voluptate, id quibusdam consequatur nesciunt
                    quasi et praesentium a ab! Voluptates, quaerat eaque?
                  </p>
                  <br />
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum quos velit sed
                    expedita repellendus totam ea illo, voluptate, id quibusdam consequatur nesciunt
                    quasi et praesentium a ab! Voluptates, quaerat eaque?
                  </p>
                  <br />
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum quos velit sed
                    expedita repellendus totam ea illo, voluptate, id quibusdam consequatur nesciunt
                    quasi et praesentium a ab! Voluptates, quaerat eaque?
                  </p>
                </div>
              </Card>
            </div>
          )
        })}
      </InfiniteScrollCpn>
    </>
  )
}
export default InfiniteScroll

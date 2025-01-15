import { ProTable } from '@ant-design/pro-components'
import { Button } from 'antd'

function User() {
  const requestMock = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(null)
      }, 2000)
    })
  }
  return (
    <>
      <ProTable
        defaultSize="small"
        params={{
          id: 1
        }}
        columns={[
          {
            title: '姓名',
            dataIndex: 'name'
          },
          {
            title: '年龄',
            dataIndex: 'age',
            tooltip: '1'
          },
          {
            title: '地址',
            dataIndex: 'address',
            hideInSearch: true
          }
        ]}
        rowKey="id"
        request={async (
          // 第一个参数 params 查询表单和 params 参数的结合
          // 第一个参数中一定会有 pageSize 和  current ，这两个参数是 antd 的规范
          params
        ) => {
          await requestMock()
          return {
            data: [
              {
                id: 1,
                name: '胡彦斌',
                age: 32,
                address: '西湖区湖底公园1号'
              },
              {
                id: 2,
                name: '胡彦祖',
                age: 42,
                address: '西湖区湖底公园1号'
              }
            ],
            // success 请返回 true，
            // 不然 table 会停止解析数据，即使有数据
            success: true,
            // 不传会使用 data 的长度，如果是分页一定要传
            total: 1
          }
        }}
        toolBarRender={(action) => [<Button>111</Button>, <Button>222</Button>]}
        search={{
          className: 'mbe-0'
        }}
      />
    </>
  )
}

export default User

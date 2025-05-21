import { getAllRoleList } from '@/api/role'
import { addUser, delUser, getUser, getUserById, updateUser } from '@/api/user'
import AuthButton from '@/components/auth/authButton'
import { modal } from '@/components/baseNotice'
import { Iconify } from '@/components/icon'
import { useDict, useProTableSizeObserver } from '@/hook'
import { IUserType } from '@/types/user'
import {
  ActionType,
  ModalForm,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProTable
} from '@ant-design/pro-components'
import { Button, Form, message } from 'antd'
import { useRef, useState } from 'react'

function User() {
  const ref = useRef<ActionType>()
  const [formRef] = Form.useForm()
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [title, setTitle] = useState('')
  const [modalType, setModalType] = useState(false)
  const [modalVisit, setModalVisit] = useState(false)

  const ILLUTR_NORMAL_DISABLE = useDict('ILLUTR_NORMAL_DISABLE')
  const ILLUTR_SEX = useDict('ILLUTR_SEX')
  const { tableScrollY } = useProTableSizeObserver(ref, { bottom: 20 })

  const onHandleRow = async (isAdd: boolean, record?: IUserType) => {
    setTitle(isAdd ? '添加用户' : '编辑用户')
    setModalType(isAdd)
    setModalVisit(true)
    if (isAdd) {
      formRef?.resetFields()
    } else {
      const { data } = await getUserById(record!.id)
      formRef?.setFieldsValue(data)
    }
  }

  const onDelDict = (keys?: number) => {
    const ids = keys ? keys + '' : selectedRowKeys.join(',')
    modal.confirm({
      title: '系统提示',
      content: `是否确认用户ID为"${ids}"的数据项？`,
      onOk() {
        delUser(ids).then(() => {
          message.success('删除成功')
          ref?.current?.reload()
        })
      }
    })
  }

  const onFinish = async () => {
    formRef
      ?.validateFields()
      .then(async () => {
        const data: IUserType = formRef?.getFieldsValue(true)
        console.log('data', data)
        if (modalType) {
          addUser(data).then(() => {
            message.success('修改成功')
            setModalVisit(false)
            ref?.current?.reload()
          })
        } else {
          updateUser(data).then(() => {
            message.success('修改成功')
            setModalVisit(false)
            ref?.current?.reload()
          })
        }
      })
      .catch((errorInfo) => {})
  }

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }

  return (
    <>
      <ProTable<IUserType>
        actionRef={ref}
        defaultSize="small"
        rowSelection={{
          selectedRowKeys,
          onChange: onSelectChange
        }}
        request={async (params) => {
          const { current, pageSize, ...otherParams } = params
          const res = await getUser({
            ...otherParams,
            current: current,
            size: pageSize
          })
          return {
            data: res.data.records,
            success: res.code === 200,
            total: res.data.total
          }
        }}
        pagination={{
          pageSize: 10
        }}
        toolBarRender={(action) => [
          <AuthButton perms="system:user:add">
            <Button type="primary" onClick={() => onHandleRow(true)}>
              新增
            </Button>
          </AuthButton>,
          <AuthButton perms="system:user:remove">
            <Button danger onClick={() => onDelDict()}>
              批量删除
            </Button>
          </AuthButton>
        ]}
        columns={[
          {
            title: '用户ID',
            dataIndex: 'id',
            width: 200
          },
          {
            title: '用户名',
            dataIndex: 'userName',
            width: 200
          },
          {
            title: '状态',
            dataIndex: 'status',
            width: 200,
            valueType: 'select',
            fieldProps: {
              options: ILLUTR_NORMAL_DISABLE.map((item) => ({
                label: item.label,
                value: Number(item.value)
              }))
            }
          },
          {
            title: '性别',
            dataIndex: 'sex',
            width: 200,
            valueType: 'select',
            fieldProps: {
              options: ILLUTR_SEX
            },
            hideInSearch: true
          },
          {
            title: '手机号',
            dataIndex: 'phonenumber',
            width: 200,
            valueType: 'text'
          },
          {
            title: '邮箱',
            dataIndex: 'email',
            width: 200,
            hideInSearch: true
          },
          {
            title: '备注',
            dataIndex: 'remark',
            width: 200
          },
          {
            title: '操作',
            key: 'action',
            width: 200,
            fixed: 'right',
            hideInSearch: true,
            render: (_, record) => {
              if (record.id === 1) return <></>
              return (
                <span>
                  <AuthButton perms="system:user:edit">
                    <Button
                      type="link"
                      icon={<Iconify icon="mingcute:edit-line" />}
                      onClick={() => onHandleRow(false, record)}
                    >
                      修改
                    </Button>
                  </AuthButton>
                  <AuthButton perms="system:user:remove">
                    <Button
                      type="link"
                      icon={<Iconify icon="material-symbols:delete-outline" />}
                      danger
                      onClick={() => onDelDict(record.id)}
                    >
                      删除
                    </Button>
                  </AuthButton>
                  <AuthButton perms="system:user:allocation">
                    <Button type="link" icon={<Iconify icon="mingcute:add-square-line" />}>
                      分配角色
                    </Button>
                  </AuthButton>
                </span>
              )
            }
          }
        ]}
        scroll={{ x: 'max-content', y: tableScrollY }}
        rowKey="id"
      />
      <ModalForm
        form={formRef}
        title={title}
        open={modalVisit}
        width={750}
        layout="horizontal"
        grid={true}
        rowProps={{
          gutter: [16, 0]
        }}
        colProps={{
          span: 12
        }}
        labelCol={{ flex: '80px' }}
        onOpenChange={setModalVisit}
        onFinish={onFinish}
      >
        <ProFormText
          label="用户名称"
          name="userName"
          placeholder="请输入用户名称"
          rules={[{ required: true, message: '用户名称不能为空' }]}
        />
        {modalType && (
          <ProFormText.Password
            label="用户密码"
            name="password"
            placeholder="请输入用户密码"
            rules={[{ required: true, message: '用户密码不能为空' }]}
          />
        )}

        <ProFormText label="手机号" name="phonenumber" placeholder="请输入手机号" />
        <ProFormText label="邮箱" name="email" placeholder="请输入邮箱" />
        <ProFormSelect label="性别" name="sex" request={async () => [...ILLUTR_SEX]} />
        <ProFormRadio.Group
          label="状态"
          name="status"
          initialValue={0}
          options={ILLUTR_NORMAL_DISABLE.map((item) => ({
            label: item.label,
            value: Number(item.value)
          }))}
        />
        <ProFormSelect
          label="角色"
          name="roleIds"
          fieldProps={{
            mode: 'multiple'
          }}
          request={async () => {
            const { data } = await getAllRoleList()
            if (!data) return []
            return data.map((item) => ({
              label: item.roleName,
              value: item.id
            }))
          }}
        />
        <ProFormTextArea
          label="备注"
          name="remark"
          placeholder="请输入备注"
          colProps={{
            span: 24
          }}
        />
      </ModalForm>
    </>
  )
}

export default User

import { useRef, useState } from 'react'
import { addDict, delDict, getDict, refreshCache, updateDict } from '@/api/dict'
import {
  ProTable,
  ModalForm,
  ProFormText,
  ProFormRadio,
  ProFormTextArea,
  ActionType
} from '@ant-design/pro-components'
import { Button, Form } from 'antd'
import { useThemeToken } from '@/theme/hooks'
import type { IDictType } from '@/types/dict'
import { Iconify } from '@/components/icon'
import { useDict, useProTableSizeObserver } from '@/hook'
import { message, modal } from '@/components/baseNotice'
import { useNavigate } from 'react-router-dom'
import { getDictionaryTextByValue } from '@/utils'
import rootStore from '@/store'
import AuthButton from '@/components/auth/authButton'

function Dict() {
  const { dictStore } = rootStore
  const navigate = useNavigate()
  const { colorPrimary } = useThemeToken()
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [modalType, setModalType] = useState(false)
  const [modalVisit, setModalVisit] = useState(false)
  const [title, setTitle] = useState('')
  const [dictCodePrefix, setDictCodePrefix] = useState('ILLUTR_')

  const [formRef] = Form.useForm()
  const ref = useRef<ActionType>()

  const { tableScrollY } = useProTableSizeObserver(ref, { bottom: 20 })

  const ILLUTR_NORMAL_DISABLE = useDict('ILLUTR_NORMAL_DISABLE')

  const onTypeClick = (record: IDictType) => {
    navigate(`/system/admin/dictData/${record.dictCode}`)
  }

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const onCler = () => {
    formRef?.resetFields()
  }

  const onHandleRow = (isAdd: boolean, record?: IDictType) => {
    onCler()
    formRef?.setFieldsValue(isAdd ? {} : record)
    setTitle(isAdd ? '添加字典类型' : '编辑字典类型')
    setModalType(isAdd)
    setModalVisit(true)
  }

  const onDelDict = (keys?: number) => {
    const ids = keys ? keys + '' : selectedRowKeys.join(',')
    modal.confirm({
      title: '系统提示',
      content: `是否确认删除字典编号为"${ids}"的数据项？`,
      onOk() {
        delDict(ids).then(() => {
          message.success('删除成功')
          ref?.current?.reload()
        })
      }
    })
  }

  const handleRefreshCache = () => {
    refreshCache().then(() => {
      message.success('刷新成功')
      dictStore.cleanDict()
    })
  }

  const onFinish = async () => {
    formRef
      ?.validateFields()
      .then(async () => {
        const data: IDictType = formRef?.getFieldsValue(true)
        if (data.id) {
          updateDict(data).then(() => {
            message.success('修改成功')
            setModalVisit(false)
            ref?.current?.reload()
          })
        } else {
          data.dictCode = dictCodePrefix + data.dictCode
          addDict(data).then(() => {
            message.success('添加成功')
            setModalVisit(false)
            ref?.current?.reload()
          })
        }
      })
      .catch((errorInfo) => {})
  }

  return (
    <>
      <ProTable<IDictType>
        actionRef={ref}
        defaultSize="small"
        rowSelection={{
          selectedRowKeys,
          onChange: onSelectChange
        }}
        request={async (params) => {
          const { current, pageSize, ...otherParams } = params
          const res = await getDict({
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
          <AuthButton perms="system:dict:add">
            <Button type="primary" onClick={() => onHandleRow(true)}>
              新增
            </Button>
          </AuthButton>,
          <AuthButton perms="system:dict:remove">
            <Button danger onClick={() => onDelDict()}>
              批量删除
            </Button>
          </AuthButton>,
          <Button type="primary" danger onClick={() => handleRefreshCache()}>
            刷新缓存
          </Button>
        ]}
        columns={[
          {
            title: '序号',
            dataIndex: 'index',
            width: 64,
            valueType: 'index'
          },
          {
            title: '字典编码',
            dataIndex: 'dictCode',
            width: 150,
            renderText: (text: string, record: IDictType) => (
              <span
                className="cursor-pointer"
                style={{ color: colorPrimary, marginBottom: 0 }}
                onClick={() => onTypeClick(record)}
              >
                {text}
              </span>
            )
          },
          {
            title: '字典名称',
            dataIndex: 'dictName',
            width: 150
          },
          {
            title: '状态',
            dataIndex: 'status',
            width: 150,
            valueType: 'select',
            fieldProps: {
              options: ILLUTR_NORMAL_DISABLE.map((item) => ({
                label: item.label,
                value: Number(item.value)
              }))
            },
            renderText: (text: string) => {
              return getDictionaryTextByValue(ILLUTR_NORMAL_DISABLE, text, true)
            }
          },
          {
            title: '字典描述',
            dataIndex: 'remark',
            width: 250,
            hideInSearch: true
          },
          {
            title: '创建时间',
            dataIndex: 'createTime',
            width: 150,
            hideInSearch: true
          },
          {
            title: '操作',
            key: 'action',
            width: 200,
            fixed: 'right',
            hideInSearch: true,
            render: (_, record) => (
              <span>
                <AuthButton perms="system:dict:edit">
                  <Button
                    type="link"
                    icon={<Iconify icon="mingcute:edit-line" />}
                    onClick={() => onHandleRow(false, record)}
                  >
                    编辑
                  </Button>
                </AuthButton>
                <AuthButton perms="system:dict:remove">
                  <Button
                    type="link"
                    icon={<Iconify icon="material-symbols:delete-outline" />}
                    danger
                    onClick={() => onDelDict(record.id)}
                  >
                    删除
                  </Button>
                </AuthButton>
                <AuthButton perms="system:dict:dictData">
                  <Button
                    type="link"
                    icon={<Iconify icon="mingcute:add-square-line" />}
                    onClick={() => onTypeClick(record)}
                  >
                    字典数据
                  </Button>
                </AuthButton>
              </span>
            )
          }
        ]}
        scroll={{ x: 'max-content', y: tableScrollY }}
        rowKey="id"
      />

      <ModalForm
        form={formRef}
        title={title}
        open={modalVisit}
        width={500}
        layout="horizontal"
        labelCol={{ span: 4 }}
        onOpenChange={setModalVisit}
        onFinish={onFinish}
      >
        <ProFormText
          label="字典名称"
          name="dictName"
          placeholder="请输入字典名称"
          rules={[{ required: true, message: '字典名称不能为空' }]}
        />
        <ProFormText
          label="字典编码"
          name="dictCode"
          disabled={!modalType}
          fieldProps={{
            prefix: modalType ? dictCodePrefix : '',
            max: 30
          }}
          placeholder=""
          rules={[{ required: true, message: '字典类型不能为空' }]}
        />
        <ProFormRadio.Group
          label="状态"
          name="status"
          initialValue={0}
          options={ILLUTR_NORMAL_DISABLE.map((item) => ({
            label: item.label,
            value: Number(item.value)
          }))}
          rules={[{ required: true, message: '状态不能为空' }]}
        />
        <ProFormTextArea label="字典描述" name="remark" placeholder="请输入字典描述" />
      </ModalForm>
    </>
  )
}

export default Dict

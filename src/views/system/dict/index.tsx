import { useRef, useState } from 'react'
import { addDict, delDict, getDict, updateDict } from '@/api/dict'
import { formatDate } from '@/utils/time'
import {
  ProTable,
  ModalForm,
  ProFormText,
  ProFormRadio,
  ProFormTextArea,
  ProFormInstance,
  ActionType
} from '@ant-design/pro-components'
import { Button, Tag } from 'antd'
import { useThemeToken } from '@/theme/hooks'
import type { DictData } from '@/types/dict'
import { Iconify } from '@/components/icon'
import { useDict } from '@/hook'
import { message, modal } from '@/components/baseNotice'

function Dict() {
  const { colorPrimary } = useThemeToken()
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [modalVisit, setModalVisit] = useState(false)
  const [title, setTitle] = useState('')

  const formRef = useRef<ProFormInstance>()
  const ref = useRef<ActionType>()
  const sys_normal_disable = useDict('sys_normal_disable')

  const onTypeClick = (record: DictData) => {
    console.log('record', record)
  }

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const onCler = () => {
    formRef?.current?.resetFields()
  }

  const onHandleRow = (isAdd: boolean, record?: DictData) => {
    onCler()
    formRef?.current?.setFieldsValue(isAdd ? {} : record)
    setTitle(isAdd ? '添加字典类型' : '编辑字典类型')
    setModalVisit(true)
  }

  const onDelDict = (keys?: string) => {
    const ids = keys ? keys : selectedRowKeys.join(',')
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

  const onFinish = async () => {
    formRef.current
      ?.validateFields()
      .then(async () => {
        const data: DictData = formRef?.current?.getFieldsValue(true)
        if (data.dictId) {
          updateDict(data).then(() => {
            message.success('修改成功')
            setModalVisit(false)
            ref?.current?.reload()
          })
        } else {
          addDict(data).then(() => {
            message.success('添加成功')
            setModalVisit(false)
            ref?.current?.reload()
          })
        }
      })
      .catch((errorInfo) => {
        console.log('errorInfo', errorInfo)
      })
  }

  return (
    <>
      <ProTable
        actionRef={ref}
        defaultSize="small"
        rowSelection={{
          selectedRowKeys,
          onChange: onSelectChange
        }}
        search={{
          className: 'mbe-0'
        }}
        request={async (params) => {
          const res = await getDict({
            ...params,
            pageNum: params.current,
            pageSize: params.pageSize
          })
          return {
            data: res.rows,
            success: res.code === 200,
            total: res.total
          }
        }}
        pagination={{
          pageSize: 10
        }}
        toolBarRender={(action) => [
          <Button type="primary" onClick={() => onHandleRow(true)}>
            新增
          </Button>,
          <Button danger onClick={() => onDelDict()}>
            批量删除
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
            title: '字典名称',
            dataIndex: 'dictName',
            width: 150
          },
          {
            title: '字典类型',
            dataIndex: 'dictType',
            width: 150,
            renderText: (text: string, record: DictData) => (
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
            title: '状态',
            dataIndex: 'status',
            width: 150,
            valueType: 'select',
            fieldProps: {
              options: sys_normal_disable.map((item) => ({ label: item.label, value: item.value }))
            },
            renderText: (text: string) => {
              return (
                <Tag color={text === '0' ? 'success' : 'error'}>
                  {text === '1' ? '停用' : '正常'}
                </Tag>
              )
            }
          },
          {
            title: '备注',
            dataIndex: 'remark',
            width: 150,
            hideInSearch: true
          },
          {
            title: '创建时间',
            dataIndex: 'createTime',
            width: 150,
            renderText: (text: string) => formatDate(text),
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
                <Button
                  type="link"
                  icon={<Iconify icon="mingcute:edit-line" />}
                  onClick={() => onHandleRow(false, record)}
                >
                  编辑
                </Button>
                <Button
                  type="link"
                  icon={<Iconify icon="material-symbols:delete-outline" />}
                  danger
                  onClick={() => onDelDict(record.dictId!)}
                >
                  删除
                </Button>
              </span>
            )
          }
        ]}
        scroll={{ x: 'max-content' }}
        rowKey="dictId"
      />

      <ModalForm
        formRef={formRef}
        title={title}
        open={modalVisit}
        width={500}
        layout="horizontal"
        modalProps={{
          forceRender: true
        }}
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
          label="字典类型"
          name="dictType"
          placeholder="请输入字典类型"
          rules={[{ required: true, message: '字典类型不能为空' }]}
        />
        <ProFormRadio.Group
          label="状态"
          name="status"
          initialValue={'0'}
          options={sys_normal_disable.map((item) => ({ label: item.label, value: item.value }))}
          rules={[{ required: true, message: '状态不能为空' }]}
        />
        <ProFormTextArea label="备注" name="remark" placeholder="请输入备注" />
      </ModalForm>
    </>
  )
}

export default Dict

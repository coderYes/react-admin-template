import { useRef, useState, useEffect } from 'react'
import {
  getDictDataList,
  getDictType,
  getDictOptionselect,
  updateData,
  addDictData,
  delDictData
} from '@/api/dict'
import { formatDate } from '@/utils/time'
import {
  ProTable,
  ModalForm,
  ProFormText,
  ProFormRadio,
  ProFormTextArea,
  ProFormInstance,
  ActionType,
  ProFormDigit
} from '@ant-design/pro-components'
import { Button, FormInstance, Tag } from 'antd'
import type { DictDataType } from '@/types/dict'
import { Iconify } from '@/components/icon'
import { useDict } from '@/hook'
import { message, modal } from '@/components/baseNotice'
import { useParams } from 'react-router-dom'

function Dict() {
  const { dictId } = useParams()
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [modalVisit, setModalVisit] = useState(false)
  const [title, setTitle] = useState('')
  const [dictTypeOptions, setDictTypeOptions] = useState('')
  const [dictType, setDictType] = useState('')

  const modalFormRef = useRef<ProFormInstance>()
  const actionRef = useRef<ActionType>()
  const formRef = useRef<FormInstance>()
  const sys_normal_disable = useDict('sys_normal_disable')

  useEffect(() => {
    getTypes()
    getTypeList()
  }, [])

  const getTypes = () => {
    getDictType(dictId!).then((res) => {
      setDictType(res.data.dictType)
      formRef?.current?.setFieldsValue({
        dictType: res.data.dictType
      })
      actionRef?.current?.reload()
    })
  }

  const getTypeList = () => {
    getDictOptionselect().then((res) => {
      const options = res.data.map((item: any) => {
        return {
          label: item.dictName,
          value: item.dictType
        }
      })
      setDictTypeOptions(options)
    })
  }

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const onCler = () => {
    modalFormRef?.current?.resetFields()
  }

  const onHandleRow = (isAdd: boolean, record?: DictDataType) => {
    onCler()
    modalFormRef?.current?.setFieldsValue(isAdd ? { dictType } : { ...record, dictType })
    setTitle(isAdd ? '添加字典类型' : '编辑字典类型')
    setModalVisit(true)
  }

  const onDelDict = (keys?: string) => {
    const ids = keys ? keys : selectedRowKeys.join(',')
    modal.confirm({
      title: '系统提示',
      content: `是否确认删除字典编号为"${ids}"的数据项？`,
      onOk() {
        delDictData(ids).then(() => {
          message.success('删除成功')
          actionRef?.current?.reload()
        })
      }
    })
  }

  const onFinish = async () => {
    modalFormRef.current
      ?.validateFields()
      .then(async (value) => {
        const data: DictDataType = modalFormRef?.current?.getFieldsValue(true)
        if (data.dictCode) {
          updateData(data).then(() => {
            message.success('修改成功')
            setModalVisit(false)
            actionRef?.current?.reload()
          })
        } else {
          addDictData(data).then(() => {
            message.success('添加成功')
            setModalVisit(false)
            actionRef?.current?.reload()
          })
        }
      })
      .catch((errorInfo) => {
        console.log('errorInfo', errorInfo)
      })
  }

  return (
    <>
      <ProTable<DictDataType>
        actionRef={actionRef}
        formRef={formRef}
        manualRequest={true}
        defaultSize="small"
        rowSelection={{
          selectedRowKeys,
          onChange: onSelectChange
        }}
        search={{
          className: 'mbe-0'
        }}
        request={async (params) => {
          const searchValue = formRef?.current?.getFieldsValue()
          const res = await getDictDataList({
            ...searchValue,
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
            dataIndex: 'dictType',
            valueType: 'select',
            fieldProps: {
              options: dictTypeOptions,
              allowClear: false
            },
            hideInTable: true
          },
          {
            title: '字典编码',
            dataIndex: 'dictCode',
            hideInSearch: true,
            width: 150
          },
          {
            title: '字典标签',
            dataIndex: 'dictLabel',
            width: 150
          },
          {
            title: '字典键值',
            dataIndex: 'dictValue',
            hideInSearch: true,
            width: 150
          },
          {
            title: '字典排序',
            dataIndex: 'dictSort',
            hideInSearch: true,
            width: 150
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
            ellipsis: true,
            hideInSearch: true,
            width: 150
          },
          {
            title: '创建时间',
            dataIndex: 'createTime',
            renderText: (text: string) => formatDate(text),
            hideInSearch: true,
            width: 150
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
                  修改
                </Button>
                <Button
                  type="link"
                  icon={<Iconify icon="material-symbols:delete-outline" />}
                  danger
                  onClick={() => onDelDict(record.dictCode)}
                >
                  删除
                </Button>
              </span>
            )
          }
        ]}
        scroll={{ x: 'max-content' }}
        rowKey="dictCode"
      />

      <ModalForm
        formRef={modalFormRef}
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
        <ProFormText label="字典类型" name="dictType" disabled={true} />
        <ProFormText
          label="数据标签"
          name="dictLabel"
          placeholder="请输入数据标签"
          rules={[{ required: true, message: '数据标签不能为空' }]}
        />
        <ProFormText
          label="数据键值"
          name="dictValue"
          placeholder="请输入数据键值"
          rules={[{ required: true, message: '数据键值不能为空' }]}
        />
        <ProFormDigit
          label="显示排序"
          name="dictSort"
          min={1}
          rules={[{ required: true, message: '排序不能为空' }]}
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

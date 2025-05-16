import { batchDictData, getDictByCode, getDictCode } from '@/api/dict'
import { useDict } from '@/hook'
import rootStore from '@/store'
import { colorPrimarys, darkCustomizedTheme } from '@/theme/antd/theme'
import { IDictDataType, IDictType } from '@/types/dict'
import {
  ActionType,
  EditableProTable,
  nanoid,
  ProCard,
  ProForm,
  ProFormText,
  ProFormTextArea
} from '@ant-design/pro-components'
import { DataSheetGrid, textColumn, keyColumn } from 'react-datasheet-grid'
import 'react-datasheet-grid/dist/style.css'
import { Button, Divider, message, Modal, Space } from 'antd'
import { observer } from 'mobx-react-lite'
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ThemeMode } from '@/types/enum'
import { DataSheetGridWrapper } from './style'
import { checkDuplicate } from '@/utils'

function Dict() {
  const { code } = useParams()
  const { themeStore } = rootStore
  const {
    themeSetting: { themeColorPresets, themeMode }
  } = themeStore
  const color = colorPrimarys[themeColorPresets]
  const darkBgContainer = darkCustomizedTheme.colorBgContainer

  const ILLUTR_NORMAL_DISABLE = useDict('ILLUTR_NORMAL_DISABLE')
  const initialData = Array.from({ length: 100 }, () => ({
    dictLabel: '',
    dictValue: '',
    dictDesc: ''
  }))

  const actionRef = useRef<ActionType>()
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([])
  const [dataSource, setDataSource] = useState<readonly IDictDataType[]>([])
  const [importModalPopup, setImportModalPopup] = useState(false)
  const [importData, setImportData] = useState<IDictDataType[]>(initialData)

  const getDictDataByCode = () => {
    getDictByCode(code!).then((res) => {
      if (Array.isArray(res.data) && res.data.length > 0) {
        setDataSource(res.data)
        setEditableRowKeys(res.data.map((i) => i.id))
      }
    })
  }

  useEffect(() => {
    getDictDataByCode()
  }, [])

  const handleDataDelete = (row: IDictDataType) => {
    const newDataSource = dataSource.filter((item) => item.id !== row.id)
    setDataSource(newDataSource)
    setEditableRowKeys(newDataSource.map((i) => i.id!))
  }

  const handleMoveRow = (row: IDictDataType, direction: 'up' | 'down') => {
    const newData = [...dataSource]
    const index = newData.findIndex((item) => item.id === row.id)

    if (index === -1) return

    // 执行交换
    if (direction === 'up' && index > 0) {
      ;[newData[index], newData[index - 1]] = [newData[index - 1], newData[index]]
    } else if (direction === 'down' && index < newData.length - 1) {
      ;[newData[index], newData[index + 1]] = [newData[index + 1], newData[index]]
    }

    // 重新计算排序号（从1开始连续）
    const updatedData = newData.map((item, idx) => ({
      ...item,
      sort: idx + 1
    }))

    setDataSource(updatedData)
  }

  const handleSave = () => {
    if (dataSource.some((item) => !item.dictLabel)) return message.error('字典项名称不能为空')
    if (dataSource.some((item) => !item.dictValue)) return message.error('字典项值不能为空')
    if (!checkDuplicate(dataSource as IDictDataType[], 'dictValue'))
      return message.error('字典项值不能重复')
    if (!checkDuplicate(dataSource as IDictDataType[], 'dictLabel'))
      return message.error('字典项名称不能重复')
    batchDictData(code!, [...dataSource]).then(() => {
      message.success('保存成功')
      getDictDataByCode()
    })
  }

  const handleImport = () => {
    setImportModalPopup(true)
  }

  const handleCancel = () => {
    setImportModalPopup(false)
    setImportData(initialData)
  }
  const handleOk = () => {
    const maxId = dataSource.reduce((max, item) => Math.max(max, item.id || 0), 0)
    const filterData = importData.filter((item) => item.dictLabel || item.dictValue)
    const processedData = filterData.map((item, index) => ({
      ...item,
      id: maxId + index + 1,
      dictCode: code,
      status: 0,
      sort: dataSource.length + index + 1
    }))
    setDataSource([...dataSource, ...processedData])
    setEditableRowKeys([...editableKeys, ...processedData.map((i) => i.id)])
    setImportModalPopup(false)
  }

  return (
    <ProCard className="relative">
      <div className="flex justify-center">
        <ProForm<IDictType>
          layout="horizontal"
          className="w-2/3"
          request={async () => {
            const res = await getDictCode(code!)
            return {
              ...res.data
            }
          }}
          submitter={false}
        >
          <ProFormText label="字典名称" name="dictName" disabled />
          <ProFormText label="字典编码" name="dictCode" disabled />
          <ProFormTextArea label="字典描述" name="remark" disabled />
        </ProForm>
      </div>
      <Divider />
      <EditableProTable<IDictDataType>
        actionRef={actionRef}
        columns={[
          {
            title: '字典项名称',
            dataIndex: 'dictLabel',
            formItemProps: {
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: '此项是必填项'
                },
                {
                  max: 20,
                  whitespace: true,
                  message: '最长为 20 位'
                }
              ]
            }
          },
          {
            title: '字典项值',
            dataIndex: 'dictValue',
            formItemProps: {
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: '此项是必填项'
                },
                {
                  max: 20,
                  whitespace: true,
                  message: '最长为 20 位'
                }
              ]
            }
          },
          {
            title: '字典项描述',
            dataIndex: 'dictDesc'
          },
          {
            title: '状态',
            dataIndex: 'status',
            valueType: 'select',
            fieldProps: {
              options: ILLUTR_NORMAL_DISABLE.map((item) => ({
                label: item.label,
                value: Number(item.value)
              }))
            }
          },
          {
            title: '操作',
            valueType: 'option',
            render: () => {
              return null
            }
          }
        ]}
        ghost={true}
        toolBarRender={() => [
          <Button onClick={handleImport}>导入</Button>,
          <Button type="primary" onClick={handleSave}>
            保存数据
          </Button>
        ]}
        rowKey="id"
        value={dataSource}
        onChange={setDataSource}
        recordCreatorProps={{
          newRecordType: 'dataSource',
          record: () => {
            const maxId = dataSource.reduce((max, item) => Math.max(max, item.id || 0), 0)
            return {
              id: maxId + 1,
              status: 0,
              sort: dataSource.length + 1,
              dictCode: code
            }
          }
        }}
        editable={{
          type: 'multiple',
          editableKeys,
          actionRender: (row, config, defaultDoms) => {
            return [
              <Space key={row.id}>
                <Button type="link" size="small" danger onClick={() => handleDataDelete(row)}>
                  删除
                </Button>
                <Button
                  type="link"
                  size="small"
                  style={{ color }}
                  onClick={() => handleMoveRow(row, 'up')}
                >
                  上移
                </Button>
                <Button
                  type="link"
                  size="small"
                  style={{ color }}
                  onClick={() => handleMoveRow(row, 'down')}
                >
                  下移
                </Button>
              </Space>
            ]
          },
          onValuesChange: (record, recordList) => {
            setDataSource(recordList)
          },
          onChange: setEditableRowKeys
        }}
      />
      <Modal width="60%" open={importModalPopup} onCancel={handleCancel} onOk={handleOk}>
        <div className="h-[500px]">
          <div className="mt-6">
            <DataSheetGridWrapper
              $dark={themeMode === ThemeMode.Dark}
              $darkBgContainer={darkBgContainer}
            >
              <DataSheetGrid
                height={450}
                rowHeight={30}
                autoAddRow={true}
                value={importData}
                onChange={setImportData}
                columns={[
                  { ...keyColumn('dictLabel', textColumn), title: '字典项名称' },
                  { ...keyColumn('dictValue', textColumn), title: '字典项值' },
                  { ...keyColumn('dictDesc', textColumn), title: '字典项描述' }
                ]}
              />
            </DataSheetGridWrapper>
          </div>
        </div>
      </Modal>
    </ProCard>
  )
}

export default observer(Dict)

import { Key, useRef, useState } from 'react'
import { addMenu, delMenu, getListMenu, updateMenu } from '@/api/menu'
import {
  ProTable,
  ModalForm,
  ProFormText,
  ProFormRadio,
  ActionType,
  ProFormTreeSelect,
  ProFormDigit
} from '@ant-design/pro-components'
import type { MenuNode, MenuType } from '@/types/menus'
import { Button, Form, Space, Tag } from 'antd'
import { useDict } from '@/hook'
import { message, modal } from '@/components/baseNotice'
import { handleTree } from '@/utils/menu'
import { Iconify } from '@/components/icon'
import IconPopover from './cpn/IconPopover'
import AuthButton from '@/components/auth/authButton'

function Menu() {
  const [modalVisit, setModalVisit] = useState(false)
  const [isPopover, setIsPopover] = useState(false)
  const [title, setTitle] = useState('')

  const [menuList, setMenuList] = useState<MenuNode[]>([])
  const [isExpandAll, setIsExpandAll] = useState(false)
  const [menuIds, setMenuIds] = useState<string[]>([])
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([])
  const [menuType, setMenuType] = useState<MenuType>('M')

  const [formRef] = Form.useForm()
  const ref = useRef<ActionType>()
  const iconPopoverRef = useRef(null)
  const sys_normal_disable = useDict('sys_normal_disable')
  const sys_show_hide = useDict('sys_show_hide')
  const onCler = () => {
    formRef?.resetFields()
  }

  const handleAddMenu = (record?: MenuNode) => {
    onCler()
    formRef?.setFieldsValue(record && record.menuId ? { parentId: record.menuId } : { parentId: '0' })
    setTitle('添加菜单')
    setMenuType(record && record.menuId ? record.menuType : 'M')
    setModalVisit(true)
  }

  const handleUpdateMenu = (record: MenuNode) => {
    onCler()
    formRef?.setFieldsValue(record)
    setTitle('修改菜单')
    setMenuType(record?.menuType)
    setModalVisit(true)
  }

  const onExpandedRowsChange = (expandedKeys: readonly Key[]) => {
    setExpandedRowKeys(expandedKeys as string[])
  }
  const toggleExpandAll = (bool: boolean) => {
    setExpandedRowKeys(bool ? menuIds : [])
    setIsExpandAll(bool)
  }

  const onIconChoose = (icon: string) => {
    formRef?.setFieldValue('icon', icon)
    setIsPopover(false)
  }

  const onDelDict = (row: MenuNode) => {
    modal.confirm({
      title: '系统提示',
      content: `是否确认删除名称为"${row.menuName}"的数据项`,
      onOk() {
        delMenu(row.menuId).then(() => {
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
        const data: MenuNode = formRef?.getFieldsValue(true)
        if (data.menuId) {
          updateMenu(data).then(() => {
            message.success('修改成功')
            setModalVisit(false)
            ref?.current?.reload()
          })
        } else {
          addMenu(data).then(() => {
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
      <ProTable<MenuNode>
        actionRef={ref}
        expandable={{
          expandedRowKeys,
          onExpandedRowsChange
        }}
        defaultSize="small"
        search={{
          className: 'mbe-0'
        }}
        request={async (params) => {
          console.log('formRef', formRef)
          const res = await getListMenu({
            ...params
          })

          const ids = res.data.map((item: MenuNode) => item.menuId)
          setMenuIds(ids)
          setIsExpandAll(false)

          const menuList = handleTree(res.data)
          setMenuList(menuList)
          return {
            data: menuList,
            success: res.code === 200
          }
        }}
        pagination={false}
        toolBarRender={(action) => [
          <AuthButton perms="system:menu:add">
            <Button type="primary" onClick={() => handleAddMenu()}>
              新增
            </Button>
          </AuthButton>,
          <Button
            icon={<Iconify icon="fluent:arrow-sort-20-filled" />}
            onClick={() => toggleExpandAll(!isExpandAll)}
          >
            展开/折叠
          </Button>
        ]}
        columns={[
          {
            title: '菜单名称',
            dataIndex: 'menuName',
            width: 150,
            renderText: (text: string, record) => {
              return (
                <div className="flex items-center">
                  <Iconify icon={record.icon} size={14} className="ant-menu-item-icon" />
                  <span>{text}</span>
                </div>
              )
            }
          },
          {
            title: '权限标识',
            dataIndex: 'perms',
            width: 150,
            hideInSearch: true
          },
          {
            title: '组件路径',
            dataIndex: 'component',
            width: 150,
            hideInSearch: true
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
            title: '排序',
            dataIndex: 'orderNum',
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
              <Space>
                <AuthButton perms="system:menu:add">
                  <Button
                    className="px-0"
                    type="link"
                    icon={<Iconify icon="tabler:plus" />}
                    onClick={() => handleAddMenu(record)}
                  >
                    新增
                  </Button>
                </AuthButton>
                <AuthButton perms="system:menu:edit">
                  <Button
                    className="px-0"
                    type="link"
                    icon={<Iconify icon="mingcute:edit-line" />}
                    onClick={() => handleUpdateMenu(record)}
                  >
                    编辑
                  </Button>
                </AuthButton>
                <AuthButton perms="system:menu:remove">
                  <Button
                    className="px-0"
                    type="link"
                    icon={<Iconify icon="material-symbols:delete-outline" />}
                    danger
                    onClick={() => onDelDict(record)}
                  >
                    删除
                  </Button>
                </AuthButton>
              </Space>
            )
          }
        ]}
        scroll={{ x: 'max-content' }}
        rowKey="menuId"
      />

      <ModalForm
        form={formRef}
        title={title}
        open={modalVisit}
        width={800}
        grid={true}
        layout="horizontal"
        labelCol={{ style: { width: '100px' } }}
        onClick={() => {
          if (iconPopoverRef?.current) {
            setIsPopover(false)
          }
        }}
        onOpenChange={(open: boolean) => {
          setModalVisit(open)
          if (!open) {
            setIsPopover(false)
          }
        }}
        onFinish={onFinish}
      >
        <ProFormTreeSelect
          label="上级菜单"
          name="parentId"
          placeholder="请选择上级菜单"
          colProps={{ span: 24 }}
          fieldProps={{
            dropdownStyle: { maxHeight: 400, overflow: 'auto' },
            treeDefaultExpandAll: true,
            allowClear: true,
            fieldNames: { label: 'menuName', value: 'menuId' },
            treeData: menuList
          }}
        />
        <ProFormRadio.Group
          label="菜单类型"
          name="menuType"
          initialValue={'M'}
          colProps={{ span: 24 }}
          options={[
            {
              label: '目录',
              value: 'M'
            },
            {
              label: '菜单',
              value: 'C'
            },
            {
              label: '按钮',
              value: 'F'
            }
          ]}
          fieldProps={{
            onChange: (e) => setMenuType(e.target.value)
          }}
        />
        <div className="relative ant-col ant-col-12 css-dev-only-do-not-override-1n83h6c">
          <ProFormText
            className="w-full"
            label="菜单图标"
            name="icon"
            placeholder="请选择菜单图标"
            fieldProps={{
              onClick: (e) => {
                e.preventDefault()
                setIsPopover(true)
              }
            }}
          />
          {isPopover && (
            <IconPopover
              ref={iconPopoverRef}
              value={formRef?.getFieldValue('icon')}
              className="top-[42px] z-10"
              onChoose={onIconChoose}
            />
          )}
        </div>
        <ProFormText
          label="菜单名称"
          name="menuName"
          colProps={{ span: 12 }}
          placeholder="请输入菜单名称"
          rules={[{ required: true, message: '菜单名称不能为空' }]}
        />
        <ProFormDigit
          label="显示排序"
          name="orderNum"
          colProps={{ span: 12 }}
          min={0}
          rules={[{ required: true, message: '请输入排序' }]}
        />
        {menuType !== 'F' && (
          <ProFormRadio.Group
            label="是否外链"
            name="isFrame"
            initialValue={'1'}
            tooltip="选择是外链则路由地址需要以`http(s)://`开头"
            colProps={{ span: 12 }}
            options={[
              {
                label: '是',
                value: '0'
              },
              {
                label: '否',
                value: '1'
              }
            ]}
          />
        )}
        {menuType !== 'F' && (
          <ProFormText
            label="路由地址"
            name="path"
            tooltip="访问的路由地址，如：`user`，如外网地址需内链访问则以`http(s)://`开头"
            colProps={{ span: 12 }}
            placeholder="请输入路由地址"
            rules={[{ required: true, message: '路由地址不能为空' }]}
          />
        )}

        {menuType === 'C' && (
          <ProFormText
            label="组件路径"
            name="component"
            tooltip="访问的组件路径，如：`system/user/index`，默认在`views`目录下"
            colProps={{ span: 12 }}
            placeholder="请输入组件路径"
            rules={[{ required: true, message: '组件路径不能为空' }]}
          />
        )}
        {menuType !== 'M' && (
          <ProFormText
            label="权限字符"
            name="perms"
            tooltip="控制器中定义的权限字符，如：@PreAuthorize(`@ss.hasPermi('system:user:list')`"
            colProps={{ span: 12 }}
            placeholder="请输入权限字符"
          />
        )}
        {menuType === 'C' && (
          <ProFormText
            label="路由参数"
            name="query"
            tooltip="访问路由的默认传递参数，如：`{'id': 1, 'name': 'ry'}`"
            colProps={{ span: 12 }}
            placeholder="请输入路由参数"
          />
        )}
        {menuType !== 'F' && (
          <ProFormRadio.Group
            label="显示状态"
            name="visible"
            initialValue={'0'}
            tooltip="选择隐藏则路由将不会出现在侧边栏，但仍然可以访问"
            colProps={{ span: 12 }}
            options={sys_show_hide.map((item) => ({ label: item.label, value: item.value }))}
          />
        )}
        {menuType !== 'F' && (
          <ProFormRadio.Group
            label="菜单状态"
            name="status"
            initialValue={'0'}
            tooltip="选择停用则路由将不会出现在侧边栏，也不能被访问"
            colProps={{ span: 12 }}
            options={sys_normal_disable.map((item) => ({ label: item.label, value: item.value }))}
          />
        )}
      </ModalForm>
    </>
  )
}

export default Menu

export default function (role?: string[]) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (role && role.length > 0) {
        resolve({
          msg: '操作成功',
          code: 200,
          data: [
            {
              id: 1, // id
              parentId: 0, // 父级id
              name: '工作台', // 菜单名称
              path: '/admin/dashboard/workbench', // 组件路径
              type: 1, // 菜单类型 0:目录 1:菜单 2:按钮
              hidden: 0, // 是否隐藏 0:否 1:是
              status: 1, // 状态 0:禁用 1:启用
              icon: 'material-symbols:table-chart-view-outline', // 菜单图标
              order: 1, // 排序
              permission: 'admin:dashboard:workbench' // 权限字符
            },
            {
              id: 2,
              parentId: 0,
              name: '组件',
              path: '/admin/component',
              type: 0,
              hidden: 0,
              status: 1,
              icon: 'material-symbols:auto-awesome-mosaic-outline',
              order: 2,
              permission: null,
              children: [
                {
                  id: 3,
                  parentId: 2,
                  name: '图标',
                  path: '/admin/component/icon',
                  type: 1,
                  hidden: 0,
                  status: 1,
                  icon: 'material-symbols:emoticon',
                  order: 1,
                  permission: 'admin:component:icon'
                },
                {
                  id: 5,
                  parentId: 2,
                  name: '滚动',
                  path: '/admin/component/scroll',
                  type: 1,
                  hidden: 0,
                  status: 1,
                  icon: 'uil:scroll',
                  order: 3,
                  permission: 'admin:component:scroll'
                },
                {
                  id: 6,
                  parentId: 2,
                  name: '富文本',
                  path: '/admin/component/editor',
                  type: 1,
                  hidden: 0,
                  status: 1,
                  icon: 'material-symbols:ad',
                  order: 4,
                  permission: 'admin:component:editor'
                },
                {
                  id: 7,
                  parentId: 2,
                  name: 'Toast',
                  path: '/admin/component/toast',
                  type: 1,
                  hidden: 0,
                  status: 1,
                  icon: 'fluent:lightbulb-20-filled',
                  order: 4,
                  permission: 'admin:component:toast'
                }
              ]
            },
            {
              id: 10,
              parentId: 0,
              name: '异常页',
              path: '/admin/exception',
              type: 0,
              hidden: 0,
              status: 1,
              icon: 'tabler:address-book-off',
              order: 3,
              permission: null,
              children: [
                {
                  id: 11,
                  parentId: 10,
                  name: '403',
                  path: '/admin/exception/exception403',
                  type: 1,
                  hidden: 0,
                  status: 1,
                  icon: 'tabler:circle-off',
                  order: 1,
                  permission: 'admin:exception:exception403'
                },
                {
                  id: 12,
                  parentId: 10,
                  name: '404',
                  path: '/admin/exception/exception404',
                  type: 1,
                  hidden: 0,
                  status: 1,
                  icon: 'tabler:browser-off',
                  order: 2,
                  permission: 'admin:exception:exception404'
                },
                {
                  id: 13,
                  parentId: 10,
                  name: '500',
                  path: '/admin/exception/exception500',
                  type: 1,
                  hidden: 0,
                  status: 1,
                  icon: 'tabler:wifi-off',
                  order: 3,
                  permission: 'admin:exception:exception500'
                }
              ]
            },
            {
              id: 14,
              parentId: 0,
              name: '多级菜单',
              path: '/admin/test',
              type: 0,
              hidden: 0,
              status: 1,
              icon: 'mynaui:menu',
              order: 4,
              permission: null,
              children: [
                {
                  id: 15,
                  parentId: 14,
                  name: '菜单一',
                  path: '/admin/test/test1',
                  type: 0,
                  hidden: 0,
                  status: 1,
                  icon: 'mynaui:menu',
                  order: 1,
                  permission: null,
                  children: [
                    {
                      id: 16,
                      parentId: 15,
                      name: '菜单二',
                      path: '/admin/test/test1/test2',
                      type: 0,
                      hidden: 0,
                      status: 1,
                      icon: 'mynaui:menu',
                      order: 1,
                      permission: null,
                      children: [
                        {
                          id: 17,
                          parentId: 16,
                          name: '菜单二子页面',
                          path: '/admin/test/test1/test2/index',
                          type: 1,
                          hidden: 0,
                          status: 1,
                          icon: 'mynaui:menu',
                          order: 1,
                          permission: 'admin:test:test1:test2:index'
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        })
      } else {
        resolve({
          msg: '请求失败',
          code: 500,
          data: null
        })
      }
    }, 1000)
  })
}

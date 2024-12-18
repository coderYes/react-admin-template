export default function () {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        msg: '操作成功',
        code: 200,
        data: [
          {
            id: 7,
            parentId: 6,
            name: '工作台',
            path: '/admin/dashboard/workbench',
            type: 1,
            hidden: 0,
            status: 1,
            icon: 'material-symbols:apps',
            order: 1,
            permission: 'admin:dashboard:workbench'
          },
          {
            id: 1,
            parentId: 0,
            name: '系统管理',
            path: '/admin/system',
            type: 0,
            hidden: 0,
            status: 1,
            icon: 'material-symbols:apps',
            order: 2,
            permission: null,
            children: [
              {
                id: 2, // id
                parentId: 1, // 父级id
                name: '用户管理', // 菜单名称
                path: '/admin/system/user', // 组件路径
                type: 1, // 菜单类型 0:目录 1:菜单 2:按钮
                hidden: 0, // 是否隐藏 0:否 1:是
                status: 1, // 状态 0:禁用 1:启用
                icon: 'material-symbols:apps', // icon图标
                order: 1, // 排序
                permission: 'admin:system:user', // 权限字符
                children: [
                  {
                    id: 3,
                    parentId: 2,
                    name: '用户添加',
                    path: null,
                    type: 2,
                    hidden: 0,
                    status: 1,
                    icon: null,
                    order: 1,
                    permission: 'admin:system:user:add'
                  }
                ]
              },
              {
                id: 4,
                parentId: 1,
                name: '角色管理',
                path: '/admin/system/role',
                type: 1,
                hidden: 0,
                status: 1,
                icon: 'material-symbols:apps',
                order: 2,
                permission: 'admin:system:role'
              },
              {
                id: 5,
                parentId: 1,
                name: '测试页面',
                path: '/admin/system/test',
                type: 1,
                hidden: 0,
                status: 1,
                icon: 'material-symbols:apps',
                order: 3,
                permission: 'admin:system:test'
              }
            ]
          },
          {
            id: 8,
            parentId: 0,
            name: '用户',
            path: '/admin/user',
            type: 0,
            hidden: 0,
            status: 1,
            icon: 'material-symbols:apps',
            order: 2,
            permission: null,
            children: [
              {
                id: 9,
                parentId: 1,
                name: '个人资料',
                path: '/admin/user/profile',
                type: 1,
                hidden: 0,
                status: 1,
                icon: 'material-symbols:apps',
                order: 3,
                permission: 'admin:user:profile'
              }
            ]
          }
        ]
      })
    }, 100)
  })
}

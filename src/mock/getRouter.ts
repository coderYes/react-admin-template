export default function () {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        msg: '操作成功',
        code: 200,
        data: [
          {
            id: 100,
            name: '首页',
            path: '/home',
            hidden: false,
            icon: 'SlackSquareOutlined',
            componentPath: '/home'
          },
          {
            id: 200,
            name: '数据统计',
            path: '/dashboard',
            hidden: false,
            icon: 'SlackSquareOutlined',
            componentPath: '',
            children: [
              {
                id: 201,
                name: '数据分析',
                path: '/dashboard/analysis',
                hidden: false,
                icon: 'SlackSquareOutlined',
                componentPath: '/dashboard/analysis'
              }
            ]
          },
          {
            id: 300,
            name: '系统管理',
            path: '/system',
            hidden: false,
            icon: 'SlackSquareOutlined',
            componentPath: '',
            children: [
              {
                id: 301,
                name: '用户管理',
                path: '/system/user',
                hidden: false,
                icon: 'SlackSquareOutlined',
                componentPath: '/system/user'
              },
              {
                id: 302,
                name: '角色管理',
                path: '/system/role',
                hidden: false,
                icon: 'SlackSquareOutlined',
                componentPath: '/system/role'
              },
              {
                id: 303,
                name: '菜单管理',
                path: '/system/menu',
                hidden: false,
                icon: 'SlackSquareOutlined',
                componentPath: '/system/menu'
              },
              {
                id: 304,
                name: '登录日志',
                path: '/system/loginlog',
                hidden: false,
                icon: 'SlackSquareOutlined',
                componentPath: '/system/loginlog'
              }
            ]
          },
          {
            id: 400,
            name: '全景管理',
            path: '/panorama',
            hidden: false,
            icon: 'SlackSquareOutlined',
            componentPath: '',
            children: [
              {
                id: 401,
                name: '全景列表',
                path: '/panorama/panolist',
                hidden: false,
                icon: 'SlackSquareOutlined',
                componentPath: '/panorama/panolist'
              },
              {
                id: 402,
                name: '全景制作',
                path: '/panorama/panomake',
                hidden: false,
                icon: 'SlackSquareOutlined',
                componentPath: '/panorama/panomake'
              },
              {
                id: 403,
                name: '测试菜单',
                path: '/panorama/test',
                hidden: false,
                icon: 'SlackSquareOutlined',
                componentPath: '',
                children: [
                  {
                    id: 404,
                    name: '全景3-1',
                    path: '/panorama/test/test3',
                    hidden: false,
                    icon: 'SlackSquareOutlined',
                    componentPath: '/panorama/test/test3'
                  }
                ]
              }
            ]
          }
        ]
      })
    }, 100)
  })
}

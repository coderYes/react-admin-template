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
          },
          {
            id: 500,
            name: '菜单100',
            path: '/menu1',
            hidden: false,
            icon: 'SlackSquareOutlined',
            componentPath: ''
          },
          {
            id: 501,
            name: '菜单101',
            path: '/menu2',
            hidden: false,
            icon: 'SlackSquareOutlined',
            componentPath: ''
          },
          {
            id: 502,
            name: '菜单102',
            path: '/menu3',
            hidden: false,
            icon: 'SlackSquareOutlined',
            componentPath: ''
          },
          {
            id: 503,
            name: '菜单103',
            path: '/menu4',
            hidden: false,
            icon: 'SlackSquareOutlined',
            componentPath: ''
          },
          {
            id: 504,
            name: '菜单104',
            path: '/menu5',
            hidden: false,
            icon: 'SlackSquareOutlined',
            componentPath: ''
          },
          {
            id: 505,
            name: '菜单105',
            path: '/menu6',
            hidden: false,
            icon: 'SlackSquareOutlined',
            componentPath: ''
          },
          {
            id: 506,
            name: '菜单106',
            path: '/menu7',
            hidden: false,
            icon: 'SlackSquareOutlined',
            componentPath: ''
          },
          {
            id: 507,
            name: '菜单107',
            path: '/menu8',
            hidden: false,
            icon: 'SlackSquareOutlined',
            componentPath: ''
          },
          {
            id: 508,
            name: '菜单108',
            path: '/menu9',
            hidden: false,
            icon: 'SlackSquareOutlined',
            componentPath: ''
          },
          {
            id: 509,
            name: '菜单109',
            path: '/menu10',
            hidden: false,
            icon: 'SlackSquareOutlined',
            componentPath: ''
          },
          {
            id: 510,
            name: '菜单110',
            path: '/menu11',
            hidden: false,
            icon: 'SlackSquareOutlined',
            componentPath: ''
          },
          {
            id: 511,
            name: '菜单111',
            path: '/menu12',
            hidden: false,
            icon: 'SlackSquareOutlined',
            componentPath: ''
          },
          {
            id: 512,
            name: '菜单112',
            path: '/menu13',
            hidden: false,
            icon: 'SlackSquareOutlined',
            componentPath: ''
          },
          {
            id: 513,
            name: '菜单113',
            path: '/menu14',
            hidden: false,
            icon: 'SlackSquareOutlined',
            componentPath: ''
          },
          {
            id: 514,
            name: '菜单114',
            path: '/menu15',
            hidden: false,
            icon: 'SlackSquareOutlined',
            componentPath: ''
          },
          {
            id: 515,
            name: '菜单115',
            path: '/menu16',
            hidden: false,
            icon: 'SlackSquareOutlined',
            componentPath: ''
          },
          {
            id: 516,
            name: '菜单116',
            path: '/menu17',
            hidden: false,
            icon: 'SlackSquareOutlined',
            componentPath: ''
          }
        ]
      })
    }, 100)
  })
}

import Mock from 'mockjs';

Mock.mock('/stepin-api/routes', 'get', () => {
  return {
    code: 0,
    message: 'success',
    data: [
      {
        path: '/async',
        name: '多级菜单',
        meta: {
          icon: 'MenuUnfoldOutlined',
        },
        component: 'blankView',
        children: [
          {
            path: 'demo1',
            name: 'demo1',
            component: 'demo',
            children: [
              {
                path: 'demo',
                name: 'demo',
                component: 'demo',
              },
            ],
          },
          {
            path: 'demo2',
            name: 'demo2',
            component: 'demo',
          },
        ],
      },
      {
        path: '/bilibili',
        name: 'B站外链',
        meta: {
          icon: 'LinkedinOutlined',
          href: 'https://www.bilibili.com',
        },
      },
      {
        path: '/bilibili/iframe',
        name: 'B站Iframe',
        meta: {
          icon: 'LinkedinOutlined',
          href: 'https://www.bilibili.com',
        },
        component: 'iframe',
      },
    ],
  };
});

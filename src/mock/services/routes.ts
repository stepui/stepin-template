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
            component: '@/pages/Demo.vue',
            children: [
              {
                path: 'demo',
                name: 'demo',
                component: '@/pages/Demo.vue',
              },
            ],
          },
          {
            path: 'demo2',
            name: 'demo2',
            component: '@/pages/Demo.vue',
          },
        ],
      },
      {
        path: '/bilibili',
        name: 'B站外链',
        link: 'https://www.bilibili.com',
        meta: {
          icon: 'LinkedinOutlined',
        },
      },
      {
        path: '/bilibili/iframe',
        name: 'B站Iframe',
        component: 'iframe',
        props: { src: 'https://www.bilibili.com' },
        meta: {
          icon: 'LinkedinOutlined',
        },
      },
    ],
  };
});

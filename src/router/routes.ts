import { RouteRecordRaw } from 'vue-router';
const routes: RouteRecordRaw[] = [
  {
    path: '/front',
    name: '前端',
    meta: {
      renderMenu: false,
    },
    component: () => import('/@/components/layout/CommonView.vue'),
    children: [
      {
        path: '/login',
        name: '登录',
        meta: {
          icon: 'LoginOutlined',
          view: 'blank',
          target: '_blank',
          page: {
            cacheable: true,
          },
        },
        component: () => import('/@/pages/Login.vue'),
      },
    ],
  },
  {
    path: '/:catchAll(.*)',
    name: '404',
    meta: {
      icon: 'CreditCardOutlined',
      renderMenu: false,
    },
    component: () => import('/@/pages/Exp404.vue'),
  },
  {
    path: '/workplace',
    name: '工作台',
    meta: {
      icon: 'DashboardOutlined',
      badge: 1,
      page: {
        cacheable: false,
      },
    },
    component: () => import('/@/pages/workplace'),
  },
  {
    path: '/billing',
    name: '账单',
    meta: {
      icon: 'CreditCardOutlined',
      page: {
        cacheable: true,
      },
    },
    component: () => import('/@/pages/billing'),
  },
  {
    path: '/theme',
    name: '主题效果',
    meta: {
      icon: 'ClearOutlined',
      page: {
        cacheable: true,
      },
    },
    component: () => import('/@/pages/theme'),
  },
  {
    path: '/baidu',
    name: '百度',
    meta: {
      href: 'https://www.baidu.com',
      icon: 'LinkedinOutlined',
    },
    component: () => import('stepin/es/iframe-box'),
  },
  {
    path: '/async/routes',
    name: '异步路由',
    meta: {
      icon: 'FundProjectionScreenOutlined',
    },
    component: () => import('/@/pages/AsyncRoutes.vue'),
  },
  {
    path: '/test',
    name: '测试',
    meta: {
      icon: 'FundProjectionScreenOutlined',
    },
    component: () => import('/@/pages/Test.vue'),
  },
];

export default routes;

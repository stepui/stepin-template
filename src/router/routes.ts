import { RouteRecordRaw } from 'vue-router';
const routes: RouteRecordRaw[] = [
  {
    path: '/front',
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
      renderMenu: false,
    },
    component: () => import('/@/pages/Exp404.vue'),
  },
  {
    path: '/',
    name: '首页',
    meta: {
      icon: 'HomeOutlined',
    },
    component: () => import('../pages/home'),
  },
  {
    path: '/theme',
    name: '主题效果',
    meta: {
      icon: 'ClearOutlined',
      page: {
        cacheable: false,
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
    path: '/admin',
    name: '多级菜单',
    meta: {
      icon: 'FundProjectionScreenOutlined',
    },
    component: () => import('/@/components/layout/BlankView.vue'),
    children: [
      {
        path: 'workplace',
        name: '工作台',
        meta: {
          target: '_blank',
          page: {
            cacheable: true,
          },
        },
        component: () => import('/@/pages/Workplace.vue'),
      },
    ],
  },
];

export default routes;

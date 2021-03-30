import { createRouter, createWebHistory } from 'vue-router';
const routes = [
  {
    path: '/',
    name: '首页',
    meta: {
      view: 'admin',
    },
    component: () => import('../pages/home'),
  },
  {
    path: '/login',
    name: '登录',
    meta: {
      page: {
        cacheable: true,
      },
    },
    component: () => import('/@/pages/Login.vue'),
  },
  {
    path: '/:catchAll(.*)',
    name: '404',
    component: () => import('/@/pages/Exp404.vue'),
  },
  {
    path: '/',
    component: () => import('/@/components/layout/BlankView.vue'),
    children: [
      {
        path: 'workplace',
        name: '工作台',
        meta: {
          page: {
            cacheable: true,
          },
        },
        component: () => import('../pages/Workplace.vue'),
      },
      {
        path: 'iframe/baidu',
        name: '百度',
        meta: {
          href: 'https://www.baidu.com',
        },
        component: () => import('stepin/es/iframe-box'),
      },
    ],
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});

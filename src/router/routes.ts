import { RouteRecordRaw } from 'vue-router';
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
    meta: {
      renderMenu: false,
    },
  },
  {
    path: '/front',
    name: '前端',
    meta: {
      renderMenu: false,
    },
    component: () => import('@/components/layout/FrontView.vue'),
    children: [
      {
        path: '/login',
        name: '登录',
        meta: {
          icon: 'LoginOutlined',
          view: 'blank',
          target: '_blank',
          cacheable: false,
        },
        component: () => import('@/pages/login'),
      },
      {
        path: '/home',
        name: '首页',
        meta: {
          view: 'blank',
        },
        component: () => import('@/pages/home'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    meta: {
      icon: 'CreditCardOutlined',
      renderMenu: false,
      cacheable: false,
    },
    component: () => import('@/pages/Exp404.vue'),
  },
];

export default routes;

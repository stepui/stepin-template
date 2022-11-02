// 此配置仅异步路由时需要，本地路由无需在此配置
import { Component } from 'vue';
const componentMap: Map<string, Component> = new Map();

componentMap.set(
  'commonView',
  () => import('@/components/layout/CommonView.vue')
);
componentMap.set(
  'blankView',
  () => import('@/components/layout/BlankView.vue')
);
componentMap.set('demo', () => import('@/pages/Demo.vue'));
componentMap.set('login', () => import('@/pages/Login.vue'));
componentMap.set('exp404', () => import('@/pages/Exp404.vue'));
componentMap.set('theme', () => import('@/pages/theme'));
componentMap.set('home', () => import('@/pages/home'));
componentMap.set('iframe', () => import('stepin/es/iframe-box'));

export default componentMap;

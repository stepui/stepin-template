# 路由&菜单

## 路由

stepin template 的路由使用 `vue-router` 来实现，如果你熟悉 `vue-router`，配置路由将很简单。
如果你不熟悉 `vue-router`， 我们建议您去官网学习下它的入门使用，这将很有帮助。

### 路由配置

路由配置文件在 `src/router/routes.ts`，它完全遵循 vue-router 的 `RouteRecordRaw` 类型定义。
其中，我们扩展了 `RouterMeta` 类型：

```ts {5,9-18}
interface RouteRecordRaw {
 path: string;
 name: string;
 ...
 meta?: RouteMeta;
 ...
}

interface RouteMeta {
  cacheable?: boolean; // 是否开启缓存
  closeable?: boolean; // 页面是否可关闭
  icon?: DefineComponent | FunctionalComponent | string; // 菜单图标
  badge?: string | number | boolean; // 菜单徽标
  href?: string; // 菜单外链
  target?: '_blank' | '_self'; // 页面打开窗口
  title?: string; // 菜单标题、页面标题
  renderMenu?: boolean; // 是否渲染菜单
}
```

### 路由守卫

路由守卫在 `src/router/guards.ts` 文件中配置：

```ts {24,25}
import { NavigationGuard, NavigationHookAfter } from 'vue-router';
import http from '@/store/http';
import { useAccountStore } from '@/store';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
NProgress.configure({ showSpinner: false });

const loginGuard: NavigationGuard = function (to, from) {
  const account = useAccountStore();
  if (!http.checkAuthorization() && !/^\/(login|home)?$/.test(to.fullPath)) {
    return '/login';
  }
};

const progressStart: NavigationGuard = function (to, from) {
  NProgress.start();
};

const progressEnd: NavigationHookAfter = function (to, from) {
  NProgress.done();
};

export default {
  before: [progressStart, loginGuard], // 前置守卫，路由跳转前依次调用守卫
  after: [progressEnd], // 后置守卫，路由跳转后依次调用守卫
};
```

## 异步路由

在 stepin template 中使用异步路由也很简单，你只需要调用后端接口获取路由配置即可。

在 `src/store/menu.ts` 中集成了获取异步路由数据并解析的方法。
另外，在 `src/router/dynamicRoutes.ts` 中，我们还提供了一些 api，帮助你快速集成异步路由：

```ts
// 引入 src/pages 文件夹下所有组件作为动态组件
import Pages from '@/pages';
...

/**
 * 添加路由
 * @param routes
 */
export function addRoutes(routes: RouteOption[]) {
  const routesRaw: RouteRecordRaw[] = parseRoutes(routes);
  routesRaw.forEach((routeRaw) => router.addRoute(routeRaw));
  router.options.routes = mergeRoutes(router.options.routes, routesRaw);
}
...
/**
 * 移出路由
 * @param routeName
 */
export function removeRoute(routeName: string) {
  router.removeRoute(routeName);
  router.options.routes = filterRoutes(router.options.routes, (route) => route.name !== routeName);
}
...
/**
 * 给目标路由添加子路由
 * @param routes
 * @param parentName
 * @returns
 */
export function appendRoutes(routes: RouteOption[], parentName: string) {
  const parent = findRoute(router.options.routes, (route) => route.name === parentName);
  if (!parent) {
    console.error(`name为${parentName}的父级路由不存在，请检查`);
    return false;
  }
  const routesRaw: RouteRecordRaw[] = parseRoutes(routes);
  routesRaw.forEach((routeRaw) => router.addRoute(parentName, routeRaw));
  parent.children = mergeRoutes(router.options.routes, mergeRoutes(parent.children ?? [], routesRaw));
}
```

:::tip
系统默认加载 `src/pages` 目录下所有组件作为路由组件，你可以按照别名路径给异步路由配置页面组件，如：`@/pages/Demo.vue`。
:::

你从后端获取的路由数据应像如下格式：

```json
[
  {
    "id": 1,
    "name": "workplace",
    "title": "工作台",
    "icon": "DashboardOutlined",
    "badge": "new",
    "target": "_self",
    "path": "/workplace",
    "component": "@/pages/workplace",
    "renderMenu": true,
    "permission": null,
    "cacheable": true
  },
  {
    "id": 2,
    "name": "table",
    "title": "表格",
    "icon": "TableOutlined",
    "badge": "",
    "target": "_self",
    "path": "/table",
    "component": "@/pages/table",
    "renderMenu": true,
    "permission": null,
    "cacheable": true
  },
  {
    "id": 3,
    "name": "personal",
    "title": "个人中心",
    "path": "/personal",
    "icon": "ProfileOutlined",
    "permission": null,
    "component": "@/pages/personal",
    "renderMenu": true,
  },
  {
    "id": 6,
    "name": "system",
    "title": "系统配置",
    "icon": "SettingOutlined",
    "badge": "",
    "target": "_self",
    "path": "/system",
    "component": "@/components/layout/BlankView.vue",
    "renderMenu": true,
    "permission": null,
    "cacheable": true,
    "children": [
      {
        "id": 8,
        "name": "menu",
        "title": "菜单管理",
        "badge": "12",
        "target": "_self",
        "path": "/system/menu",
        "component": "@/pages/system",
        "renderMenu": true,
        "permission": null,
        "cacheable": true
      },
      {
        "id": 7,
        "name": "user",
        "title": "用户管理",
        "target": "_self",
        "path": "/system/user",
        "component": "@/pages/user",
        "renderMenu": true,
        "permission": null,
        "cacheable": true
      }
    ]
  }]
```

## 菜单

Stepin Template 默认使用路由数据渲染菜单。如果需要，你也可以完全自定义菜单数据。

### 路由菜单

默认会把所有路由数据作为菜单数据渲染。如需指定渲染菜单根路径，给 `src/App.vue#stepin-view` 配置 `menuBasePath` 值即可。

如下配置，意味着使用 path 为 `/admin` 的路由的所有子路由渲染菜单：

```vue {5}
<template>
  <stepin-view
    system-name="Stepin"
    logo-src="@/assets/vite.svg"
    menuBasePath="/admin"
    ...
  >
  ...
</template>

<script lang="ts" setup>
...
</script>
...
```

### 自定义菜单

如果需要自定义菜单，给 `src/App.vue#stepin-view` 配置 menuList 即可：

```vue {5,15-25}
<template>
  <stepin-view
    system-name="Stepin"
    logo-src="@/assets/vite.svg"
    :menuList="menuList"
    ...
  >
  ...
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { MenuConfig } from 'stepin/es/router-menu'

const menuList = ref<MenuConfig>([
  { title: '工作台', path: '/workplace', meta: { icon: 'DashboardOutlined' } },
  { title: '表单',
    path: '/form',
    meta: { icon: 'FormOutlined' },
    children: [
      { title: '基础表单', path: '/form/basic' },
      { title: '高级表单', path: '/form/advance' },
    ]
  }
])
...
</script>
```

### 菜单配置 `MenuConfig`

```ts
interface MenuConfig {
  title: string;
  path: string;
  key?: string | number;
  meta?: MenuMeta;
  children?: Array<MenuConfig>;
}

interface MenuMeta {
  icon?: DefineComponent | FunctionalComponent | string;
  badge?: string | number | boolean;
  visible?: boolean;
  href?: string;
  target?: '_self' | '_blank';
  redirect?: string;
}
```

### 路由菜单配置

如果你是使用路由数据渲染菜单，你只需要在路由配置里添加菜单配置属性，配置几乎和 `MenuConfig` 一样。

路由配置和菜单配置映射关系如下：

```ts

interface RouteRecordRaw {
  name: 'personal',                  // - MenuConfig.title 当 `meta.title` 未配置时取此属性作为菜单标题
  path: '/personal',                 // - MenuConfig.path 菜单 path
  redirect: '/redirectPath',         // - MenuConfig.meta.redirect 重定向链接
  meta: {
    title:'个人中心',                 // - MenuConfig.title 如果配置了此属性，则作为菜单标题渲染，优先级最高
    icon: 'UserOutlined',            // - MenuConfig.meta.icon 菜单图标
    badge: 'new',                    // - MenuConfig.meta.badge 菜单徽标
    href: 'https://www.bilbili.com', // - MenuConfig.meta.href 菜单外链
    target: '_blank',                // - MenuConfig.meta.target 页面打开窗口
    renderMenu: true                 // - MenuConfig.meta.visible 是否渲染菜单，默认为 true
  },
  component: () => import('@/pages/Demo.vue'),
  children: [...]                    // - MenuConfig.children 子菜单
}
```

## 常见问题

- 为什么修改了路由数据，菜单没有同步更新呢
- 后端异步路由接口返回格式和示例不一致怎么办

# 页面开发

跟着下面的步骤开始你的第一个页面开发

## 目录结构

正式进入开发前，请先大致熟悉下项目目录结构

```sh
├── docs                                      # 使用文档
├── public                                    # 公共静态资源
│   └── favicon                               # 网站图标
├── src
│   ├── assets                                # 本地静态资源
│   ├── components                            # 通用组件
│   ├── mock                                  # 本地 mock 数据
│   ├── pages                                 # 页面组件目录
│   ├── plugins                               # 插件
│   └── router                                # 路由配置
│       ├── dynamicRoutes.ts                  # 动态路由接口
│       ├── guards.ts                         # 路由守卫
│       ├── index.ts                          # 路由入口文件
│       └── routes.ts                         # 本地路由配置
│   ├── store                                 # vuex 状态管理配置
│   └── theme                                 # 主题配置
│       ├── antd                              # antd 样式覆盖
│       ├── style                             # 系统样式
│       ├── index.less                        # 系统样式入口文件
│       └── index.ts                          # 主题入口文件
│   ├── utils                                 # 工具类
│   ├── App.vue                               # 应用入口组件
│   └── main.ts                               # 应用入口js
├── .env                                      # 通用环境变量配置
├── .env.development                          # 开发环境变量配置
├── .prettierrc.json                          # prettierrc 配置文件
├── index.html                                # 应用入口 html
├── jsconfig.json                             # js开发配置
├── package.json                              # package.json
├── postcss.config.cjs                        # postcss 配置
├── README.md                                 # README.md
├── tailwind.config.cjs                       # tailwindcss 配置文件
├── tsconfig.json                             # typescript 配置文件
├── tsconfig.node.json                        # typescript 配置文件
└── vite.config.ts                            # vite 配置文件
```

## 一、创建页面组件

在 `./src/pages/` 目录下创建一个你的页面 vue 组件，如

```sh {6}
...
├── src
│   ...
│   ├── pages                                 # 页面组件目录
│       ...
│       ├── Demo.vue                          # 你的页面组件
│       ...
...
```

或者创建一个页面文件夹

```sh{6-8}
...
├── src
│   ...
│   ├── pages                                 # 页面组件目录
│       ...
│       ├── demo                              # 页面文件夹
│           ├── Demo.vue                      # 你的页面组件
│           └── index.ts                      # 页面入口文件
...
```

::: tip
当页面比较复杂时，你可以为它创建一个文件夹和 index 文件。把页面拆分成多个模块组件，并在 index.ts 导出主要组件即可。这将有助于你的后期开发的维护。
:::

`Demo.vue` 文件内容：

```vue
<script lang="ts" setup></script>
<template>
  <div>这是一个示例页面，你可以随意写一些代码</div>
</template>
<style lang="less" scoped></style>
```

`index.ts` 文件内容：

```ts
import Demo from './Demo.vue';
export default Demo;
```

## 二、配置路由

打开路由配置文件

```sh {6}
...
├── src
│   ...
│   └── router                                # 路由配置目录
│       ...
│       └── routes.ts                         # 路由配置文件
...
```

为你的页面组件添加一个路由配置

```ts {7-12}
import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  ...
  ...
  // 你的页面路由配置
  {
    path: '/demo',
    name: 'demo',
    component: () => import('@/pages/demo')
    // or component: () => import('@/pages/Demo.vue')
  },
];

export default routes;
```

## 三、访问

浏览器打开  `http://localhost:5173/#/demo` 即可访问你刚创建的页面啦。

现在你可以修改你的页面组件代码，浏览器上会实时同步更新。

## 常见问题

- 为什么新建页面访问时出现 404

# 权限管理
Stepin Template 可以对路由、按钮和方法进行鉴权控制
## 配置用户权限
你只需要从后端接口获取到权限数据后，调用权限插件的 `setAuthorities` 接口存储即可：
```ts {1,6-7,11}
import { useAuthStore } from '@/plugins';
...
async profile() {
  return http.request<Account, Response<Profile>>('/account', 'get').then((response) => {
    if (response.code === 0) {
      const { setAuthorities } = useAuthStore();
      const { account, permissions, role } = response.data;
      this.account = account;
      this.permissions = permissions;
      this.role = role;
      setAuthorities(permissions);
      return response.data;
    } else {
      return Promise.reject(response);
    }
  });
}
...
```
`setAuthorities` 接口接收一个权限数组，可以是字符串数组或数字数组
```ts
type AuthKey = string | number;

/**
 * @param authorities 权限数组
 */
setAuthorities: (authorities: AuthKey[]) => void;
//  authorities 一般是这样的数据
//  [
//    'system:user',
//    'system:user:add',
//    'system:user:edit',
//    'system:user:remove',
//    'department:query',
//    'department:add',
//    'department:edit',
//    'department:remove'
//  ]
```
这样你的用户权限就配置好了，接下来可以开始做鉴权配置了。
## 路由权限
如果你的一些页面希望做权限校验，禁止没有权限的人访问它，只需要在路由 `meta` 属性里配置权限即可:
```ts{9}
const routes: RouteRecordRaw[] = [
  ...
  {
    path: '/user/:id/profile',
    name: 'userProfile',
    meta: {
      title: '用户资料',
      icon: 'CreditCardOutlined',
      permission: 'user:profile'
    },
  },
  ...
]
```
如果是异步路由，则直接给 `permission` 属性设置所需权限即可
```ts{13}
// 异步路由/菜单数据类型
MenuProps {
  id?: number;
  name: string;
  path: string;
  title?: string;
  icon?: string;
  badge?: number | string;
  target?: '_self' | '_blank';
  link?: string;
  component: string;
  renderMenu?: boolean;
  permission?: string;
  parent?: string;
  children?: MenuProps[];
  cacheable: boolean;
}
```
这样路由权限就配置完成了，现在没有 `user:profile` 权限的人无法访问用户资料页面了

:::tip
注意打开菜单过滤功能，在 `设置面板 -> 其它` 可以找到这个设置项。或者直接在 `src/store/setting.ts` 里设置`filterMenu`的初始值
:::
## 按钮权限
我们提供了权限校验指令`v-auth`, 它的结构是这样的 `v-auth:[permission].[action]`，permission 是所需校验的权限，action 是校验失败后执行的动作。

action 有两个值可选 `disable` 和 `hide`， 可以不设置，默认是 `disable`。下面是使用示例：
```vue {2,5,9,13}
// 该按钮需要 `user:delete` 权限，如果校验失败，按钮会被禁用
<a-button v-auth:user:delete >删除</a-button>

// 该按钮需要 `user:delete` 权限，如果校验失败，按钮会被隐藏
<a-button v-auth:user:delete.hide >删除</a-button>

// 校验的权限也可以是一个变量
<script lang="ts" setup>
  const check = ref('user:delete')
</script>
<template>
  ...
  <a-button v-auth:[check].hide >删除</a-button>
  ...
</template>
```
如果默认的禁用样式不符合你的要求，你可以自定义样式，注册插件时指定即可

```ts{6,7}
// src/main.ts
...
import { AuthPlugin, IconfontPlugin } from '@/plugins';

const app = createApp(App);
// 设置禁用样式
app.use(AuthPlugin, { disableClass: 'customClass' });
...
```

你也可以更改权限校验失败后的默认动作，只需要在注册插件时设置即可:

```ts{6,7}
// src/main.ts
...
import { AuthPlugin, IconfontPlugin } from '@/plugins';

const app = createApp(App);
// 权限校验失败，默认隐藏元素
app.use(AuthPlugin, { action: 'hide' });
...
```
## `useAuth()`
如果你不想对按纽做限制，只想对按钮绑定的函数做控制，可以使用 `useAuth` api。

它可以给任意函数注入权限校验，执行函数时会进行权限校验，校验失败时会弹出一个全局提示消息。使用示例：
```vue
<script lang="ts" setup>
  import { useAuthStore } from '@/plugins'
  import { editProfile } from '@/module/api'

  const { useAuth } = useAuthStore();
  
  //创建一个需要 `user:delete` 权限的函数， 无此权限的用户执行此函数时会收到无权限警告，有权限的用户则无影响
  const removeUser = useAuth('user:delete', function(userId: number) {
    // your business code
    http.request('/api/user', 'delete', {id: userId});
  })

  // 也可以给外部导入的 editProfile 函数注入权限校验，效果也是一样的
  const _editProfile = useAuth('user:profile:edit', editProfile)
</script>
<template>
  <!-- 没有 'user:delete' 权限的用户点击会弹出无权限警告，有权限的用户点击正常执行 -->
  <a-button @click="removeUser">删除</a-button>
  <!-- 没有 'user:profile:edit' 权限的用户点击会弹出无权限警告，有权限的用户点击正常执行 -->
  <a-button @click="_editProfile">编辑</a-button>
</template>
```

## 常见问题

- 支持纯角色控制权限吗
- 有没有权限的数据库模型

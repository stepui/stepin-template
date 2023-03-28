# 接口服务
stepin template 使用 `axios` 来处理 http 请求，如果你不熟悉，可以到 axios 官网了解下 axios 的入门
## 创建请求
我们基于 axios 封装了一个 http 请求工具，它的用法和 axios 无异。只是额外增加了 token 管理接口。
如果你想详细了解，可以看下 `src/utils/axiosHttp.ts` 的代码

下面的代码创建了一个 http 实例
```ts
import createHttp from '@/utils/axiosHttp';

const http = createHttp({
  timeout: 10000,
  baseURL: 'api',
  withCredentials: true,
  xsrfCookieName: 'Authorization',
  xsrfHeaderName: 'Authorization',
});
```
它的创建和 axios 配置一样，你也可以创建多个 http 实例，用于处理不同 host 的接口服务。
## token
我们给 http 实例添加了几个 token 管理接口：
### `http.setAuthorization`
用于设置该http实例的token，设置后该实例的请求会自动带上 token 请求头用于身份验证。
```ts
/**
 * 设置token
 * @param value token值
 * @param expires 过期时间
 * - 类型为 number 时，单位为毫秒，表示 {expires} 毫秒后 token 过期
 * - 类型为 Date 时，表示在 {expires} 这个时间点 token 过期
 * @param name token 名称，默认为当前 http 实例的 xsrfCookieName 属性值
 */
setAuthorization(value: string, expires: number | Date, name?: string): void;
```
:::warning
有些同学从后端获取的token过期时间单位是秒，需要先转换成毫秒再设置。不然就可能会出现设置了token却没生效的情况（实际上是设置完立即过期了）
:::
### `http.removeAuthorization`
用于删除http实例的token，一般在登出等注销操作时调用。
```ts
/**
 * 移出token
 * @param name token 名称， 默认为当前 http 实例的 xsrfCookieName 属性值
 */
removeAuthorization(name?: string): void;
```

### `http.checkAuthorization`
校验 token 是否有效，一般用于接口请求前的校验或页面跳转前的校验
```ts
/**
 * 校验 token 是否有效
 * @param name 需要校验的 token 名称，默认为当前 http 实例的 xsrfCookieName 属性值
 */
checkAuthorization(name?: string): boolean;
```
## 拦截器
拦截器用法与 axios 拦截器完全一致，下面是几个拦截器示例代码：
```ts
...
// 解析响应结果
http.interceptors.response.use(
  (rep: AxiosResponse<String>) => {
    const { data } = rep;
    if (isResponse(data)) {
      return data.code === 0 ? data : Promise.reject(data);
    }
    return Promise.reject({ message: rep.statusText, code: rep.status, data });
  },
  (error) => {
    if (error.response && isAxiosResponse(error.response)) {
      return Promise.reject({
        message: error.response.statusText,
        code: error.response.status,
        data: error.response.data,
      });
    }
    return Promise.reject(error);
  }
);

// progress 进度条 -- 开启
http.interceptors.request.use((req: AxiosRequestConfig) => {
  if (!NProgress.isStarted()) {
    NProgress.start();
  }
  return req;
});

// progress 进度条 -- 关闭
http.interceptors.response.use(
  (rep) => {
    if (NProgress.isStarted()) {
      NProgress.done();
    }
    return rep;
  },
  (error) => {
    if (NProgress.isStarted()) {
      NProgress.done();
    }
    return error;
  }
);
...
```
详细代码在 `src/store/http.ts` 文件
## api 代理
当你的前端 host 和 后端接口 host 不一致时，可能就需要做接口代理了。只需在 vite.config.ts 中配置即可：
```ts
...
return defineConfig({
    server: {
      proxy: {
        '/api': { // 所有 /api 开头的请求将被代理
          target: env.VITE_API_URL, // 你的接口实际地址
          ws: true,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''), // 转发代理请求时去掉 /api 前缀，如果你的实际接口地址没有 /api 前缀时需要添加此配置
        },
        '/api2': {
          ...
        }
      },
      hmr: true,
    },
})
...
```

## 发起请求
使用 `http.request` 接口发起请求:
```ts
/**
 * 发起请求
 * @param url 请求地址
 * @param method 请求方法
 * @param params 请求参数
 * @param config 请求配置
 */
request<T = any, R = AxiosResponse<T>>(
  url: string,
  method: Method,
  params?: Record<string | number, any>,
  config?: AxiosRequestConfig
): Promise<R>;

interface Method {
  | 'get' | 'GET'
  | 'delete' | 'DELETE'
  | 'head' | 'HEAD'
  | 'options' | 'OPTIONS'
  | 'post' | 'POST'
  | 'post_json' | 'POST_JSON' 
  | 'put' | 'PUT'
  | 'put_json' | 'PUT_JSON' 
  | 'patch' | 'PATCH'
  | 'purge' | 'PURGE'
  | 'link' | 'LINK'
  | 'unlink' | 'UNLINK'
}
```

## 常见问题

- 有多个接口地址怎么办
- 为什么代理在生成环境不生效
- 接口报错 404 异常

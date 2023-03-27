# 开始

基于 stepin template 快速开发你的 vue 项目

## 环境准备

- node `^16.14.0`
- yarn `^1.21.1`
- git `^2.15.0`

## 安装

### 拉取代码

```bash
git clone https://github.com/stepui/stepin-template.git
```

### 安装依赖

控制台进入克隆下来的项目根目录，执行命令：

```bash
yarn install
```

## 开发

### 启动

```bash
yarn dev
```

### 访问

浏览器打开控制台显示的地址（一般是 `http://localhost:5173` 或 `http://127.0.0.1:5173`），即可开始开发并实时预览啦

::: tip
首次启动项目可能比较慢，请耐心等待，这是由 vite 的预加载机制导致。别担心，它只在首次启动比较慢，后续开发启动会很快。
:::

## 打包

### 编译

```bash
yarn build
```

### 预览

编译后项目根目录下会多出一个 `dist` 文件夹，里面是编译生成的文件，可以通过如下命令进行本地预览

```bash
yarn preview
```

## 多环境

可以在项目根目录下配置多个环境变量配置文件 `.env.[environment]`：

```sh {4-7}
...
├── src
...
├── .env                                      # 通用环境变量配置
├── .env.development                          # 开发环境变量配置
├── .env.test                                 # 测试环境变量配置
├── .env.prod                                 # 生产环境变量配置
...
```

在启动或编译时加上 `--mode [environment]`选项指定环境即可：

```sh
yarn dev --mode test
# or
yarn build --mode production
```

::: tip
`.env` 文件配置在所有环境下都会生效，一些通用配置可以放在这里
:::

## 常见问题

- 如何部署到 nginx
- 如何区分环境打包
- 打包后单文件过大
- 能兼容 IE 吗

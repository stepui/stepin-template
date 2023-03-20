import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import stepin from 'stepin/es';
import pinia from '@/store';
import '@/mock';
// 生产打包时可去除 ant-design-vue/dist/antd.variable.less 的引用。
// 开发引入此包是为了加载优化，防止首次打开页面过慢
import 'ant-design-vue/dist/antd.variable.less';
import 'stepin/es/style';
// import 'default-passive-events';
import '@/theme/index.less';
import AuthPlugin from '@/plugins/auth-plugin';
import IconFontPlugin from '@/plugins/iconfont';

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(stepin, { router });
app.use(AuthPlugin, { action: 'disable' });
// iconfont 插件。url为你的 iconfont 图标资源地址（你的iconfont 仓库可获取此地址）
app.use(IconFontPlugin, { url: '//at.alicdn.com/t/c/font_3805284_qmg2otkh6fp.js' });
app.config.errorHandler = function (err) {
  console.error('未捕获的异常，', err);
};
app.mount('#stepin-app');

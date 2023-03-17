import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import stepin from 'stepin/es';
// import antd from 'ant-design-vue';
import pinia from '@/store';

import 'stepin/es/style';
// import 'default-passive-events';
import '@/theme/index.less';
import AuthPlugin from '@/plugins/auth-plugin';
import IconFontPlugin from '@/plugins/iconfont';

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(stepin, { router });
// app.use(antd);
app.use(AuthPlugin, { action: 'disable' });
app.use(IconFontPlugin, { url: '//at.alicdn.com/t/c/font_3805284_qmg2otkh6fp.js' });
app.config.errorHandler = function (err) {
  console.error('未捕获的异常，', err);
};
app.mount('#stepin-app');

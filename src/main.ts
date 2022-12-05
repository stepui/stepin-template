import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import stepin from 'stepin';
import antd from 'ant-design-vue';
import pinia from '@/store';

import 'stepin/es/style';
import http from '@/services/http';
import '@/mock';
// import 'default-passive-events';
import 'ant-design-vue/dist/antd.less';
import '@/theme/index.less';
import AuthPlugin from '@/plugins/auth-plugin';
import IconFontPlugin from '@/plugins/iconfont';

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(http);
app.use(stepin, { router });
app.use(antd);
app.use(AuthPlugin, { action: 'disable' });
app.use(IconFontPlugin, { url: '//at.alicdn.com/t/c/font_3805284_qmg2otkh6fp.js' });

app.mount('#stepin-app');

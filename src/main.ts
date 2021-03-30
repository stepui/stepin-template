import { createApp } from 'vue';
import App from './App.vue';
import router from '/@/router';
import stepin from 'stepin';
import antd from 'ant-design-vue';

import 'ant-design-vue/dist/antd.less';
import 'stepin/dist/stepin.less';

const app = createApp(App);
app.use(router);
app.use(stepin, { router });
app.use(antd);
app.mount('#stepin-app');

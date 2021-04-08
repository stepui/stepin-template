import { createApp } from 'vue';
import App from './App.vue';
import router from '/@/router';
import stepin from 'stepin';
import antd from 'ant-design-vue';

import 'ant-design-vue/dist/antd.less';
import 'stepin/dist/stepin.less';
import http from '/@/services/http';
import store from '/@/store';

const app = createApp(App);

app.use(store);
app.use(router, store);
app.use(http);
app.use(stepin, { router });
app.use(antd);

app.mount('#stepin-app');

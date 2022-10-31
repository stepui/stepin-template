import { createApp } from 'vue';
import App from './App.vue';
import router from '/@/router';
import stepin from 'stepin';
import antd from 'ant-design-vue';

import '/@/theme/style/index.less';
import 'ant-design-vue/dist/antd.less';
import 'stepin/es/style';
import http from '/@/services/http';
import store from '/@/store';
import '/@/mock';

const app = createApp(App);

app.use(store);
app.use(router);
app.use(http);
app.use(stepin, { router });
app.use(antd);

app.mount('#stepin-app');

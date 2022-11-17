import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import stepin from 'stepin/es';
import antd from 'ant-design-vue';
import pinia from '@/store';

import 'stepin/es/style';
import http from '@/services/http';
import '@/mock';
// import 'default-passive-events';
import 'ant-design-vue/dist/antd.less';
import '@/theme/index.less';

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(http);
app.use(stepin, { router });
app.use(antd);

app.mount('#stepin-app');

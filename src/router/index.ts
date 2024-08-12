import { createRouter, createWebHashHistory } from 'vue-router';
import { shallowReactive } from 'vue';
import routes from './routes';
import guards from './guards';

const router = createRouter(
  shallowReactive({
    history: createWebHashHistory(),
    routes,
  })
);

// 注册导航守卫
guards.before.forEach(router.beforeEach);
guards.after.forEach(router.afterEach);

export default router;

import { createRouter, createWebHashHistory, Router } from 'vue-router';
import { Plugin, App, reactive } from 'vue';
import routes from './routes';
import guards from './guards';

const _router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const router: Plugin & Router = _router as any;
const _install = _router.install;

router.install = function (app: App, ...options: any[]) {
  _install.apply(this, [app]);
  app.use(guards);
};

export default reactive(router);

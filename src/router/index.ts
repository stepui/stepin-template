import { createRouter, createWebHashHistory, Router } from 'vue-router';
import { Plugin, App } from 'vue';
import routes from './routes';
import guards from './guards';
import { AppStore } from '/@/types';

const _router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const router: Plugin & Router = _router as any;
const _install = _router.install;

router.install = function (app: App, ...options: any[]) {
  const store = options[0] as AppStore;
  _install.apply(this, [app]);
  app.use(guards, this, store);
};

export default router;

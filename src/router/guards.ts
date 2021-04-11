import {
  RouteLocationNormalized,
  NavigationGuardNext,
  Router,
} from 'vue-router';
import { App, Plugin } from 'vue';
import http from '/@/services/http';
import store from '/@/store';

const loginGuard = function (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  if (to.path != '/login' && !http.checkAuthorization()) {
    store.commit('setLogin', false);
  }
  next();
};

const guards: Plugin = {
  install(app: App) {
    const router = app.config.globalProperties.$router as Router;
    router.beforeEach((to, from, next) => loginGuard(to, from, next));
  },
};

export default guards;

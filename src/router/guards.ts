import {
  RouteLocationNormalized,
  NavigationGuardNext,
  Router,
} from 'vue-router';
import { App, Plugin } from 'vue';
import http from '../services/http';
import { AppStore } from '/@/types';

export interface AppOptions {
  app: App;
  store: AppStore;
}

const loginGuard = function (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
  { app, store }: AppOptions
) {
  if (to.path != '/login' && !http.checkAuthorization()) {
    store.commit('setLogin', false);
  }
  next();
};

const guards: Plugin = {
  install(app: App, router: Router, store: AppStore) {
    router.beforeEach((to, from, next) =>
      loginGuard(to, from, next, { app, store })
    );
  },
};

export default guards;

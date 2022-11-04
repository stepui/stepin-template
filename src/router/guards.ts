import {
  RouteLocationNormalized,
  NavigationGuardNext,
  Router,
} from 'vue-router';
import { App, Plugin } from 'vue';
import http from '@/services/http';
import { useAppStore } from '@/store';

const loginGuard = function (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const appStore = useAppStore();
  if (to.path != '/login' && !http.checkAuthorization()) {
    appStore.setLoginStatus(false);
  }
  next();
};

const guards: Plugin = {
  install(app: App) {
    const router = app.config.globalProperties.$router as Router;
    router.beforeEach(loginGuard);
  },
};

export default guards;

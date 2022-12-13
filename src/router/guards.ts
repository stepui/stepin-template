import { NavigationGuard } from 'vue-router';
import http from '@/services/http';
import { useAppStore } from '@/store';

const loginGuard: NavigationGuard = function (to, from, next) {
  const appStore = useAppStore();
  if (to.path != '/login' && !http.checkAuthorization()) {
    appStore.setLoginStatus(false);
  }
  next();
};

export default [loginGuard];

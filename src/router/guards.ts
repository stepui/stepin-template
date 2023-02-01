import { NavigationGuard } from 'vue-router';
import http from '@/store/http';
import { useAccountStore } from '@/store';

const loginGuard: NavigationGuard = function (to, from) {
  const account = useAccountStore();
  if (!http.checkAuthorization() && to.fullPath !== '/login') {
    return '/login';
    // account.setLogged(false);
  }
};

export default [loginGuard];

import { NavigationGuard } from 'vue-router';
import http from '@/store/http';
import { useAccountStore } from '@/store';

const loginGuard: NavigationGuard = function (to, from) {
  const account = useAccountStore();
  if (!http.checkAuthorization() && !/^\/(login|home)?$/.test(to.fullPath)) {
    return '/login';
    // account.setLogged(false);
  }
};

export default [loginGuard];

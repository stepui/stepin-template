import { NavigationGuard } from 'vue-router';
import http from '@/store/http';
import { useAccountStore } from '@/store';

const loginGuard: NavigationGuard = function (to, from, next) {
  const account = useAccountStore();
  if (to.path != '/login' && !http.checkAuthorization()) {
    account.setLogged(false);
  }
  next();
};

export default [loginGuard];

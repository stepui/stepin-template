import { NavigationGuard, NavigationHookAfter } from 'vue-router';
import http from '@/store/http';
import { useAccountStore } from '@/store';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
NProgress.configure({ showSpinner: false });

const loginGuard: NavigationGuard = function (to, from) {
  const account = useAccountStore();
  if (!http.checkAuthorization() && !/^\/(login|home)?$/.test(to.fullPath)) {
    return '/login';
    // account.setLogged(false);
  }
};

const progressStart: NavigationGuard = function (to, from) {
  NProgress.start();
};

const progressEnd: NavigationHookAfter = function (to, from) {
  NProgress.done();
};

export default {
  before: [progressStart, loginGuard],
  after: [progressEnd],
};

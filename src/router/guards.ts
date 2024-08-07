import { storeToRefs } from 'pinia';
import { NavigationGuard, NavigationHookAfter } from 'vue-router';
import http from '@/store/http';
import { useAccountStore, useLoadingStore } from '@/store';
import { useAuthStore } from '@/plugins';
import NProgress from 'nprogress';
import { clearPage } from 'stepin/es/tabs-view';
import 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: false });

interface NaviGuard {
  before?: NavigationGuard;
  after?: NavigationHookAfter;
}

const loginGuard: NavigationGuard = function (to, from) {
  const account = useAccountStore();
  if (!http.checkAuthorization() && !/^\/(login|home)?$/.test(to.fullPath)) {
    return '/login';
    // account.setLogged(false);
  }
};
// 进度条
const ProgressGuard: NaviGuard = {
  before(to, from) {
    NProgress.start();
  },
  after(to, from) {
    NProgress.done();
  },
};

// const AuthGuard: NaviGuard = {
//   before(to, from) {
//     const { hasAuthority } = useAuthStore();
//     if (to.meta?.permission && !hasAuthority(to.meta?.permission)) {
//       const { authLoading } = storeToRefs(useLoadingStore());
//       return {
//         path: '/403',
//         query: { permission: to.meta.permission, path: to.fullPath, loading: authLoading.value as any },
//       };
//     }
//   },
// };

// 403 forbidden
const ForbiddenGuard: NaviGuard = {
  before(to) {
    const { hasAuthority } = useAuthStore();
    if (to.meta?.permission && !hasAuthority(to.meta?.permission)) {
      const { authLoading } = storeToRefs(useLoadingStore());
      return {
        path: '/403',
        query: { permission: to.meta.permission, path: to.fullPath, loading: authLoading.value as any },
      };
    } else if (to.name === '403' && (to.query.permission || to.query.path)) {
      clearPage(to.query.path as string);
      const { permission, path, loading } = to.query;
      to.params.permission = permission;
      to.params.path = path;
      to.params.loading = loading;
    }
  },
};

// 404 not found
const NotFoundGuard: NaviGuard = {
  before(to, from) {
    const { pageLoading } = useLoadingStore();
    if (to.meta._is404Page && pageLoading) {
      to.params.loading = true as any;
    }
  },
};

// scroll guard.
// 保证切换路由时，tabs-view 和 layout 的滚动位置不变
const tabsViewScroll: Record<string, number> = {};
const layoutScroll: Record<string, number> = {};
const ScrollGuard: NaviGuard = {
  before(to, from) {
    const tabsView = document.body.querySelector('.stepin-tabs-view-content');
    if (tabsView) {
      tabsViewScroll[from.fullPath] = tabsView.scrollTop;
    }
    const layout = document.body.querySelector('.stepin-layout-content');
    if (layout) {
      layoutScroll[from.fullPath] = layout.scrollTop;
    }
  },
  after(to, from) {
    Promise.resolve().then(() => {
      const tabsView = document.body.querySelector('.stepin-tabs-view-content');
      if (tabsView) {
        tabsView.scrollTop = tabsViewScroll[to.fullPath] ?? 0;
      }
      const layout = document.body.querySelector('.stepin-layout-content');
      if (layout) {
        layout.scrollTop = layoutScroll[to.fullPath] ?? 0;
      }
    });
  },
};

export default {
  before: [ScrollGuard.before, ProgressGuard.before, ForbiddenGuard.before, loginGuard, NotFoundGuard.before],
  after: [ProgressGuard.after, ScrollGuard.after],
};

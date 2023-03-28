import { defineStore, storeToRefs } from 'pinia';
import http from './http';
import { ref, watch } from 'vue';
import { Response } from '@/types';
import { RouteOption } from '@/router/interface';
import { addRoutes, removeRoute } from '@/router/dynamicRoutes';
import { useSettingStore } from './setting';
import { RouteRecordRaw, RouteMeta } from 'vue-router';
import { useAuthStore } from '@/plugins/auth-plugin';
import router from '@/router';

export interface MenuProps {
  id?: number;
  name: string;
  path: string;
  title?: string;
  icon?: string;
  badge?: number | string;
  target?: '_self' | '_blank';
  link?: string;
  component: string;
  renderMenu?: boolean;
  permission?: string;
  parent?: string;
  children?: MenuProps[];
  cacheable: boolean;
}

/**
 * 过滤菜单
 * @param routes
 * @param parentPermission
 */
function doMenuFilter(routes: Readonly<RouteRecordRaw[]>, parentPermission?: string) {
  const { hasAuthority } = useAuthStore();

  const setCache = (meta: RouteMeta) => {
    meta._cache = {
      renderMenu: meta.renderMenu,
    };
  };

  routes.forEach((route) => {
    const required = route.meta?.permission ?? parentPermission;
    if (route.meta?.renderMenu === undefined && required) {
      route.meta = route.meta ?? {};
      setCache(route.meta);
      route.meta.renderMenu = hasAuthority(route.meta.permission);
    }
    if (route.children) {
      doMenuFilter(route.children, required);
    }
  });
}

/**
 * 重置过滤
 * @param routes
 */
function resetMenuFilter(routes: Readonly<RouteRecordRaw[]>) {
  const resetCache = (meta: RouteMeta) => {
    if (meta._cache) {
      meta.renderMenu = meta._cache?.renderMenu;
    }
    delete meta._cache;
  };
  routes.forEach((route) => {
    if (route.meta) {
      resetCache(route.meta);
    }
    if (route.children) {
      resetMenuFilter(route.children);
    }
  });
}

// 菜单数据转为路由数据
const toRoutes = (list: MenuProps[]): RouteOption[] => {
  return list.map((item) => ({
    name: item.name,
    path: item.path,
    component: item.component,
    children: item.children && toRoutes(item.children),
    meta: {
      title: item.title,
      permission: item.permission,
      icon: item.icon,
      renderMenu: item.renderMenu,
      cacheable: item.cacheable,
      href: item.link,
      badge: /^(false|true)$/i.test(item.badge + '') ? JSON.parse(item.badge + '') : item.badge,
      target: item.target,
    },
  }));
};

export const useMenuStore = defineStore('menu', () => {
  const menuList = ref<MenuProps[]>([]);

  const { filterMenu } = storeToRefs(useSettingStore());

  const checkMenuPermission = () => {
    if (filterMenu.value) {
      doMenuFilter(router.options.routes);
    } else {
      resetMenuFilter(router.options.routes);
    }
  };

  checkMenuPermission();
  console.log(filterMenu.value);

  watch(filterMenu, checkMenuPermission);

  async function getMenuList() {
    return http.request<MenuProps[], Response<MenuProps[]>>('/menu', 'GET').then((res) => {
      const { data } = res;
      menuList.value = data;
      addRoutes(toRoutes(data));
      checkMenuPermission();
      return data;
    });
  }

  async function addMenu(menu: MenuProps) {
    return http
      .request<any, Response<any>>('/menu', 'POST_JSON', menu)
      .then((res) => {
        return res.data;
      })
      .finally(getMenuList);
  }

  async function updateMenu(menu: MenuProps) {
    return http
      .request<any, Response<any>>('/menu', 'PUT_JSON', menu)
      .then((res) => {
        return res.data;
      })
      .finally(getMenuList);
  }

  async function removeMenu(id: number) {
    return http
      .request<any, Response<any>>('/menu', 'DELETE', { id })
      .then(async (res) => {
        if (res.code === 0) {
          removeRoute(res.data.name);
        }
      })
      .finally(getMenuList);
  }

  return {
    menuList,
    getMenuList,
    addMenu,
    updateMenu,
    removeMenu,
  };
});

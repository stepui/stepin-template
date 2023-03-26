import { defineStore } from 'pinia';
import http from './http';
import { ref } from 'vue';
import { Response } from '@/types';
import { RouteOption } from '@/router/interface';
import { addRoutes, removeRoute } from '@/router/dynamicRoutes';

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

export const useMenuStore = defineStore('menu', () => {
  const menuList = ref<MenuProps[]>([]);
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
  async function getMenuList() {
    return http.request<MenuProps, Response<MenuProps[]>>('/menu', 'GET').then((res) => {
      const { data } = res;
      menuList.value = data;
      addRoutes(toRoutes(data));
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

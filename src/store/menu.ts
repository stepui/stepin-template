import { defineStore } from 'pinia';
import http from './http';
import { ref } from 'vue';
import { Response } from '@/types';
import { RouteOption } from '@/router/interface';
import { addRoutes } from '@/router/dynamicRoutes';

export interface MenuTable {
  id?: number;
  name: string;
  path: string;
  title?: string;
  icon?: string;
  component: string;
  renderMenu?: boolean;
  permission?: string;
  parent?: string;
  children?: MenuTable[];
  cacheable: boolean;
}

export const useMenuStore = defineStore('menu', () => {
  const menuList = ref<MenuTable[]>([]);
  const toRoutes = (list: MenuTable[]): RouteOption[] => {
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
      },
    }));
  };
  async function getMenuList() {
    return http.request<MenuTable, Response<MenuTable[]>>('/menu', 'GET').then((res) => {
      const { data } = res;
      menuList.value = data;
      addRoutes(toRoutes(data));
      return data;
    });
  }

  async function addMenu(menu: MenuTable) {
    return http
      .request<any, Response<any>>('/menu', 'POST_JSON', menu)
      .then((res) => {
        return res.data;
      })
      .finally(getMenuList);
  }

  async function updateMenu(menu: MenuTable) {
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
      .then(async (res) => {})
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

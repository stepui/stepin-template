import { defineStore } from 'pinia';
import http from './http';
import { ref } from 'vue';
import { Response } from '@/types';
import { RouteOption } from '@/router/interface';
import { addRoutes } from '@/router/dynamicRoutes';

export const useMenuStore = defineStore('menu', () => {
  const menuList = ref<RouteOption[]>([]);
  async function getMenuList() {
    return http.request<RouteOption, Response<RouteOption[]>>('/menu', 'GET').then((res) => {
      const { data } = res;
      menuList.value = data;
      addRoutes(data);
      return data;
    });
  }
  return {
    menuList,
    getMenuList,
  };
});

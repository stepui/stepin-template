import { defineStore } from 'pinia';
import http from './http';

export const useMenuStore = defineStore('menu', {
  state() {
    return {};
  },
  actions: {
    getMenuList() {
      http.request('/menu', 'GET').then((res) => {
        console.log(res, 'menu');
      });
    },
  },
});

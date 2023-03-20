import { defineStore } from 'pinia';
import http from './http';
import { Response } from '@/types';
import { useMenuStore } from './menu';

export interface Account {
  username: string;
  avatar: string;
  gender: number;
}

export type TokenResult = {
  token: string;
  expires: number;
};
export const useAccountStore = defineStore('account', {
  state() {
    return {
      account: {} as Account,
      logged: true,
    };
  },
  actions: {
    async login(username: string, password: string) {
      return http
        .request<TokenResult, Response<TokenResult>>('/login', 'post_json', { username, password })
        .then(async (response) => {
          if (response.code === 0) {
            this.logged = true;
            http.setAuthorization(`Bearer ${response.data.token}`, new Date(response.data.expires));
            await useMenuStore().getMenuList();
            return response.data;
          } else {
            return Promise.reject(response);
          }
        });
    },
    async logout() {
      return new Promise<boolean>((resolve) => {
        http.removeAuthorization();
        this.logged = false;
        resolve(true);
      });
    },
    async profile() {
      return http.request<Account, Response<Account>>('/account', 'GET').then((response) => {
        this.account = response.data;
      });
    },
    setLogged(logged: boolean) {
      this.logged = logged;
    },
  },
});

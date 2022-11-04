import { defineStore, createPinia } from 'pinia';

export interface AppState {
  loginStatus: boolean;
  theme: string;
}

export type AppActions = {
  setTheme: (theme: string) => void;
  setLoginStatus: (status: boolean) => void;
};

export const useAppStore = defineStore<string, AppState, {}, AppActions>(
  'app',
  {
    state() {
      return {
        loginStatus: true,
        theme: 'common',
      };
    },
    getters: {
      getAbc() {},
    },
    actions: {
      setLoginStatus(status: boolean) {
        this.loginStatus = status;
      },
      setTheme(theme: string) {
        this.theme = theme;
      },
    },
  }
);

export default createPinia();

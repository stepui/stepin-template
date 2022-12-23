import { defineStore, createPinia } from 'pinia';
export * from './account';
export * from './menu';
export interface AppState {
  loginStatus: boolean;
  theme: string;
}

export type AppActions = {
  setTheme: (theme: string) => void;
  setLoginStatus: (status: boolean) => void;
};

export type AppGetters = {};

export const useAppStore = defineStore<string, AppState, AppGetters, AppActions>('app', {
  state() {
    return {
      loginStatus: true,
      theme: 'common',
    };
  },
  actions: {
    setLoginStatus(status: boolean) {
      this.loginStatus = status;
    },
    setTheme(theme: string) {
      this.theme = theme;
    },
  },
});

const pinia = createPinia();

export default pinia;

import { createStore, Store } from 'vuex';

import { AppState } from '/@/types';

const store = createStore<AppState>({
  state() {
    return {
      loginStatus: true,
      theme: 'common',
    };
  },
  mutations: {
    setLogin(state: AppState, value) {
      state.loginStatus = value;
    },
    setTheme(state: AppState, value: string) {
      state.theme = value;
    },
  },
  actions: {
    setLoginStatus({ commit }, status: boolean) {
      commit('setLogin', status);
    },
    setTheme({ commit }, theme: string) {
      commit('setTheme', theme);
    },
  },
});

export default store;

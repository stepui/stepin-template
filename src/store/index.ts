import { createStore } from 'vuex';

import { AppState } from '/@/types';

const store = createStore<AppState>({
  state() {
    return {
      loginStatus: true,
    };
  },
  mutations: {
    setLogin(state: AppState, value) {
      state.loginStatus = value;
    },
  },
});

export default store;

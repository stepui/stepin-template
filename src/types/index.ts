import { type } from 'os';

import { Store } from 'vuex';

export interface AppState {
  loginStatus: boolean;
}

export type AppStore = Store<AppState>;

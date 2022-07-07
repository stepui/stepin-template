import { Store } from 'vuex';
export interface AppState {
  loginStatus: boolean;
  theme: string;
}

export type AppStore = Store<AppState>;

export interface LoginForm {
  username: string;
  password: string;
}

export interface Response {
  message: string;
  code: number;
  data?: any;
}

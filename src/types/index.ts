export interface LoginForm {
  username: string;
  password: string;
}

export interface Response<T = any> {
  message: string;
  code: number;
  data?: T;
}

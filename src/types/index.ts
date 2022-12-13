export interface LoginForm {
  username: string;
  password: string;
}

export interface Response<T = never> {
  message: string;
  code: number;
  data: T;
}

export interface LoginForm {
  username: string;
  password: string;
}

export interface Response<T = never> {
  message: string;
  code: number;
  data: T;
}

export function isResponse(obj: any): obj is Response<any> {
  return typeof obj === 'object' && obj.message !== undefined && obj.code !== undefined;
}

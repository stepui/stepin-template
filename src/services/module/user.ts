import http from '../http';
import store from '/@/store';
import { Response } from '/@/types';

/**
 * 登录服务
 * @param username
 * @param password
 */
export async function login(
  username: string,
  password: string
): Promise<Response> {
  return new Promise((resolve, reject) => {
    console.log(username, password);
    if (username === 'admin' && password === '888888') {
      setTimeout(() => {
        http.setAuthorization('stepin-app-token', 1);
        store.dispatch('setLoginStatus', true).then(() => {
          resolve({ message: '登录成功', code: 0 });
        });
      }, 500);
    } else {
      setTimeout(() => {
        resolve({ message: '用户名或密码错误', code: -1 });
      }, 500);
    }
  });
}

/**
 * 注销登录服务
 */
export async function logout(): Promise<Response> {
  return new Promise((resolve) => {
    http.removeAuthorization();
    store.dispatch('setLoginStatus', false).then(() => {
      resolve({ message: '已注销登录', code: 0 });
    });
  });
}

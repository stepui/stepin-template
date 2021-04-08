import http from '../http';

interface Response {
  message: string;
  code: number;
  data?: any;
}

export async function login(
  username: string,
  password: string
): Promise<Response> {
  return new Promise((resolve, reject) => {
    console.log(username, password);
    if (username === 'admin' && password === '888888') {
      setTimeout(() => {
        resolve({ message: '登录成功', code: 0 });
      }, 500);
    } else {
      setTimeout(() => {
        resolve({ message: '用户名或密码错误', code: -1 });
      }, 500);
    }
  });
}

export async function logout(): Promise<Response> {
  return new Promise((resolve) => {
    http.removeAuthorization();
    resolve({ message: '已注销登录', code: 0 });
  });
}

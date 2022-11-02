import Mock from 'mockjs';
import { Response } from '@/types';

// 登录模拟
Mock.mock(
  '/stepin-api/login',
  'post',
  ({ body }: { body: string }): Response => {
    const { username, password } = JSON.parse(body);
    if (username === 'admin' && password === '888888') {
      return {
        code: 0,
        message: '登录成功',
        data: {
          token: 'Bearer ' + Math.random(),
          expires: 1,
        },
      };
    } else {
      return {
        code: -1,
        message: '用户名或密码错误',
      };
    }
  }
);

// 注销登录
Mock.mock('/stepin-api/logout', 'post', (): Response => {
  return {
    code: 0,
    message: '已注销登录',
    data: true,
  };
});

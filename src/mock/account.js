import Mock from 'mockjs';
import CryptoJS from 'crypto-js';

function base64UrlEncode(source) {
  return CryptoJS.enc.Base64.stringify(source).replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_');
}

function sign(payload, salt, { expiresIn, encode = 'utf8' }) {
  const exp = new Date().getTime() + expiresIn;
  const header = JSON.stringify({ alg: 'HS256', type: 'JWT', exp });
  const payloadStr = JSON.stringify({ ...payload, exp });

  const base64Str =
    base64UrlEncode(CryptoJS.enc.Utf8.parse(header)) + '.' + base64UrlEncode(CryptoJS.enc.Utf8.parse(payloadStr));
  const signature = base64UrlEncode(CryptoJS.HmacSHA256(base64Str, salt));
  return base64Str + '.' + signature;
}

Mock.mock('api/login', 'post', ({ body }) => {
  const { username, password } = JSON.parse(body ?? '{}');
  if (username === 'admin' && password === '888888') {
    const expiresIn = 24 * 60 * 60 * 1000;
    const token = sign({ username: 'admin', role: 'admin' }, 'secret key', { expiresIn });
    console.log(token);
    return { code: 0, message: 'success', data: { token, expires: expiresIn + new Date().getTime() } };
  } else {
    return { code: 401, msg: '用户名或密码错误' };
  }
});

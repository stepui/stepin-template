import jwt from 'jsonwebtoken';

/**
 *
 * @param {Express} app
 * @param {Database} db
 */
export default function accountController(app, db) {
  app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const account = db.prepare('select * from account where username = ?').get(username);
    if (account && account.username === username && account.password === password) {
      const expiresIn = 24 * 60 * 60 * 1000;
      const token = jwt.sign({ username, role: 'admin', accountId: account.id }, 'secret key', {
        expiresIn,
        encoding: 'utf8',
      });
      res.send({
        code: 0,
        message: 'success',
        data: { token, expires: expiresIn + new Date().getTime() },
      });
    } else {
      res.send({
        code: -1,
        message: '用户名或密码错误',
      });
    }
  });

  app.get('/account', (req, res) => {
    const { accountId } = req.auth;
    const account = db.prepare('select * from account where id = ?').get(accountId);
    res.send({ ...account, password: undefined });
  });
}

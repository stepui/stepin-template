/**
 *
 * @param {Express} app
 * @param {Database} db
 */
export default function menuController(app, db) {
  app.get('/menu', (req, res) => {
    const menuList = db.prepare('select * from menu').all();
    const menuMap = menuList.reduce((p, c) => {
      p[c.name] = c;
      return p;
    }, {});
    menuList.forEach((menu) => {
      menu.renderMenu = !!menu.renderMenu;
      if (menu.parent) {
        const parent = menuMap[menu.parent];
        parent.children = parent.children ?? [];
        parent.children.push(menu);
      }
    });
    res.send({
      code: 0,
      message: 'success',
      data: menuList.filter((menu) => !menu.parent),
    });
  });

  app.post('/menu', (req, res) => {
    const { name, title, icon, path, component, renderMenu, parent, permission } = req.body;
    const result = db
      .prepare(' insert into menu values (null, ?, ?, ?, ?, ?, ?, ?, ?)')
      .run(name, title, path, icon, permission, component, 1 & renderMenu, parent);
    res.send({
      code: 0,
      message: 'success',
      data: result,
    });
  });

  app.put('/menu', (req, res) => {
    const { name, title, icon, path, component, renderMenu, parent, permission, id } = req.body;
    const result = db
      .prepare(
        ' update menu set name = ?, title = ?, path = ?, icon = ?, permission = ?, component = ?, renderMenu = ?, parent = ? where id = ?'
      )
      .run(name, title, path, icon, permission, component, 1 & renderMenu, parent, id);
    res.send({
      code: 0,
      message: 'success',
      data: result,
    });
  });

  app.delete('/menu', (req, res) => {
    const { id } = req.body;
    const result = db.prepare('delete from menu where id = ?').run(id);
    res.send({
      code: 0,
      message: 'success',
      data: result,
    });
  });
}

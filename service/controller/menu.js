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
    res.send(menuList.filter((menu) => !menu.parent));
  });
}

import Mock from 'mockjs';

const presetList = [
  {
    id: 1,
    name: 'workplace',
    title: '工作台',
    path: '/workplace',
    icon: 'DashboardOutlined',
    permission: null,
    component: '@/pages/workplace',
    renderMenu: true,
    parent: null,
  },
  {
    id: 2,
    name: 'table',
    title: '表格',
    path: '/table',
    icon: 'TableOutlined',
    permission: null,
    component: '@/pages/table',
    renderMenu: true,
    parent: null,
  },
  {
    id: 3,
    name: 'personal',
    title: '个人中心',
    path: '/personal',
    icon: 'ProfileOutlined',
    permission: null,
    component: '@/pages/personal',
    renderMenu: true,
    parent: null,
  },
  {
    id: 6,
    name: 'system',
    title: ' 系统配置',
    path: '/system',
    icon: 'SettingOutlined',
    permission: null,
    component: '@/components/layout/BlankView.vue',
    renderMenu: true,
    parent: null,
  },
  {
    id: 8,
    name: 'menu',
    title: '菜单管理',
    path: '/system/menu',
    icon: 'SettingOutlined',
    permission: null,
    component: '@/pages/system',
    renderMenu: true,
    parent: 'system',
  },
  {
    id: 7,
    name: 'user',
    title: '用户管理',
    path: '/system/user',
    icon: 'SettingOutlined',
    permission: null,
    component: '@/pages/user',
    renderMenu: true,
    parent: 'system',
  },
];

function getMenuList() {
  const menuStr = localStorage.getItem('stepin-menu');
  let menuList = [];
  if (!menuStr) {
    menuList = presetList;
    localStorage.setItem('stepin-menu', JSON.stringify(menuList));
  } else {
    menuList = JSON.parse(menuStr);
  }
  return menuList;
}

function saveMenu(menu) {
  const menuList = getMenuList();
  if (!menu.id) {
    menu.id = menuList.map((item) => item.id).reduce((p, c) => Math.max(p, parseInt(c)), 0) + 1;
  }
  const existMenu = menuList.find((item) => item.id === menu.id);
  if (!existMenu) {
    menuList.push(menuList);
  } else {
    Object.assign(existMenu, menu);
  }
  console.log(menuList);
  localStorage.setItem('stepin-menu', JSON.stringify(menuList));
}

Mock.mock('api/menu', 'get', ({}) => {
  let menuList = getMenuList();
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
  return {
    message: 'success',
    code: 0,
    data: menuList.filter((menu) => !menu.parent),
  };
});

Mock.mock('api/menu', 'put', ({ body }) => {
  const menu = JSON.parse(body);
  saveMenu(menu);
  return {
    code: 0,
    message: 'success',
  };
});

Mock.mock('api/menu', 'post', ({ body }) => {
  const menu = JSON.parse(body);
  saveMenu(menu);
  return {
    code: 0,
    message: 'success',
  };
});

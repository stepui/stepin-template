import Mock from 'mockjs';

const presetList = [
  {
    id: 1,
    name: 'workplace',
    title: '工作台',
    icon: 'DashboardOutlined',
    badge: 'new',
    target: '_self',
    path: '/workplace',
    component: '@/pages/workplace',
    renderMenu: true,
    parent: null,
    permission: null,
    cacheable: true,
  },
  {
    id: 2,
    name: 'table',
    title: '表格',
    icon: 'TableOutlined',
    badge: '',
    target: '_self',
    path: '/table',
    component: '@/pages/table',
    renderMenu: true,
    parent: null,
    permission: null,
    cacheable: true,
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
    title: '系统配置',
    icon: 'SettingOutlined',
    badge: '',
    target: '_self',
    path: '/system',
    component: '@/components/layout/BlankView.vue',
    renderMenu: true,
    parent: null,
    permission: null,
    cacheable: true,
  },
  {
    id: 8,
    name: 'menu',
    title: '菜单管理',
    badge: '12',
    target: '_self',
    path: '/system/menu',
    component: '@/pages/system',
    renderMenu: true,
    parent: 'system',
    permission: null,
    cacheable: true,
  },
  {
    id: 7,
    name: 'user',
    title: '用户管理',
    target: '_self',
    path: '/system/user',
    component: '@/pages/user',
    renderMenu: true,
    parent: 'system',
    permission: null,
    cacheable: true,
  },
  {
    id: 9,
    name: 'bilibili',
    title: 'B站',
    icon: 'BoldOutlined',
    badge: 'iframe',
    target: '_self',
    path: '/bilibili',
    component: 'iframe',
    renderMenu: true,
    permission: 'edit',
    cacheable: true,
    link: 'https://www.bilibili.com',
  },
  {
    id: 10,
    name: 'github',
    title: 'Github',
    icon: 'GithubOutlined',
    badge: 'link',
    target: '_blank',
    path: '/github',
    component: 'link',
    renderMenu: true,
    parent: null,
    cacheable: true,
    link: 'https://github.com/stepui/stepin-template',
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
  const index = menuList.findIndex((item) => item.id === menu.id);
  if (index === -1) {
    menuList.push(menu);
  } else {
    menuList.splice(index, 1, menu);
  }
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

Mock.mock('api/menu', 'delete', ({ body }) => {
  const id = body.get('id')[0];
  let menuList = getMenuList();
  const index = menuList.findIndex((menu) => menu.id === id);
  const [removed] = menuList.splice(index, 1);
  localStorage.setItem('stepin-menu', JSON.stringify(menuList));
  return {
    code: 0,
    message: 'success',
    data: removed,
  };
});

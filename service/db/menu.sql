DROP TABLE IF EXISTS menu;

-- 创建菜单表
CREATE TABLE menu(
  name TEXT NOT NULL PRIMARY KEY,
  title TEXT,
  path TEXT,
  icon TEXT,
  permission TEXT,
  component TEXT,
  renderMenu INTEGER,
  parent TEXT
);

-- 初始化数据
INSERT INTO menu
VALUES (
    'workplace',
    '工作台',
    '/workplace',
    'DashboardOutlined',
    NULL,
    '@/pages/workplace',
    TRUE,
    NULL
  ),
  (
    'table',
    '表格',
    '/table',
    'TableOutlined',
    NULL,
    '@/pages/table',
    TRUE,
    NULL
  ),
  (
    'personal',
    '个人中心',
    '/personal',
    'ProfileOutlined',
    NULL,
    '@/pages/personal',
    TRUE,
    NULL
  ),
  (
    'billing',
    '账单',
    '/billing',
    'CreditCardOutlined',
    NULL,
    '@/pages/billing',
    TRUE,
    NULL
  ),
  (
    'async-routes',
    '账单',
    '/async/routes',
    'FundProjectionScreenOutlined',
    NULL,
    '@/pages/AsyncRoutes.vue',
    TRUE,
    NULL
  ),
  (
    'test',
    '测试',
    '/test',
    'FundProjectionScreenOutlined',
    NULL,
    '@/pages/Test.vue',
    TRUE,
    NULL
  ),
  (
    'system',
    '系统配置',
    '/system',
    'SettingOutlined',
    NULL,
    '@/components/layout/BlankView.vue',
    TRUE,
    NULL
  ),
  (
    'user',
    '用户管理',
    '/system/user',
    'SettingOutlined',
    NULL,
    '@/pages/user',
    TRUE,
    'system'
  ),
  (
    'menu',
    '菜单管理',
    '/system/menu',
    'SettingOutlined',
    NULL,
    '@/pages/system',
    TRUE,
    'system'
  );
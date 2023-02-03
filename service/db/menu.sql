DROP TABLE IF EXISTS menu;
-- 创建菜单表
CREATE TABLE menu(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
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
    null,
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
    null,
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
    null,
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
    null,
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
    null,
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
    null,
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
    null,
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
    null,
    'menu',
    '菜单管理',
    '/system/menu',
    'SettingOutlined',
    NULL,
    '@/pages/system',
    TRUE,
    'system'
  );
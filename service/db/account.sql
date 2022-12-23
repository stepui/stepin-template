DROP TABLE IF EXISTS account;

-- 创建账户表
CREATE TABLE account (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  'password' TEXT NOT NULL,
  avatar TEXT,
  gender INTEGER,
  birthday TEXT
);

-- 初始化数据
INSERT INTO account
VALUES(NULL, 'admin', '888888', NULL, 1, '1991-09-10')
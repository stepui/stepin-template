import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  markdown: {
    lineNumbers: true,
  },
  title: 'Stepin Template',
  description: 'the documents of stepin template',
  base: '/stepin-template-docs/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: 'Api', link: '/api' },
    ],

    logo: '../images/vite.svg',

    editLink: {
      pattern: 'https://github.com/stepui/stepin-template/edit/main/docs/:path',
    },

    sidebar: [
      {
        text: '文档',
        items: [
          { text: '开始', link: '/start' },
          { text: '页面开发', link: '/page' },
          { text: '路由&菜单', link: '/router' },
          { text: '接口服务', link: '/server' },
          { text: '权限管理', link: '/authority' },
          { text: '主题定制', link: '/theme' },
          { text: 'i8n', link: '/i18n' },
        ],
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/stepui/stepin-template' }],
  },
});

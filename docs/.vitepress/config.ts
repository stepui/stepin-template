import { defineConfig } from 'vitepress';
import { AntdvLessPlugin, AntdvModifyVars } from 'stepin/lib/style/plugins';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  vite: {
    // server: {
    //   fs: {
    //     allow: ['../..'],
    //   },
    // },
    ssr: {
      noExternal: ['stepin', 'ant-design-vue', '@ant-design/*'],
    },
    css: {
      preprocessorOptions: {
        less: {
          plugins: [AntdvLessPlugin],
          modifyVars: AntdvModifyVars,
          javascriptEnabled: true,
        },
      },
    },
  },
  markdown: {
    lineNumbers: true,
  },
  title: 'Stepin Template',
  description: 'the documents of stepin template',
  base: '/',
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
          {
            text: '主题定制',
            items: [
              { text: '颜色', link: '/theme/color' },
              { text: '尺寸与间距', link: '/theme/size' },
              { text: 'CSS变量对照表', link: '/theme/css-variables' },
              // { text: '组件风格', link: '/theme/style' },
              // { text: '预设主题', link: '/theme/preset' },
              { text: 'ThemeProvider', link: '/theme/theme-provider' },
            ],
          },
          { text: 'i8n', link: '/i18n' },
        ],
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/stepui/stepin-template' }],
  },
});

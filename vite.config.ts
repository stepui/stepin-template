import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import antdvThemePlugin from 'stepin/es/style/less-plugin-antdv-dynamic-theme.cjs';

// vite 配置
export default ({ command, mode }) => {
  // 获取环境变量
  const env = loadEnv(mode, process.cwd());
  return defineConfig({
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_URL,
          ws: true,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
      hmr: true,
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    esbuild: {
      jsxFactory: 'h',
      jsxFragment: 'Fragment',
    },
    build: {
      sourcemap: true,
      chunkSizeWarningLimit: 4096,
      // rollupOptions: {
      //   output: {
      //     chunkFileNames: (chunk) => {
      //       return 'assets/' + chunk.name + '.[hash]' + '.' + timestamp + '.js';
      //     },
      //     assetFileNames: (asset) => {
      //       const name = asset.name;
      //       if (name && (name.endsWith('.css') || name.endsWith('.js'))) {
      //         const names = name.split('.');
      //         const extname = names.splice(names.length - 1, 1)[0];
      //         return `assets/${names.join('.')}.[hash].${timestamp}.${extname}`;
      //       }
      //       return 'assets/' + asset.name;
      //     },
      //   },
      // },
    },
    plugins: [
      vue({
        template: {
          transformAssetUrls: {
            img: ['src'],
            'a-avatar': ['src'],
            'stepin-view': ['logo-src'],
            'a-card': ['cover'],
          },
        },
      }),
      Components({
        resolvers: [AntDesignVueResolver({ importStyle: mode === 'development' ? false : 'less' })],
      }),
    ],
    css: {
      preprocessorOptions: {
        less: {
          plugins: [antdvThemePlugin],
          modifyVars: {
            'root-entry-name': 'variable',
            'btn-padding-horizontal-base': 'calc(var(--padding-md) - 1px)',
            'btn-padding-horizontal-sm': 'calc(var(--padding-xs) - 1px)',
            'menu-item-active-bg': 'var(--color-primary-bg)',
            'text-color': 'var(--color-text-1)',
            'text-color-secondary': 'var(--color-text-3)',
            'text-color-inverse': 'var(--color-text-inverse)',
            'heading-color': 'var(--color-text-1)',
            'component-background': 'var(--color-bg-container)',
            'body-background': 'var(--color-bg-layout)',
            'background-color-light': 'var(--color-bg-container-light)',
            'background-color-base': 'var(--color-bg-layout)',
            'border-color-base': 'var(--color-border-1)',
            'border-color-split': 'var(--color-border-2)',
            'item-hover-bg': 'var(--color-bg-hover)',
            'checkbox-check-bg': 'var(--color-bg-container)',
            'disabled-color': 'var(--color-disabled)',
            'popover-bg': 'var(--color-bg-popover)',
            'layout-header-background': 'var(--color-bg-header)',
            'menu-bg': 'var(--color-bg-menu)',
            'menu-dark-bg': 'var(--color-bg-menu)',
            'menu-inline-submenu-bg': 'var(--color-bg-submenu)',
            'menu-dark-inline-submenu-bg': 'var(--color-bg-submenu)',
            'select-dropdown-bg': 'var(--color-bg-popover)',
            'shadow-color': 'var(--color-shadow)',
            'shadow-color-light': 'var(--color-shadow-light)',
            'font-size': 'var(--font-size)',
            'font-size-base': 'var(--font-size)',
            'font-size-lg': 'var(--font-size-lg)',
            'font-size-sm': 'var(--font-size-sm)',
            'padding-lg': 'var(--padding-lg)',
            'padding-md': 'var(--padding-md)',
            'padding-sm': 'var(--padding-sm)',
            'padding-xs': 'var(--padding-xs)',
            'padding-xss': 'var(--padding-xss)',
            'margin-lg': 'var(--margin-lg)',
            'margin-md': 'var(--margin-md)',
            'margin-sm': 'var(--margin-sm)',
            'margin-xs': 'var(--margin-xs)',
            'margin-xss': 'var(--margin-xss)',
            'border-radius-base': 'var(--radius-xs)',
            'shadow-2': 'var(--box-shadow-2)',
          },
          javascriptEnabled: true,
        },
      },
    },
    base: env.VITE_BASE_URL,
  });
};

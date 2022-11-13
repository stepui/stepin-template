import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

const timestamp = new Date().getTime();

// vite 配置
export default ({ command, mode }) => {
  // 获取环境变量
  const env = loadEnv(mode, process.cwd());

  return defineConfig({
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
      rollupOptions: {
        output: {
          chunkFileNames: (chunk) => {
            return 'assets/' + chunk.name + '.[hash]' + '.' + timestamp + '.js';
          },
          assetFileNames: (asset) => {
            const name = asset.name;
            if (name && (name.endsWith('.css') || name.endsWith('.js'))) {
              const names = name.split('.');
              const extname = names.splice(names.length - 1, 1)[0];
              return `assets/${names.join('.')}.[hash].${timestamp}.${extname}`;
            }
            return asset.name;
          },
        },
      },
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
    ],
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
    base: env.VITE_BASE_URL,
  });
};

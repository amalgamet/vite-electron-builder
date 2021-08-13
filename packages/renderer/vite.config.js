/* eslint-env node */
import { join } from 'path';
import { builtinModules } from 'module';
import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { loadAndSetEnv } from '../../scripts/loadAndSetEnv.mjs';
import { chrome } from '../../electron-vendors.config.json';

const root = __dirname;

/**
 * Vite looks for `.env.[mode]` files only in `root` directory.
 * Therefore, you must manually load and set the environment variables from the root directory above
 */
loadAndSetEnv(process.env.MODE, process.cwd());

/**
 * @see https://vitejs.dev/config/
 */
export default defineConfig({
  root,
  resolve: {
    alias: {
      '/@/': join(root, 'src') + '/',
    },
  },
  plugins: [reactRefresh()],
  base: '',
  server: {
    fsServe: {
      root: join(root, '../../'),
    },
  },
  build: {
    sourcemap: true,
    target: `chrome${chrome}`,
    outDir: 'dist',
    assetsDir: '.',
    terserOptions: {
      ecma: 2020,
      compress: {
        passes: 2,
      },
      safari10: false,
    },
    rollupOptions: {
      external: [...builtinModules],
    },
    emptyOutDir: true,
  },
});

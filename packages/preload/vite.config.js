import { chrome } from '../../electron-vendors.config.json';
import { join } from 'path';
import { builtinModules } from 'module';
import { defineConfig } from 'vite';
import { loadAndSetEnv } from '../../scripts/loadAndSetEnv.mjs';

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
  build: {
    sourcemap: 'inline',
    target: `chrome${chrome}`,
    outDir: 'dist',
    assetsDir: '.',
    minify: process.env.MODE === 'development' ? false : 'terser',
    terserOptions: {
      ecma: 2020,
      compress: {
        passes: 2,
      },
      safari10: false,
    },
    lib: {
      entry: 'src/index.ts',
      formats: ['cjs'],
    },
    rollupOptions: {
      external: ['electron', ...builtinModules],
      output: {
        entryFileNames: '[name].cjs',
      },
    },
    emptyOutDir: true,
  },
});

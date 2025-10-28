import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/**/*.ts', '!src/**/*.test.ts', '!src/**/*.spec.ts'],
  outDir: 'dist',
  format: ['esm'],
  target: 'es2018',
  platform: 'node',
  minify: true,
  sourcemap: false,
  clean: true,
  dts: false,
  splitting: false,
  treeshake: true,
});

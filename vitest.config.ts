import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.{test,spec}.{js,ts}'],
    exclude: ['node_modules', 'dist'],
    coverage: {
      include: [
        'src/**/*.ts',
      ],
      exclude: [
        'src/**/static/**', // This is pure data
        'src/**/index.ts', // Barrel files
        'src/**/types.ts', // Types files
        'src/battlefront/flamesOfWarV4/helpers/**/*.ts', // Deprecated code
        'src/battlefront/teamYankeeV2/helpers/**/*.ts', // Deprecated code
        'src/battlefront/_shared/_internal/createGetForceDiagramData.ts', // Deprecated code
      ],
    },
  },
});

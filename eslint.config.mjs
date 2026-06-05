import { base, typescript } from '@ianpaschal/eslint-config';

export default [
  { ignores: ['dist'] },
  ...base,
  ...typescript,
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'error',
    },
  },
];

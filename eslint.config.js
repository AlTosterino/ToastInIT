import tsParser from '@typescript-eslint/parser';
import astro from 'eslint-plugin-astro';
export default [
  ...astro.configs['flat/recommended'],
  {
    files: ['**/*.{ts,js}'],
    languageOptions: { parser: tsParser },
    rules: { 'no-console': 'warn' },
  },
  { ignores: ['dist/**', 'node_modules/**', 'playwright-report/**'] },
];

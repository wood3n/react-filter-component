const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
  root: true,
  env: {
    es2022: true,
    browser: true,
    node: true, 
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/strict-type-checked',],
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    ecmaVersion: 2022,
    project: [
      './tsconfig.json',
      './packages/*/tsconfig.json'
    ],
  },
  overrides: [
    {
      files: ['*.js'],
      extends: ['plugin:@typescript-eslint/disable-type-checked']
    },
  ],
  rules: {
    '@typescript-eslint/no-var-requires': 0
  },
});
/* eslint max-len: 0 */
module.exports = {
  root: true,
  env: {
    es2023: true,
    browser: true,
    node: true,
    jest: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/strict-type-checked',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:react/jsx-runtime',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint', 'simple-import-sort'],
  settings: {
    react: {
      version: '17.0.2',
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: ['./packages/*/tsconfig.json'],
      },
    },
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    // tsconfigRootDir: __dirname,
    sourceType: 'module',
    ecmaVersion: 'latest',
    alwaysTryTypes: true,
    project: ['./tsconfig.base.json', './packages/*/tsconfig.json'],
  },
  overrides: [
    {
      files: ['*.js'],
      extends: ['plugin:@typescript-eslint/disable-type-checked'],
    },
  ],
  rules: {
    'linebreak-style': 0,
    'multiline-comment-style': ['error', 'starred-block'],
    'import/no-cycle': 0,
    'import/prefer-default-export': 0,
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // `react` related packages & side effect imports come first.
          ['^react', '^\\u0000'],
          /*
           * Node.js builtins. You could also generate this regex if you use a `.js` config.
           * For example: `^(${require("module").builtinModules.join("|")})(/|$)`
           */
          [
            '^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)',
          ],
          // Other packages.
          ['^\\w', '^@\\w'],
          // internal package
          [
            '^(@|@assets|assets|@styles|styles|@static|static|@utils|utils|@tools|tools|@hooks|hooks|@pages|pages|@components|components|@component|component|@service|service|@services|services|@constants|@store|store|@types|types|@src|src|@providers|providers|@containers|containers|@layout|layout)(/.*|$)',
          ],
          [
            // Parent imports. Put `..` last.
            '^\\.\\.(?!/?$)',
            '^\\.\\./?$',
            // Other relative imports. Put same-folder imports and `.` last.
            '^\\./(?=.*/)(?!/?$)',
            '^\\.(?!/?$)',
            '^\\./?$',
          ],
          [
            // Image imports.
            '^.+\\.(gif|png|jpg|jpeg|webp|svg)$',
            // Style imports.
            '^.+\\.(sass|scss|less|css)$',
          ],
        ],
      },
    ],
    'simple-import-sort/exports': 'error',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'no-shadow': 0,
    'no-underscore-dangle': 0,
    'import/no-extraneous-dependencies': 0,
    'max-len': ['error', { code: 200, tabWidth: 2 }],
    'no-param-reassign': 0,
    'no-restricted-syntax': 0,
    'react/require-default-props': 0,
    'react/no-array-index-key': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.tsx'] }],
    'react/function-component-definition': 0,
    'react/jsx-props-no-spreading': 0,
    'react-hooks/exhaustive-deps': 0,
    'no-unused-vars': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_|draft' }],
    '@typescript-eslint/triple-slash-reference': 0,
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-floating-promises': 0,
    '@typescript-eslint/no-unsafe-assignment': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/no-unsafe-enum-comparison': 0,
    '@typescript-eslint/no-unsafe-call': 0,
    'global-require': 0,
  },
};

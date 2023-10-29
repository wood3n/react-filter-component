module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-prettier/recommended'],
  customSyntax: 'postcss-less',
  overrides: [
    {
      files: ['*.less', '**/*.less'],
      customSyntax: 'postcss-less',
    },
  ],
  rules: {
    'rule-empty-line-before': 'always',
    'prettier/prettier': [true, { endOfLine: 'auto' }],
  },
};

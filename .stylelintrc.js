module.exports = {
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-prettier'],
  customSyntax: 'postcss-less',
  overrides: [
    {
      files: ['*.less', '**/*.less'],
      customSyntax: 'postcss-less',
    },
  ],
  rules: {
    'rule-empty-line-before': [
      'always',
      {
        ignore: ['after-comment', 'first-nested', 'inside-block'],
      },
    ],
    'prettier/prettier': [true, { endOfLine: 'auto' }],
  },
};

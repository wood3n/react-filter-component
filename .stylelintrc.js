module.exports = {
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-prettier'],
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

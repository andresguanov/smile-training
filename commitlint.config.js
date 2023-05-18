module.exports = {
  extends: ['@commitlint/config-conventional'],
  /**
   * [Rules] https://commitlint.js.org/#/reference-rules
   */
  rules: {
    'subject-case': () => [2, 'always', ['sentence-case']],
  },
};

module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true
  },
  extends: [
    '@netly/eslint-config-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
  },
};

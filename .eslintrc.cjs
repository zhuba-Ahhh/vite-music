module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:vue/vue3-essential',
    'airbnb-base',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'vue', 'import'],
  rules: {
    'func-names': 'off',
    'linebreak-style': 'off',
    'vue/no-template-shadow': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-param-reassign': 'off',
    'import/extensions': [2, 'never', { 'web.js': 'never', json: 'never' }],
    'object-curly-newline': [
      'error',
      {
        ExportDeclaration: { multiline: true, minProperties: 6 }
      }
    ],
    'import/no-extraneous-dependencies': [2, { devDependencies: true }],
    'import/no-unresolved': [2, { ignore: ['antd-mobile'] }]
  }
};

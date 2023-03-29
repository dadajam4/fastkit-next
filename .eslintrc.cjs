module.exports = {
  root: true,
  extends: ['@fastkit/eslint-config'],
  // overrides: [
  //   {
  //     files: ['*.ts', '*.tsx', '*.js', '*.jsx', '*.mjs', '*.cjs', '*.vue'],
  //     extends: ['plugin:vue/vue3-recommended'],
  //     parser: 'vue-eslint-parser',
  //     rules: {
  //       'vue/one-component-per-file': 'off',
  //       'vue/require-explicit-emits': 'off',
  //       'vue/require-default-prop': 'off',
  //     },
  //   },
  // ],
  ignorePatterns: [
    '/node_modules/',
    '**/node_modules/',
    '/coverage/',
    '/dist/',
    '/play.ts',
    '**/dist/',
    '**/.vui/',
    '**/vui.d.ts',
    // 'docs/',
  ],
};

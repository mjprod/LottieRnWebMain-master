const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  plugins: [
    new ESLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
      emitWarning: true,
      lintDirtyModulesOnly: true,
      threads: false,
    }),
  ],
};
const path = require('path');
const { compilerOptions } = require('../tsconfig.json');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const basedir = path.join(__dirname, '..');

module.exports = async ({ config, mode }) => {
  config.module.rules.push(
    {
      test: /\.md?$/,
      loader: "markdown-loader",
    },
    {
      test: /\.tsx?$/,
      loader: 'ts-loader',
      include: [
        path.join(basedir, 'src'),
        path.join(basedir, 'stories'),
      ],
      options: {
        transpileOnly: true, // use transpileOnly mode to speed-up compilation
        compilerOptions: {
          ...compilerOptions,
          declaration: false,
        },
      },
    },
  );

  config.plugins.push(new ForkTsCheckerWebpackPlugin());

  config.resolve.extensions = ['.ts', '.tsx', '.js', '.jsx'];
  config.resolve.enforceExtension = false;

  // disable the hint about too big bundle
  config.performance.hints = false;

  return config;
};

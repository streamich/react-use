const path = require("path");
const { compilerOptions } = require("../tsconfig.json");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const basedir = path.join(__dirname, "..");

module.exports = {
  stories: ["../stories/**/*.story.tsx"],
  addons: [
    "@storybook/addon-knobs",
    "@storybook/addon-options",
    "@storybook/addon-actions",
    "@storybook/addon-notes",
  ],
  typescript: {
    check: true,
    reactDocgenTypescriptOptions: {
      compilerOptions: {
        ...compilerOptions,
      },
    },
  },
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.md?$/,
      loader: "markdown-loader",
    });

    config.resolve.enforceExtension = false;

    // disable the hint about too big bundle
    config.performance.hints = false;

    return config;
  },
};

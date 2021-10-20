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

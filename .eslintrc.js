module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
      modules: true
    },
    project: "./tsconfig.json"
  },
  plugins: ["@typescript-eslint", "react-hooks"],
  // Este rules.
  rules: {
    // React Hooks.
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error"
  }
};

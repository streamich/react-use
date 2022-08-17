module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['react-app', 'plugin:markdown/recommended'],
  overrides: [
    {
      files: ['**/*.md'],
      processor: 'markdown/markdown',
    },
    {
      files: ['docs/*.md/*.{js,jsx,ts,tsx,json}'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'off',
        'jsx-a11y/alt-text': 'off',
        'no-restricted-globals': 'off',
        'no-undef': 'warn',
        'react-hooks/exhaustive-deps': 'off',
        'react-hooks/rules-of-hooks': 'off',
      },
    },
  ],
};

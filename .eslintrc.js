module.exports = {
  extends: ['react-app', 'prettier', 'plugin:markdown/recommended'],
  plugins: ['prettier'],
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
      },
    },
  ],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'es5',
        tabWidth: 2,
        printWidth: 100,
        semicolons: true,
        quoteProps: 'as-needed',
        jsxSingleQuote: false,
        bracketSpacing: true,
        jsxBracketSameLine: true,
        arrowParens: 'always',
        endOfLine: 'lf',
      },
    ],
  },
};

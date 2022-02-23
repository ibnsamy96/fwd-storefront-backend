module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    jest: true
  },
  extends: ['airbnb-base', 'eslint:recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12
  },
  plugins: ['@typescript-eslint', 'prettier'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  },

  rules: {
    semi: ['error', 'never'],
    'no-console': 'off',
    'no-use-before-define': ['error', { functions: true, classes: true }],
    'no-var': 'error',
    'prefer-const': 'error',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto'
      }
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
        '': 'never'
      }
    ]
  }
}

// eslint configurations
const esLintConfig = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  plugins: ['react', 'jsx-a11y', 'import'],
  env: {
    browser: true,
    jest: true,
    node: true
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.android.js', '.ios.js', '.json']
      }
    }
  },
  rules: {
    indent: 'off',
    'no-nested-ternary': 'off',
    'object-curly-newline': 'off',
    'comma-dangle': ['error', 'never'],
    'implicit-arrow-linebreak': 'off',
    'arrow-parens': 'off',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-underscore-dangle': [
      'error',
      {
        allow: [
          '__REDUX_DEVTOOLS_EXTENSION__',
          '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'
        ]
      }
    ],
    'space-before-function-paren': 'off',
    'func-names': 'off',
    radix: ['error', 'as-needed'],
    'operator-linebreak': 'off',
    'global-require': 'off',
    'no-plusplus': 'off',
    'function-paren-newline': 'off',
    'wrap-iife': 'off',
    'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx'] }],
    'react/destructuring-assignment': 'off',
    'react/no-array-index-key': 'warn',
    'react/jsx-one-expression-per-line': 'off',
    'class-methods-use-this': 'off',
    'react/jsx-closing-bracket-location': 'off',
    'react/jsx-boolean-value': 'off',
    'import/no-dynamic-require': 'off',
    'import/prefer-default-export': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/label-has-for': 'off'
  }
};

module.exports = { esLintConfig };

// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    es6: true,
  },
  extends: [
    'airbnb-base',
    'plugin:vue/recommended'
  ],
  // required to lint *.vue files
  plugins: [
    'html'
  ]
}

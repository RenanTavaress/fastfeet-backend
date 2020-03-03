module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    "no-tabs": "off",
    "no-mixed-spaces-and-tabs": "off",
    "no-trailing-spaces": "off",
    "indent": ["error", 3],
    "class-methods-use-this": "off",
    "no-param-reassign": "off",
    "camelcase": "off",
    "no-unused-vars":["error", {"argsIgnorePattern":"next"}],
    "no-multiple-empty-lines": [2, {"max": 99999, "maxEOF": 0}],
    "linebreak-style": ["error", "windows"]
    
  },
};

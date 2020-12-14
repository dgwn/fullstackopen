module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
    jest: true,
    cypress: true
  },
  extends: "eslint:recommended",
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  plugins: ["react", "jest", "cypress"],
  rules: {
    "no-console": 0,
    "no-trailing-spaces": "error",
    "object-curly-spacing": ["error", "always"],
    "arrow-spacing": ["error", { before: true, after: true }],
    eqeqeq: "error",
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"]
  }
};

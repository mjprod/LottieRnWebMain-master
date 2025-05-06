module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  parser: "@babel/eslint-parser",
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-native/all",
  ],
  plugins: ["react", "react-native", "import", "react-hooks"],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "no-unused-vars": "warn",
    "no-console": "warn",
    "eqeqeq": ["error", "always"],
    "curly": ["error", "all"],
    "no-debugger": "error",
    "no-duplicate-imports": "error",
    "consistent-return": "warn",

    "react-native/no-inline-styles": "off",
    "react-native/sort-styles": "off",
    "react-native/no-color-literals": "warn",
    "react-native/no-raw-text": "warn",

    "react/react-in-jsx-scope": "off",
    "react/prop-types": "warn",
    "react/jsx-uses-vars": "error",
    "react/jsx-key": "error",
    "react/self-closing-comp": "warn",
    "react/jsx-no-duplicate-props": "error",
    "react/no-unstable-nested-components": "warn",

    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",

    "object-curly-spacing": ["error", "always"],
    "array-bracket-spacing": ["error", "never"],
    "comma-dangle": ["error", "always-multiline"],
    "quotes": ["error", "double", { avoidEscape: true }],
    "semi": ["error", "always"],
  },
};
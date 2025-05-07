import globals from "globals";
import pluginReact from "eslint-plugin-react";
import pluginReactNative from "eslint-plugin-react-native";
import pluginImport from "eslint-plugin-import";
import pluginReactHooks from "eslint-plugin-react-hooks";
import { defineConfig } from "eslint/config";
import babelParser from "@babel/eslint-parser";

export default defineConfig([
  {
    ignores: ["build/**", "node_modules/**"],
  },
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      sourceType: "module",
      ecmaVersion: 2021,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ["@babel/preset-react"],
        },
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: pluginReact,
      "react-native": pluginReactNative,
      import: pluginImport,
      "react-hooks": pluginReactHooks,
    },
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
      "semi": ["error", "always"],
      // indentation: 2 spaces
      indent: ["error", 2],
      // require spaces around infix operators (e.g. 1 + 2)
      "space-infix-ops": "error",
      // enforce spacing before/after keywords (e.g. `if ( … )`)
      "keyword-spacing": ["error", { before: true, after: true }],
      // space before function parentheses: `function foo()`, not `foo ()`
      "space-before-function-paren": ["error", "never"],
      // space before blocks: `if (x) {`, not `if (x){`
      "space-before-blocks": "error",
      // enforce spacing around commas: `a, b`, not `a ,b`
      "comma-spacing": ["error", { before: false, after: true }],
      // require spaces inside `{ }`: `{ a: 1 }`, not `{a:1}`
      "object-curly-spacing": ["error", "always"],
      // spacing around the colon in object literals: `key: value`
      "key-spacing": ["error", { beforeColon: false, afterColon: true }],
    },
  },
]);
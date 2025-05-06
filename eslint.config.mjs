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
      "quotes": ["error", "double", { avoidEscape: true }],
      "semi": ["error", "always"],
    },
  },
]);
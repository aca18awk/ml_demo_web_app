import js from "@eslint/js";
import globals from "globals";
import importPlugin from "eslint-plugin-import";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  {
    ignores: ["dist"],
  },
  {
    files: ["**/*.{js,jsx}"],
    plugins: {
      import: importPlugin,
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
    rules: {
      // JavaScript rules
      ...js.configs.recommended.rules,
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
      "no-undef": "error", // Catch undefined variables
      "no-undef-init": "error", // Disallow initializing to undefined

      // React rules
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      "react/prop-types": "off", // Turn off PropTypes since you're not using them

      // React Hooks rules
      ...reactHooks.configs.recommended.rules,

      // Essential Import rules
      "import/no-unresolved": "error",
      "import/no-useless-path-segments": "error",
      "import/no-duplicates": "error",

      // Stricter object property access
      "dot-notation": "error", // Enforce dot notation when possible
      "no-unused-expressions": "error", // Catch expressions that don't do anything
    },
  },
];

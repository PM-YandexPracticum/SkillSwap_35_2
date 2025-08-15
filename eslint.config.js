import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import prettier from "eslint-plugin-prettier";
import importPlugin from "eslint-plugin-import";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        project: [
          "./tsconfig.app.json",
          "./tsconfig.node.json"
        ],
        tsconfigRootDir: import.meta.dirname
      }
    }
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    plugins: { prettier, import: importPlugin },
    rules: {
      "prettier/prettier": "error",
      "react/react-in-jsx-scope": "off",
      "import/order": [
        "error",
        {
          groups: ["builtin","external","internal","parent","sibling","index"],
          alphabetize: { order: "asc", caseInsensitive: true }
        }
      ],
      "comma-dangle": "off",
      "jsx-quotes": ["warn", "prefer-single"],
      "arrow-body-style": ["warn", "as-needed"],
      "dot-notation": "warn",
      "valid-typeof": "warn",
      "@typescript-eslint/member-ordering": [
        "warn",
        {
          default: [
            "private-static-field","protected-static-field","public-static-field",
            "private-static-method","protected-static-method","public-static-method",
            "private-constructor","protected-constructor","public-constructor",
            "private-instance-field","protected-instance-field","public-instance-field",
            "private-instance-method","protected-instance-method","public-instance-method"
          ]
        }
      ]
    },
    settings: {
      react: { version: "detect" },
      "import/resolver": {
        typescript: {
          project: [
            "./tsconfig.app.json",
            "./tsconfig.node.json"
          ]
        }
      }
    }
  }
]);

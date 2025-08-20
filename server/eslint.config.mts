import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],

    // Extend base recommended configs
    extends: [js.configs.recommended, ...tseslint.configs.recommended],

    languageOptions: {
      globals: globals.browser,
    },

    rules: {
      // ✅ Indentation: enforce tabs
      indent: ["error", "tab"],

      // ✅ Semicolons required
      semi: ["error", "always"],

      // ✅ Disallow unused variables
      "no-unused-vars": "error",

      // ✅ Enforce blank lines after imports
      "padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "import", next: "*" },
      ],
    },
  },
]);

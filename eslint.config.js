import js from "@eslint/js";
import perf from "eslint-plugin-perfectionist";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  {
    extends: ["js/recommended", "perf/recommended-natural"],
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    languageOptions: { globals: globals.node },
    plugins: { js, perf },
  },
  tseslint.configs.recommended,
  {
    rules: { "@typescript-eslint/no-unused-vars": "off" },
  },
]);

import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // Base ESLint recommended config
  js.configs.recommended,
  
  // Next.js configs (converted from eslint-config-next)
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript"]
  }),
  
  // Your custom rules
  {
    rules: {
      "react/no-unescaped-entities": "off",
      // Add other rules here
    }
  }
];
/** @type {import("eslint").ESLint.Options} */
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
  plugins: ["prettier", "@typescript-eslint"],
  env: { browser: true, commonjs: true, es6: true, node: true },
  rules: {
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["warn"],
    "prettier/prettier": ["error", { endOfLine: "auto" }],
    semi: "off",
    quotes: ["warn", "double"],
    "max-classes-per-file": ["error", 1],
    "max-depth": ["warn", 4],
    curly: ["warn", "multi-line"],
    "no-spaced-func": "off",
    "no-extra-semi": "off",
    "no-console": "warn",
    "@typescript-eslint/no-misused-promises": [
      "warn",
      {
        checksConditionals: true,
        checksVoidReturn: false,
        checksSpreads: true,
      },
    ],
  },
};

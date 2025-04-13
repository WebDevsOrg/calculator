module.exports = {
  env: {
    browser: true,
    es2021: true, // Updated to ES2021 for modern JavaScript features
    node: true, // Added Node.js environment support
  },
  extends: [
    "eslint:recommended", // Use ESLint's recommended rules
    "plugin:prettier/recommended", // Integrate Prettier with ESLint
  ],
  parserOptions: {
    ecmaVersion: 2021, // Updated to ES2021 for modern syntax
    sourceType: "module", // Use ES Modules
  },
  plugins: ["prettier"], // Include Prettier as a plugin
  rules: {
    "prettier/prettier": "error", // Enforce Prettier formatting
    semi: ["error", "always"], // Require semicolons
    quotes: ["error", "double"], // Enforce double quotes
    "no-unused-vars": ["warn"], // Warn about unused variables
    "no-console": "off", // Allow console statements
  },
};

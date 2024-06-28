module.exports = {
    "extends": [
        "eslint-config-standard",
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:@conarti/feature-sliced/recommended"
    ],
    "env": {
        browser: true,
        es2021: true
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        ecmaVersion: "latest",
        sourceType: "module"
    },
    "plugins": [
        "@typescript-eslint",
        "react",
        "react-hooks"
    ],
    "rules": {
        "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
        "react-hooks/exhaustive-deps": "warn",
        "@typescript-eslint/no-unused-vars": "warn",
        "react/react-in-jsx-scope": "off",
        "indent": ["error", 4],
        "quotes": ["error", "double"],
        "no-tabs": ["error", { allowIndentationTabs: true }],
        "quote-props": ["error", "consistent-as-needed", { keywords: true, unnecessary: false }],
        "react/display-name": "off",
        "no-empty-pattern": "off",
        "@conarti/feature-sliced/layers-slices": "warn",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        "prefer-promise-reject-errors": "off",    
}
}

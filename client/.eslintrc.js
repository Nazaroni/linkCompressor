module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true,
            "experimentalObjectRestSpread": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "no-multi-spaces": "off",
        "no-console": "off",
        "template-curly-spacing": "off",
        "space-in-parens": "off",
        "brace-style": "off",
        "arrow-body-style": ["error", "always"],
        "max-len": ["error", { "code": 120 }],
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }]
    },
    "parser": "babel-eslint",
};
module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "parser": "typescript-eslint-parser",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true
        },
        "sourceType": "module"
    },
    "extends": [
        // "airbnb",
        "eslint:recommended",
    ],
    "plugins": [
        "typescript",
    ],
    "rules": {
        "no-undef": 0,
        // "no-unused-vars": 0,
    }
};

module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true,
        "jasmine": true
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
        "plugin:unicorn/recommended",
        "plugin:lodash/recommended",
        "plugin:jasmine/recommended",
        "plugin:flowtype/recommended",
    ],
    "plugins": [
        "typescript",
        "flowtype",
        "unicorn",
        "lodash",
        "lodash-smells",
        "perf-standard",
        "wix-editor",
        "prefer-spread",
        "jasmine",
        "import",
    ],
    "rules": {
        "no-undef": 0,
        "no-unused-vars": 0,
        "no-empty-function": 0,
        "class-methods-use-this": 1,
        "import/no-webpack-loader-syntax": 1,
        "import/newline-after-import": 1,
        "import/no-duplicates": 1,
        "import/no-nodejs-modules": 1,
        "import/no-dynamic-require": 1,
        "import/max-dependencies": [1, {"max": 10}],
        "typescript/type-annotation-spacing": 1,
        "flowtype/no-primitive-constructor-types": 2,
        "flowtype/no-weak-types": 1,
        "flowtype/require-parameter-type": [0, { "excludeArrowFunctions": true }],
        "flowtype/require-return-type": [0, "always", { "annotateUndefined": "never", "excludeArrowFunctions": true }],
        "flowtype/space-after-type-colon": 1,
        "flowtype/space-before-generic-bracket": 1,
        "flowtype/space-before-type-colon": [1, "never"],
        "flowtype/type-id-match": 0,
        "flowtype/union-intersection-spacing": 1,
        "flowtype/use-flow-type": 1,
        "flowtype/no-types-missing-file-annotation": 0,
        "unicorn/no-abusive-eslint-disable": 0,
        "typescript/type-annotation-spacing": 1,
        "wix-editor/augmented-assignment": 1,
        "wix-editor/no-instanceof-array": 1,
        "wix-editor/no-not-not": 1,
        "wix-editor/no-unneeded-match": 1,
        "wix-editor/prefer-filter": 1,
        "wix-editor/prefer-ternary": 1,
        "wix-editor/return-boolean": 1,
        "wix-editor/simplify-boolean-expression": 1,
        "jasmine/no-focused-tests": 1,
        "lodash-smells/no-big-ifs": 1,
        "lodash-smells/no-each-push": 1,
        "perf-standard/no-instanceof-guard": 2,
        "perf-standard/no-self-in-constructor": 2,
        "perf-standard/check-function-inline": 1,
        "perf-standard/no-array-iterators": 0,
        "lodash/prefer-lodash-method": 0,
        "prefer-spread/prefer-object-spread": [1, "includeNearEquivalents"],
        "no-with": 2,
        "comma-dangle": [1, "only-multiline"],
        "no-bitwise": 1,
        "one-var": [1, "never"],
        "no-underscore-dangle": 1,
        "radix": 1,
        "no-console": 1,
        "no-debugger": 1,
        "no-duplicate-case": 1,
        "no-empty": 1,
        "no-unreachable": 1,
        "no-unsafe-finally": 1,
        "no-this-before-super": 1,
        "constructor-super": 1,
        "quotes": [1, "single", { "allowTemplateLiterals": true }],
        "semi": [1, "always"],
        "eqeqeq": 2,
        "block-spacing": [1, "always"],
        "comma-spacing": [1, { "before": false, "after": true }],
        "eol-last": 1,
        "indent": [1, 4, { "SwitchCase": 1 }],
        "no-mixed-spaces-and-tabs": 1,
        "no-multiple-empty-lines": [1, { "max": 1 }],
        "no-spaced-func": 1,
        "no-trailing-spaces": 1,
        "space-before-blocks": 1,
        "space-before-function-paren": [1, { "anonymous": "always", "named": "never" }],
        "space-unary-ops": [1, { "words": true, "nonwords": false }],
        "no-irregular-whitespace": 2,
        "no-use-before-define": [2, "nofunc"],
        "no-else-return": 2,
        "no-unexpected-multiline": 2,
        "dot-location": [2, "property"],
        "no-throw-literal": 2,
        "comma-style": [2, "last"],
        "no-await-in-loop": 1,
        "no-eval": 2,
        "no-extra-bind": 2,
        "no-implicit-coercion": [1, { "boolean": true }],
        "no-loop-func": 2,
        "no-script-url": 2,
        "no-self-compare": 1,
        "no-throw-literal": 1,
        "max-params": [2, { "max": 5 }],
        "no-trailing-spaces": 1,
        "no-confusing-arrow": 2,
        "prefer-const": 1,

    }
};

module.exports = {
    "root": true,
    "extends": "standard",
    "parserOptions": {
        "sourceType": "module",
        "codeFrame": false
    },
    "rules": {
        "semi": ["error", "never"],
        "space-before-function-paren": ["error", {
            "anonymous": "always",
            "named": "always",
            "asyncArrow": "always"
        }],
        "indent": ["error", 2],
        "one-var": 0,
        "object-curly-spacing": 0,
        "no-unused-expressions": 0,
        "object-property-newline": 0,
        "no-new": 0,
        "comma-dangle": 0,
        "curly": 0,
        "space-in-parens": 0,
        "eqeqeq": 0,
        "no-unused-vars": 0, // relying on editor for this one
        "no-multiple-empty-lines":  ["error", {"max": 2}],
        "padded-blocks": 0,
        "no-extend-native": 0,
        "no-throw-literal": 0,
        "no-multi-spaces": 0,
        "no-restricted-modules": 0
    },
    "globals": {
        it: true,
        page: true,
        browser: true,
        context: true,
        beforeAll: true,
        beforeEach: true,
        afterAll: true,
        describe: true,
        expect: true,
        jest: true
    }
};
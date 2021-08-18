module.exports = {
    ...require('@megafon/frontend-presets/eslint'),
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
                paths: ['src', 'etc'],
            },
        },
        'eslint-import-resolver-typescript': true,
    },
    rules: {
        'arrow-body-style': ['error'],
        'brace-style': ['error'],
        curly: ['error'],
        'object-curly-newline': [
            'error',
            {
                multiline: true,
                consistent: true,
            },
        ],
        'no-console': ['error'],
        'no-alert': ['error'],
        'space-before-blocks': ['error', 'always'],
        'no-multi-spaces': [
            'error',
            {
                ignoreEOLComments: true,
            },
        ],
        'no-multiple-empty-lines': [
            'error',
            {
                max: 1,
                maxBOF: 0,
            },
        ],
        'arrow-parens': ['error', 'as-needed'],
        'newline-before-return': ['error'],
        'no-restricted-syntax': [
            'error',
            {
                selector: 'ForInStatement',
                message:
                    'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
            },
            {
                selector: 'LabeledStatement',
                message:
                    'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
            },
            {
                selector: 'WithStatement',
                message:
                    '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
            },
        ],
        'padded-blocks': [
            'error',
            {
                blocks: 'never',
                classes: 'never',
                switches: 'never',
            },
        ],
        'no-unused-expressions': [
            'error',
            {
                allowShortCircuit: true,
            },
        ],
        'id-match': [
            'error',
            '^[^а-яА-Я]+$',
            {
                properties: true,
            },
        ],
        'func-names': ['error', 'always'],
        'no-magic-numbers': ['off'],
        'no-plusplus': [
            'error',
            {
                allowForLoopAfterthoughts: true,
            },
        ],
        'react/prefer-stateless-function': ['error'],
        'react/no-unsafe': ['error'],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'react/no-danger': ['off'],
        'react/prop-types': ['off'],
        'react/static-property-placement': ['off'],
        'react/jsx-fragments': ['error', 'syntax'],
        'react/jsx-filename-extension': [
            'error',
            {
                extensions: ['.tsx'],
            },
        ],
        'react/require-default-props': ['off'],
        'react/default-props-match-prop-types': ['off'],
        '@typescript-eslint/no-empty-function': ['error'],
        '@typescript-eslint/explicit-module-boundary-types': ['error'],
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: 'interface',
                format: ['PascalCase'],
                custom: {
                    regex: '^I[A-Z]',
                    match: true,
                },
            },
        ],
        '@typescript-eslint/ban-types': [
            'error',
            {
                types: {
                    Object: 'Avoid using the `Object` type. Did you mean `object`?',
                    Function: 'Avoid using the `Function` type. Prefer a specific function type, like `() => void`.',
                    Boolean: 'Avoid using the `Boolean` type. Did you mean `boolean`?',
                    Number: 'Avoid using the `Number` type. Did you mean `number`?',
                    String: 'Avoid using the `String` type. Did you mean `string`?',
                    Symbol: 'Avoid using the `Symbol` type. Did you mean `symbol`?',
                },
            },
        ],
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': ['error'],
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': ['error'],
        'no-duplicate-imports': [
            'error',
            {
                includeExports: true,
            },
        ],
        'import/order': [
            'error',
            {
                groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true,
                },
                'newlines-between': 'never',
            },
        ],
        'import/extensions': [
            'error',
            'always',
            {
                ignorePackages: true,
                pattern: {
                    ts: 'never',
                    tsx: 'never',
                },
            },
        ],
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: true,
            },
        ],
        'import/no-useless-path-segments': [
            'error',
            {
                noUselessIndex: true,
            },
        ],

        'react/jsx-props-no-spreading': [0],
        'react/no-multi-comp': ['off'],
        'react/no-array-index-key': ['off'],
        'jsx-a11y/click-events-have-key-events': ['off'],
        'jsx-a11y/no-static-element-interactions': ['off'],
        'jsx-a11y/label-has-associated-control': [0],
        'jsx-a11y/iframe-has-title': [0],
        'react/destructuring-assignment': [0],
        'import/no-unresolved': [
            'error',
            {
                ignore: ['.svg', '.png'],
            },
        ],
    },
};

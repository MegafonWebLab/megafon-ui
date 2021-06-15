module.exports = {
    env: {
        test: {
            presets: [
                '@babel/typescript',
                '@babel/react',
                ['@babel/env', {
                    targets: {
                        node: '14.17.1',
                    },
                }]
            ],
        },
        buildReactIcons: {
            presets: [
                '@babel/react',
                ['@babel/env', {
                    useBuiltIns: 'usage',
                    corejs: '3.6',
                }]
            ],
            plugins: [
                '@babel/plugin-transform-object-assign',
                '@babel/plugin-transform-runtime'
            ]
        },
        buildEs: {
            presets: [
                '@babel/react',
                ['@babel/env', {
                    modules: false,
                    useBuiltIns: 'usage',
                    corejs: '3.6'
                }]
            ],
            plugins: [
                '@babel/plugin-transform-object-assign',
                '@babel/plugin-transform-runtime',
                ['module-resolver', {
                    root: ['./src']
                }],
            ]
        },
        buildLib: {
            presets: [
                ['@babel/env', {
                    modules: 'commonjs'
                }]
            ]
        }
    }
};

import { css } from 'docz-plugin-css';
import { resolve } from 'path';

module.exports = {
    title: 'MegaFon UI',
    description: 'Megafon React UI Kit',
    themeConfig: {
        colors: {
            primary: '#00b956',
            link: '#00b956'
        }
    },
    base: '/megafon-ui/',
    dest: 'docs',
    typescript: true,
    protocol: 'http',
    src: resolve(__dirname, 'src'),
    plugins: [
        css({
            preprocessor: 'less',
            cssmodules: false
        })
    ],
    modifyBundlerConfig: config => {
        const idx = config.module.rules.findIndex(
            r => r.test.toString() === '/\\.(svg)(\\?.*)?$/'
        );

        config.module.rules[idx] = {
            test: /\.svg$/,
            use: {
                loader: '@svgr/webpack',
            },
        };

        return config;
    },
};

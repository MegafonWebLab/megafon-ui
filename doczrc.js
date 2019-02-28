import { css } from 'docz-plugin-css';
import { resolve, basename } from 'path';
import FilterWarningsPlugin from 'webpack-filter-warnings-plugin';

module.exports = {
    title: 'MegaFon UI',
    description: 'Megafon React UI Kit',
    themeConfig: {
        colors: {
            primary: '#00b956',
            link: '#00b956'
        },
        styles: {
            container: {
                width: '100%',
            }
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
            use: [
                ({ resource }) => ({
                    loader: '@svgr/webpack',
                    options: {
                        svgoConfig: {
                            plugins: [
                                {
                                    cleanupIDs: {
                                        prefix: `svg-${basename(resource, '.svg')}`,
                                    }
                                },
                                {
                                    inlineStyles: { onlyMatchedOnce: false }
                                }
                            ],
                        }
                    },
                }),
            ],
        };

        config.plugins.push(
            new FilterWarningsPlugin({
                exclude: /mini-css-extract-plugin[^]*Conflicting order between:/
            })
        );

        return config;
    }
};

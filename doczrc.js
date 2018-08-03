import { css } from 'docz-plugin-css';

const path = require('path');

module.exports = {
    title: 'MegaFon UI',
    themeConfig: {
        colors: {
            primary: '#00b956'
        }
    },
    typescript: true,
    modifyBundlerConfig(config, dev, args) {
        config.resolve.modules = config.resolve.modules || [];
        config.resolve.modules.push(path.resolve(__dirname, 'src'));

        return config;
    },
    plugins: [
        css({
            preprocessor: 'less',
            cssmodules: true
        })
    ]
};

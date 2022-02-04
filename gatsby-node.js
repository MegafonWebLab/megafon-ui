const fs = require('fs');
const { basename, resolve, join, parse } = require('path');
const glob = require('glob');
const { NODE_ENV } = process.env;

const srcPath = join(__dirname, '..', 'packages', 'ui-core', 'src');
const indexTs = join(srcPath, 'index.ts');
const doczReg = '../packages/**/*.docz.{tsx,ts}';
const testsReg = '../packages/**/*.test.{tsx,ts}';

const generateIndex = files => {
    const components = files.map(file => {
        const parsed = parse(file);
        return {
            path: file.replace('../packages/ui-core/src/', './'),
            name: parsed.name,
            ext: parsed.ext
        }
    });
    const collator = new Intl.Collator();
    const sorted = components.sort((a, b) => collator.compare(a.name, b.name));
    const imports = sorted.map(({ name, path: cPath, ext: extension }) => {
        return `export { default as ${name} } from '${cPath.replace(extension, '')}';`;
    });

    return `${imports.join('\n')}\n`;
};

const createReadmeMdx = () => {
    const mdxFormatter = "---\nname: Введение\nroute: /intro\n---\n\n";

    return mdxFormatter + fs.readFileSync('../README.md');
};

exports.onPreInit = () => {
    fs.writeFile('../intro.mdx', createReadmeMdx(), err => { if (!err) { console.log('index.mdx created'); } });

    const components = glob.sync('../packages/ui-core/src/components/**/*.{tsx,ts}', { ignore: [testsReg, doczReg] });

    fs.writeFile(indexTs, generateIndex(components), err => { if (!err) { console.log('ui-core/src/index.ts created'); } });
};

exports.onCreateWebpackConfig = ({ actions, getConfig, plugins, loaders }) => {
    const config = getConfig();
    const { module: { rules } } = config;

    config.module.rules = rules.filter(rule => !(rule.test && rule.test instanceof RegExp && rule.test.test('.svg')));
    actions.replaceWebpackConfig(config);

    actions.setWebpackConfig({
        plugins: [
            plugins.define({
              '__DEV__': NODE_ENV === 'development',
            }),
        ],
        resolve: {
            modules: [
                resolve(__dirname, '../packages/ui-core/src'),
                resolve(__dirname, '../node_modules'),
            ],
            alias: {
                '@megafon/ui-core': resolve(__dirname, '../packages/ui-core/src'),
                '@megafon/ui-helpers': resolve(__dirname, '../packages/ui-helpers/src'),
            }
        },
        module: {
            rules: [
                {
                    test: /\.(ico|jpg|jpeg|png|gif|webp)(\?.*)?$/,
                    use: [ loaders.url() ],
                },
                {
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
                                            },
                                        },
                                        {
                                            inlineStyles: {
                                                onlyMatchedOnce: false
                                            },
                                        },
                                    ],
                                },
                            },
                        })
                    ],
                },
            ],
        },
    });
};

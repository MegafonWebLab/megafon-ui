const fs = require('fs');
const { basename, resolve, join, parse } = require("path");
const glob = require('glob');

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
    const mdxFormatter = '---\nname: Введение\nroute: /\n---\n\n';
    return mdxFormatter + fs.readFileSync('../README.md')
};

exports.onPreInit = () => {
    fs.writeFile('../index.mdx', createReadmeMdx(), err => { if (!err) { console.log('index.mdx created'); } });

    const components = glob.sync('../packages/ui-core/src/components/**/*.{tsx,ts}', { ignore: [testsReg, doczReg] });
    const utils = glob.sync('../packages/ui-core/src/utils/*.ts', { ignore: testsReg });
    fs.writeFile(indexTs, generateIndex([...components, ...utils]), err => { if (!err) { console.log('ui-core/src/index.ts created'); } });
}

exports.onCreateWebpackConfig = args => {
    const config = args.getConfig();
    const rule = config.module.rules.find(r => r.test.test(".svg"));
    const idx = config.module.rules.findIndex(r => r.test.test(".svg"));

    rule.exclude = [
        resolve(__dirname, "../packages/ui-core/src/icons"),
        resolve(__dirname, "../packages/ui-core/src/docIcons")
    ];
    config.module.rules[idx] = rule;

    args.actions.replaceWebpackConfig(config);

    args.actions.setWebpackConfig({
        resolve: {
            modules: [
                resolve(__dirname, "../packages/ui-core/src"),
                resolve(__dirname, "../node_modules"),
            ],
            alias: {
                "@megafon/ui-core": resolve(__dirname, "../packages/ui-core/src"),
            }
        },
        module: {
            rules: [{
                test: /\.svg$/,
                use: [
                    ({ resource }) => ({
                        loader: "@svgr/webpack",
                        options: {
                            svgoConfig: {
                                plugins: [{
                                        cleanupIDs: {
                                            prefix: `svg-${basename(
                                                    resource,
                                                    ".svg"
                                                )}`
                                        }
                                    },
                                    {
                                        inlineStyles: {
                                            onlyMatchedOnce: false
                                        }
                                    }
                                ]
                            }
                        }
                    })
                ]
            }]
        }
    });
};

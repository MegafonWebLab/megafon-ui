const path = require("path");
const fs = require('fs');
const { basename, resolve } = require("path");
const glob = require('glob');

const srcPath = path.join(__dirname, '..', 'src');
const indexTs = path.join(srcPath, 'index.ts');
const doczReg = '../src/**/*.docz.{tsx,ts}';
const testsReg = '../src/**/*.test.{tsx,ts}';

const generateIndex = files => {
    const components = files.map(file => {
        const parsed = path.parse(file);
        return {
            path: file.replace('../src/', './'),
            name: parsed.name,
            ext: parsed.ext
        }
    });
    const collator = new Intl.Collator();
    const sorted = components.sort((a, b) => collator.compare(a.name, b.name));
    const imports = sorted.map(({ name, path: cPath, ext: extension }) => {
        return `export { default as ${name} } from '${cPath.replace(extension, '')}';`;
    });

    return `${imports.join('\n')}`;
};

exports.onPreInit = () => {
    const components = glob.sync('../src/components/**/*.{tsx,ts}', { ignore: [testsReg, doczReg] });
    const utils = glob.sync('../src/utils/*.ts', { ignore: testsReg });
    fs.writeFileSync(indexTs, generateIndex([...components, ...utils]));
}

exports.onCreateWebpackConfig = args => {
    // const components = glob.sync('../src/components/**/*.{tsx,ts}', { ignore: [testsReg, doczReg] });
    // const utils = glob.sync('../src/utils/*.ts', { ignore: testsReg });
    // fs.writeFileSync(indexTs, generateIndex([...components, ...utils]));

    const config = args.getConfig();
    const rule = config.module.rules.find(r => r.test.test(".svg"));
    const idx = config.module.rules.findIndex(r => r.test.test(".svg"));

    rule.exclude = [
        resolve(__dirname, "../src/icons"),
        resolve(__dirname, "../src/docIcons")
    ];
    config.module.rules[idx] = rule;

    config.module.rules = config.module.rules.map(r =>
        r.test instanceof RegExp ?
            r.test.test(".ts") ? {
                test: /\.tsx?$/,
                use: {
                    loader: "ts-loader",
                    options: {
                        configFile: path.resolve(__dirname, "../tsconfig.json"),
                    },
                },
            }: r :
            r
        );

    args.actions.replaceWebpackConfig(config);

    args.actions.setWebpackConfig({
        resolve: {
            modules: [
                path.resolve(__dirname, "../src"),
                path.resolve(__dirname, "../node_modules"),
                path.resolve(__dirname, "../../../node_modules")
            ],
            alias: {
                // docIcons: path.resolve(__dirname, "../src/docIcons"),
                // icons: path.resolve(__dirname, "../src/icons"),
                // utils: path.resolve(__dirname, "../src/utils"),
                // "@megafon/ui-core/dist/icons": path.resolve(
                //     __dirname,
                //     "../src/icons"
                // ),
                "@megafon/ui-core": path.resolve(__dirname, "../src"),
                // "@megafon/ui-core/styles": path.resolve(
                //     __dirname,
                //     "../src/styles"
                // )
            }
        },
        module: {
            rules: [
                {
                    test: /\.svg$/,
                    use: [
                        ({ resource }) => ({
                            loader: "@svgr/webpack",
                            options: {
                                svgoConfig: {
                                    plugins: [
                                        {
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
                }
            ]
        }
    });
};

const path = require("path");
const { basename, resolve } = require("path");

exports.onCreateWebpackConfig = args => {
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
                    }
                },
            }: r :
            r
        );

    console.log(config.module.rules);
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
                "@megafon/ui-core/dist": path.resolve(__dirname, "../src"),
                "@megafon/ui-core/styles": path.resolve(
                    __dirname,
                    "../src/styles"
                )
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

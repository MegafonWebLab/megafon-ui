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
    args.actions.replaceWebpackConfig(config);

    config.module.rules = config.module.rules.filter(r => r.test.test(".ts"));
    args.actions.setWebpackConfig({
        resolve: {
            modules: [
                path.resolve(__dirname, "../src"),
                path.resolve(__dirname, "../node_modules"),
                path.resolve(__dirname, "../../../node_modules")
            ],
            alias: {
                utils: path.resolve(__dirname, "../src/utils/"),
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
                { test: /\.tsx?$/, loader: "ts-loader" },
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

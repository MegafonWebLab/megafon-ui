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

    args.actions.setWebpackConfig({
        resolve: {
            modules: [path.resolve(__dirname, "../src"), "node_modules"],
            alias: {
                utils: path.resolve(__dirname, "../src/utils/")
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

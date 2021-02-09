import React from 'react';
import convert from 'htmr';

type ConfigItem = {
    component: React.ElementType;
    props?: string[];
};

export type Config = {
    [key: string]: ConfigItem;
};

const getTransform = (config: Config) => {
    return {
        _: (node, props, children) => {
            // text node
            if (props === undefined) {
                return node;
            }

            const Component = config[node]?.component;

            if (Component) {
                const filteredProps = {key: props.key};
                config[node].props?.forEach(prop => {
                    if (props[prop] !== undefined) {
                        filteredProps[prop] = props[prop];
                    }
                });

                return <Component {...filteredProps}>{children}</Component>;
            } else {
                return null;
            }
        },
    };
};

const convertToReact = (html, config: Config) => {
    let nodes = convert(html, {
        preserveAttributes: [],
        dangerouslySetChildren: [],
        transform: getTransform(config),
    });

    if (!Array.isArray(nodes)) {
        nodes = [nodes];
    }

    return (nodes as React.ReactNode[]).filter(node => !!node);
};

export default convertToReact;

import React from 'react';
import convert from 'htmr';

type TransformConfigItem = {
    component: React.ElementType;
    props?: string[];
    className?: string;
};

export type TransformConfig = {
    [key: string]: TransformConfigItem;
};

const getTransform = (config: TransformConfig) => {
    return {
        _: (node, props, children) => {
            // text node
            if (props === undefined) {
                return node;
            }

            const nodeElement = config[node];

            if (nodeElement) {
                const { component: Component, className } = nodeElement;
                const filteredProps = {
                    key: props.key,
                    className: className || props.className || '',
                };

                nodeElement.props?.forEach(prop => {
                    if (props[prop] !== undefined) {
                        filteredProps[prop] = props[prop];
                    }
                });

                return <Component {...filteredProps}>{children}</Component>;
            }

            return null;
        },
    };
};

const convertToReact = (html: string, config: TransformConfig) => {
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

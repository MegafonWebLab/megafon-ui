import React from 'react';
import convert from 'htmr';
import Header from 'components/Header/Header';
import Paragraph from 'components/Paragraph/Paragraph';
import List from 'components/List/List';

type ConfigItem = {
    component: React.ElementType;
    props: string[];
};

export type Config = {
    [key: string]: ConfigItem;
};

const typographyConfig: Config = {
    h: {
        component: Header,
        props: ['as', 'color', 'margin', 'hAlign'],
    },
    p: {
        component: Paragraph,
        props: ['align', 'size', 'hasMargin', 'color'],
    },
    ul: {
        component: List,
        props: ['as', 'hAlign', 'weight', 'color'],
    },
    a: {
        component: 'a',
        props: ['href'],
    },
};

function getTransform(config: Config) {
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
}

const convertToReact = (html, config = typographyConfig) => {
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

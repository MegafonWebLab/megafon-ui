import React from 'react';

type ConvertLinkPropsType = {
    href: any;
    target?: any;
    children: any;
}

export const titleConvertConfig = {
    br: {
        component: (): JSX.Element => <br />,
    },
    '&nbsp': {
        component: (): JSX.Element => (<>String.fromCharCode(160)</>) as JSX.Element,
    },
    a: {
        component: ({ href, target, children }: ConvertLinkPropsType): JSX.Element => <a href={href} target={target} rel={target === '_blank' ? 'noopener noreferrer' : undefined}>{children}</a>,
        props: ['href', 'target'],
    },
    font: {
        component: ({ color, children }): JSX.Element => <span style={{ color }}>{children}</span>,
        props: ['color'],
    },
};

export const textConvertConfig = {
    ...titleConvertConfig,
    b: {
        component: ({ children }): JSX.Element => <b>{children}</b>,
    },
};

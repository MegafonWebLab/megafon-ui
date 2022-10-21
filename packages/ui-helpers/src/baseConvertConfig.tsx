import React from 'react';

export const titleConvertConfig = {
    br: {
        component: (): JSX.Element => <br />,
    },
    '&nbsp': {
        component: (): JSX.Element => (<>String.fromCharCode(160)</>) as JSX.Element,
    },
    a: {
        component: ({ href, children }): JSX.Element => <a href={href}>{children}</a>,
        props: ['href'],
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

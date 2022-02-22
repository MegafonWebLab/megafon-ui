import * as React from 'react';

export type Desc = {
    value: string | React.ReactNode[];
    isCollapsible?: boolean;
    classes?: {
        toggle?: string;
        open?: string;
    };
    dataAttrs?: {
        moreLink?: Record<string, string>;
    };
};

export type Item = {
    title?: string[] | React.ReactNode[];
    description?: Desc[];
    value?: string;
};

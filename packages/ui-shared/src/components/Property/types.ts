export type Desc = {
    value: string[];
    isCollapsible?: boolean;
};

export type Item = {
    title?: string[];
    description?: Desc[];
    value?: string[];
};

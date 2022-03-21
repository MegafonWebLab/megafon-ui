import React from 'react';

type childrenPropTypes = {
    totalPages: number;
    activePage: number;
    theme?: 'default' | 'light';
    onChange: (value: number) => void;
};

interface IDemoPaginationWrapperProps {
    children: (prop: childrenPropTypes) => JSX.Element;
    totalPages: number;
    activePage: number;
}

export const DemoPaginationWrapper: React.FC<IDemoPaginationWrapperProps> = ({ activePage, children, ...props }) => {
    const [currentActivePage, setCurrentActivePage] = React.useState(activePage);

    const childrenProps: childrenPropTypes = {
        ...props,
        activePage: currentActivePage,
        onChange: setCurrentActivePage,
    };

    return children(childrenProps);
};

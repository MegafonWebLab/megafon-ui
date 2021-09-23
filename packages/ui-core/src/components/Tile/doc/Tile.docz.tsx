import * as React from 'react';

export const wrapperStyle = {
    display: 'grid',
    gap: '20px',
    gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
    justifyContent: 'center',
    padding: '20px',
};

export const lightWrapperStyle = {
    ...wrapperStyle,
    backgroundColor: '#F6F6F6',
};

export const darkWrapperStyle = {
    ...wrapperStyle,
    backgroundColor: '#00B956',
};

export const tileInner = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '15px',
    height: '100%',
    boxSizing: 'border-box',
    width: '50px',
    margin: '0 auto',
};

export const DemoTileWrapper = (props: {
    wrapperTheme: 'light' | 'dark';
    children: JSX.Element[] | Element[] | JSX.Element | Element | string;
}) => {
    const { wrapperTheme = 'light', children } = props;
    const theme = wrapperTheme === 'dark' ? darkWrapperStyle : lightWrapperStyle;

    return <div style={theme}>{children}</div>;
};

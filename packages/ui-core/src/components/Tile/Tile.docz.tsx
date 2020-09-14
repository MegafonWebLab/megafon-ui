import * as React from 'react';

export const lightFlexStyle = {
    display: 'grid',
    gap: '20px',
    gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
    justifyContent: 'center',
    backgroundColor: '#F6F6F6',
    padding: '20px',
};

export const darkFlexStyle = {
    display: 'grid',
    gap: '20px',
    gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
    justifyContent: 'center',
    backgroundColor: '#00B956',
    padding: '20px',
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

export const DemoTileWrapper = (
    props: {
        wrapperTheme: string;
        children: JSX.Element[] | Element[] | JSX.Element | Element | string;
    }
) => {
    const { wrapperTheme = 'light', children } = props;
    const theme = wrapperTheme === 'dark' ? darkFlexStyle : lightFlexStyle;

    return (
        <div style={theme}>
            {children}
        </div>
    );
};

import * as React from 'react';

const blockStyle: React.CSSProperties = {
    padding: '20px',
    backgroundColor: '#F5F5F5',
    display: 'inline-grid',
    gridGap: '20px',
    gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
    alignItems: 'center',
    width: '100%',
};

export const DemoBlockWrapper = (props: {
    customStyles: React.CSSProperties;
    children: JSX.Element[] | Element[] | JSX.Element | Element | string;
}) => {
    const { customStyles, children } = props;
    return (
        <div style={{
            ...blockStyle,
            ...customStyles,
        }}>
            {children}
        </div>
    );
};

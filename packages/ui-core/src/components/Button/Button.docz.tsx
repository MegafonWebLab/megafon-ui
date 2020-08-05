import * as React from 'react';

const blockStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    padding: '20px',
    paddingBottom: '5px',
    margin: '-20px',
    backgroundColor: '#F5F5F5',
};

export const BlockWrapper = (props: {
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

export const ButtonWrapper = (props: {
    customStyles: React.CSSProperties;
    children: JSX.Element[] | Element[] | JSX.Element | Element | string;
}) => {
    const { customStyles, children } = props;
    return (
        <div style={{
            display: 'inline-block',
            marginBottom: '15px',
            marginRight: '25px',
            ...customStyles,
        }}>
            {children}
        </div>
    );
};

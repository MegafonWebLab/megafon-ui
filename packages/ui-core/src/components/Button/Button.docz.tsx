import * as React from 'react';

export const BlockWrapper = ({ children }) => {
    return (
        <div style={{
            padding: '20px',
            margin: '-20px',
            backgroundColor: '#F5F5F5',
        }}>
            {children}
        </div>
    );
};

export const DarkBlockWrapper = ({ children }) => {
    return (
        <div style={{
            padding: '20px',
            margin: '-20px',
            backgroundColor: '#333333',
        }}>
            {children}
        </div>
    );
};

export const ButtonWrapper = ({ children }) => {
    return (
        <div style={{
            display: 'inline-block',
            marginRight: '25px',
        }}>
            {children}
        </div>
    );
};

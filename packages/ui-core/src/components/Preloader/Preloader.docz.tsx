import * as React from 'react';

const flexboxStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: '16px',
}

const wrapperStyles = {
    backgroundColor: '#00B956',
    padding: '20px',
}

export const Flexbox: React.FC = ({ children }) => {
    return (
        <div style={flexboxStyles}>
            {children}
        </div>
    );
};

export const PreloaderWrapper: React.FC = ({ children }) => {
    return (
        <div style={wrapperStyles}>
            {children}
        </div>
    );
};

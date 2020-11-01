import * as React from 'react';

export const flexboxStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: '16px',
};

export const wrapperStyles = {
    backgroundColor: '#00B956',
    padding: '20px',
};

export const DemoPreloaderWrapper: React.FC = ({ children }) => {
    return (
        <div style={wrapperStyles}>
            {children}
        </div>
    );
};

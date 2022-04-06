import * as React from 'react';

export const flexboxStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: '16px',
};

export const wrapperStyles = {
    padding: '20px',
};

export const DemoPreloaderWrapper: React.FC<{ bgColor: string }> = ({ children, bgColor }) => (
    <div style={{ ...wrapperStyles, background: bgColor }}>{children}</div>
);

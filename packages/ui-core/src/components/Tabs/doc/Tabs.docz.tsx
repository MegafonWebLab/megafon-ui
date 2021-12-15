import * as React from 'react';

export const DemoContent = ({ children }) => (
    <div
        style={{
            padding: '0 0 20px 0',
        }}
    >
        <div
            style={{
                padding: '80px 0',
                background: 'rgba(0, 0, 0, 0.05)',
                fontSize: '20px',
                textAlign: 'center',
            }}
        >
            {children}
        </div>
    </div>
);

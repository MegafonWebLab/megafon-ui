import * as React from 'react';

export const DemoContent = ({ children }) => (
    <div
        style={{
            padding: '20px 0',
        }}
    >
        <div
            style={{
                padding: '80px 0',
                background: '#f1f1f1',
                fontSize: '20px',
                textAlign: 'center',
            }}
        >
            {children}
        </div>
    </div>
);

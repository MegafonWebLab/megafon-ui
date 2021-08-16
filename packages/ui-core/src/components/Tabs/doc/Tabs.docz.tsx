import * as React from 'react';

const DemoContent = ({ children }: Record<string, JSX.Element>): JSX.Element => (
    <div
        style={{
            padding: '0 0 20px 0',
        }}
    >
        <div
            style={{
                padding: '80px 0',
                background: '#F6F6F6',
                fontSize: '20px',
                textAlign: 'center',
            }}
        >
            {children}
        </div>
    </div>
);

export default DemoContent;

import * as React from 'react';

const DemoContent = (children: string): JSX.Element => (
    <div
        style={{
            padding: '0 0 20px 0',
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

export default DemoContent;

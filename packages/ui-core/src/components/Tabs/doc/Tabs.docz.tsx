import * as React from 'react';

export const DemoContent = ({ children }: Record<string, React.ReactNode>): JSX.Element => (
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

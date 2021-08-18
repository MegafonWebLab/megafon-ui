import * as React from 'react';

export const DemoContent = ({ children }: Record<string, React.ReactChildren>): JSX.Element => (
    <div
        style={{
            padding: '0 0 20px 0',
        }}
    >
        <div
            style={{
                padding: '80px 0',
                background: '#F1F1F1',
                fontSize: '20px',
                textAlign: 'center',
            }}
        >
            {children}
        </div>
    </div>
);
export default DemoContent;

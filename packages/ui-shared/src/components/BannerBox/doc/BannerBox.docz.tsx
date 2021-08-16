import * as React from 'react';

export const DemoSlide = ({ children }: Record<string, React.ReactChildren>): JSX.Element => (
    <div
        style={{
            height: '100%',
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '30px',
        }}
    >
        {children}
    </div>
);

export const blockStyle: React.CSSProperties = {
    padding: '20px 0',
};

import * as React from 'react';

export const DemoSlide = ({ children, background = '#fff' }) => (
    <div
        style={{
            height: '100%',
            backgroundColor: background,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '30px',
        }}
    >
        {children}
    </div>
);

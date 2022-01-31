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

export const OffsetBlock = () => (
    <div
        style={{
            position: 'relative',
            width: '80%',
            height: '50px',
            background: '#731982',
            margin: '-36px auto 0',
        }}
    />
);

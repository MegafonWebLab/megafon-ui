import * as React from 'react';

export const DemoSlide = ({ children, background = '#fff' }: Record<string, string | undefined>): JSX.Element => (
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
export default DemoSlide;

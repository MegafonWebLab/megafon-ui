import * as React from 'react';

export const DemoMarginWrapper: React.FC = ({ children }) => (
    <div style={{ margin: 16 }}>{children}</div>
);

export const DemoBackgroundWrapper: React.FC = ({ children }) => (
    <div style={{ background: '#00B956' }}>
        {children}
    </div>
);

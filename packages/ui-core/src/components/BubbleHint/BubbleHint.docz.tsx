import * as React from 'react';

export const BubbleHintWrapper = ({ children }) => {
    return (
        <div style={{ height: '400px', display: 'flex', 'justifyContent': 'center', 'alignItems': 'center' }}>
            {children}
        </div>
    );
};

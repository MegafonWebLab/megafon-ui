import * as React from 'react';

export const DemoAccordionWrapper = ({ children }) => {
    return (
        <div style={{ padding: '10px' }}>
            {children}
        </div>
    );
};

export const DemoParagraphWrapper = ({ children }) => {
    return (
        <div style={{ padding: '24px 0' }}>
            {children}
        </div>
    );
};

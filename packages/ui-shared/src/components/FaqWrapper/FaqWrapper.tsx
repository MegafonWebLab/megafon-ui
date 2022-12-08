import React from 'react';

const FaqWrapper: React.FC = ({ children }) => (
    <div itemScope itemType="http://schema.org/FAQPage">
        {children}
    </div>
);

export default FaqWrapper;

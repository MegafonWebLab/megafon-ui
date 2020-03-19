import * as React from 'react';

export const DropdownSocialListWrapper: React.FC = ({ children }) => {
    return (
        <div style={{ height: '200px', display: 'flex', 'justifyContent': 'center', 'alignItems': 'center' }}>
            {children}
        </div>
    );
};

export const iconStyles = { width: '24px', height: '24px' };

import * as React from 'react';

export const TextFieldWrapper: React.FC<{ width?: number }> = ({ children, width = 250}) => (
    <div style={{ width, display: 'flex', justifyContent: 'space-between' }}>{children}</div>
);

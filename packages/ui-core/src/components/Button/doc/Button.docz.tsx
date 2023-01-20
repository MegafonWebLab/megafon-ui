import * as React from 'react';

export const blockStyle: React.CSSProperties = {
    display: 'inline-grid',
    gridGap: '20px',
    gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))',
    alignItems: 'center',
    width: '100%',
};

export const sizeDemoBlockStyle: React.CSSProperties = {
    display: 'inline-flex',
    flexWrap: 'wrap',
    gap: '20px',
    alignItems: 'center',
};

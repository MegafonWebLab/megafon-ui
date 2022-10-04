import * as React from 'react';
import Tile from 'components/Tile/Tile';

const defaultStyles = {
    height: '200px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    'text-align': 'center',
    fontSize: '30px',
    padding: '10px',
};

const whiteStyles = {
    ...defaultStyles,
    backgroundColor: '#FFFFFF',
    color: '#333333',
    borderRadius: 8,
};

export const DemoSlide: React.FC<{ onColoredBackground?: boolean }> = ({ children, onColoredBackground }) => (
    <Tile isInteractive shadowLevel="high" radius="rounded">
        <div style={onColoredBackground ? whiteStyles : defaultStyles}>{children}</div>
    </Tile>
);

export const blockStyle: React.CSSProperties = {
    padding: '20px 0',
};

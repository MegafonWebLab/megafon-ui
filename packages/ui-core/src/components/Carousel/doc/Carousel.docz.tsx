import * as React from 'react';
import Tile from 'components/Tile/Tile';

const defaultStyles: React.CSSProperties = {
    height: '200px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: '30px',
    padding: '10px',
};

const whiteStyles: React.CSSProperties = {
    ...defaultStyles,
    backgroundColor: '#FFFFFF',
    color: '#333333',
    borderRadius: 8,
};

export const DemoSlide: React.FC<{ onColoredBackground?: boolean }> = ({ children, onColoredBackground }) => (
    <Tile isInteractive shadowLevel="default" radius="rounded">
        <div style={onColoredBackground ? whiteStyles : defaultStyles}>{children}</div>
    </Tile>
);

export const blockStyle: React.CSSProperties = {
    padding: '20px 0',
};

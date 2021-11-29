import * as React from 'react';
import { Tile } from '@megafon/ui-core';

export const DemoSlide = ({ children }: { children: React.ReactNode }): React.ReactNode => (
    <Tile isInteractive shadowLevel="high" radius="rounded">
        <div
            style={{
                height: '200px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                fontSize: '30px',
                padding: '10px',
            }}
        >
            {children}
        </div>
    </Tile>
);

export const blockStyle: React.CSSProperties = {
    padding: '20px 0',
};

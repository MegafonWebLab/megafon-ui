/* eslint-disable import/no-unresolved */
import { Tile } from '@megafon/ui-core';
import * as React from 'react';

export const DemoSlide = ({ children }: Record<string, React.ReactChildren>): JSX.Element => (
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

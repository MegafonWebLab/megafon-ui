import React from 'react';
import { Header } from '@megafon/ui-core';
import { cnCreate } from '@megafon/ui-helpers';
import './Header.less';

const cn = cnCreate('docz-header');

export const h1: React.FC = ({ children }) => (
    <Header as="h1" className={cn('h1')}>
        {children}
    </Header>
);
export const h2: React.FC = ({ children }) => (
    <Header as="h2" className={cn('h2')}>
        {children}
    </Header>
);
export const h3: React.FC = ({ children }) => (
    <Header as="h3" className={cn('h3')}>
        {children}
    </Header>
);
export const h5: React.FC = ({ children }) => (
    <Header as="h5" className={cn('h5')}>
        {children}
    </Header>
);

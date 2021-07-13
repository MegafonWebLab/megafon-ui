import React from 'react';
import { Header } from '@megafon/ui-core';
import { cnCreate } from '@megafon/ui-helpers';
import './Header.less';

const cn = cnCreate('docz-header');

export const h1 = ({ children }) => <Header as='h1' className={cn('h1')} children={children} />;
export const h2 = ({ children }) => <Header as='h2' className={cn('h2')} children={children} />;
export const h3 = ({ children }) => <Header as='h3' className={cn('h3')} children={children} />;
export const h5 = ({ children }) => <Header as='h5' className={cn('h5')} children={children} />;

import React from 'react';
import { cnCreate } from '@megafon/ui-helpers';
import './Table.less';

const cn = cnCreate('docz-table');

export const table: React.FC = ({ children }) => <table className={cn()}>{children}</table>;
export const th: React.FC = ({ children }) => <th className={cn('th')}>{children}</th>;
export const td: React.FC = ({ children }) => <td className={cn('th')}>{children}</td>;

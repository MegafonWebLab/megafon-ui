import React from 'react';
import { cnCreate } from '@megafon/ui-helpers';
import './Table.less';

const cn = cnCreate('docz-table');

export const table = ({ children }) => <table className={cn()}>{children}</table>
export const th = ({ children }) => <th className={cn('th')}>{children}</th>
export const td = ({ children }) => <td className={cn('th')}>{children}</td>

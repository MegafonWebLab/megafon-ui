/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { ITableCell } from './TableCell';

export interface ITableRow {
    /** Ряд таблицы как заголовок */
    head?: boolean;
    children: Array<React.ReactElement<ITableCell>>;
}

const TableRow: React.FC<ITableRow> = ({ children }) => <>{children}</>;

TableRow.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element.isRequired).isRequired,
};

export default TableRow;

import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ITableCell } from './TableCell';

export interface ITableRow {
    /** Ряд таблицы как заголовок */
    head?: boolean;
    children: Array<React.ReactElement<ITableCell>>;
}

const TableRow: React.FC<ITableRow> = ({ children }) => <>{children}</>;

TableRow.propTypes = {
    head: PropTypes.bool,
    children: PropTypes.arrayOf(PropTypes.element.isRequired).isRequired,
};

export default TableRow;

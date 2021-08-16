import * as PropTypes from 'prop-types';
import * as React from 'react';

export interface ITableCell {
    children?: React.ReactNode;
}

const TableCell: React.FC<ITableCell> = ({ children }) => <>{children && children}</>;

TableCell.propTypes = {
    children: PropTypes.node,
};

export default TableCell;

/* eslint-disable import/no-unresolved */
import { cnCreate } from '@megafon/ui-helpers';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import './ListItem.less';

export interface IListItemProps {
    /** Дополнительный класс корневого элемента */
    className?: string;
}

const cn: (param1: (string | undefined)[]) => string = cnCreate('mfui-beta-list-item');
const ListItem: React.FC<IListItemProps> = ({ className, children }) => <li className={cn([className])}>{children}</li>;

ListItem.propTypes = {
    className: PropTypes.string,
};

export default ListItem;

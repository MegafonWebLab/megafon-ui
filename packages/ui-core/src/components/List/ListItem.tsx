import * as React from 'react';
import { cnCreate } from '@megafon/ui-helpers';
import * as PropTypes from 'prop-types';
import './ListItem.less';

export interface IListItemProps {
    /** Дополнительный класс корневого элемента */
    className?: string;
}

const cn = cnCreate('mfui-list-item');
const ListItem: React.FC<IListItemProps> = ({ className, children }) => <li className={cn([className])}>{children}</li>;

ListItem.propTypes = {
    className: PropTypes.string,
};

export default ListItem;

import * as React from 'react';
import * as PropTypes from 'prop-types';
import './ListItem.less';
import { cnCreate } from '@megafon/ui-helpers';

export interface IListItemProps {
    /** Дополнительный класс корневого элемента */
    className?: string;
}

const cn = cnCreate('mfui-beta-list-item');
const ListItem: React.FC<IListItemProps> = ({ className, children }) => <li className={cn([className])}>{children}</li>;

ListItem.propTypes = {
    className: PropTypes.string,
};

export default ListItem;

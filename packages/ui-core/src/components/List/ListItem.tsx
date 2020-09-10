import * as React from 'react';
import * as PropTypes from 'prop-types';
import './ListItem.less';
import cnCreate from 'utils/cnCreate';

export interface IListItemProps {
    /** Custom classname */
    className?: string;
    children?: JSX.Element[] | Element[] | JSX.Element | string | Element;
}

const cn = cnCreate('mfui-beta-list-item');
class ListItem extends React.Component<IListItemProps, {}> {
    static propTypes = {
        className: PropTypes.string,
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.element),
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.element,
            PropTypes.string,
            PropTypes.node,
        ]),
    };

    render() {
        return (
            <li className={cn('', {}, this.props.className)}>
                {this.props.children}
            </li>
        );
    }
}

export default ListItem;

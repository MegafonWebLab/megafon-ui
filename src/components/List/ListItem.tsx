import * as React from 'react';
import * as PropTypes from 'prop-types';
import './ListItem.less';
import { cnCreate } from '../../utils/cn';

interface Props {
    children?: JSX.Element[] | Element[] | JSX.Element | string | Element;
}

const cn = cnCreate('list-item');
class ListItem extends React.Component<Props, {}> {
    static propTypes = {
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
            <li className={cn('')}>
                {this.props.children}
            </li>
        );
    }
}

export default ListItem;

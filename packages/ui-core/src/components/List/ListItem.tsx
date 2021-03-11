import * as React from 'react';
import * as PropTypes from 'prop-types';
import './ListItem.less';
import cnCreate from 'utils/cn';

interface IListItemProps {
    /** Custom classname */
    className?: string;
    /** Left margin */
    disableLeftMargin?: boolean;
    /** Children */
    children?: React.ReactNode;
}

const cn = cnCreate('mfui-list-item');
class ListItem extends React.Component<IListItemProps, {}> {
    static propTypes = {
        className: PropTypes.string,
        disableLeftMargin: PropTypes.bool,
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.element),
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.element,
            PropTypes.string,
            PropTypes.node,
        ]),
    };

    static defaultProps = {
        disableLeftMargin: false,
    };

    render() {
        const {className, disableLeftMargin, children } = this.props;

        return (
            <li className={cn('', {'disable-left-margin': disableLeftMargin}, className)}>
                {children}
            </li>
        );
    }
}

export default ListItem;

import * as React from 'react';
import * as PropTypes from 'prop-types';
import './List.less';
import { cnCreate } from '../../utils/cn';

interface IListProps {
    /** List type */
    as?: 'ul' | 'ol';
    /** Align the list horizontally */
    hAlign?: 'center' | 'right';
    /** Font weight */
    weight?: 'light' | 'regular' | 'bold';
    /** Color */
    color?: 'black' | 'white' | 'gray' | 'green' | 'purple' | 'red' | 'inherit';
    children: JSX.Element[] | Element[] | JSX.Element | Element;
}

const cn = cnCreate('list');
class List extends React.Component<IListProps, {}> {
    static propTypes = {
        as: PropTypes.oneOf(['ul', 'ol']),
        hAlign: PropTypes.oneOf(['center', 'right']),
        weight: PropTypes.oneOf(['light', 'regular', 'bold']),
        color: PropTypes.oneOf(['black', 'white', 'gray', 'green', 'purple', 'red', 'inherit']),
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.element),
            PropTypes.element,
        ]).isRequired,
    };

    static defaultProps: Partial<IListProps> = {
        as: 'ul',
        color: 'black',
        weight: 'regular',
    };

    render() {
        const ElementType = this.props.as as string;

        return (
            <ElementType
                className={cn('', {
                    'h-align': this.props.hAlign,
                    color: this.props.color,
                    weight: this.props.weight,
                })}>
                {this.props.children}
            </ElementType>
        );
    }
}

export default List;

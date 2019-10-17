import * as React from 'react';
import * as PropTypes from 'prop-types';
import './List.less';
import cnCreate from 'utils/cn';

interface IListProps {
    /** List type */
    as?: 'ul' | 'ol';
    /** Align the list horizontally */
    hAlign?: 'center' | 'right';
    /** Font weight */
    weight?: 'light' | 'regular' | 'bold';
    /** Color */
    color?: 'black' | 'white' | 'gray' | 'green' | 'purple' | 'red' | 'inherit';
    /** Custom classname */
    className?: string;
    children: JSX.Element[] | Element[] | JSX.Element | Element;
}

const cn = cnCreate('mfui-list');
class List extends React.Component<IListProps, {}> {
    static propTypes = {
        as: PropTypes.oneOf(['ul', 'ol']),
        hAlign: PropTypes.oneOf(['center', 'right']),
        weight: PropTypes.oneOf(['light', 'regular', 'bold']),
        color: PropTypes.oneOf(['black', 'white', 'gray', 'green', 'purple', 'red', 'inherit']),
        className: PropTypes.string,
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
        const { hAlign, color, weight, className, children } = this.props;

        return (
            <ElementType
                className={cn('', {
                    'h-align': hAlign,
                    color, weight,
                }, className)}>
                {children}
            </ElementType>
        );
    }
}

export default List;

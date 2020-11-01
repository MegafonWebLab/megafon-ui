import * as React from 'react';
import * as PropTypes from 'prop-types';
import './List.less';
import cnCreate from 'utils/cnCreate';

export interface IListProps {
    /** Тип списка */
    as?: 'ul' | 'ol';
    /** Выравнивание по горизонтали */
    hAlign?: 'center' | 'right';
    /** Жирность шрифта */
    weight?: 'light' | 'regular' | 'bold';
    /** Цвет */
    color?: 'black' | 'white' | 'gray' | 'green' | 'purple' | 'red' | 'inherit';
    /** Дополнительный класс корневого элемента */
    className?: string;
    children: JSX.Element[] | Element[] | JSX.Element | Element;
}

const cn = cnCreate('mfui-beta-list');
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
        const ElementType = this.props.as as React.ElementType;
        const { as, hAlign, color, weight, className, children } = this.props;

        return (
            <ElementType
                className={cn('', {
                    'h-align': hAlign,
                    color, weight,
                    type: as,
                }, className)}>
                {children}
            </ElementType>
        );
    }
}

export default List;

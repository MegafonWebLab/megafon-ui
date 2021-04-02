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
}

const cn = cnCreate('mfui-beta-list');
const List: React.FC<IListProps> = ({
    as = 'ul',
    color = 'black',
    weight = 'regular',
    hAlign,
    className,
    children,
}) => {
    const ElementType = as as React.ElementType;

    return (
        <ElementType
            className={cn({
                'h-align': hAlign,
                color,
                weight,
                type: as,
            }, className)}>
            {children}
        </ElementType>
    );
};

List.propTypes = {
    as: PropTypes.oneOf(['ul', 'ol']),
    hAlign: PropTypes.oneOf(['center', 'right']),
    weight: PropTypes.oneOf(['light', 'regular', 'bold']),
    color: PropTypes.oneOf(['black', 'white', 'gray', 'green', 'purple', 'red', 'inherit']),
    className: PropTypes.string,
};

export default List;

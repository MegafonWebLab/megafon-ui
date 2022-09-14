import * as React from 'react';
import { cnCreate } from '@megafon/ui-helpers';
import * as PropTypes from 'prop-types';
import './List.less';

export interface IListProps {
    /** Тип списка */
    as?: 'ul' | 'ol';
    /** Выравнивание по горизонтали */
    align?: 'center' | 'right';
    /** Жирность шрифта */
    weight?: 'light' | 'regular' | 'bold';
    /** Цвет */
    color?: 'default' | 'black' | 'white' | 'gray' | 'green' | 'purple' | 'red' | 'inherit';
    /** Дополнительный класс корневого элемента */
    className?: string;
}

const cn = cnCreate('mfui-list');
const List: React.FC<IListProps> = ({
    as = 'ul',
    color = 'default',
    weight = 'regular',
    align,
    className,
    children,
}) => {
    const ElementType = as as React.ElementType;

    return (
        <ElementType
            className={cn(
                {
                    'h-align': align,
                    color,
                    weight,
                    type: as,
                },
                className,
            )}
        >
            {children}
        </ElementType>
    );
};

List.propTypes = {
    as: PropTypes.oneOf(['ul', 'ol']),
    align: PropTypes.oneOf(['center', 'right']),
    weight: PropTypes.oneOf(['light', 'regular', 'bold']),
    color: PropTypes.oneOf(['default', 'black', 'white', 'gray', 'green', 'purple', 'red', 'inherit']),
    className: PropTypes.string,
};

export default List;

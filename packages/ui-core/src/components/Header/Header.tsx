import * as React from 'react';
import { cnCreate, filterDataAttrs, IFilterDataAttrs } from '@megafon/ui-helpers';
import * as PropTypes from 'prop-types';
import './Header.less';

interface IHeaderProps extends IFilterDataAttrs {
    /** Тег */
    as?: 'h1' | 'h2' | 'h3' | 'h5';
    /** Цвет */
    color?: 'default' | 'black' | 'white' | 'green' | 'purple' | 'blue' | 'inherit';
    /** Включить отступ */
    margin?: boolean;
    /** Дополнительный элемент */
    addition?: JSX.Element;
    /** Дополнительный класс корневого элемента */
    className?: string | string[];
    /** Горизонтальное выравнивание */
    hAlign?: 'inherit' | 'left' | 'center' | 'right';
    /** Обработчик клика */
    onClick?: (e: React.SyntheticEvent<EventTarget>) => void;
}

const cn = cnCreate('mfui-header');
const Header: React.FC<IHeaderProps> = ({
    addition,
    as: level = 'h1',
    children,
    className,
    color = 'default',
    dataAttrs,
    hAlign = 'inherit',
    margin,
    onClick,
}) => {
    const ElementType = level as React.ElementType;

    return (
        <ElementType
            {...filterDataAttrs(dataAttrs)}
            className={cn({ color, margin, level, 'h-align': hAlign }, className)}
            onClick={onClick}
        >
            {children}
            {addition && <div className={cn('addition')}>{addition}</div>}
        </ElementType>
    );
};

Header.propTypes = {
    as: PropTypes.oneOf(['h1', 'h2', 'h3', 'h5']),
    color: PropTypes.oneOf(['default', 'black', 'white', 'green', 'purple', 'blue', 'inherit']),
    margin: PropTypes.bool,
    addition: PropTypes.element,
    hAlign: PropTypes.oneOf(['inherit', 'left', 'center', 'right']),
    dataAttrs: PropTypes.objectOf(PropTypes.string.isRequired),
    onClick: PropTypes.func,
};

export default Header;

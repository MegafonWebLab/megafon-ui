import * as React from 'react';
import { cnCreate, filterDataAttrs } from '@megafon/ui-helpers';
import * as PropTypes from 'prop-types';
import './Header.less';

export interface IHeaderProps {
    /** Тег */
    as?: 'h1' | 'h2' | 'h3' | 'h5';
    /** Поведение текста при встраивании в широкий или узкий контейнер (только для h5) */
    space?: 'wide' | 'tight';
    /** Цвет */
    color?: 'default' | 'black' | 'white' | 'green' | 'purple' | 'blue' | 'inherit';
    /** Включить отступ */
    margin?: boolean;
    /** Дополнительный элемент */
    addition?: JSX.Element;
    /** Дополнительный класс корневого элемента */
    className?: string | string[];
    /** Дополнительные data атрибуты к внутренним элементам */
    dataAttrs?: {
        root?: Record<string, string>;
    };
    /** Горизонтальное выравнивание */
    align?: 'inherit' | 'left' | 'center' | 'right';
    /** Обработчик клика */
    onClick?: (e: React.SyntheticEvent<EventTarget>) => void;
}

const cn = cnCreate('mfui-header');
const Header: React.FC<IHeaderProps> = ({
    addition,
    as: level = 'h1',
    space = 'wide',
    children,
    className,
    color = 'default',
    dataAttrs,
    align = 'inherit',
    margin,
    onClick,
}) => {
    const ElementType = level as React.ElementType;
    const hasVariousSpaces = level === 'h5';
    const spaceLevel = hasVariousSpaces && space;

    return (
        <ElementType
            {...filterDataAttrs(dataAttrs?.root)}
            className={cn({ color, margin, level, 'h-align': align, space: spaceLevel }, className)}
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
    space: PropTypes.oneOf(['wide', 'tight']),
    margin: PropTypes.bool,
    addition: PropTypes.element,
    align: PropTypes.oneOf(['inherit', 'left', 'center', 'right']),
    dataAttrs: PropTypes.shape({
        root: PropTypes.objectOf(PropTypes.string.isRequired),
    }),
    onClick: PropTypes.func,
};

export default Header;

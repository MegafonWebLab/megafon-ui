import * as React from 'react';
import { cnCreate, filterDataAttrs } from '@megafon/ui-helpers';
import * as PropTypes from 'prop-types';
import './Caption.less';

const COLORS = {
    INHERIT: 'inherit',
    DEFAULT: 'default',
    GRAY: 'gray',
    WHITE: 'white',
    GREEN: 'green',
    PURPLE: 'purple',
} as const;

type ColorType = typeof COLORS[keyof typeof COLORS];

export interface ICaptionProps {
    /** Выравнивание по горизонтали */
    align?: 'left' | 'center' | 'right';
    /** Поведение текста при встраивании в широкий или узкий контейнер */
    space?: 'wide' | 'tight';
    /** Начертание шрифта: обычный или полужирный */
    variant?: 'normal' | 'medium';
    /** Вертикальный отступ */
    hasMargin?: boolean;
    /** Цвет текста */
    color?: ColorType;
    /** Дополнительный класс корневого элемента */
    className?: string;
    /** Дополнительные data атрибуты к внутренним элементам */
    dataAttrs?: {
        root?: Record<string, string>;
    };
}

const cn = cnCreate('mfui-caption');
const Caption: React.FC<ICaptionProps> = ({
    align,
    color = 'default',
    space = 'wide',
    variant = 'normal',
    className,
    hasMargin = true,
    dataAttrs,
    children,
}) => (
    <p
        {...filterDataAttrs(dataAttrs?.root)}
        className={cn(
            {
                align,
                color,
                space,
                variant,
                'has-margin': hasMargin,
            },
            className,
        )}
    >
        {children}
    </p>
);

Caption.propTypes = {
    dataAttrs: PropTypes.shape({
        root: PropTypes.objectOf(PropTypes.string.isRequired),
    }),
    align: PropTypes.oneOf(['left', 'center', 'right']),
    space: PropTypes.oneOf(['wide', 'tight']),
    variant: PropTypes.oneOf(['normal', 'medium']),
    hasMargin: PropTypes.bool,
    color: PropTypes.oneOf(Object.values(COLORS)),
};

export default Caption;

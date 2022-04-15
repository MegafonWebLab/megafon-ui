import * as React from 'react';
import { cnCreate, filterDataAttrs } from '@megafon/ui-helpers';
import * as PropTypes from 'prop-types';
import './Paragraph.less';

const COLORS = {
    INHERIT: 'inherit',
    DEFAULT: 'default',
    GRAY: 'gray',
    WHITE: 'white',
    GREEN: 'green',
    PURPLE: 'purple',
} as const;

type ColorType = typeof COLORS[keyof typeof COLORS];

export interface IParagraphProps {
    /** Выравнивание по горизонтали */
    align?: 'left' | 'center' | 'right';
    /** Встраивание в широкий или узкий контейнер */
    space?: 'wide' | 'tight';
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

const cn = cnCreate('mfui-paragraph');
const Paragraph: React.FC<IParagraphProps> = ({
    align,
    color = 'default',
    space = 'wide',
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
                'has-margin': hasMargin,
            },
            className,
        )}
    >
        {children}
    </p>
);

Paragraph.propTypes = {
    dataAttrs: PropTypes.shape({
        root: PropTypes.objectOf(PropTypes.string.isRequired),
    }),
    align: PropTypes.oneOf(['left', 'center', 'right']),
    space: PropTypes.oneOf(['wide', 'tight']),
    hasMargin: PropTypes.bool,
    color: PropTypes.oneOf(Object.values(COLORS)),
};

export default Paragraph;

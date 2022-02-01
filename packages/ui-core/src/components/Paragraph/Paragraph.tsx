import * as React from 'react';
import { cnCreate } from '@megafon/ui-helpers';
import * as PropTypes from 'prop-types';
import './Paragraph.less';

const COLORS = {
    INHERIT: 'inherit',
    DEFAULT: 'default',
    WHITE: 'white',
    GREEN: 'green',
    PURPLE: 'purple',
    SPB_SKY_0: 'spbSky0',
    SPB_SKY_1: 'spbSky1',
    SPB_SKY_2: 'spbSky2',
} as const;

type ColorType = typeof COLORS[keyof typeof COLORS];

export interface IParagraphProps {
    /** Выравнивание по горизонтали */
    align?: 'left' | 'center' | 'right';
    /** Размер шрифта */
    size?: 'regular' | 'small';
    /** Вертикальный отступ (включен по умолчанию) */
    hasMargin?: boolean;
    /** Цвет текста */
    color?: ColorType;
    /** Дополнительный класс корневого элемента */
    className?: string;
}

const cn = cnCreate('mfui-paragraph');
const Paragraph: React.FC<IParagraphProps> = ({
    size = 'regular',
    align,
    color = COLORS.DEFAULT,
    className,
    hasMargin = true,
    children,
}) => (
    <p
        className={cn(
            {
                size,
                align,
                color,
                'has-margin': hasMargin,
            },
            className,
        )}
    >
        {children}
    </p>
);

Paragraph.propTypes = {
    align: PropTypes.oneOf(['left', 'center', 'right']),
    size: PropTypes.oneOf(['regular', 'small']),
    hasMargin: PropTypes.bool,
    color: PropTypes.oneOf(Object.values(COLORS)),
};

export default Paragraph;

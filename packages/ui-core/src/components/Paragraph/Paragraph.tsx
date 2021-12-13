import * as React from 'react';
import { cnCreate } from '@megafon/ui-helpers';
import * as PropTypes from 'prop-types';
import './Paragraph.less';

const COLORS = {
    GREEN: 'green',
    PURPLE: 'purple',
    BASE: 'base',
    SPB_SKY_0: 'spbSky0',
    SPB_SKY_1: 'spbSky1',
    SPB_SKY_2: 'spbSky2',
    CONTENT: 'content',
    FULL_BLACK: 'fullBlack',
    INHERIT: 'inherit',
    /** @deprecated */
    FRESH_ASPHALT: 'freshAsphalt',
};

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
    color = 'content',
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
    color(props, propName, componentName) {
        const deprecatedValue = COLORS.FRESH_ASPHALT;
        const propValue = props[propName];

        if (propValue && !Object.values(COLORS).includes(propValue)) {
            return new Error(`Failed prop type: Invalid prop '${propName}' of value '${propValue}' supplied to '${componentName}', 
            expected one of [${Object.values(COLORS)}]`);
        }

        if (propValue && props[propName] === COLORS.FRESH_ASPHALT) {
            return new Error(`Failed prop type: Invalid prop '${propName}' of value '${propValue}' supplied to '${componentName}',
            value '${deprecatedValue}' is deprecated, please use value '${COLORS.CONTENT}'`);
        }

        return null;
    },
};

export default Paragraph;

import * as React from 'react';
import * as PropTypes from 'prop-types';
import './Paragraph.less';
import cnCreate from 'utils/cnCreate';

export interface IParagraphProps {
    /** Выравнивание по горизонтали */
    align?: 'left' | 'center' | 'right';
    /** Размер шрифта */
    size?: 'regular' | 'small';
    /** Вертикальный отступ (включен по умолчанию) */
    hasMargin?: boolean;
    /** Цвет текста */
    color?: 'green' | 'purple' | 'clearWhite' | 'spbSky0' | 'spbSky1' | 'spbSky2' | 'freshAsphalt' | 'fullBlack' | 'inherit';
    /** Дополнительный класс корневого элемента */
    className?: string;
}

const cn = cnCreate('mfui-beta-paragraph');
const Paragraph: React.FC<IParagraphProps> = ({
        size = 'regular',
        align,
        color = 'freshAsphalt',
        className,
        hasMargin = true,
        children,
    }) => (
    <p
        className={cn({
            size,
            align,
            color,
            'has-margin': hasMargin,
        }, className)}>
        {children}
    </p>
);

Paragraph.propTypes = {
    align: PropTypes.oneOf(['left', 'center', 'right']),
    size: PropTypes.oneOf(['regular', 'small']),
    hasMargin: PropTypes.bool,
    color: PropTypes.oneOf(['green', 'purple', 'clearWhite', 'spbSky0', 'spbSky1', 'spbSky2', 'freshAsphalt', 'fullBlack', 'inherit']),
};

export default Paragraph;

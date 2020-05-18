import * as React from 'react';
import * as PropTypes from 'prop-types';
import './Paragraph.less';
import cnCreate from 'utils/cnCreate';

export interface IParagraphProps {
    /** Align text horizontally */
    align?: 'left' | 'center' | 'right';
    /** Font size */
    size?: 'regular' | 'small';
    /** Vertical margin (enabled by default) */
    hasMargin?: boolean;
    /** Text color */
    color?: 'green' | 'purple' | 'clearWhite' | 'spbSky0' | 'spbSky1' | 'spbSky2' | 'freshAsphalt' | 'fullBlack';
    /** Custom className */
    className?: string;
    children?: React.ReactNode;
}

const cn = cnCreate('mfui-paragraph');
const Paragraph: React.FC<IParagraphProps> = ({
        size,
        align,
        color,
        children,
        className,
        hasMargin,
    }: IParagraphProps) => (
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
    color: PropTypes.oneOf(['green', 'purple', 'clearWhite', 'spbSky0', 'spbSky1', 'spbSky2', 'freshAsphalt', 'fullBlack']),
    children: PropTypes.node,
};

Paragraph.defaultProps = {
    hasMargin: true,
    size: 'regular',
    color: 'freshAsphalt',
};

export default Paragraph;

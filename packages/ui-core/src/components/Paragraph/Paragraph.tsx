import * as React from 'react';
import * as PropTypes from 'prop-types';
import './Paragraph.less';
import cnCreate from 'utils/cnCreate';

interface IParagraphProps {
    /** Align text horizontally */
    align?: 'left' | 'center' | 'right';
    /** Font options */
    size?: 'regular' | 'small';
    /** Vertical margin */
    margin?: boolean;
    /** Text color */
    color?: 'green' | 'purple' | 'clearWhite' | 'spbSky0' | 'spbSky1' | 'spbSky2' | 'freshAsphalt' | 'fullBlack';
    /** Custom className */
    className?: string;
    children?: React.ReactNode;
}

const cn = cnCreate('mfui-paragraph');
class Paragraph extends React.Component<IParagraphProps, {}> {
    static propTypes = {
        align: PropTypes.oneOf(['left', 'center', 'right']),
        size: PropTypes.oneOf(['regular', 'small']),
        margin: PropTypes.bool,
        color: PropTypes.oneOf(['green', 'purple', 'clearWhite', 'spbSky0', 'spbSky1', 'spbSky2', 'freshAsphalt', 'fullBlack']),
        children: PropTypes.node,
    };

    static defaultProps: Partial<IParagraphProps> = {
        margin: true,
        size: 'regular',
        color: 'freshAsphalt',
    };

    render() {
        const {
            size,
            align,
            color,
            margin,
            children,
            className,
        } = this.props;

        return (
            <p
                className={cn('', {
                    size,
                    align,
                    color,
                    margin,
                }, className)}>
                {children}
            </p>
        );
    }
}

export default Paragraph;

import * as React from 'react';
import * as PropTypes from 'prop-types';
import './Paragraph.less';
import cnCreate from 'utils/cn';

interface IParagraphProps {
    /** Align text horizontally */
    hAlign?: 'center' | 'right';
    /** Text weight */
    weight?: 'light' | 'regular' | 'medium' | 'bold';
    /** Font size at all resolutions */
    sizeAll?: 'smallest' | 'small' | 'medium' | 'large';
    /** Font size on the resolution wide */
    sizeWide?: 'smallest' | 'small' | 'medium' | 'large';
    /** Font size on desktop resolution */
    sizeDesktop?: 'smallest' | 'small' | 'medium' | 'large';
    /** Font size on tablet resolution */
    sizeTablet?: 'smallest' | 'small' | 'medium' | 'large';
    /** Font size on mobile resolution */
    sizeMobile?: 'smallest' | 'small' | 'medium' | 'large';
    /** Vertical margin on all resolutions */
    marginAll?: 'none' | 'small' | 'medium' | 'large' | 'largest' | 'default';
    /** Vertical margin on the wide */
    marginWide?: 'none' | 'small' | 'medium' | 'large' | 'largest';
    /** Vertical margin on desktop resolution */
    marginDesktop?: 'none' | 'small' | 'medium' | 'large' | 'largest';
    /** Vertical padding on tablet resolution */
    marginTablet?: 'none' | 'small' | 'medium' | 'large' | 'largest';
    /** Vertical padding on mobile resolution */
    marginMobile?: 'none' | 'small' | 'medium' | 'large' | 'largest';
    /** Text color */
    color?: 'black' | 'white' | 'gray' | 'green' | 'purple' | 'red' | 'inherit';
    /** Parent tag */
    as?: 'p' | 'div';
    /** Custom className */
    className?: string;
    children?: JSX.Element[] | Element[] | JSX.Element | string | Element;
}

const cn = cnCreate('mfui-paragraph');
class Paragraph extends React.Component<IParagraphProps, {}> {
    static propTypes = {
        hAlign: PropTypes.oneOf(['center', 'right']),
        weight: PropTypes.oneOf(['light', 'regular', 'medium', 'bold']),
        sizeAll: PropTypes.oneOf(['smallest', 'small', 'medium', 'large']),
        sizeWide: PropTypes.oneOf(['smallest', 'small', 'medium', 'large']),
        sizeDesktop: PropTypes.oneOf(['smallest', 'small', 'medium', 'large']),
        sizeTablet: PropTypes.oneOf(['smallest', 'small', 'medium', 'large']),
        sizeMobile: PropTypes.oneOf(['smallest', 'small', 'medium', 'large']),
        marginAll: PropTypes.oneOf(['none', 'small', 'medium', 'large', 'largest', 'default']),
        marginWide: PropTypes.oneOf(['none', 'small', 'medium', 'large', 'largest']),
        marginDesktop: PropTypes.oneOf(['none', 'small', 'medium', 'large', 'largest']),
        marginTablet: PropTypes.oneOf(['none', 'small', 'medium', 'large', 'largest']),
        marginMobile: PropTypes.oneOf(['none', 'small', 'medium', 'large', 'largest']),
        color: PropTypes.oneOf(['black', 'white', 'gray', 'green', 'purple', 'red', 'inherit']),
        as: PropTypes.oneOf(['p', 'div']),
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.element),
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.element,
            PropTypes.string,
            PropTypes.node,
        ]),
    };

    static defaultProps: Partial<IParagraphProps> = {
        marginAll: 'medium',
        sizeAll: 'medium',
        color: 'black',
        weight: 'regular',
        as: 'p',
    };

    render() {
        const TagName = this.props.as as string;
        const {
            sizeAll, sizeWide, sizeDesktop, sizeTablet, sizeMobile,
            marginAll, marginWide, marginDesktop, marginTablet,
            marginMobile, hAlign, color, weight, className, children,
        } = this.props;
        const isMarginAll = marginAll === 'default' ? false : marginAll;

        return (
            <TagName
                className={cn('', {
                    'size-all': sizeAll,
                    'size-wide': sizeWide,
                    'size-desktop': sizeDesktop,
                    'size-tablet': sizeTablet,
                    'size-mobile': sizeMobile,
                    'margin-all': isMarginAll,
                    'margin-wide': marginWide,
                    'margin-desktop': marginDesktop,
                    'margin-tablet': marginTablet,
                    'margin-mobile': marginMobile,
                    'h-align': hAlign,
                    color: color,
                    weight: weight,
                }, className )}>
                {children}
            </TagName>
        );
    }
}

export default Paragraph;

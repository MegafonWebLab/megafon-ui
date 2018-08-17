import * as React from 'react';
import * as PropTypes from 'prop-types';
import './Paragraph.less';
import { cnCreate } from '../../utils/cn';

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
    marginAll?: 'none' | 'small' | 'medium' | 'large' | 'largest';
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
    /** Custom className */
    className?: string;
    children?: JSX.Element[] | Element[] | JSX.Element | string | Element;
}

const cn = cnCreate('paragraph');
class Paragraph extends React.Component<IParagraphProps, {}> {
    static propTypes = {
        hAlign: PropTypes.oneOf(['center', 'right']),
        weight: PropTypes.oneOf(['light', 'regular', 'medium', 'bold']),
        sizeAll: PropTypes.oneOf(['smallest', 'small', 'medium', 'large']),
        sizeWide: PropTypes.oneOf(['smallest', 'small', 'medium', 'large']),
        sizeDesktop: PropTypes.oneOf(['smallest', 'small', 'medium', 'large']),
        sizeTablet: PropTypes.oneOf(['smallest', 'small', 'medium', 'large']),
        sizeMobile: PropTypes.oneOf(['smallest', 'small', 'medium', 'large']),
        marginAll: PropTypes.oneOf(['none', 'small', 'medium', 'large', 'largest']),
        marginWide: PropTypes.oneOf(['none', 'small', 'medium', 'large', 'largest']),
        marginDesktop: PropTypes.oneOf(['none', 'small', 'medium', 'large', 'largest']),
        marginTablet: PropTypes.oneOf(['none', 'small', 'medium', 'large', 'largest']),
        marginMobile: PropTypes.oneOf(['none', 'small', 'medium', 'large', 'largest']),
        color: PropTypes.oneOf(['black', 'white', 'gray', 'green', 'purple', 'red', 'inherit']),
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
    };

    render() {
        return (
            <p
                className={cn('', {
                    'size-all': this.props.sizeAll,
                    'size-wide': this.props.sizeWide,
                    'size-desktop': this.props.sizeDesktop,
                    'size-tablet': this.props.sizeTablet,
                    'size-mobile': this.props.sizeMobile,
                    'margin-all': this.props.marginAll,
                    'margin-wide': this.props.marginWide,
                    'margin-desktop': this.props.marginDesktop,
                    'margin-tablet': this.props.marginTablet,
                    'margin-mobile': this.props.marginMobile,
                    'h-align': this.props.hAlign,
                    color: this.props.color,
                    weight: this.props.weight,
                }, this.props.className)}>
                {this.props.children}
            </p>
        );
    }
}

export default Paragraph;

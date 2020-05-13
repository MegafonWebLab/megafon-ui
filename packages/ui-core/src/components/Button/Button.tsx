import * as React from 'react';
import * as PropTypes from 'prop-types';
import cnCreate from 'utils/cnCreate';
import './Button.less';
import Spinner from 'docIcons/spinner.svg';
import detectTouch from 'utils/detectTouch';

export interface IButtonProps {
    /** Special view */
    customView?: 'two-lines';
    /** Link */
    href?: string;
    /** Target - property tag <a> */
    target?: '_self' | '_blank' | '_parent' | '_top';
    /** Functional for form */
    type?: 'button' | 'reset' | 'submit';
    /** Size for all devices */
    sizeAll?: 'small' | 'medium' | 'large';
    /** Size for wide devices 1280+ */
    sizeWide?: 'small' | 'medium' | 'large';
    /** Size for desktop 1020+ */
    sizeDesktop?: 'small' | 'medium' | 'large';
    /** Size for tablet 730-1020 */
    sizeTablet?: 'small' | 'medium' | 'large';
    /** Size for mobile 320-730 */
    sizeMobile?: 'small' | 'medium' | 'large';
    /** Current color. WARNING!!! Values 'transparent', 'transparent-green' were deprecated */
    passiveColor?: 'green' | 'purple' | 'transparent' | 'transparent-green' | 'white' | 'transparent-white';
    /** Hover color */
    hoverColor?: 'green' | 'purple' | 'transparent';
    /** Border color */
    border?: 'green' | 'transparent';
    /** Font color */
    fontColor?: 'white' | 'green';
    /** Click/press color */
    downColor?: 'dark' | 'transparent';
    /** Disabled color. WARNING!!! Values 'transparent', 'white' were deprecated */
    disabledColor?: 'gray' | 'transparent-white' | 'transparent' | 'white';
    /** Width */
    width?: 'full' | 'auto';
    /** Custom class name */
    className?: string;
    /** Custom class name for button text-area */
    classNameContent?: string;
    /** Margin(outer indentation) */
    margin?: boolean;
    /** Disabled */
    disabled?: boolean;
    /** Padding(inner indentation) */
    padding?: boolean;
    /** Show spinner */
    showSpinner?: boolean;
    children?: JSX.Element[] | Element[] | JSX.Element | string | Element;
    /** Click event handler */
    onClick?: (e: React.SyntheticEvent<EventTarget>) => void;
}

interface IButtonState {
    isTouch: boolean;
}

const cn = cnCreate('mfui-button');
class Button extends React.Component<IButtonProps, IButtonState> {
    static propTypes = {
        customView: PropTypes.oneOf(['two-lines']),
        href: PropTypes.string,
        target: PropTypes.oneOf(['_self', '_blank', '_parent', '_top']),
        type: PropTypes.oneOf(['button', 'reset', 'submit']),
        disabled: PropTypes.bool,
        sizeAll: PropTypes.oneOf(['small', 'medium', 'large']),
        sizeWide: PropTypes.oneOf(['small', 'medium', 'large']),
        sizeDesktop: PropTypes.oneOf(['small', 'medium', 'large']),
        sizeTablet: PropTypes.oneOf(['small', 'medium', 'large']),
        sizeMobile: PropTypes.oneOf(['small', 'medium', 'large']),
        passiveColor: PropTypes.oneOf([
            'green',
            'purple',
            'transparent',
            'transparent-green',
            'white',
            'transparent-white',
        ]),
        hoverColor: PropTypes.oneOf([
            'green',
            'purple',
            'transparent',
        ]),
        border: PropTypes.oneOf([
            'green',
            'transparent',
        ]),
        fontColor: PropTypes.oneOf([
            'green',
            'white',
        ]),
        downColor: PropTypes.oneOf([
            'dark',
            'transparent',
        ]),
        disabledColor: PropTypes.oneOf([
            'gray',
            'white',
            'transparent',
            'transparent-white',
        ]),
        margin: PropTypes.bool,
        padding: PropTypes.bool,
        width: PropTypes.oneOf(['full', 'auto']),
        showSpinner: PropTypes.bool,
        onClick: PropTypes.func,
        classNameContent: PropTypes.string,
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.element),
            PropTypes.element,
            PropTypes.string,
            PropTypes.node,
        ]),
    };

    static defaultProps: Partial<IButtonProps> = {
        passiveColor: 'green',
        hoverColor: 'green',
        downColor: 'dark',
        disabledColor: 'gray',
        width: 'auto',
        type: 'button',
        sizeAll: 'medium',
        padding: true,
        showSpinner: false,
    };

    constructor(props: IButtonProps) {
        super(props);

        this.state = {
            isTouch: false,
        };
    }

    componentDidMount() {
        this.setState({ isTouch: detectTouch() });
    }

    handleClick = (e: React.SyntheticEvent<EventTarget>) => {
        const { disabled, onClick } = this.props;

        if (disabled) {
            e.preventDefault();

            return;
        }

        onClick && onClick(e);
    }

    renderChildrenElem() {
        return (
            <div className={cn('content', {}, this.props.classNameContent)}>
                {this.props.children}
            </div>
        );
    }

    renderSpinner() {
        return (
            <div className={cn('spinner')}>
                <Spinner />
            </div>
        );
    }

    render() {
        const {
            sizeAll, sizeWide, sizeDesktop, sizeTablet, sizeMobile,
            customView, passiveColor, hoverColor, downColor, border, fontColor,
            disabledColor, padding, width, margin, showSpinner, className, href, type,
            disabled, target, children,
        } = this.props;
        const { isTouch } = this.state;
        const ElementType = href ? 'a' : 'button';

        return (
            <ElementType
                className={cn('', {
                    'size-all': sizeAll,
                    'size-wide': sizeWide,
                    'size-desktop': sizeDesktop,
                    'size-tablet': sizeTablet,
                    'size-mobile': sizeMobile,
                    'custom-view': customView,
                    'passive-color': !customView && passiveColor,
                    'hover-color': !customView && hoverColor,
                    'down-color': !customView && downColor,
                    'disabled-color': !customView && disabled && disabledColor,
                    'font-color': !customView && fontColor,
                    'border': !customView && border,
                    disabled,
                    padding,
                    width,
                    margin,
                    loading: showSpinner,
                    'no-touch': !isTouch,
                }, className)}
                href={href}
                target={href ? target : undefined}
                type={href ? undefined : type}
                onClick={this.handleClick}
                disabled={!href && disabled}
            >
                <div className={cn('inner')}>
                    {!showSpinner && children && this.renderChildrenElem()}
                    {showSpinner && this.renderSpinner()}
                </div>
            </ElementType>
        );
    }
}

export default Button;

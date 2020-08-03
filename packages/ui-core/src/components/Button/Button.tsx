import * as React from 'react';
import cnCreate from 'utils/cnCreate';
import './Button.less';
import Spinner from 'docIcons/spinner.svg';
import detectTouch from 'utils/detectTouch';

interface IButtonClasses {
    /** Button class */
    root?: string;
    /** Inner content class */
    content?: string;
}

export interface IButtonProps {
    /** Custom classes for button and button text-area */
    classes?: IButtonClasses;
    /** Theme */
    theme?: 'green' | 'purple' | 'white' | 'black';
    /** Type */
    type?: 'primary' | 'outline';
    /** Link */
    href?: string;
    /** Target - property tag <a> */
    target?: '_self' | '_blank' | '_parent' | '_top';
    /** Functional for form */
    actionType?: 'button' | 'reset' | 'submit';
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
    /** Display full width button */
    fullWidth?: boolean;
    /** Disabled */
    disabled?: boolean;
    /** Show spinner */
    showSpinner?: boolean;
    children?: JSX.Element[] | Element[] | JSX.Element | Element | string;
    /** Click event handler */
    onClick?: (e: React.SyntheticEvent<EventTarget>) => void;
}

const cn = cnCreate('mfui-button');
const Button: React.FC<IButtonProps> = props => {
    const {
        classes: {
            root: rootClassName,
            content: contentClassName,
        } = {},
        theme = 'green',
        type = 'primary',
        sizeAll = 'medium',
        sizeWide,
        sizeDesktop,
        sizeTablet,
        sizeMobile,
        fullWidth = false,
        showSpinner = false,
        href,
        actionType = 'button',
        disabled,
        target,
        children,
        onClick,
    } = props;

    const isTouch: boolean = detectTouch();
    // isTouch: boolean = true;
    const ElementType = href ? 'a' : 'button';

    const handleClick = React.useCallback((e: React.SyntheticEvent<EventTarget>): void => {
        if (disabled) {
            e.preventDefault();

            return;
        }

        onClick && onClick(e);
    }, [disabled, onClick]);

    const currentTheme: string = React.useMemo(() => (
        (type === 'primary') && (theme === 'black') ? 'green' : theme
    ), [theme]);

    const renderChildrenElem: JSX.Element = React.useMemo(() => {
        return (
            <div className={cn('content', {}, contentClassName)}>
                {children}
            </div>
        );
    }, [contentClassName, children]);

    const renderSpinner: JSX.Element = React.useMemo(() => {
        return (
            <div className={cn('spinner', { type, theme })}>
                <Spinner />
            </div>
        );
    }, []);

    return (
        <ElementType
            className={cn('', {
                type,
                theme: currentTheme,
                disabled,
                'size-all': sizeAll,
                'size-wide': sizeWide,
                'size-desktop': sizeDesktop,
                'size-tablet': sizeTablet,
                'size-mobile': sizeMobile,
                width: fullWidth && 'full',
                loading: showSpinner,
                'no-touch': !isTouch,
            }, rootClassName)}
            href={href}
            target={href ? target : undefined}
            type={href ? undefined : actionType}
            onClick={handleClick}
            disabled={!href && disabled}
        >
            <div className={cn('inner')}>
                {!showSpinner && children && renderChildrenElem}
                {showSpinner && renderSpinner}
            </div>
        </ElementType>
    );
};

export default Button;

import * as React from 'react';

export default interface IButtonProps {
    /** Special view */
    customView?: 'two-lines';
    /** Link */
    href?: string | null;
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
    /** Current color */
    passiveColor?: 'green' | 'purple' | 'transparent' | 'transparent-green' | 'white';
    /** Hover color */
    hoverColor?: 'green' | 'purple' | 'transparent';
    /** Border color */
    border?: 'green' | 'transparent';
    /** Font color */
    fontColor?: 'white' | 'green';
    /** Click/press color */
    downColor?: 'dark' | 'transparent';
    /** Disabled color */
    disabledColor?: 'gray' | 'white' | 'transparent';
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
    onClick?(e: React.SyntheticEvent<EventTarget>): void;
}

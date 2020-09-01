import * as React from 'react';
import PropTypes from 'prop-types';
import cnCreate from 'utils/cnCreate';
import './IconButton.less';
import Button from 'components/Button/Button';

export interface IIconButtonProps {
    /** Theme */
    theme?: 'green' | 'purple' | 'white' | 'black';
    /** Type */
    type?: 'primary' | 'outline';
    /** Link */
    href?: string;
    /** Target - property of <a> tag */
    target?: '_self' | '_blank' | '_parent' | '_top';
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
    /** Icon */
    icon: JSX.Element;
    /** Disabled */
    disabled?: boolean;
    /** Click event handler */
    onClick?: (e: React.SyntheticEvent<EventTarget>) => void;
}

const cn = cnCreate('mfui-beta-icon-button');
const IconButton: React.FC<IIconButtonProps> = props => {
    const {
        theme = 'green',
        type = 'primary',
        href,
        target,
        sizeAll = 'medium',
        sizeWide,
        sizeDesktop,
        sizeTablet,
        sizeMobile,
        icon,
        disabled,
        onClick,
    } = props;

    const currentTheme = React.useMemo(() => (
        (type === 'primary') && (theme === 'black') ? 'green' : theme
    ), [theme]);

    return (
        <Button
            classes={{
                root: cn(''),
                content: cn('content'),
                inner: cn('inner'),
            }}
            className={cn({
                disabled,
                'size-all': sizeAll,
                'size-wide': sizeWide,
                'size-desktop': sizeDesktop,
                'size-tablet': sizeTablet,
                'size-mobile': sizeMobile,
            })}
            disabled={disabled}
            theme={currentTheme}
            target={target}
            href={href}
            type={type}
            sizeAll={sizeAll}
            sizeWide={sizeWide}
            sizeDesktop={sizeDesktop}
            sizeTablet={sizeTablet}
            sizeMobile={sizeMobile}
            onClick={onClick}
        >
            {icon}
        </Button>
    );
};

IconButton.propTypes = {
    theme: PropTypes.oneOf(['green', 'purple', 'white', 'black']),
    type: PropTypes.oneOf(['primary', 'outline']),
    href: PropTypes.string,
    target: PropTypes.oneOf(['_self', '_blank', '_parent', '_top']),
    sizeAll: PropTypes.oneOf(['small', 'medium', 'large']),
    sizeWide: PropTypes.oneOf(['small', 'medium', 'large']),
    sizeDesktop: PropTypes.oneOf(['small', 'medium', 'large']),
    sizeTablet: PropTypes.oneOf(['small', 'medium', 'large']),
    sizeMobile: PropTypes.oneOf(['small', 'medium', 'large']),
    icon: PropTypes.element.isRequired,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
};

export default IconButton;

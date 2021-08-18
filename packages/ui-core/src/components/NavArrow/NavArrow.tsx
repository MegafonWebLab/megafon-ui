import { cnCreate } from '@megafon/ui-helpers';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import ArrowLeft from 'icons/System/24/Arrow_left_24.svg';
import ArrowRight from 'icons/System/24/Arrow_right_24.svg';
import './NavArrow.less';

export const Theme = {
    PURPLE: 'purple',
    DARK: 'dark',
} as const;

export const View = {
    PREV: 'prev',
    NEXT: 'next',
} as const;

type ThemeType = typeof Theme[keyof typeof Theme];
type ViewType = typeof View[keyof typeof View];

export interface INavArrowProps {
    className?: string;
    theme?: ThemeType;
    view?: ViewType;
    disabled?: boolean;
    onClick?: (e: React.SyntheticEvent<EventTarget>) => void;
}

const cn = cnCreate('mfui-beta-nav-arrow');
const NavArrow: React.FC<INavArrowProps> = ({
    className,
    view = View.PREV,
    theme = Theme.PURPLE,
    disabled = false,
    onClick,
}) => {
    const renderIcon = React.useCallback((): React.ReactNode => {
        switch (view) {
            case View.PREV:
                return <ArrowLeft className={cn('icon')} />;

            default:
                return <ArrowRight className={cn('icon')} />;
        }
    }, [view]);

    return (
        <button type="button" className={cn({ theme }, className)} onClick={onClick} disabled={disabled}>
            {renderIcon()}
        </button>
    );
};

NavArrow.propTypes = {
    className: PropTypes.string,
    theme: PropTypes.oneOf(Object.values(Theme)),
    view: PropTypes.oneOf(Object.values(View)),
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
};

export default NavArrow;

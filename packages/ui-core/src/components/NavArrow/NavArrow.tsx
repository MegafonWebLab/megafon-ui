import * as React from 'react';
import './NavArrow.less';
import { cnCreate, filterDataAttrs } from '@megafon/ui-helpers';
import ArrowLeft from '@megafon/ui-icons/system-24-arrow_left_24.svg';
import ArrowRight from '@megafon/ui-icons/system-24-arrow_right_24.svg';
import * as PropTypes from 'prop-types';

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
    dataAttrs?: {
        root?: Record<string, string>;
        prevArrow?: Record<string, string>;
        nextArrow?: Record<string, string>;
    };
    className?: string;
    theme?: ThemeType;
    view?: ViewType;
    disabled?: boolean;
    onClick?: (e: React.SyntheticEvent<EventTarget>) => void;
}

const cn = cnCreate('mfui-nav-arrow');
const NavArrow: React.FC<INavArrowProps> = ({
    dataAttrs,
    className,
    view = View.PREV,
    theme = Theme.PURPLE,
    disabled = false,
    onClick,
}) => {
    const renderIcon = React.useCallback((): React.ReactNode => {
        switch (view) {
            case View.PREV:
                return <ArrowLeft {...filterDataAttrs(dataAttrs?.prevArrow)} className={cn('icon')} />;

            default:
                return <ArrowRight {...filterDataAttrs(dataAttrs?.nextArrow)} className={cn('icon')} />;
        }
    }, [dataAttrs?.prevArrow, dataAttrs?.nextArrow, view]);

    return (
        <button
            {...filterDataAttrs(dataAttrs?.root)}
            type="button"
            className={cn({ theme }, className)}
            onClick={onClick}
            disabled={disabled}
        >
            {renderIcon()}
        </button>
    );
};

NavArrow.propTypes = {
    dataAttrs: PropTypes.shape({
        root: PropTypes.objectOf(PropTypes.string.isRequired),
        prevArrow: PropTypes.objectOf(PropTypes.string.isRequired),
        nextArrow: PropTypes.objectOf(PropTypes.string.isRequired),
    }),
    className: PropTypes.string,
    theme: PropTypes.oneOf(Object.values(Theme)),
    view: PropTypes.oneOf(Object.values(View)),
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
};

export default NavArrow;

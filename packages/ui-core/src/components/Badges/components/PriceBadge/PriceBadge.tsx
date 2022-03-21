import * as React from 'react';
import { cnCreate, filterDataAttrs } from '@megafon/ui-helpers';
import AttentionIcon from '@megafon/ui-icons/system-16-attention_16.svg';
import CheckIcon from '@megafon/ui-icons/system-16-check_invert_16.svg';
import PriceIcon from '@megafon/ui-icons/system-16-price_16.svg';
import TimerIcon from '@megafon/ui-icons/system-16-timer_16.svg';
import * as PropTypes from 'prop-types';
import './PriceBadge.less';

export const PriceBadgeTheme = {
    RED: 'red',
    GREY: 'grey',
    GREEN: 'green',
    ORANGE: 'orange',
} as const;

export const PriceBadgeIcon = {
    TIMER: 'timer',
    PRICE: 'price',
    CHECK: 'check',
    ATTENTION: 'attention',
} as const;

type PriceBadgeThemeType = typeof PriceBadgeTheme[keyof typeof PriceBadgeTheme];
type PriceBadgeIconType = typeof PriceBadgeIcon[keyof typeof PriceBadgeIcon];

const getPriceBadgeIcon = (iconType: PriceBadgeIconType) => {
    switch (iconType) {
        case PriceBadgeIcon.TIMER:
            return TimerIcon;
        case PriceBadgeIcon.PRICE:
            return PriceIcon;
        case PriceBadgeIcon.CHECK:
            return CheckIcon;
        case PriceBadgeIcon.ATTENTION:
            return AttentionIcon;
        default:
            return TimerIcon;
    }
};

export interface IPriceBadgeProps {
    /** Адаптивный режим */
    isAdaptive?: boolean;
    /** Тип иконки */
    iconType?: PriceBadgeIconType;
    /** Цветовая тема */
    theme?: PriceBadgeThemeType;
    /** Дополнительный класс корневого элемента */
    className?: string;
    /** Дополнительные data-атрибуты к внутренним элементам */
    dataAttrs?: {
        root?: Record<string, string>;
    };
    children: JSX.Element[] | Element[] | JSX.Element | Element | string;
}

const cn = cnCreate('mfui-price-badge');
const PriceBadge: React.FC<IPriceBadgeProps> = ({
    iconType = 'timer',
    isAdaptive = false,
    theme = 'grey',
    className,
    dataAttrs,
    children,
}) => {
    const Icon = getPriceBadgeIcon(iconType);

    return (
        <div {...filterDataAttrs(dataAttrs?.root)} className={cn({ theme, adaptive: isAdaptive }, className)}>
            <div className={cn('icon-container')}>
                <Icon className={cn('icon')} />
            </div>
            <span className={cn('text')}>{children}</span>
        </div>
    );
};

PriceBadge.propTypes = {
    isAdaptive: PropTypes.bool,
    iconType: PropTypes.oneOf(Object.values(PriceBadgeIcon)),
    theme: PropTypes.oneOf(Object.values(PriceBadgeTheme)),
    className: PropTypes.string,
    dataAttrs: PropTypes.shape({
        root: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
    }),
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element.isRequired),
        PropTypes.element,
        PropTypes.string,
    ]).isRequired,
};

export default PriceBadge;

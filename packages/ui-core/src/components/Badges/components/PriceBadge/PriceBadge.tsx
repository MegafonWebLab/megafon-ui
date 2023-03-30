import * as React from 'react';
import { cnCreate, filterDataAttrs } from '@megafon/ui-helpers';
import AttentionIcon from '@megafon/ui-icons/system-16-attention_16.svg';
import CheckIcon from '@megafon/ui-icons/system-16-check_invert_16.svg';
import PriceIcon from '@megafon/ui-icons/system-16-price_16.svg';
import TimerIcon from '@megafon/ui-icons/system-16-timer_16.svg';
import AttentionIconBig from '@megafon/ui-icons/system-24-attention_24.svg';
import CheckIconBig from '@megafon/ui-icons/system-24-check_invert_24.svg';
import PriceIconBig from '@megafon/ui-icons/system-24-price_24.svg';
import TimerIconBig from '@megafon/ui-icons/system-24-timer_24.svg';
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

export const PriseBadgeSize = {
    SMALL: 'small',
    BIG: 'big',
} as const;

type PriceBadgeThemeType = typeof PriceBadgeTheme[keyof typeof PriceBadgeTheme];
type PriceBadgeIconType = typeof PriceBadgeIcon[keyof typeof PriceBadgeIcon];
type PriseBadgeSizeType = typeof PriseBadgeSize[keyof typeof PriseBadgeSize];

const getPriceBadgeIcon = (iconType: PriceBadgeIconType, size: PriseBadgeSizeType) => {
    const isBigIcon = size === PriseBadgeSize.BIG;

    switch (true) {
        case iconType === PriceBadgeIcon.TIMER && isBigIcon:
            return TimerIconBig;
        case iconType === PriceBadgeIcon.PRICE && isBigIcon:
            return PriceIconBig;
        case iconType === PriceBadgeIcon.CHECK && isBigIcon:
            return CheckIconBig;
        case iconType === PriceBadgeIcon.ATTENTION && isBigIcon:
            return AttentionIconBig;
        case iconType === PriceBadgeIcon.PRICE:
            return PriceIcon;
        case iconType === PriceBadgeIcon.CHECK:
            return CheckIcon;
        case iconType === PriceBadgeIcon.ATTENTION:
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
    /** Размер бейджа */
    size?: PriseBadgeSizeType;
    /** Дополнительный текст (только для size="big") */
    subTitle?: string;
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
    size = 'small',
    subTitle,
    className,
    dataAttrs,
    children,
}) => {
    const Icon = getPriceBadgeIcon(iconType, size);
    const showSubTitle = size === 'big' && !!subTitle;

    return (
        <div {...filterDataAttrs(dataAttrs?.root)} className={cn({ theme, adaptive: isAdaptive, size }, className)}>
            <div className={cn('icon-container')}>
                <Icon className={cn('icon')} />
            </div>
            <div className={cn('text')}>
                <div>{children}</div>
                {showSubTitle && <div className={cn('sub-title')}>{subTitle}</div>}
            </div>
        </div>
    );
};

PriceBadge.propTypes = {
    isAdaptive: PropTypes.bool,
    iconType: PropTypes.oneOf(Object.values(PriceBadgeIcon)),
    theme: PropTypes.oneOf(Object.values(PriceBadgeTheme)),
    size: PropTypes.oneOf(Object.values(PriseBadgeSize)),
    subTitle: PropTypes.string,
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

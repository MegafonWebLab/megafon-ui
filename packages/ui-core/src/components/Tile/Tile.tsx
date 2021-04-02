import React from 'react';
import PropTypes from 'prop-types';
import cnCreate from 'utils/cnCreate';
import './Tile.less';
import filterDataAttrs, { IDataAttributes } from './../../utils/dataAttrs';

export const Theme = {
    LIGHT: 'light',
    DARK: 'dark',
} as const;

type ThemeType = typeof Theme[keyof typeof Theme];

export const Radius = {
    DEFAULT: 'default',
    ROUNDED: 'rounded',
} as const;

type RadiusType = typeof Radius[keyof typeof Radius];

export const Shadow = {
    ZERO: 'zero',
    LOW: 'low',
    HIGH: 'high',
    HOVER: 'hover',
} as const;

type ShadowType = typeof Shadow[keyof typeof Shadow];

export interface ITileProps extends IDataAttributes {
    /** Ссылка */
    href?: string;
    /** Тема */
    theme?: ThemeType;
    /** Радиус границы */
    radius?: RadiusType;
    /** Уровень тени */
    shadowLevel?: ShadowType;
    /** Включить тень при наведении */
    isInteractive?: boolean;
    /** Дополнительный класс корневого элемента */
    className?: string;
    /** Обработчик клика */
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const cn = cnCreate('mfui-beta-tile');
const Tile: React.FC<ITileProps> = ({
    href,
    children,
    className,
    theme = 'light',
    shadowLevel = 'zero',
    radius = 'default',
    isInteractive = false,
    onClick,
    dataAttrs,
}) => {
    const [currentShadow, setCurrentShadow] = React.useState(shadowLevel);

    const handleClick = (e: React.MouseEvent<HTMLDivElement>): void => {
        onClick && onClick(e);
    };

    const handleHoverTile = (): void => {
        isInteractive && setCurrentShadow(Shadow.HOVER);
    };

    const handleMouseLeave = (): void => {
        setCurrentShadow(shadowLevel);
    };

    return (
        <div
            className={cn(
                {
                    theme,
                    radius,
                    shadow: currentShadow,
                    pointer: !!href,
                },
                className
            )}
            onClick={handleClick}
            onMouseEnter={handleHoverTile}
            onMouseLeave={handleMouseLeave}
            {...filterDataAttrs(dataAttrs)}
        >
            {href && (
                <a href={href} className={cn('link')}>
                    {children}
                </a>
            )}
            {!href && children}
        </div>
    );
};

Tile.propTypes = {
    href: PropTypes.string,
    theme: PropTypes.oneOf(Object.values(Theme)),
    radius: PropTypes.oneOf(Object.values(Radius)),
    shadowLevel: PropTypes.oneOf(Object.values(Shadow)),
    className: PropTypes.string,
    isInteractive: PropTypes.bool,
    onClick: PropTypes.func,
    dataAttrs: PropTypes.objectOf(PropTypes.string.isRequired),
};

export default Tile;

import React from 'react';
import { cnCreate, filterDataAttrs } from '@megafon/ui-helpers';
import PropTypes from 'prop-types';
import './Tile.less';

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

export const ShadowLevel = {
    ZERO: 'zero',
    DEFAULT: 'default',
    HOVER: 'hover',
    PRESSED: 'pressed',
    /**  @deprecated TODO: нужно удалить значение при выпуске мажорной версии */
    HIGH: 'high',
    /**  @deprecated TODO: нужно удалить значение при выпуске мажорной версии */
    LOW: 'low',
} as const;

type ShadowLevelType = typeof ShadowLevel[keyof typeof ShadowLevel];

export interface ITileProps {
    /** Ссылка */
    href?: string;
    /** Атрибут для открытия ссылки */
    target?: '_self' | '_blank';
    /** rel - аргумент тега <a> */
    rel?: string;
    /** Тема */
    // TODO: переименовать в shadowColor
    theme?: ThemeType;
    /** Радиус границы */
    radius?: RadiusType;
    /** Уровень тени */
    shadowLevel?: ShadowLevelType;
    /** Включить тень при наведении */
    isInteractive?: boolean;
    /** Дополнительный класс корневого элемента */
    className?: string;
    /** Дополнительные data атрибуты к внутренним элементам */
    dataAttrs?: {
        root?: Record<string, string>;
    };
    /** Обработчик клика */
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const cn = cnCreate('mfui-tile');
const Tile: React.FC<ITileProps> = ({
    href,
    children,
    className,
    // TODO: переименовать в shadowColor
    theme = 'light',
    shadowLevel = 'zero',
    radius = 'default',
    isInteractive = false,
    onClick,
    dataAttrs,
    target = '_self',
    rel,
}) => {
    const handleClick = (e: React.MouseEvent<HTMLDivElement>): void => {
        onClick?.(e);
    };
    const isPointer = !!href || isInteractive;

    return (
        <div
            className={cn(
                {
                    // TODO: переименовать в shadowColor
                    theme,
                    radius,
                    shadow: shadowLevel,
                    pointer: isPointer,
                    interactive: isInteractive,
                },
                className,
            )}
            onClick={handleClick}
            {...filterDataAttrs(dataAttrs?.root)}
        >
            {href && (
                <a href={href} className={cn('link')} target={target} rel={rel}>
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
    shadowLevel: PropTypes.oneOf(Object.values(ShadowLevel)),
    className: PropTypes.string,
    isInteractive: PropTypes.bool,
    onClick: PropTypes.func,
    dataAttrs: PropTypes.shape({
        root: PropTypes.objectOf(PropTypes.string.isRequired),
    }),
    target: PropTypes.oneOf(['_self', '_blank']),
    rel: PropTypes.string,
};

export default Tile;

import React from 'react';
import PropTypes from 'prop-types';
import cnCreate from 'utils/cnCreate';
import './Tile.less';

export enum Theme {
    LIGHT = 'light',
    DARK = 'dark',
}

export enum Radius {
    DEFAULT = 'default',
    ROUNDED = 'rounded',
}

export enum Shadow {
    ZERO = 'zero',
    LOW = 'low',
    HIGH = 'high',
    HOVER = 'hover',
}

export interface ITileProps {
    /** Link href */
    href?: string;
    /** Tile view according to the background color */
    theme?: Theme;
    /** Border radius */
    radius?: Radius;
    /** Shadow levels of tile contour */
    shadowLevel?: Shadow;
    /** Enabling shadow on hover */
    isInteractive?: boolean;
    /** Custom class */
    className?: string;
    /** Handler */
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const cn = cnCreate('mfui-beta-tile');
const Tile: React.FC<ITileProps> = (props) => {
    const {
        href,
        children,
        className,
        theme = Theme.LIGHT,
        shadowLevel = Shadow.ZERO,
        radius = Radius.DEFAULT,
        isInteractive = false,
        onClick,
    } = props;

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
};

export default Tile;

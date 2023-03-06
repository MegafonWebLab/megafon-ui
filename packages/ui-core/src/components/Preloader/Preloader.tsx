import * as React from 'react';
import { cnCreate, filterDataAttrs } from '@megafon/ui-helpers';
import * as PropTypes from 'prop-types';
import './Preloader.less';

export const PreloaderColors = {
    DEFAULT: 'default',
    WHITE: 'white',
    BLACK: 'black',
} as const;

export type PreloaderColorsType = typeof PreloaderColors[keyof typeof PreloaderColors];

export const PreloaderSizes = {
    SMALL: 'small',
    MEDIUM: 'medium',
} as const;

export type PreloaderSizesType = typeof PreloaderSizes[keyof typeof PreloaderSizes];

export interface IPreloaderProps {
    /** Задержка отрисовки  */
    hasDelay?: boolean;
    /** Цветовая тема */
    color?: PreloaderColorsType;
    /** Размер на всех разрешениях экрана */
    sizeAll?: PreloaderSizesType;
    /** Размер на разрешении экрана 1280+ */
    sizeWide?: PreloaderSizesType;
    /** Размер на разрешении экрана 1024+ */
    sizeDesktop?: PreloaderSizesType;
    /** Размер на разрешении экрана 768-1023 */
    sizeTablet?: PreloaderSizesType;
    /** Размер на разрешении экрана 0-767 */
    sizeMobile?: PreloaderSizesType;
    /** Дополнительный класс корневого элемента */
    className?: string;
    /** Дополнительные data атрибуты к внутренним элементам */
    dataAttrs?: {
        root?: Record<string, string>;
    };
}

const cn = cnCreate('mfui-preloader');
const Preloader: React.FC<IPreloaderProps> = ({
    color = 'default',
    sizeAll = 'medium',
    hasDelay = true,
    sizeWide,
    sizeDesktop,
    sizeTablet,
    sizeMobile,
    className,
    dataAttrs,
}) => {
    const [isShowed, setIsShowed] = React.useState(!hasDelay);

    React.useEffect((): (() => void) | undefined => {
        if (isShowed) {
            return undefined;
        }

        const timerId = setTimeout(() => {
            setIsShowed(true);
        }, 250);

        return (): void => {
            clearTimeout(timerId);
        };
    }, [isShowed]);

    return isShowed ? (
        <div
            {...filterDataAttrs(dataAttrs?.root)}
            className={cn(
                {
                    color,
                    'size-all': sizeAll,
                    'size-wide': sizeWide,
                    'size-desktop': sizeDesktop,
                    'size-tablet': sizeTablet,
                    'size-mobile': sizeMobile,
                },
                className,
            )}
        >
            <div className={cn('item', { first: true })} />
            <div className={cn('item', { second: true })} />
            <div className={cn('item', { third: true })} />
        </div>
    ) : null;
};

Preloader.propTypes = {
    color: PropTypes.oneOf(Object.values(PreloaderColors)),
    sizeAll: PropTypes.oneOf(Object.values(PreloaderSizes)),
    sizeWide: PropTypes.oneOf(Object.values(PreloaderSizes)),
    sizeDesktop: PropTypes.oneOf(Object.values(PreloaderSizes)),
    sizeTablet: PropTypes.oneOf(Object.values(PreloaderSizes)),
    sizeMobile: PropTypes.oneOf(Object.values(PreloaderSizes)),
    className: PropTypes.string,
    dataAttrs: PropTypes.shape({
        root: PropTypes.objectOf(PropTypes.string.isRequired),
    }),
};

export default Preloader;

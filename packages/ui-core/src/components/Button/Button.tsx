import * as React from 'react';
import PropTypes from 'prop-types';
import cnCreate from 'utils/cnCreate';
import './Button.less';
import Preloader, { PreloaderColorsType, PreloaderSizesType, PreloaderColors } from 'components/Preloader/Preloader';
import Arrow from 'icons/System/32/Arrow_right_32.svg';
import detectTouch from 'utils/detectTouch';
import filterDataAttrs, { IDataAttributes } from './../../utils/dataAttrs';

export const ButtonTypes = {
    PRIMARY: 'primary',
    OUTLINE: 'outline',
} as const;

type ButtonTypesType = typeof ButtonTypes[keyof typeof ButtonTypes];

export const ButtonThemes = {
    GREEN: 'green',
    PURPLE: 'purple',
    WHITE: 'white',
    BLACK: 'black',
} as const;

type ButtonThemesType = typeof ButtonThemes[keyof typeof ButtonThemes];

export const ButtonSizes = {
    SMALL: 'small',
    MEDIUM: 'medium',
    LARGE: 'large',
} as const;

type ButtonSizesType = typeof ButtonSizes[keyof typeof ButtonSizes];

export interface IButtonProps extends IDataAttributes {
    /** Дополнительный класс корневого элемента */
    className?: string | string[];
    /** Дополнительные классы для внутренних элементов */
    classes?: {
        /** Button class */
        root?: string | null;
        /** Content class */
        content?: string | null;
        /** Inner container class */
        inner?: string | null;
    };
    /** Тема компонента */
    theme?: ButtonThemesType;
    /** Тип компонента */
    type?: ButtonTypesType;
    /** Ссылка */
    href?: string;
    /** Target - свойство тега <a> */
    target?: '_self' | '_blank' | '_parent' | '_top';
    /** Rel - свойство тега <a> */
    rel?: string;
    /** Поведение кнопки */
    actionType?: 'button' | 'reset' | 'submit';
    /** Размер на всех разрешениях экрана */
    sizeAll?: ButtonSizesType;
    /** Размер на разрешении экрана 1280+ */
    sizeWide?: ButtonSizesType;
    /** Размер на разрешении экрана 1020+ */
    sizeDesktop?: ButtonSizesType;
    /** Размер на разрешении экрана 730-1020 */
    sizeTablet?: ButtonSizesType;
    /** Размер на разрешении экрана 320-730 */
    sizeMobile?: ButtonSizesType;
    /** Растянуть на полную ширину контейнера */
    fullWidth?: boolean;
    /** Показать загрузку */
    showLoader?: boolean;
    /** Показать стелку */
    showArrow?: boolean;
    /** Иконка слева */
    iconLeft?: JSX.Element;
    /** Управление возможностью взаимодействия с компонентом */
    disabled?: boolean;
    /** Обработчик клика по кнопке */
    onClick?: (e: React.SyntheticEvent<EventTarget>) => void;
}

const getLoaderSize = (size: string): PreloaderSizesType => (
    size === ButtonSizes.SMALL ? ButtonSizes.SMALL : ButtonSizes.MEDIUM
);

const cn = cnCreate('mfui-beta-button');
const Button: React.FC<IButtonProps> = props => {
    const {
        classes: {
            root: rootClassName,
            content: contentClassName,
            inner: innerClassName,
        } = {},
        className = '',
        theme = 'green',
        type = 'primary',
        href,
        target,
        rel,
        actionType = 'button',
        sizeAll = 'medium',
        sizeWide,
        sizeDesktop,
        sizeTablet,
        sizeMobile,
        fullWidth = false,
        showLoader = false,
        showArrow = false,
        iconLeft,
        disabled,
        children,
        onClick,
        dataAttrs,
    } = props;

    const isTouch: boolean = React.useMemo(() => detectTouch(), []);
    const ElementType = href ? 'a' : 'button';

    const handleClick = React.useCallback((e: React.SyntheticEvent<EventTarget>): void => {
        if (disabled) {
            e.preventDefault();

            return;
        }

        onClick && onClick(e);
    }, [disabled, onClick]);

    const currentTheme: string = React.useMemo(() => (
        (type === ButtonTypes.PRIMARY) && (theme === ButtonThemes.BLACK) ? ButtonThemes.GREEN : theme
    ), [type, theme]);

    const loaderWhite: boolean = React.useMemo(() => (
        type === ButtonTypes.PRIMARY && theme === ButtonThemes.GREEN ||
        type === ButtonTypes.PRIMARY && theme === ButtonThemes.PURPLE ||
        type === ButtonTypes.OUTLINE && theme === ButtonThemes.WHITE
    ), [type, theme]);

    const loaderColor: PreloaderColorsType = React.useMemo(() => {
        switch (true) {
            case loaderWhite:
                return PreloaderColors.WHITE;
            case type === ButtonTypes.OUTLINE && theme === ButtonThemes.BLACK:
                return PreloaderColors.BLACK;
            default:
                return PreloaderColors.DEFAULT;
        }
    }, [type, theme, loaderWhite]);

    const renderChildren: JSX.Element = React.useMemo(() => (
        <div className={cn('content', contentClassName)}>
            {iconLeft && <div className={cn('icon')}>{iconLeft}</div>}
            {children}
            {!iconLeft && showArrow && <Arrow className={cn('icon-arrow')} />}
        </div>
    ), [iconLeft, contentClassName, showArrow, children]);

    const renderLoader: JSX.Element = React.useMemo(() => (
        <Preloader
            color={loaderColor}
            sizeAll={getLoaderSize(sizeAll)}
            sizeWide={sizeWide && getLoaderSize(sizeWide)}
            sizeDesktop={sizeDesktop && getLoaderSize(sizeDesktop)}
            sizeTablet={sizeTablet && getLoaderSize(sizeTablet)}
            sizeMobile={sizeMobile && getLoaderSize(sizeMobile)}
        />
    ), [sizeAll, sizeWide, sizeDesktop, sizeTablet, sizeMobile]);

    const setRelAttribute = () => {
        if (ElementType !== 'a') {
            return undefined;
        }

        if (rel) {
            return rel;
        }

        if (target && target !== '_self') {
            return 'noreferrer noopener';
        }

    };

    return (
        <ElementType
            {...filterDataAttrs(dataAttrs)}
            className={cn({
                type,
                theme: currentTheme,
                disabled,
                'size-all': sizeAll,
                'size-wide': sizeWide,
                'size-desktop': sizeDesktop,
                'size-tablet': sizeTablet,
                'size-mobile': sizeMobile,
                'full-width': fullWidth,
                loading: showLoader,
                'no-touch': !isTouch,
            }, [className, rootClassName])}
            href={href}
            target={href ? target : undefined}
            rel={setRelAttribute()}
            type={href ? undefined : actionType}
            onClick={handleClick}
            disabled={!href && disabled}
        >
            <div className={cn('inner', innerClassName)}>
                {!showLoader && children && renderChildren}
                {showLoader && renderLoader}
            </div>
        </ElementType>
    );
};

Button.propTypes = {
    classes: PropTypes.shape({
        root: PropTypes.string,
        content: PropTypes.string,
        inner: PropTypes.string,
    }),
    theme: PropTypes.oneOf(Object.values(ButtonThemes)),
    type: PropTypes.oneOf(Object.values(ButtonTypes)),
    href: PropTypes.string,
    target: PropTypes.oneOf(['_self', '_blank', '_parent', '_top']),
    rel: PropTypes.string,
    actionType: PropTypes.oneOf(['button', 'reset', 'submit']),
    sizeAll: PropTypes.oneOf(Object.values(ButtonSizes)),
    sizeWide: PropTypes.oneOf(Object.values(ButtonSizes)),
    sizeDesktop: PropTypes.oneOf(Object.values(ButtonSizes)),
    sizeTablet: PropTypes.oneOf(Object.values(ButtonSizes)),
    sizeMobile: PropTypes.oneOf(Object.values(ButtonSizes)),
    fullWidth: PropTypes.bool,
    showLoader: PropTypes.bool,
    showArrow: PropTypes.bool,
    iconLeft: PropTypes.element,
    disabled: PropTypes.bool,
    dataAttrs: PropTypes.objectOf(PropTypes.string.isRequired),
    onClick: PropTypes.func,
};

export default Button;

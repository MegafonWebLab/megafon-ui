import React, { Ref } from 'react';
import { cnCreate, detectTouch, filterDataAttrs } from '@megafon/ui-helpers';
import Arrow from '@megafon/ui-icons/system-32-arrow_right_32.svg';
import PropTypes from 'prop-types';
import Preloader, { PreloaderColorsType, PreloaderSizesType, PreloaderColors } from 'components/Preloader/Preloader';
import './Button.less';

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
    EXTRA_SMALL: 'extra-small',
    SMALL: 'small',
    MEDIUM: 'medium',
    LARGE: 'large',
} as const;

type ButtonSizesType = typeof ButtonSizes[keyof typeof ButtonSizes];

enum Content {
    TEXT = 'text',
    ICON = 'icon',
    ICON_TEXT = 'icon-text',
}

export interface IButtonProps {
    /** Дополнительный класс корневого элемента */
    className?: string | string[];
    /** Дополнительные классы для внутренних элементов */
    classes?: {
        /** Button class */
        root?: string;
        /** Content class */
        content?: string;
        /** Inner container class */
        inner?: string;
    };
    /** Дополнительные data атрибуты к внутренним элементам */
    dataAttrs?: {
        root?: Record<string, string>;
        content?: Record<string, string>;
        inner?: Record<string, string>;
        loader?: Record<string, string>;
    };
    /** Тема компонента */
    theme?: ButtonThemesType;
    /** Тип компонента */
    type?: ButtonTypesType;
    /** Ссылка */
    href?: string;
    /** Задает атрибут download для тега <a> */
    download?: boolean;
    /** Target - свойство тега <a> */
    target?: '_self' | '_blank' | '_parent' | '_top';
    /** Rel - атрибут тега <a> */
    rel?: string;
    /** Поведение кнопки */
    actionType?: 'button' | 'reset' | 'submit';
    /** Размер на всех разрешениях экрана */
    sizeAll?: ButtonSizesType;
    /** Размер на разрешении экрана 1280+ */
    sizeWide?: ButtonSizesType;
    /** Размер на разрешении экрана 1024+ */
    sizeDesktop?: ButtonSizesType;
    /** Размер на разрешении экрана 768-1023 */
    sizeTablet?: ButtonSizesType;
    /** Размер на разрешении экрана 0-767 */
    sizeMobile?: ButtonSizesType;
    /** Растянуть на полную ширину контейнера */
    fullWidth?: boolean;
    /** Показать загрузку */
    showLoader?: boolean;
    /** Показать стелку */
    showArrow?: boolean;
    /** Иконка */
    icon?: JSX.Element;
    /** Отключение кнопки */
    disabled?: boolean;
    /** Ссылка на элемент */
    buttonRef?: Ref<HTMLButtonElement | HTMLAnchorElement>;
    /** Обработчик клика по кнопке */
    onClick?: (e: React.SyntheticEvent<EventTarget>) => void;
}

const getLoaderSize = (size: string): PreloaderSizesType =>
    size === ButtonSizes.SMALL || size === ButtonSizes.EXTRA_SMALL ? ButtonSizes.SMALL : ButtonSizes.MEDIUM;

const cn = cnCreate('mfui-button');
const Button: React.FC<IButtonProps> = ({
    classes: { root: rootClassName, content: contentClassName, inner: innerClassName } = {},
    className = '',
    theme = 'green',
    type = 'primary',
    href,
    download,
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
    icon,
    disabled,
    children,
    onClick,
    dataAttrs,
    buttonRef,
}) => {
    const [isTouch, setTouch] = React.useState(false);
    const ElementType = href ? 'a' : 'button';

    const handleClick = React.useCallback(
        (e: React.SyntheticEvent<EventTarget>): void => {
            if (disabled) {
                e.preventDefault();

                return;
            }

            onClick?.(e);
        },
        [disabled, onClick],
    );

    const currentTheme: string = React.useMemo(
        () => (type === ButtonTypes.PRIMARY && theme === ButtonThemes.BLACK ? ButtonThemes.GREEN : theme),
        [type, theme],
    );

    const loaderWhite: boolean = React.useMemo(
        () =>
            (type === ButtonTypes.PRIMARY && theme === ButtonThemes.GREEN) ||
            (type === ButtonTypes.PRIMARY && theme === ButtonThemes.PURPLE) ||
            (type === ButtonTypes.OUTLINE && theme === ButtonThemes.WHITE),
        [type, theme],
    );

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

    const renderedContent = React.useMemo((): null | JSX.Element => {
        if (!children && !icon) {
            return null;
        }

        return (
            <div {...filterDataAttrs(dataAttrs?.content)} className={cn('content', contentClassName)}>
                {icon && <div className={cn('icon')}>{icon}</div>}
                {children && <span className={cn('text')}>{children}</span>}
                {!icon && showArrow && <Arrow className={cn('icon-arrow')} />}
            </div>
        );
    }, [children, icon, dataAttrs?.content, contentClassName, showArrow]);

    const contentType = React.useMemo(() => {
        switch (true) {
            case icon && !children:
                return Content.ICON;
            case icon && !!children:
                return Content.ICON_TEXT;
            default:
                return Content.TEXT;
        }
    }, [icon, children]);

    const renderedLoader: JSX.Element = React.useMemo(
        () => (
            <Preloader
                dataAttrs={{ root: filterDataAttrs(dataAttrs?.loader) }}
                color={loaderColor}
                sizeAll={getLoaderSize(sizeAll)}
                sizeWide={sizeWide && getLoaderSize(sizeWide)}
                sizeDesktop={sizeDesktop && getLoaderSize(sizeDesktop)}
                sizeTablet={sizeTablet && getLoaderSize(sizeTablet)}
                sizeMobile={sizeMobile && getLoaderSize(sizeMobile)}
            />
        ),
        [dataAttrs?.loader, loaderColor, sizeAll, sizeWide, sizeDesktop, sizeTablet, sizeMobile],
    );

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

        return undefined;
    };

    const classNameValue = Array.isArray(className) ? [...className, rootClassName] : [className, rootClassName];

    React.useEffect(() => {
        setTouch(detectTouch());
    }, []);

    return (
        <ElementType
            {...filterDataAttrs(dataAttrs?.root)}
            className={cn(
                {
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
                    'content-type': contentType,
                },
                classNameValue,
            )}
            href={href}
            download={!!href && download}
            target={href ? target : undefined}
            rel={setRelAttribute()}
            type={href ? undefined : actionType}
            onClick={handleClick}
            disabled={!href && disabled}
            ref={buttonRef as Ref<HTMLButtonElement & HTMLAnchorElement>}
        >
            <div {...filterDataAttrs(dataAttrs?.inner)} className={cn('inner', innerClassName)}>
                {!showLoader ? renderedContent : renderedLoader}
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
    dataAttrs: PropTypes.shape({
        root: PropTypes.objectOf(PropTypes.string.isRequired),
        content: PropTypes.objectOf(PropTypes.string.isRequired),
        inner: PropTypes.objectOf(PropTypes.string.isRequired),
        loader: PropTypes.objectOf(PropTypes.string.isRequired),
    }),
    theme: PropTypes.oneOf(Object.values(ButtonThemes)),
    type: PropTypes.oneOf(Object.values(ButtonTypes)),
    href: PropTypes.string,
    download: PropTypes.bool,
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
    icon: PropTypes.element,
    disabled: PropTypes.bool,
    buttonRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.oneOfType([PropTypes.shape({ current: PropTypes.elementType }), PropTypes.any]),
    ]),
    onClick: PropTypes.func,
};

export default Button;

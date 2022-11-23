import React, { useState, useCallback, useEffect, useMemo } from 'react';
import {
    cnCreate,
    detectTouch,
    checkNativeEventIsClickOrEnterPress,
    filterDataAttrs,
    AccessibilityEventType,
} from '@megafon/ui-helpers';
import type { AccessibilityEventTypeNative } from '@megafon/ui-helpers';
import RightArrow from '@megafon/ui-icons/system-16-arrow_right_16.svg';
import CancelIcon from '@megafon/ui-icons/system-16-cancel_16.svg';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { usePopper } from 'react-popper';
import Header from 'components/Header/Header';
import Tile from 'components/Tile/Tile';
import Arrow from './arrow.svg';
import './Tooltip.less';

const TOOLTIP_PADDING_FOR_FLIP = 14;
const MOUSE_KEY = 'mousedown';
const TOUCH_KEY = 'touchstart';

export const Placement = {
    LEFT: 'left',
    LEFT_START: 'left-start',
    LEFT_END: 'left-end',
    TOP: 'top',
    TOP_START: 'top-start',
    TOP_END: 'top-end',
    RIGHT: 'right',
    RIGHT_START: 'right-start',
    RIGHT_END: 'right-end',
    BOTTOM: 'bottom',
    BOTTOM_START: 'bottom-start',
    BOTTOM_END: 'bottom-end',
} as const;

type PlacementType = typeof Placement[keyof typeof Placement];

export const Paddings = {
    NONE: 'none',
    SMALL: 'small',
    MEDIUM: 'medium',
} as const;

type PaddingsType = typeof Paddings[keyof typeof Paddings];

export const TriggerEvent = {
    HOVER: 'hover',
    CLICK: 'click',
    CONTROLLED: 'controlled',
} as const;

type TriggerEventType = typeof TriggerEvent[keyof typeof TriggerEvent];

export const ColorTheme = {
    WHITE: 'white',
    BLUE: 'blue',
    RED: 'red',
} as const;

type ColorThemeType = typeof ColorTheme[keyof typeof ColorTheme];

export const Size = {
    SMALL: 'small',
    BIG: 'big',
} as const;

type SizeType = typeof Size[keyof typeof Size];

export interface ITooltipProps {
    /** Цветовая тема */
    colorTheme?: ColorThemeType;
    /** Размер тултипа */
    size?: SizeType;
    /** Заголовок */
    title?: string;
    /** Текст кнопки */
    buttonText?: string;
    /** Текст */
    text?: string;
    /** Наличие кнопки-крестика "Закрыть" */
    hasCloseButton?: boolean;
    /** Позиционирование относительно триггер-элемента */
    placement?: PlacementType;
    /** Направления перестроения тултипа при переполнении */
    fallbackPlacements?: PlacementType[];
    /** Размер отступов от контента */
    paddings?: PaddingsType;
    /** Тип взаимодействия с триггер-элементом для показа тултипа */
    triggerEvent?: TriggerEventType;
    /** Реф на элемент, за границы которого тултип не сможет выйти. По умолчанию viewport  */
    boundaryElement?: React.RefObject<HTMLElement>;
    /** Реф на триггер-элемент */
    triggerElement: React.RefObject<HTMLElement>;
    /** Реф элемента, на который указывает стрелка тултипа. По умолчанию стрелка указывает на triggerElement. */
    targetElement?: React.RefObject<HTMLElement>;
    /** Управление состоянием. Компонент поддерживает контроллируемое и неконтроллируемое состояние. */
    isOpened?: boolean;
    /** Отрендерить компонент в корневой элементе страницы body */
    isPortal?: boolean;
    /** Рендеринг компонента в указанном селекторе */
    portalSelector?: string;
    /** Дополнительный класс корневого элемента */
    className?: string;
    /** Дополнительные классы для внутренних элементов */
    classes?: {
        root?: string;
        arrow?: string;
        content?: string;
        contentShadow?: string;
    };
    /** Дополнительные data атрибуты к внутренним элементам */
    dataAttrs?: {
        root?: Record<string, string>;
        close?: Record<string, string>;
        button?: Record<string, string>;
        content?: Record<string, string>;
    };
    /** Обработчик на открытие */
    onOpen?: (e: AccessibilityEventTypeNative) => void;
    /** Обработчик на закрытие */
    onClose?: (e: AccessibilityEventTypeNative | FocusEvent) => void;
    /** Обработчик на клик по кнопке закрытия */
    onCloseButtonClick?: (e: AccessibilityEventType) => void;
    /** Обработчик клика по кнопке */
    onClick?: (e: React.SyntheticEvent<EventTarget>) => void;
}

const cn = cnCreate('mfui-tooltip');
const Tooltip: React.FC<ITooltipProps> = ({
    className,
    title,
    text,
    size = 'big',
    buttonText,
    hasCloseButton,
    colorTheme: theme = 'white',
    placement = 'top',
    fallbackPlacements = ['left', 'right', 'top', 'bottom'],
    paddings = 'small',
    triggerEvent = 'hover',
    boundaryElement,
    triggerElement,
    targetElement,
    isOpened = false,
    isPortal = false,
    portalSelector,
    children,
    classes: {
        root: rootClassName,
        arrow: arrowClassName,
        content: contentClassName,
        contentShadow: contentShadowClassName,
    } = {},
    dataAttrs,
    onOpen,
    onClose,
    onClick,
    onCloseButtonClick,
}) => {
    const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
    const [arrowElement, setArrowElement] = useState<HTMLElement | null>(null);
    const [isOpen, setIsOpen] = useState(isOpened);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    const currentTrigger = triggerElement.current;
    const currentTarget = targetElement?.current || currentTrigger;
    const currentBoundary = boundaryElement?.current;
    const portalElem = React.useRef<HTMLDivElement | null>(null);

    const isBigSize = size === Size.BIG;
    const hasMainContent = !!title || !!text;
    const hasTopContent = hasMainContent || !!buttonText;

    const clickEvent = useMemo(() => (isTouchDevice ? TOUCH_KEY : MOUSE_KEY), [isTouchDevice]);

    const triggerEventName: TriggerEventType = useMemo(() => {
        if (triggerEvent === TriggerEvent.CONTROLLED || !isTouchDevice) {
            return triggerEvent;
        }

        return TriggerEvent.CLICK;
    }, [isTouchDevice, triggerEvent]);

    const options = useMemo(
        () => ({
            placement,
            modifiers: [
                {
                    name: 'arrow',
                    options: {
                        element: arrowElement,
                        padding: {
                            top: 18,
                            right: 8,
                            bottom: 18,
                            left: 8,
                        },
                    },
                },
                {
                    name: 'flip',
                    options: {
                        fallbackPlacements,
                        padding: TOOLTIP_PADDING_FOR_FLIP,
                    },
                },
                {
                    name: 'eventListeners',
                    options: {
                        scroll: isOpen,
                        resize: isOpen,
                    },
                },
                {
                    name: 'preventOverflow',
                    options: {
                        boundary: currentBoundary,
                    },
                },
            ],
        }),
        [placement, arrowElement, currentBoundary, isOpen, fallbackPlacements],
    );

    const { styles, attributes, update } = usePopper(currentTarget, popperElement, options);

    useEffect(() => setIsOpen(isOpened), [isOpened]);

    useEffect(() => {
        update?.();
    }, [children, update]);

    useEffect(() => setIsTouchDevice(detectTouch()), []);

    const closeTooltip = useCallback(
        (e: AccessibilityEventTypeNative | FocusEvent): void => {
            setIsOpen(false);
            onClose?.(e);
        },
        [onClose],
    );

    const handleCloseButtonClick = useCallback(
        (e: AccessibilityEventType): void => {
            setIsOpen(false);
            onCloseButtonClick?.(e);
        },
        [onCloseButtonClick],
    );

    const handleMouseEnter = useCallback(
        (e: MouseEvent): void => {
            if (!isOpen) {
                setIsOpen(true);
                onOpen?.(e);
            }
        },
        [isOpen, onOpen],
    );

    const handleClick = useCallback(
        (e: AccessibilityEventTypeNative): void => {
            if (!checkNativeEventIsClickOrEnterPress(e)) {
                return;
            }

            setIsOpen(open => !open);
            if (!isOpen) {
                onOpen?.(e);
            } else {
                onClose?.(e);
            }
        },
        [isOpen, onOpen, onClose],
    );

    const handleOutsideEvent = useCallback(
        (e: MouseEvent): void => {
            const isTargetInPopper = e.target instanceof Element && popperElement && popperElement.contains(e.target);
            const isTargetInTrigger =
                e.target instanceof Element && currentTrigger && currentTrigger.contains(e.target);

            !isTargetInPopper && !isTargetInTrigger && closeTooltip(e);
        },
        [closeTooltip, currentTrigger, popperElement],
    );

    useEffect(() => {
        if (triggerEventName === TriggerEvent.HOVER) {
            if (currentTrigger) {
                currentTrigger.addEventListener('mouseenter', handleMouseEnter);
                currentTrigger.addEventListener('focus', handleMouseEnter);
            }

            if (isOpen) {
                document.addEventListener('mouseover', handleOutsideEvent);
                currentTrigger?.addEventListener('blur', closeTooltip);
            } else {
                document.removeEventListener('mouseover', handleOutsideEvent);
                currentTrigger?.removeEventListener('blur', closeTooltip);
            }

            return () => {
                if (currentTrigger) {
                    currentTrigger.removeEventListener('mouseenter', handleMouseEnter);
                    currentTrigger.removeEventListener('focus', handleMouseEnter);
                }
                document.removeEventListener('mouseover', handleOutsideEvent);
            };
        }

        return undefined;
    }, [triggerEventName, isOpen, currentTrigger, handleOutsideEvent, handleMouseEnter, closeTooltip]);

    useEffect(() => {
        if (triggerEventName === TriggerEvent.CLICK) {
            if (currentTrigger) {
                currentTrigger.addEventListener(clickEvent, handleClick);
                currentTrigger.addEventListener('keydown', handleClick);
            }

            if (isOpen) {
                document.addEventListener(clickEvent, handleOutsideEvent);
            } else {
                document.removeEventListener(clickEvent, handleOutsideEvent);
            }

            return () => {
                if (currentTrigger) {
                    currentTrigger.removeEventListener(clickEvent, handleClick);
                    currentTrigger.removeEventListener('keydown', handleClick);
                }
                document.removeEventListener(clickEvent, handleOutsideEvent);
            };
        }

        return undefined;
    }, [triggerEventName, isOpen, currentTrigger, handleOutsideEvent, handleClick, clickEvent]);

    useEffect(
        () => () => {
            if (portalElem.current) {
                const parent = portalSelector ? document.querySelector(portalSelector) : document.body;
                parent?.removeChild(portalElem.current);
            }
            portalElem.current = null;
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    );

    const renderedText = useMemo((): JSX.Element => <div className={cn('text')}>{text}</div>, [text]);

    const renderedFullContent = useMemo(
        (): JSX.Element => (
            <>
                {hasTopContent && (
                    <div className={cn('top', { margin: !!children })}>
                        {hasMainContent && (
                            <div className={cn('main-content')}>
                                {!!title && (
                                    <Header className={cn('title')} as="h5" space="tight">
                                        {title}
                                    </Header>
                                )}
                                {!!text && renderedText}
                            </div>
                        )}
                        {!!buttonText && (
                            <button
                                type="button"
                                className={cn('button')}
                                {...filterDataAttrs(dataAttrs?.button)}
                                onClick={onClick}
                            >
                                {buttonText}
                                <RightArrow className={cn('button-arrow')} />
                            </button>
                        )}
                    </div>
                )}
                {!!children && <div className={cn('addititonal-content')}>{children}</div>}
            </>
        ),
        [title, text, buttonText, children, dataAttrs, hasTopContent, hasMainContent, renderedText, onClick],
    );

    const template = (
        <div
            {...filterDataAttrs(dataAttrs?.root)}
            className={cn(
                {
                    theme,
                    paddings,
                    open: isOpen,
                    small: !isBigSize,
                    'has-escape': !targetElement,
                },
                [className, rootClassName],
            )}
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
        >
            <div className={cn('arrow-wrap')} ref={setArrowElement} style={styles.arrow}>
                <div className={cn('arrow', [arrowClassName])}>
                    <Arrow className={cn('arrow-inner')} />
                </div>
            </div>
            <div className={cn('content-wrap')}>
                <Tile
                    radius="rounded"
                    dataAttrs={{ root: dataAttrs?.content }}
                    className={cn('content', [contentClassName])}
                >
                    {hasCloseButton && (
                        <button
                            {...filterDataAttrs(dataAttrs?.close)}
                            className={cn('close-button')}
                            type="button"
                            onClick={handleCloseButtonClick}
                        >
                            <CancelIcon className={cn('close-icon')} />
                        </button>
                    )}
                    {isBigSize && renderedFullContent}
                    {!isBigSize && !!text && renderedText}
                </Tile>
                <Tile radius="rounded" shadowLevel="high" className={cn('content-shadow', [contentShadowClassName])} />
            </div>
        </div>
    );

    /* Не в эффекте, чтобы не создавать лишний перерендер компонента. Из-за синхронности кода в return уже будет элемент */
    if (isPortal && !portalElem.current && typeof window !== 'undefined') {
        portalElem.current = document.createElement('div');
        const parent = portalSelector ? document.querySelector(portalSelector) : document.body;
        parent?.appendChild(portalElem.current);
    }

    if (isPortal && portalElem.current) {
        return portalElem.current ? ReactDOM.createPortal(template, portalElem.current) : null;
    }

    return template;
};

Tooltip.propTypes = {
    colorTheme: PropTypes.oneOf(Object.values(ColorTheme)),
    size: PropTypes.oneOf(Object.values(Size)),
    title: PropTypes.string,
    buttonText: PropTypes.string,
    text: PropTypes.string,
    hasCloseButton: PropTypes.bool,
    placement: PropTypes.oneOf(Object.values(Placement)),
    fallbackPlacements: PropTypes.arrayOf(PropTypes.oneOf(Object.values(Placement)).isRequired),
    paddings: PropTypes.oneOf(Object.values(Paddings)),
    triggerEvent: PropTypes.oneOf(Object.values(TriggerEvent)),
    boundaryElement: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.oneOfType([PropTypes.shape({ current: PropTypes.elementType }), PropTypes.any]),
    ]),
    triggerElement: (props, propName, componentName, location) => {
        const prop = props[propName];
        const isObject = typeof prop === 'object' && prop !== null;
        // eslint-disable-next-line no-prototype-builtins
        const hasPropCurrent = isObject && prop.hasOwnProperty('current');
        if (prop === undefined) {
            return new Error(
                `The prop \`${propName}\` is marked as required in \`${componentName}\`, but its value is \`undefined\`.`,
            );
        }
        if (!isObject && !hasPropCurrent) {
            return new Error(
                `Invalid ${location} \`${propName}\` supplied to \`${componentName}\`, expected React.RefObject.`,
            );
        }

        return null;
    },
    targetElement: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.oneOfType([PropTypes.shape({ current: PropTypes.elementType }), PropTypes.any]),
    ]),
    isOpened: PropTypes.bool,
    isPortal: PropTypes.bool,
    portalSelector: PropTypes.string,
    className: PropTypes.string,
    classes: PropTypes.shape({
        root: PropTypes.string,
        arrow: PropTypes.string,
        content: PropTypes.string,
        contentShadow: PropTypes.string,
    }),
    dataAttrs: PropTypes.shape({
        root: PropTypes.objectOf(PropTypes.string.isRequired),
        close: PropTypes.objectOf(PropTypes.string.isRequired),
        button: PropTypes.objectOf(PropTypes.string.isRequired),
        content: PropTypes.objectOf(PropTypes.string.isRequired),
    }),
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    onClick: PropTypes.func,
    onCloseButtonClick: PropTypes.func,
};

export default Tooltip;

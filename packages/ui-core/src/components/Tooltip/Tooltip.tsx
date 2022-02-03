import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { cnCreate, detectTouch, checkNativeEventIsClickOrEnterPress, filterDataAttrs } from '@megafon/ui-helpers';
import type { AccessibilityEventTypeNative } from '@megafon/ui-helpers';
import PropTypes from 'prop-types';
import { usePopper } from 'react-popper';
import Tile from 'components/Tile/Tile';
import './Tooltip.less';

const TOOLTIP_PADDING_FOR_FLIP = 14;
const MOUSE_KEY = 'mousedown';
const TOUCH_KEY = 'touchstart';

export const Placement = {
    LEFT: 'left',
    TOP: 'top',
    RIGHT: 'right',
    BOTTOM: 'bottom',
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

export interface ITooltipProps {
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
        content?: Record<string, string>;
    };
    /** Обработчик на открытие */
    onOpen?: (e: AccessibilityEventTypeNative) => void;
    /** Обработчик на закрытие */
    onClose?: (e: AccessibilityEventTypeNative | FocusEvent) => void;
}

const cn = cnCreate('mfui-tooltip');
const Tooltip: React.FC<ITooltipProps> = ({
    className,
    placement = 'top',
    fallbackPlacements = ['left', 'right', 'top', 'bottom'],
    paddings = 'medium',
    triggerEvent = 'hover',
    boundaryElement,
    triggerElement,
    targetElement,
    isOpened = false,
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
}) => {
    const currentTrigger = triggerElement.current;
    const currentTarget = targetElement?.current || currentTrigger;
    const currentBoundary = boundaryElement?.current;

    const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
    const [arrowElement, setArrowElement] = useState<HTMLElement | null>(null);

    const [isOpen, setIsOpen] = useState(isOpened);
    useEffect(() => setIsOpen(isOpened), [isOpened]);

    const options = useMemo(
        () => ({
            placement,
            modifiers: [
                {
                    name: 'arrow',
                    options: { element: arrowElement },
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

    useEffect(() => {
        update?.();
    }, [children, update]);

    const [isTouchDevice, setIsTouchDevice] = useState(false);
    useEffect(() => setIsTouchDevice(detectTouch()), []);

    const clickEvent = useMemo(() => (isTouchDevice ? TOUCH_KEY : MOUSE_KEY), [isTouchDevice]);
    const triggerEventName: TriggerEventType = useMemo(
        () => (isTouchDevice ? 'click' : triggerEvent),
        [isTouchDevice, triggerEvent],
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

            if (!isTargetInPopper && !isTargetInTrigger) {
                setIsOpen(false);
                onClose?.(e);
            }
        },
        [onClose, currentTrigger, popperElement],
    );

    const handleBlurEvent = useCallback(
        (e: FocusEvent): void => {
            setIsOpen(false);
            onClose?.(e);
        },
        [onClose],
    );

    useEffect(() => {
        if (triggerEventName === TriggerEvent.HOVER) {
            if (currentTrigger) {
                currentTrigger.addEventListener('mouseenter', handleMouseEnter);
                currentTrigger.addEventListener('focus', handleMouseEnter);
            }

            if (isOpen) {
                document.addEventListener('mouseover', handleOutsideEvent);
                currentTrigger?.addEventListener('blur', handleBlurEvent);
            } else {
                document.removeEventListener('mouseover', handleOutsideEvent);
                currentTrigger?.removeEventListener('blur', handleBlurEvent);
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
    }, [triggerEventName, isOpen, currentTrigger, handleOutsideEvent, handleMouseEnter, handleBlurEvent]);

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

    return (
        <div
            {...filterDataAttrs(dataAttrs?.root)}
            className={cn({ paddings, open: isOpen }, [className, rootClassName])}
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
        >
            <div ref={setArrowElement} className={cn('arrow', [arrowClassName])} style={styles.arrow} />
            <div className={cn('arrow-shadow')} style={styles.arrow} />
            <Tile dataAttrs={{ root: dataAttrs?.content }} className={cn('content', [contentClassName])}>
                {children}
            </Tile>
            <Tile shadowLevel="high" className={cn('content-shadow', [contentShadowClassName])} />
        </div>
    );
};

Tooltip.propTypes = {
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
    className: PropTypes.string,
    classes: PropTypes.shape({
        root: PropTypes.string,
        arrow: PropTypes.string,
        content: PropTypes.string,
        contentShadow: PropTypes.string,
    }),
    dataAttrs: PropTypes.shape({
        root: PropTypes.objectOf(PropTypes.string.isRequired),
        content: PropTypes.objectOf(PropTypes.string.isRequired),
    }),
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
};

export default Tooltip;

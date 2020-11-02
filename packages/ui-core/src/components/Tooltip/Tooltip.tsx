import React, { useState, useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { usePopper } from 'react-popper';
import cnCreate from 'utils/cnCreate';
import detectTouch from 'utils/detectTouch';
import Tile from 'components/Tile/Tile';
import './Tooltip.less';

export const Placement = {
    LEFT: 'left',
    TOP: 'top',
    RIGHT: 'right',
    BOTTOM: 'bottom',
} as const;

type PlacementType = typeof Placement[keyof typeof Placement];

export const Size = {
    SMALL: 'small',
    MEDIUM: 'medium',
 } as const;

type SizeType = typeof Size[keyof typeof Size];

export const TriggerEvent = {
    HOVER: 'hover',
    CLICK: 'click',
    CONTROLLED: 'controlled',
 } as const;

type TriggerEventType = typeof TriggerEvent[keyof typeof TriggerEvent];

export interface ITooltipProps {
    /** Позиционирование относительно триггер-элемента */
    placement?: PlacementType;
    /** Размер отступов от контента */
    size?: SizeType;
    /** Тип взаимодействия с триггер-элементом для показа тултипа */
    triggerEvent?: TriggerEventType;
    /** Триггер-элемент */
    triggerElement: React.RefObject<HTMLElement>;
    /** Управление состоянием. Компонент поддерживает контроллируемое и неконтроллируемое состояние. */
    isOpened?: boolean;
    /** Дополнительный класс корневого элемента */
    className?: string;
    /** Обработчик на открытие */
    onOpen?: (e: MouseEvent) => void;
    /** Обработчик на закрытие */
    onClose?: (e: MouseEvent) => void;
}

const cn = cnCreate('mfui-beta-tooltip');
const Tooltip: React.FC<ITooltipProps>  = ({
    className,
    placement = Placement.TOP,
    size = Size.MEDIUM,
    triggerEvent = TriggerEvent.HOVER,
    triggerElement,
    isOpened = false,
    children,
    onOpen,
    onClose,
}) => {
    const currentTrigger = triggerElement.current;
    const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
    const [arrowElement, setArrowElement] = useState<HTMLElement | null>(null);

    const [isOpen, setIsOpen] = useState(isOpened);
    useEffect(() => setIsOpen(isOpened), [isOpened, setIsOpen]);

    const options = useMemo(() => ({
        placement,
        modifiers: [
            {
                name: 'arrow',
                options: { element: arrowElement },
            },
            {
                name: 'flip',
                options: {
                    fallbackPlacements: ['left', 'right' , 'top' , 'bottom'],
                },
            },
            {
                name: 'eventListeners',
                options: {
                    scroll: isOpen,
                    resize: isOpen,
                },
            },
        ],
    }), [placement, arrowElement, isOpen]);

    const { styles, attributes, update } = usePopper(currentTrigger, popperElement, options);

    useEffect(() => {
        update && update();
    }, [children, update]);

    const [isTouchDevice, setIsTouchDevice ] = useState(false);
    useEffect(() => setIsTouchDevice(detectTouch()), [detectTouch, setIsTouchDevice]);

    const clickEvent = useMemo(() => isTouchDevice ? 'touchstart' : 'click', [isTouchDevice]);
    const triggerEventName: TriggerEventType = useMemo(() => (
        isTouchDevice ? 'click' : triggerEvent
    ), [isTouchDevice, triggerEvent]);

    const handleMouseEnter = useCallback((e: MouseEvent): void => {
        if (!isOpen) {
            setIsOpen(true);
            onOpen && onOpen(e);
        }
    }, [isOpen, onOpen, setIsOpen]);

    const handleClick = useCallback((e: MouseEvent): void => {
        setIsOpen(open => !open);
        if (!isOpen) {
            onOpen && onOpen(e);
        } else {
            onClose && onClose(e);
        }
    }, [isOpen, onOpen, onClose, setIsOpen]);

    const handleOutsideEvent = useCallback((e: MouseEvent): void => {
        const isTargetInPopper = e.target instanceof Element && popperElement && popperElement.contains(e.target);
        const isTargetInTrigger = e.target instanceof Element && currentTrigger && currentTrigger.contains(e.target);
        if (!isTargetInPopper && !isTargetInTrigger) {
            setIsOpen(false);
            onClose && onClose(e);
        }
    }, [onClose, currentTrigger, popperElement, setIsOpen]);

    useEffect(() => {
        if (triggerEventName === TriggerEvent.HOVER) {
            currentTrigger && currentTrigger.addEventListener('mouseenter', handleMouseEnter);
            if (isOpen) {
                document.addEventListener('mouseover', handleOutsideEvent);
            } else {
                document.removeEventListener('mouseover', handleOutsideEvent);
            }
            return () => {
                currentTrigger && currentTrigger.removeEventListener('mouseenter', handleMouseEnter);
                document.removeEventListener('mouseover', handleOutsideEvent);
            };
        }
    }, [
        triggerEventName, isOpen, currentTrigger,
        handleOutsideEvent, handleMouseEnter,
    ]);

    useEffect(() => {
        if (triggerEventName === TriggerEvent.CLICK) {
            currentTrigger && currentTrigger.addEventListener(clickEvent, handleClick);
            if (isOpen) {
                document.addEventListener(clickEvent, handleOutsideEvent);
            } else {
                document.removeEventListener(clickEvent, handleOutsideEvent);
            }
            return () => {
                currentTrigger && currentTrigger.removeEventListener(clickEvent, handleClick);
                document.removeEventListener(clickEvent, handleOutsideEvent);
            };
        }
    }, [
        triggerEventName, isOpen, currentTrigger,
        handleOutsideEvent, handleClick,
    ]);

    return (
        <div
            className={cn([className], { size, open: isOpen })}
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
            >
            <div
                ref={setArrowElement}
                className={cn('arrow')}
                style={styles.arrow}
            />
            <div
                className={cn('arrow-shadow')}
                style={styles.arrow}
            />
            <Tile shadowLevel="high" className={cn('content')}>
                {children}
            </Tile>
        </div>
    );
};

Tooltip.propTypes = {
    placement: PropTypes.oneOf(Object.values(Placement)),
    size: PropTypes.oneOf(Object.values(Size)),
    triggerEvent: PropTypes.oneOf(Object.values(TriggerEvent)),
    triggerElement: (props, propName, componentName, location) => {
        const prop = props[propName];
        const isObject = typeof prop === 'object' && prop !== null;
        const hasPropCurrent = isObject && prop.hasOwnProperty('current');
        if (prop === undefined) {
            return new Error(
                `The prop \`${propName}\` is marked as required in \`${componentName}\`, but its value is \`undefined\`.`
            );
        }
        if (!isObject && !hasPropCurrent) {
            return new Error(
                `Invalid ${location} \`${propName}\` supplied to \`${componentName}\`, expected React.RefObject.`
            );
        }
        return null;
    },
    isOpened: PropTypes.bool,
    className: PropTypes.string,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
};

export default Tooltip;

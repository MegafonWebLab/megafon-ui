import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { usePopper } from 'react-popper-next';
import cnCreate from 'utils/cnCreate';
import detectTouch from 'utils/detectTouch';
import debounce from 'lodash.debounce';
import './Tooltip.less';

const IS_TOUCH_DEVICE = detectTouch();

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

export const Trigger = {
    HOVER: 'hover',
    CLICK: 'click',
 } as const;

type TriggerType = typeof Trigger[keyof typeof Trigger];

type IsOpenType = boolean;

export interface ITooltipProps {
    /** Tooltip position */
    placement?: PlacementType;
    /** Size of padding in tooltip content */
    size?: SizeType;
    /** Trigger handler type */
    trigger?: TriggerType;
    /** Trigger element */
    triggerElement: Element;
    /** Manipulate open state from outside */
    isOpened?: IsOpenType;
    /** Custom class name */
    className?: string;
    /** Content */
    children?: React.ReactNode;
    /** Open handler */
    onOpen?: (e: MouseEvent) => void;
    /** Close handler */
    onClose?: (e: MouseEvent) => void;
}

const cn = cnCreate('mfui-beta-tooltip');
const Tooltip: React.FC<ITooltipProps>  = ({
    className,
    placement = Placement.TOP,
    size = Size.MEDIUM,
    trigger = Trigger.HOVER,
    triggerElement,
    isOpened = false,
    children,
    onOpen,
    onClose,
}) => {
    const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
    const [arrowElement, setArrowElement] = useState<HTMLElement | null>(null);
    const options = {
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
        ],
    };
    const { styles, attributes } = usePopper(triggerElement, popperElement, options);

    const [isOpen, setIsOpen] = useState<IsOpenType>(isOpened);
    useEffect(() => setIsOpen(isOpened), [isOpened]);

    const closeTooltip = useCallback((e: MouseEvent): void => {
        setIsOpen(false);
        onOpen && onOpen(e);
    }, [isOpen, onClose]);

    const handleOpenEvent = useCallback((e: MouseEvent): void => {
        if (!isOpen) {
            setIsOpen(true);
            onOpen && onOpen(e);
        }
    }, [isOpen, onOpen]);

    const handleClickOutsideEvent = (e: MouseEvent): void => {
        if (e.target instanceof Node && popperElement && !popperElement.contains(e.target)) {
            closeTooltip(e);
        }

        return;
    };

    const handleMouseOverOutsideEvent = (e: MouseEvent): void => {
        if (
            e.target instanceof Node &&
            popperElement && !popperElement.contains(e.target) &&
            triggerElement && !triggerElement.contains(e.target)
        ) {
            closeTooltip(e);
        }

        return;
    };

    const triggerEvents = (open, close) => {
        triggerElement && triggerElement.addEventListener(open.name, open.handler);
        if (isOpen) {
            document.addEventListener(close.name, close.handler);
        }
        return () => {
            triggerElement && triggerElement.removeEventListener(open.name, open.handler);
            document.removeEventListener(close.name, close.handler);
        };
    };

    const getEvents = () => {
        const event: TriggerType = IS_TOUCH_DEVICE ? 'click' : trigger;
        switch (event) {
            case 'click': {
                return triggerEvents({
                    name: 'click',
                    handler: handleOpenEvent,
                }, {
                    name: 'click',
                    handler: handleClickOutsideEvent,
                });
            }
            case 'hover': {
                return triggerEvents({
                    name: 'mouseenter',
                    handler: handleOpenEvent,
                }, {
                    name: 'mouseover',
                    handler: debounce(handleMouseOverOutsideEvent, 30),
                });
            }
        }
    };

    useEffect(getEvents);

    return (
        <div
            className={cn([className], { size: size , open: isOpen })}
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
            >
            <div
                ref={setArrowElement}
                className={cn('arrow-container')}
                style={styles.arrow}
            />
            <div className={cn('content')}>
                {children}
            </div>
        </div>
    );
};

Tooltip.propTypes = {
    placement: PropTypes.oneOf(Object.values(Placement)),
    size: PropTypes.oneOf(Object.values(Size)),
    trigger: PropTypes.oneOf(Object.values(Trigger)),
    triggerElement: PropTypes.any,
    isOpened: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
};

export default Tooltip;

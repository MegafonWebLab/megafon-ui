import React, { useState, useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { usePopper } from 'react-popper-next';
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

export const Trigger = {
    HOVER: 'hover',
    CLICK: 'click',
    NONE: 'none',
 } as const;

type TriggerType = typeof Trigger[keyof typeof Trigger];

export interface ITooltipProps {
    /** Tooltip position */
    placement?: PlacementType;
    /** Size of padding in tooltip content */
    size?: SizeType;
    /** Trigger handler type */
    trigger?: TriggerType;
    /** Trigger element */
    triggerElement: HTMLElement;
    /** Manipulate open state from outside */
    isOpened?: boolean;
    /** Custom class name */
    className?: string;
    /** Open event callback */
    onOpen?: (e: MouseEvent) => void;
    /** Close event callback */
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
        ],
    }), [placement, arrowElement]);
    const { styles, attributes } = usePopper(triggerElement, popperElement, options);

    const [isTriggered, setIsTriggered] = useState(false);
    const [isOpen, setIsOpen] = useState(isOpened);
    useEffect(() => setIsOpen(isOpened), [isOpened]);

    const handleOpen = useCallback((e: MouseEvent): void => {
        setIsOpen(true);
        onOpen && onOpen(e);
    }, [onOpen]);

    const handleClose = useCallback((e: MouseEvent): void => {
        setIsOpen(false);
        onClose && onClose(e);
    }, [onClose]);

    const handleMouseEnter = useCallback((e: MouseEvent): void => {
        if (!isTriggered) {
            setIsTriggered(true);
        }
        if (!isOpen) {
            handleOpen(e);
        }
    }, [isTriggered, isOpen, handleOpen]);

    const handleClick = useCallback((e: MouseEvent): void => {
        if (!isTriggered) {
            setIsTriggered(true);
        }
        setIsOpen(o => !o);
        !isOpen ? onOpen && onOpen(e) : onClose && onClose(e);
    }, [isTriggered, isOpen, onClose, onOpen]);

    const handleOutsideEvent = useCallback((e: MouseEvent): void => {
        const isTargetInPopper = e.target instanceof Element && popperElement && popperElement.contains(e.target);
        const isTargetInTrigger = e.target instanceof Element && triggerElement && triggerElement.contains(e.target);
        if (!isTargetInPopper && !isTargetInTrigger) {
            handleClose(e);
        }
    }, [handleClose, triggerElement, popperElement]);

    const event: TriggerType = useMemo(() => detectTouch() ? 'click' : trigger, [detectTouch, trigger]);

    useEffect(() => {
        if (event === Trigger.HOVER) {
            triggerElement && triggerElement.addEventListener('mouseenter', handleMouseEnter);
            if (isTriggered && isOpen) {
                document.addEventListener('mouseover', handleOutsideEvent);
            } else {
                document.removeEventListener('mouseover', handleOutsideEvent);
            }
            return () => {
                triggerElement && triggerElement.removeEventListener('mouseenter', handleMouseEnter);
                document.removeEventListener('mouseover', handleOutsideEvent);
            };
        }
    }, [
        event, isOpen, isTriggered, triggerElement,
        handleOutsideEvent, handleMouseEnter,
    ]);

    useEffect(() => {
        if (event === Trigger.CLICK) {
            triggerElement && triggerElement.addEventListener('click', handleClick);
            if (isTriggered && isOpen) {
                document.addEventListener('click', handleOutsideEvent);
            } else {
                document.removeEventListener('click', handleOutsideEvent);
            }
            return () => {
                triggerElement && triggerElement.removeEventListener('click', handleClick);
                document.removeEventListener('click', handleOutsideEvent);
            };
        }
    }, [
        event, isOpen, isTriggered, triggerElement,
        handleOutsideEvent, handleClick,
    ]);

    return (
        <div
            className={cn([className], { size , open: isOpen })}
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
            >
            <div
                ref={setArrowElement}
                className={cn('arrow-container')}
                style={styles.arrow}
            />
            <div
                ref={setArrowElement}
                className={cn('arrow-container', { shadow: true })}
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
    trigger: PropTypes.oneOf(Object.values(Trigger)),
    triggerElement: (props, propName, componentName, location) => {
        const prop = props[propName];
        if ((prop === undefined)) {
            return new Error(
                `The prop \`${propName}\` is marked as required in \`${componentName}\`, but its value is \`${prop}\`.`
            );
        }
        if (prop && prop.nodeType !== 1) {
            return new Error(
                `Invalid ${location} \`${propName}\` supplied to \`${componentName}\`, expected HTMLElement.`
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

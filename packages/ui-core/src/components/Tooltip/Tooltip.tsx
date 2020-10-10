import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { usePopper } from 'react-popper-next';
import cnCreate from 'utils/cnCreate';
import detectTouch from 'utils/detectTouch';
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
    triggerElement: React.ReactNode;
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
    const [popperReferenceElement, setReferenceElement] = useState<HTMLElement | null>(null);
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
    const { styles, attributes } = usePopper(popperReferenceElement, popperElement, options);

    const [isOpen, setIsOpen] = useState<IsOpenType>(isOpened);

    const handleOpenEvent = useCallback((e: MouseEvent): void => {
        if (!isOpen) {
            setIsOpen(true);
            onOpen && onOpen(e);
        }
    }, [isOpen, onOpen]);

    const handleCloseEvent = useCallback((e: MouseEvent): void => {
        if (isOpen) {
            setIsOpen(false);
            onClose && onClose(e);
        }
    }, [isOpen, onClose]);

    const handleOutsideEvent = useCallback((e: MouseEvent): void => {
        if (e.target instanceof Node && popperElement && !popperElement.contains(e.target)) {
            setIsOpen(false);
            onClose && onClose(e);
        }
        return;

    }, [isOpen, onClose]);

    useEffect(() => setIsOpen(isOpened), [isOpened]);

    useEffect(() => {
        if (isOpen) { document.addEventListener('click', handleOutsideEvent); }

        return () => {
            document.removeEventListener('click', handleOutsideEvent);
        };
    });

    const getHandlers = (): {} | undefined => {
        const event: TriggerType = IS_TOUCH_DEVICE ? 'click' : trigger;

        switch (event) {
            case 'click':
                return {
                    onClick: handleOpenEvent,
                };
            case 'hover': {
                return {
                    onMouseEnter: handleOpenEvent,
                    onMouseLeave: handleCloseEvent,
                };
            }
            default:
                return undefined;
        }
    };

    return (
        <span
            {...getHandlers()}
            className={cn([className], {size: size})}
            >
            <span
                ref={setReferenceElement}
                className={cn('trigger')}
            >
                {triggerElement}
            </span>
            <span
                className={cn('popper', {open: isOpen})}
                ref={setPopperElement}
                style={styles.popper}
                {...attributes.popper}
                >
                <span
                    ref={setArrowElement}
                    className={cn('arrow-container')}
                    style={styles.arrow}
                />
                <span className={cn('content')}>
                    {children}
                </span>
            </span>
        </span>
    );
};

Tooltip.propTypes = {
    placement: PropTypes.oneOf(Object.values(Placement)),
    size: PropTypes.oneOf(Object.values(Size)),
    trigger: PropTypes.oneOf(Object.values(Trigger)),
    triggerElement: PropTypes.node,
    isOpened: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
};

export default Tooltip;

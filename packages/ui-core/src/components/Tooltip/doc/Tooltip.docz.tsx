import * as React from 'react';
import { TriggerEvent } from '../Tooltip';
import { ISelectItem, SelectItemValueType } from 'components/Select/Select';

export const demoWrapperBlockStyles: React.CSSProperties = {
    display: 'grid',
    gap: '24px',
    gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
    justifyContent: 'center',
    padding: '50px',
};

export const DemoTooltipWithTriggerWrapper = ({ children }) => {
    const triggerElement = React.useRef<HTMLElement | null>(null);
    const boundaryElement = React.useRef<HTMLElement | null>(null);
    const [isTriggered, setIsTriggered] = React.useState<boolean>(false);
    const [triggerEvent, setTriggerEvent] = React.useState(TriggerEvent.CONTROLLED);

    const handleTriggerChange = React.useCallback(
        trigger => {
            if (!isTriggered) {
                setIsTriggered(true);
                setTriggerEvent(trigger);
            }
        },
        [isTriggered],
    );

    return children({
        triggerElement,
        triggerEvent,
        boundaryElement,
        handleTriggerChange,
    });
};

export const DemoControlledTooltipWrapper = ({ children, isOpen = false }) => {
    const [isOpened, setIsOpened] = React.useState<boolean>(isOpen);
    const handleToggle = () => setIsOpened(open => !open);
    const handleOpen = () => setIsOpened(true);
    const handleClose = () => setIsOpened(false);
    return children({
        isOpened,
        handleOpen,
        handleClose,
        handleToggle,
    });
};

export const triggerEvents: Array<ISelectItem<string>> = [
    {
        value: TriggerEvent.CONTROLLED,
        title: TriggerEvent.CONTROLLED,
    },
    {
        value: TriggerEvent.HOVER,
        title: TriggerEvent.HOVER,
    },
    {
        value: TriggerEvent.CLICK,
        title: TriggerEvent.CLICK,
    },
];

export const DemoSelectTriggerWrapper = ({ children }) => {
    const { value } = triggerEvents[0];
    const [currentValue, setCurrentValue] = React.useState<SelectItemValueType>(value);
    const handleSelect = (_e: React.SyntheticEvent<EventTarget>, data: ISelectItem<string>) => {
        setCurrentValue(data.value);
    };

    return children({
        onSelect: handleSelect,
        currentValue: currentValue,
    });
};

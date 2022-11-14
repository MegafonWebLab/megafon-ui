import * as React from 'react';
import { ISelectItem, SelectItemValueType } from 'components/Select/Select';
import { TriggerEvent } from '../Tooltip';

export const demoWrapperBlockStyles: React.CSSProperties = {
    display: 'grid',
    gap: '24px',
    gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 450px))',
    justifyContent: 'center',
    padding: '100px 50px',
};

export const demoWrapperWithScroll: React.CSSProperties = {
    position: 'relative',
    width: '400px',
    height: '200px',
    borderRadius: '10px',
    overflow: 'scroll',
    padding: '15px',
    overscrollBehavior: 'contain',
    backgroundColor: '#333333',
    color: 'grey',
};

export const demoWrapperWithScrollBig: React.CSSProperties = {
    ...demoWrapperWithScroll,
    width: '880px',
    height: '400px',
};

export const demoButtonContainer: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '15px',
    width: '300px',
    height: '300px',
    margin: '280px 700px',
    padding: '20px',
    textAlign: 'center',
    border: '1px dashed grey',
};

export const DemoTooltipWithTriggerWrapper = ({ children }) => {
    const triggerElement = React.useRef<HTMLElement | null>(null);
    const targetElement = React.useRef<HTMLElement | null>(null);
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
        targetElement,
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
        currentValue,
    });
};

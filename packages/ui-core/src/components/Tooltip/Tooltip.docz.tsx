import * as React from 'react';
import { Trigger } from './Tooltip';
import { ISelectItem, SelectItemValueType } from '..//Select/Select';

export const wrapperBlockStyles: React.CSSProperties = {
    display: 'grid',
    gap: '24px',
    gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
    justifyContent: 'center',
    padding: '50px',
};

export const wrapperTooltipStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

export const DemoBlockWrapper = (
    props: {
        customStyles: React.CSSProperties;
        children: React.ReactNode;
    }
) => {
    const { customStyles, children } = props;
    return (
        <div style={{
            ...wrapperBlockStyles,
            ...customStyles,
        }}>
            {children}
        </div>
    );
};

export const DemoTooltipWrapper = (
    props: {
        customStyles: React.CSSProperties;
        children: React.ReactNode;
    }
) => {
    const { customStyles, children } = props;
    return (
        <div style={{
            ...wrapperTooltipStyles,
            ...customStyles,
        }}>
            {children}
        </div>
    );
};

export const DemoTooltipWrapperWithTrigger = ({children}) => {
    const [ triggerElement, setTriggerElement ] = React.useState<Element | null>(null);
    const [ isTriggered, setIsTriggered ] = React.useState<boolean>(false);
    const [ triggerType, setTriggerType] = React.useState(Trigger.CONTROLLED);

    const handleTriggerChange = React.useCallback((trigger) => {
        if (!isTriggered) {
            setIsTriggered(true);
            setTriggerType(trigger);
        }
    }, [isTriggered]);

    return children({
        setTriggerElement,
        triggerElement,
        handleTriggerChange,
        triggerType,
    });
};

export const ControlledWrapper = ({ children, isOpen = false }) => {
    const [ isOpened, setIsOpened ] = React.useState(isOpen);
    const handleToggle = () => setIsOpened(open => !open);
    const handleOpen = () => setIsOpened(true);
    const handleClose = () => setIsOpened(false);
    return (
        children({
            isOpened,
            handleOpen,
            handleClose,
            handleToggle,
        })
    );
};

export const triggerTypes: ISelectItem[] = [
    {
        value: Trigger.CONTROLLED,
        title: Trigger.CONTROLLED,
    },
    {
        value: Trigger.HOVER,
        title: Trigger.HOVER,
    },
    {
        value: Trigger.CLICK,
        title: Trigger.CLICK,
    },
];

export const DemoSelectTriggerWrapper = ({children}) => {
    const { value } = triggerTypes[0];
    const [currentValue, setCurrentValue] = React.useState<SelectItemValueType>(value);
    const handleSelect = (_e: React.SyntheticEvent<EventTarget>, data: ISelectItem) => {
        setCurrentValue(data.value);
    };

    return (
        children({
            onSelect: handleSelect,
            currentValue: currentValue,
        })
    );
};

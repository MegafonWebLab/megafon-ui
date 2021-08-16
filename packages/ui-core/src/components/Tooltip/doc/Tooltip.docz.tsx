/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import * as React from 'react';
import { TriggerEvent } from '../Tooltip';

export const demoWrapperBlockStyles: React.CSSProperties = {
    display: 'grid',
    gap: '24px',
    gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
    justifyContent: 'center',
    padding: '50px',
};

export const DemoTooltipWithTriggerWrapper = ({ children }: Record<string, (props) => JSX.Element>): JSX.Element => {
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

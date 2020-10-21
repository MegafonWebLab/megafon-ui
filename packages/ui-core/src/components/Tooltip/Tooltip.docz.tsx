import * as React from 'react';

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
    return children({
        setTriggerElement,
        triggerElement,
    });
};

export const OpenStateWrapper = ({ children, isOpen = false }) => {
    const [ isOpened, setIsOpened ] = React.useState(isOpen);
    const handleOpen = () => setIsOpened(true);
    const handleClose = () => setIsOpened(false);
    return (
        children({
            isOpened,
            handleOpen,
            handleClose,
        })
    );
};

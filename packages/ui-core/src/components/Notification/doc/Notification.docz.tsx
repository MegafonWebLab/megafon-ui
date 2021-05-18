import React, { useState } from 'react';

export const wrapperStyle = {
    display: 'grid',
    gap: '20px',
    gridTemplateColumns: 'repeat(auto-fit,minmax(49%, 1fr))',
    justifyContent: 'center',
    padding: '20px',
};

interface IDemoNotificationWrapperProps {
    children: (prop: {
        onClose?: () => void;
        onLinkClick?: () => void;
        initialCloseClickAmount: number;
        initialLinkClickAmount: number;
    }) => JSX.Element;
    initialCloseClickAmount: number;
    initialLinkClickAmount: number;
}

export const DemoNotificationWrapper: React.FC<IDemoNotificationWrapperProps> = ( {
    initialCloseClickAmount = 0,
    initialLinkClickAmount = 0,
    children,
} ) => {
    const [closeClickAmount, setCloseClickAmount] = useState(initialCloseClickAmount);
    const [linkClickAmount, setLinkClickAmount] = useState(initialLinkClickAmount);

    return (
        <div>
            {children({
                onLinkClick: () => setLinkClickAmount(linkClickAmount + 1),
                onClose: () => setCloseClickAmount(closeClickAmount + 1),
                initialLinkClickAmount: linkClickAmount,
                initialCloseClickAmount: closeClickAmount,
            })}
        </div>
    );
};

import React, { useState } from 'react';

export const wrapperStyle = {
    display: 'grid',
    gap: '20px',
    gridTemplateColumns: 'repeat(auto-fit,minmax(49%, 1fr))',
    justifyContent: 'center',
    padding: '20px',
    alignItems: 'start',
};

interface IDemoNotificationWrapperProps {
    children: (prop: {
        onClose?: () => void;
        onLinkClick?: () => void;
        initialClickAmount: number;
    }) => JSX.Element;
    initialClickAmount: number;
}

export const DemoNotificationWrapper: React.FC<IDemoNotificationWrapperProps> = ({
    initialClickAmount = 0,
    children,
}) => {
    const [clickAmount, setClickAmount] = useState(initialClickAmount);

    return children({
        onLinkClick: () => setClickAmount(clickAmount + 1),
        onClose: () => setClickAmount(clickAmount + 1),
        initialClickAmount: clickAmount,
    });
};

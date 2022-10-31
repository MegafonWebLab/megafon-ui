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
        onClose: () => void;
        onLinkClick: () => void;
        onButtonClick: () => void;
        onWrapperButtonClick: () => void;
        onCollapseButtonClick: (value: boolean) => void;
        initialClickAmount: number;
        isCollapseOpen: boolean;
    }) => JSX.Element;
    initialClickAmount?: number;
    initialButtonClickAmount?: number;
}

export const DemoNotificationWrapper: React.FC<IDemoNotificationWrapperProps> = ({
    initialClickAmount = 0,
    children,
}) => {
    const [clickAmount, setClickAmount] = useState(initialClickAmount);
    const [isCollapseOpen, setIsCollapseOpen] = useState(true);

    return children({
        onCollapseButtonClick: (value: boolean) => setIsCollapseOpen(value),
        onWrapperButtonClick: () => setIsCollapseOpen(!isCollapseOpen),
        onButtonClick: () => setClickAmount(clickAmount + 1),
        onLinkClick: () => setClickAmount(clickAmount + 1),
        onClose: () => setClickAmount(clickAmount + 1),
        initialClickAmount: clickAmount,
        isCollapseOpen,
    });
};

export const fontText = 'Текст с <font color="#731982">изменённым цветом</font> текста';
export const hrefText = '<a href="https://moscow.megafon.ru">Ссылка</a>';

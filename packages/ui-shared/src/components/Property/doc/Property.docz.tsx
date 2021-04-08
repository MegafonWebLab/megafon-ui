import React from 'react';
import { convert, TextLink } from '@megafon/ui-core';
import './DemoWrapper.less';

export const valueInSeveralRow =
    `до 100 Гб
    и до 1200 минут
`;

export const DemoWrapper = ({ children }) => <div className="demo-wrapper">{children}</div>;

const convertConfig = {
    a: {
        component: TextLink,
        props: ['href'],
    },
};

export const titleWithLink = convert(
    'Тарифы <a href="https://moscow.megafon.ru">Включайся!</a>, с которыми работает опция',
    convertConfig
);
export const textWithLink = convert(
    '<a href="https://moscow.megafon.ru">Выбирай, Смотри, Слушай, Говори, Общайся</a>',
    convertConfig
);

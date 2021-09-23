import React from 'react';
import { TextLink, Paragraph } from '@megafon/ui-core';
import { convert } from '@megafon/ui-helpers';

export const valueInSeveralRow = `до 100 Гб
    и до 1200 минут
`;

const convertConfig = {
    a: {
        component: TextLink,
        props: ['href'],
    },
    p: {
        component: Paragraph,
        props: ['size', 'hasMargin'],
    },
};

export const titleWithLink = convert(
    'Тарифы <a href="https://moscow.megafon.ru">Включайся!</a>, с которыми работает опция',
    convertConfig,
);

export const textWithLink = convert(
    '<a href="https://moscow.megafon.ru">Выбирай, Смотри, Слушай, Говори, Общайся</a>',
    convertConfig,
);

export const textWithParagraph = convert(
    '<p hasMargin="false">Почта</p><p size="small">Mail.ru, Яндекс.Почта, Gmail</p><p hasMargin="false">Мессенджеры</p><p size="small">WhatsApp, Viber, Facebook Messenger, Snapchat, eMotion, ТамТам</p>',
    convertConfig,
);

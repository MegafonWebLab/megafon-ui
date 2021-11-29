import * as React from 'react';
import WiFi from '@megafon/ui-icons/basic-32-wi-fi_32.svg';
import img from './img.png';
import imgShort from './img_short.png';

const title = 'Смартфоны Huawei с дополнительной скидкой до 3000 ₽ и подарок — до 1000 ₽ на связь';
const text =
    'Сдайте старое оборудование в трейд‑ин и получите дополнительную скидку до 3000 ₽ на смартфоны Huawei и до 1000 ₽ на связь в подарок.';

const button = {
    title: 'Подробнее',
    href: '#',
    target: '_self',
};

const buttonWithLongTitle = {
    title: 'Очень длинный заголовок',
    href: '#',
    target: '_blank',
};

const fakeLink = {
    title: 'Подключить',
};

const link = {
    ...fakeLink,
    href: '#',
};

const svg = <WiFi style={{ display: 'block', fill: '#00B956' }} />;

export { title, text, button, link, fakeLink, img, imgShort, svg, buttonWithLongTitle };

import * as React from 'react';
import WiFi from '@megafon/ui-icons/basic-32-wi-fi_32.svg';
import img from './img.png';
import imgShort from './img_short.png';

const title = 'Смартфоны Huawei с дополнительной скидкой до 3000 ₽ и подарок — до 1000 ₽ на связь';
const text =
    'Сдайте старое оборудование в трейд‑ин и получите дополнительную скидку до 3000 ₽ на смартфоны Huawei и до 1000 ₽ на связь в подарок.';

const htmlTitle =
    'Скачивайте&nbspмобильное приложение <font color="#731982">МегаФон</font><br>по <a href="https://moscow.megafon.ru">ссылке</a>';
const htmlText =
    'Сдайте старое<br>оборудование в <font color="#731982">трейд‑ин</font> и получите <b>дополнительную</b> скидку до 3000&nbsp₽ на <a href="https://moscow.megafon.ru">смартфоны Huawei</a> и до 1000 ₽ на связь в подарок.';

const button = {
    title: 'Подробнее',
    href: '#',
    target: '_self',
};

const buttonWithClick = {
    title: 'Подключить',
    // eslint-disable-next-line no-alert
    onClick: (): void => alert('Выполнено действие при клике на кнопку'),
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

export {
    title,
    text,
    htmlTitle,
    htmlText,
    button,
    link,
    fakeLink,
    img,
    imgShort,
    svg,
    buttonWithClick,
    buttonWithLongTitle,
};

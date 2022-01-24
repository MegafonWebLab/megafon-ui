import * as React from 'react';
import Heart from '@megafon/ui-icons/basic-16-heart_16.svg';
import Like from '@megafon/ui-icons/basic-16-like_16.svg';
import Star from '@megafon/ui-icons/basic-16-promo_16.svg';

export const items = [
    {
        text: 'Привлечение новых клиентов и повышение лояльности действующих',
        icon: <Heart style={{ fill: '#00B956' }} />,
    },
    {
        text: 'Специальные предложения для ваших клиентов',
        icon: <Star style={{ fill: '#00B956' }} />,
    },
    {
        text: 'Понятная и простая реализация партнерства',
        icon: <Like style={{ fill: '#00B956' }} />,
    },
];

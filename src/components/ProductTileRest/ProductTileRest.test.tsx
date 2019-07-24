import * as React from 'react';
import { shallow } from 'enzyme';
import ProductTileRest from './ProductTileRest';
import MegafonTv from 'icons/Service-logos/24/MF-TV.svg';
import { IProductTileRestProps } from './ProductTileRest';

const tariff: Partial<IProductTileRestProps> = {
    showMoreLink: false,
    buyButtonText: 'Купить',
    showBuyButton: true,
    connectLink: '123123',
    connectButtonText: 'Подключиться',
    showConnectButton: false,
    title: 'Включайся! Смотри',
    'moreLinkText': 'more link',
    'description': 'asdasdasd',
    'shopTag': '123',
    'link': '/tariffs/vklyuchaysya/smotri.html',
    'buyLink': '/zakaz/?tariff=look',
    'payment': {
        'value': '1000',
        'unitExtra': 'за 30 дней',
        'unitValue': '₽',
        'unit': '₽ за 30 дней',
        'discount': '0',
    },
    'packs': [
        {
            'value': 1500,
            'unit': 'минут',
            'title': 'title',
            'isDelim': true,
        },
        {
            'value': 100,
            'unit': 'смс',
            'title': 'title',
            'isDelim': true,
        },
        {
            'value': 3,
            'unit': 'ГБ',
            'title': 'title',
            'isDelim': false,
        },
    ],
    'firstParams': {
        'title': 'Параметры',
        'caption': '',
        'items': [
            {
                'title': 'VIP-тариф',
                'caption': 'Привилегии обслуживания и другое',
                'svgIcon': <MegafonTv />,
            },
            {
                'title': 'МегаФон ТВ',
                'caption': 'Безлимитный трафик и пакеты кино, сериалов и ТВ-каналов на любой вкус',
                'svgIcon': <MegafonTv />,
            },
        ],
    },
    'secondParams': [
        {
            'title': 'Кэшбэк 20%',
            'footnote': 'Участвуйте в программе и тратьте кэшбэк',
            'value': '0',
            'unit': '',
            'svgIcon': <MegafonTv />,
        },
        {
            'title': 'Безлимитные SMS',
            'footnote': '',
            'value': '55',
            'unit': '₽ за 30 дней',
            'svgIcon': <MegafonTv />,
        },
    ],
    'info': {
        'billingIds': [],
        'sms': '05007897',
        'smsText': 'ДА',
        'smsSite': null,
        'ivr': '05007897',
        'ussd': '<span class=\'c-number-call\'>sdfsdf</span>',
        'lkLink': 'https://lk.megafon.ru/tariffs/',
        'title': 'Включайся! Смотри',
        'id': 1598,
    },
};

describe('<Product >', () => {
    it('should render', () => {
        const wrapper = shallow(
            <ProductTileRest {...tariff}/>
            );

        expect(wrapper).toMatchSnapshot();
    });
});

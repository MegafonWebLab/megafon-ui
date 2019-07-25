import * as React from 'react';
import { shallow } from 'enzyme';
import ProductTile from './ProductTile';
import MegafonTv from 'icons/Service-logos/24/MF-TV.svg';
import {Component} from 'react';

const tariff = {
    buyButtonText: 'sdfsdf',
    connectButtonText: 'sdfsdf',
    secondParamsHead: 'sdfsdf',
    showConnectButton: true,
    'title': 'Включайся! Смотри',
    'topBadgeTitle': 'sdfsdf',
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
    'cashback': {
        'title': 'Кэшбэк',
        'value': 20,
        'unit': '%',
    },
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

const servicePacks = [
    {
        'buyLink': '&options=null',
        'calls': {
            'value': 300,
            'unit': 'минут',
        },
        'traffic': {
            'value': 6,
            'unit': 'ГБ',
        },
        'payment': {
            'value': '450',
            'unitExtra': 'за 30 дней',
            'unitValue': '₽',
            'discount': '0',
        },
        'options': [
            {
                'title': 'Безлимитные SMS',
                'value': '55',
                'unit': '₽ за 30 дней',
                'footnote': '',
                'svgIcon': <MegafonTv />,
            },
            {
                'title': 'Кэшбэк 20%',
                'value': '0',
                'unit': '',
                'footnote': 'Участвуйте в программе и тратьте кэшбэк ',
                'svgIcon': <MegafonTv />,
            },
        ],
    },
    {
        'buyLink': '&options=null',
        'calls': {
            'value': 600,
            'unit': 'минут',
        },
        'traffic': {
            'value': 18,
            'unit': 'ГБ',
        },
        'payment': {
            'value': '600',
            'unitExtra': 'за 30 дней',
            'unitValue': '₽',
            'discount': '0',
        },
        'options': [
            {
                'title': 'Безлимитные SMS',
                'value': '55',
                'unit': '₽ за 30 дней',
                'footnote': '',
                'svgIcon': <MegafonTv />,
            },
            {
                'title': 'Кэшбэк 20%',
                'value': '0',
                'unit': '',
                'footnote': 'Участвуйте в программе и тратьте кэшбэк ',
                'svgIcon': <MegafonTv />,
            },
        ],
    },
    {
        'buyLink': '&options=null',
        'calls': {
            'value': 750,
            'unit': 'минут',
        },
        'traffic': {
            'value': 18,
            'unit': 'ГБ',
        },
        'payment': {
            'value': '750',
            'unitExtra': 'за 30 дней',
            'unitValue': '₽',
            'discount': '0',
        },
        'options': [
            {
                'title': 'Безлимитные SMS',
                'value': '55',
                'unit': '₽ за 30 дней',
                'footnote': '',
                'svgIcon': <MegafonTv />,
            },
            {
                'title': 'Кэшбэк 20%',
                'value': '0',
                'unit': '',
                'footnote': 'Участвуйте в программе и тратьте кэшбэк ',
                'svgIcon': <MegafonTv />,
            },
        ],
    },
];

describe('<ProductTile />', () => {
    it('it renders ProductTile', () => {
        const wrapper = shallow(
            <ProductTile
                isActive={false}
                {...tariff}
                servicePacks={servicePacks}
                startCallsIndex={2}
                startTrafficIndex={1}
            />
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('should call onClickChoose when onClickBuy fired', () => {
        const clickChooseHandler  = jest.fn();
        const clickBuyHandler  = jest.fn();
        const wrapper = shallow<Component>(
            <ProductTile
                isActive={false}
                {...tariff}
                servicePacks={servicePacks}
                startCallsIndex={2}
                startTrafficIndex={1}
                onClickBuy={clickBuyHandler}
                onClickChoose={clickChooseHandler}
            />
        );
        const instance = wrapper.instance() as any;

        instance.handleClickBuy = jest.spyOn(instance, 'handleClickBuy');
        instance.forceUpdate();
        instance.handleClickBuy();

        expect(clickBuyHandler).toBeCalled();
        expect(clickChooseHandler).toBeCalled();
    });
});

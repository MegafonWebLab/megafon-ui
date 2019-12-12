import * as React from 'react';
import { shallow } from 'enzyme';
import ProductTile, { IProductTileProps, IServicePack } from './ProductTile';
import MegafonTv from 'icons/Service-logos/24/MF-TV.svg';

const tariff: IProductTileProps = {
    buyButtonText: 'sdfsdf',
    connectButtonText: 'sdfsdf',
    secondParamsHead: 'sdfsdf',
    showConnectButton: true,
    title: 'Включайся! Смотри',
    topBadgeTitle: 'sdfsdf',
    link: '/tariffs/vklyuchaysya/smotri.html',
    buyLink: '/zakaz/?tariff=look',
    payment: {
        value: '1000',
        unitExtra: 'за 30 дней',
        unitValue: '₽',
        discount: '0',
    },
    packs: [
        {
            value: 1500,
            unit: 'минут',
            title: 'title',
            isDelim: true,
        },
        {
            value: 100,
            unit: 'смс',
            title: 'title',
            isDelim: true,
        },
        {
            value: 3,
            unit: 'ГБ',
            title: 'title',
            isDelim: false,
        },
    ],
    firstParams: {
        items: [
            {
                title: 'VIP-тариф',
                caption: 'Привилегии обслуживания и другое',
                svgIcon: <MegafonTv />,
            },
            {
                title: 'МегаФон ТВ',
                caption:
                    'Безлимитный трафик и пакеты кино, сериалов и ТВ-каналов на любой вкус',
                svgIcon: <MegafonTv />,
            },
        ],
    },
    secondParams: [
        {
            title: 'Кэшбэк 20%',
            footnote: 'Участвуйте в программе и тратьте кэшбэк',
            value: '0',
            unit: '',
            svgIcon: <MegafonTv />,
        },
        {
            title: 'Безлимитные SMS',
            footnote: '',
            value: '55',
            unit: '₽ за 30 дней',
            svgIcon: <MegafonTv />,
        },
    ],
    cashback: {
        title: 'Кэшбэк',
        value: 20,
        unit: '%',
    },
    info: {
        billingIds: [],
        sms: '05007897',
        smsText: 'ДА',
        smsSite: null,
        ivr: '05007897',
        ussd: '<span class="c-number-call">sdfsdf</span>',
        lkLink: 'https://lk.megafon.ru/tariffs/',
        title: 'Включайся! Смотри',
        id: 1598,
    },
};

const servicePacks: Array<Partial<IServicePack>> = [
    {
        buyLink: '&options=null',
        shopTag: 'tag1',
        calls: {
            value: 300,
            unit: 'минут',
        },
        traffic: {
            value: 6,
            unit: 'ГБ',
        },
        payment: {
            value: '400',
            discount: '200',
        },
        options: [
            {
                title: 'Безлимитные SMS',
                value: '55',
                unit: '₽ за 30 дней',
                footnote: '',
                svgIcon: <MegafonTv />,
            },
            {
                title: 'Кэшбэк 20%',
                value: '0',
                unit: '',
                footnote:
                    'Участвуйте в программе и трпки в салонах и интернет-магазине МегаФона',
                svgIcon: <MegafonTv />,
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
            'discount': '0',
        },
        'options': [
            {
                'title': 'Безлимитные SMS',
                'value': '55',
                'unit': '₽ за 30 дней',
                'footnote': '',
                'svgIcon': <MegafonTv />,
            },
            {
                'title': 'Кэшбэк 20%',
                'value': '0',
                'unit': '',
                'footnote': 'Участвуйте в программе и тратьте кэшбэк ',
                'svgIcon': <MegafonTv />,
            },
        ],
    },
    {
        buyLink: '&options=null',
        shopTag: 'tag2',
        calls: {
            value: 650,
            unit: 'минут',
        },
        traffic: {
            value: 6,
            unit: 'ГБ',
        },
        payment: {
            value: '590',
            discount: '300',
        },
        options: [
            {
                title: 'Безлимитные SMS',
                value: '55',
                unit: '₽ за 30 дней',
                footnote: '',
                svgIcon: <MegafonTv />,
            },
            {
                title: 'Кэшбэк 20%',
                value: '0',
                unit: '',
                footnote:
                    'Участвуйте тратьте кэшбэк на сервисы и покупки в салонах и магазине МегаФона',
                svgIcon: <MegafonTv />,
            },
        ],
    },
    {
        buyLink: '&options=null',
        shopTag: 'tag3',
        calls: {
            value: 300,
            unit: 'минут',
        },
        traffic: {
            value: 18,
            unit: 'ГБ',
        },
        payment: {
            value: '590',
            discount: '',
        },
        options: [
            {
                title: 'Безлимитные SMS',
                value: '55',
                unit: '₽ за 30 дней',
                footnote: '',
                svgIcon: <MegafonTv />,
            },
            {
                title: 'Кэшбэк 20%',
                value: '0',
                unit: '',
                footnote:
                    'Участвуйте в купки в салонах и интернет-магазине МегаФона',
                svgIcon: <MegafonTv />,
            },
        ],
    },
    {
        buyLink: '&options=null',
        calls: {
            value: 750,
            unit: 'минут',
        },
        traffic: {
            value: 6,
            unit: 'ГБ',
        },
        payment: {
            value: '670',
            discount: '',
        },
        options: [
            {
                title: 'Безлимитные SMS',
                value: '55',
                unit: '₽ за 30 дней',
                footnote: '',
                svgIcon: <MegafonTv />,
            },
            {
                title: 'Кэшбэк 20%',
                value: '0',
                unit: '',
                footnote: 'Укупки в салонах и интернет-магазине МегаФона',
                svgIcon: <MegafonTv />,
            },
        ],
    },
    {
        buyLink: '&options=null',
        calls: {
            value: 900,
            unit: 'минут',
        },
        traffic: {
            value: 28,
            unit: 'ГБ',
        },
        payment: {
            value: '770',
            discount: '',
        },
        options: [
            {
                title: 'Безлимитные SMS',
                value: '55',
                unit: '₽ за 30 дней',
                footnote: '',
                svgIcon: <MegafonTv />,
            },
            {
                title: 'Кэшбэк 20%',
                value: '0',
                unit: '',
                footnote: 'Участвуки в салонах и интернет-магазине МегаФона',
                svgIcon: <MegafonTv />,
            },
        ],
    },
];

const target = {
    target: {},
} as React.SyntheticEvent<EventTarget>;

describe('<ProductTile />', () => {
    describe('snapshots', () => {
        it('should render ProductTile', () => {
            const wrapper = shallow(
                <ProductTile
                    {...tariff}
                    servicePacks={servicePacks}
                    startCallsIndex={2}
                    startTrafficIndex={1}
                />
            );
            expect(wrapper).toMatchSnapshot();
        });

        it('should render ProductTile with cookies', () => {
            const wrapper = shallow(
                <ProductTile
                    {...tariff}
                    servicePacks={servicePacks}
                    startCallsIndex={2}
                    startTrafficIndex={1}
                    cookieCallsIndex={4}
                    cookieTrafficIndex={2}
                />
            );
            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('onCallsChange tests', () => {
        it('should call onCallsChange when handleChangeCalls fired and set state.callsIndex', () => {
            const positionIndex = 2;
            const [ pack ] = servicePacks;
            const onCallsChange = jest.fn();
            const wrapper = shallow<ProductTile>(
                <ProductTile
                    {...tariff}
                    servicePacks={servicePacks}
                    startCallsIndex={2}
                    startTrafficIndex={1}
                    onCallsChange={onCallsChange}
                />
            );

            wrapper.instance().handleChangeCalls(target, pack.calls!.value.toString(), positionIndex);
            expect(onCallsChange).toBeCalledWith(positionIndex);
            expect(wrapper.state('callsIndex')).toBe(positionIndex);
        });

        it('shouldn\'t call onCallsChange when handleChangeCalls return false', () => {
            const [ , pack ] = servicePacks;
            const onTrafficChange = jest.fn();
            const wrapper = shallow<ProductTile>(
                <ProductTile
                    {...tariff}
                    servicePacks={servicePacks}
                    startCallsIndex={2}
                    startTrafficIndex={1}
                    onTrafficChange={onTrafficChange}
                />
            );

            wrapper.instance().handleChangeTraffic(target, pack.calls!.value.toString(), 2);
            expect(onTrafficChange).not.toBeCalled();
        });
    });

    describe('onTrafficChange tests', () => {
        it('should call onTrafficChange when handleChangeTraffic fired and set state.trafficIndex', () => {
            const positionIndex = 2;
            const [ pack ] = servicePacks;
            const onTrafficChange = jest.fn();
            const wrapper = shallow<ProductTile>(
                <ProductTile
                    {...tariff}
                    servicePacks={servicePacks}
                    startCallsIndex={2}
                    startTrafficIndex={1}
                    onTrafficChange={onTrafficChange}
                />
            );

            wrapper.instance().handleChangeTraffic(target, pack.traffic!.value.toString(), positionIndex);
            expect(onTrafficChange).toBeCalledWith(positionIndex);
            expect(wrapper.state('trafficIndex')).toBe(positionIndex);
        });

        it('shouldn\'t call onTrafficChange when handleChangeTraffic return false', () => {
            const [ , pack ] = servicePacks;
            const onTrafficChange = jest.fn();
            const wrapper = shallow<ProductTile>(
                <ProductTile
                    {...tariff}
                    servicePacks={servicePacks}
                    startCallsIndex={2}
                    startTrafficIndex={1}
                    onTrafficChange={onTrafficChange}
                />
            );

            wrapper.instance().handleChangeTraffic(target, pack.traffic!.value.toString(), 2);
            expect(onTrafficChange).not.toBeCalled();
        });
    });
});

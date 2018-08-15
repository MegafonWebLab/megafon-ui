import * as React from 'react';
import { shallow } from 'enzyme';
import MainTile from './MainTile';
import Checked from 'icons/checked_24.svg';

const props = {
    plan: {
        id: 1408,
        title: 'Включайся! Пиши',
        shop_id: 96856,
        shopTag: 'write',
        badges: [],
        description: 'test',
        groups: [14],
        icon: 'icon-tariffs-megaicons-288',
        descriptionIcon: <Checked />,
        socialIcons: [
            {
                svgIcon: <Checked />,
                code: 'vk',
                title: 'Vkontakte',
            }, {
                svgIcon: <Checked />,
                code: 'instagram',
                title: 'Instagram',
            },
        ],
        link: '/tariffs/vklyuchaysya/pishi.html',
        details: {
            additional_params: [
                {
                    param: 'minute_pack',
                    value: '300',
                    unit: 'минут',
                    footnote: '',
                    title: 'Звонки на все номера России',
                    children: false,
                    weight: '100',
                    caption: '',
                    unitValue: 'минут',
                    unitExtra: '',
                    valueIcon: '',
                    is_delim: false,
                }, {
                    param: 'sms_pack',
                    value: '300',
                    unit: 'SMS',
                    footnote: '',
                    title: 'SMS на номера Домашнего региона',
                    children: false,
                    weight: '200',
                    caption: '',
                    unitValue: 'SMS',
                    unitExtra: '',
                    valueIcon: '',
                    is_delim: false,
                }, {
                    param: 'traffic_pack_tariff',
                    value: '4',
                    unit: 'ГБ',
                    footnote: '',
                    title: 'На любые сервисы',
                    children: false,
                    weight: '700',
                    caption: '',
                    unitValue: 'ГБ',
                    unitExtra: '',
                    valueIcon: '',
                    is_delim: false,
                },
            ],
            payment: {
                param: 'week_payment',
                value: '299',
                unit: '₽ в неделю',
                footnote: '',
                title: 'Абонентская плата (неделя)',
                children: false,
                weight: '800',
                caption: '',
                unitValue: '₽',
                unitExtra: 'в неделю',
                valueIcon: '',
                is_delim: false,
            },
            showcase_params: [
                {
                    param: 'int_mess_new',
                    value: '',
                    unit: '',
                    footnote: '',
                    title: 'Безлимитный интернет на мессенджеры',
                    children: [
                        {
                            param: 'unlim_internet',
                            value: '',
                            unit: '',
                            footnote: '',
                            title: 'Безлимитный интернет',
                            children: false,
                            weight: '400',
                            caption: 'на мессенджеры',
                            unitValue: '',
                            unitExtra: '',
                            valueIcon: '',
                            is_delim: false,
                        },
                    ],
                    weight: '300',
                    caption: '',
                    unitValue: '',
                    unitExtra: '',
                    valueIcon: '',
                    is_delim: false,
                }, {
                    param: 'antivirus',
                    value: 'Бесплатно',
                    unit: '',
                    footnote: '',
                    title: 'Антивирус ESET NOD32',
                    children: [
                        {
                            param: 'eset',
                            value: 'Бесплатно',
                            unit: '',
                            footnote: '',
                            title: 'ESET NOD32',
                            children: false,
                            weight: '600',
                            svgIcon: <Checked />,
                            caption: 'Антивирус с функцией «Антивор»',
                            unitValue: '',
                            unitExtra: '',
                            valueIcon: '',
                            is_delim: false,
                        },
                    ],
                    weight: '500',
                    svgIcon: <Checked />,
                    caption: '',
                    unitValue: '',
                    unitExtra: '',
                    valueIcon: '',
                    is_delim: false,
                },
            ],
        },
    },
};
const buttonSelector = '.main-tariff-tile__total-button';
describe('<MainTile />', () => {
    it('it renders MainTile', () => {
        const wrapper = shallow(<MainTile {...props} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('it renders recomented', () => {
        const wrapper = shallow(<MainTile {...props} recommended={true} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('it handle click nothing to change', () => {
        const wrapper = shallow(<MainTile {...props} />);
        wrapper.simulate('click', { target: { tagName: 'A' } });
        expect(wrapper).toMatchSnapshot();
    });

    it('it calls handle submit', () => {
        const handleSubmit = jest.fn();
        const wrapper = shallow(<MainTile {...props} handleSubmit={handleSubmit} />);
        wrapper.find(buttonSelector).simulate('click');
        expect(handleSubmit.mock.calls).toHaveLength(1);
    });

    it('it calls handle submit main tarif', () => {
        const handleSubmit = jest.fn();
        const wrapper = shallow(<MainTile {...props} handleSubmit={handleSubmit} main={true} />);
        wrapper.find(buttonSelector).simulate('click');
        expect(handleSubmit.mock.calls).toHaveLength(1);
    });

    it('it renders witho badges', () => {
        const propsBadges = {
            ...props,
            plan: {
                ...props.plan,
                badges: [{
                    title: 'badge',
                    code: 'badge',
                    hint: 'badge',
                },
                {
                    title: 'badge',
                    code: 'badge',
                }],
            },
        };
        const wrapper = shallow(<MainTile {...propsBadges} />);
        wrapper.simulate('click', { target: { tagName: 'A' } });
        expect(wrapper).toMatchSnapshot();
    });
});

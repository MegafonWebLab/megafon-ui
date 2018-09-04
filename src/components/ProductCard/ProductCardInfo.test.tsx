import * as React from 'react';
import { shallow } from 'enzyme';
import ProductCardInfo from './ProductCardInfo';
import Checked from 'icons/checked_24.svg';

const props = {
    title: 'Включайся!',
    link: 'https://www.google.com/',
    description: 'Амедиатека',
    descriptionIcon: <Checked style={{ width: '40px', height: '40px' }} />,
    additionalParams: [
        {
            value: '300',
            unit: 'минут',
            title: 'Звонки на все номера России',
        }, {
            value: '300',
            unit: 'SMS',
            title: 'SMS на номера Домашнего региона',
        }, {
            value: '4',
            unit: 'ГБ',
            title: 'На любые сервисы',
        },
    ],
    badges: [{
        title: 'title',
        code: 'code',
        hint: 'hint',
    },
    {
        title: 'title',
        code: 'code',
    }],
};

describe('<ProductCardInfo />', () => {
    it('it renders ProductCardInfo', () => {
        const wrapper = shallow(<ProductCardInfo {...props}><div /></ProductCardInfo>);
        expect(wrapper).toMatchSnapshot();
    });
});

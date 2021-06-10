import React from 'react';
import { shallow } from 'enzyme';
import Breadcrumbs from './Breadcrumbs';
import Color from 'constants/colors';

const items = [
    {
        title: 'МегаФон',
        href: '#',
    },
    {
        title: 'Мобильная связь',
        href: '#',
    },
    {
        title: 'Тарифы',
        href: '#',
    },
];

describe('Breadcrumbs', () => {
    it('should render component', () => {
        const wrapper = shallow(<Breadcrumbs items={items} />);

        expect(wrapper).toMatchSnapshot();
    });

    it('should render with custom class name', () => {
        const wrapper = shallow(<Breadcrumbs items={items} className="custom-class-name" />);

        expect(wrapper).toMatchSnapshot();
    });

    it('should render with white text color', () => {
        const wrapper = shallow(<Breadcrumbs items={items} color={Color.CLEAR_WHITE} />);

        expect(wrapper).toMatchSnapshot();
    });
});

import React from 'react';
import { shallow } from 'enzyme';
import Breadcrumbs, { TextColor } from './Breadcrumbs';

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

    it('should render with optional props', () => {
        const wrapper = shallow(
            <Breadcrumbs
                items={items}
                className="custom-class-name"
                classes={{ item: 'item-custom-class-name' }}
                color={TextColor.WHITE}
            />,
        );

        expect(wrapper).toMatchSnapshot();
    });
});

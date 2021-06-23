import React from 'react';
import { shallow } from 'enzyme';
import PageTitle from './PageTitle';

const breadcrumbs = [
    {
        title: 'Тарифы',
        href: '#',
    },
    {
        title: 'Управляй !',
        href: '#',
    },
    {
        title: 'Менеджер',
        href: '#',
    },
];

const badge = 'badge';

describe('PageTitle', () => {
    it('should render component', () => {
        const wrapper = shallow(<PageTitle title="title" />);

        expect(wrapper).toMatchSnapshot();
    });

    it('should render with optional props', () => {
        const wrapper = shallow(<PageTitle title="title" breadcrumbs={breadcrumbs} badge={badge} />);

        expect(wrapper).toMatchSnapshot();
    });
});

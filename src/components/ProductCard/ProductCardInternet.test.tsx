import * as React from 'react';
import { shallow } from 'enzyme';
import ProductCardInternet from './ProductCardInternet';
import Checked from 'icons/checked_24.svg';

const props = {
    title: 'test',
    params: [
        {
            svgIcon: <Checked />,
            title: 'test',
            caption: 'test',
            value: 'test',
        },
    ],
    socialIcons: [{
        svgIcon: <Checked />,
        title: 'test',
    }],
};

describe('<ProductCardInternet />', () => {
    it('it renders ProductCardInternet', () => {
        const wrapper = shallow(<ProductCardInternet {...props} />);
        expect(wrapper).toMatchSnapshot();
    });
});

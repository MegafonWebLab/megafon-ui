import * as React from 'react';
import { shallow } from 'enzyme';
import ProductCardFree from './ProductCardFree';
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
};

describe('<ProductCardFree />', () => {
    it('it renders ProductCardFree', () => {
        const wrapper = shallow(<ProductCardFree {...props} />);
        expect(wrapper).toMatchSnapshot();
    });
});

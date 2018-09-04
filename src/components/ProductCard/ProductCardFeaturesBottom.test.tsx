import * as React from 'react';
import { shallow } from 'enzyme';
import ProductCardFeaturesBottom from './ProductCardFeaturesBottom';
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

describe('<ProductCardFeaturesBottom />', () => {
    it('it renders ProductCardFeaturesBottom', () => {
        const wrapper = shallow(<ProductCardFeaturesBottom {...props} />);
        expect(wrapper).toMatchSnapshot();
    });
});

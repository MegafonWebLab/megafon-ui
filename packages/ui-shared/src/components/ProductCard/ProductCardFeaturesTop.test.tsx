import * as React from 'react';
import { shallow } from 'enzyme';
import ProductCardFeaturesTop from './ProductCardFeaturesTop';
import Checked from 'icons/checked_24.svg';

const props = {
    title: 'test',
    caption: 'test',
    params: [
        {
            title: 'test',
            svgIcon: <Checked />,
        },
    ],
};

describe('<ProductCardFeaturesTop />', () => {
    it('it renders ProductCardFeaturesTop', () => {
        const wrapper = shallow(<ProductCardFeaturesTop {...props} />);
        expect(wrapper).toMatchSnapshot();
    });
});

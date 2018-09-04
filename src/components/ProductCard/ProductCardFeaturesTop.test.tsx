import * as React from 'react';
import { shallow } from 'enzyme';
import ProductCardFeaturesTop from './ProductCardFeaturesTop';
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

describe('<ProductCardFeaturesTop />', () => {
    it('it renders ProductCardFeaturesTop', () => {
        const wrapper = shallow(<ProductCardFeaturesTop {...props} />);
        expect(wrapper).toMatchSnapshot();
    });
});

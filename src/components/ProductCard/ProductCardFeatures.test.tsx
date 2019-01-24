import * as React from 'react';
import { shallow } from 'enzyme';
import ProductCardFeatures from './ProductCardFeatures';
import Checked from 'icons/System/24/Checked_24.svg';

const props = {
    firstParam: {
        title: 'Безлимитный интернет',
        caption: 'на мессенджеры',
        children: [{
            title: 'Безлимитный интернет',
            svgIcon: <Checked />,
        }],
    },
    secondParam: {
        title: 'Test',
        children: [{
            title: 'Youtube, Rutube, Vimeo',
            caption: 'на видео, соц-сети и мессенджеры',
            svgIcon: <Checked />,
        }],
    },
};

describe('<ProductCardFeatures />', () => {
    it('it renders ProductCardFeatures', () => {
        const wrapper = shallow(<ProductCardFeatures {...props} />);
        expect(wrapper).toMatchSnapshot();
    });
});

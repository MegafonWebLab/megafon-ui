import * as React from 'react';
import { shallow } from 'enzyme';
import ProductCardFeatures from './ProductCardFeatures';

const props = {
    firstParam: {
        title: 'Безлимитный интернет',
        value: 'на мессенджеры',
        children: [{
            title: 'Безлимитный интернет',
            caption: 'на видео, соц-сети и мессенджеры',
            value: 'test',
        }],
    },
    secondParam: {
        children: [{
            title: 'Youtube, Rutube, Vimeo',
        }],
    },
};

describe('<ProductCardFeatures />', () => {
    it('it renders ProductCardFeatures', () => {
        const wrapper = shallow(<ProductCardFeatures {...props} />);
        expect(wrapper).toMatchSnapshot();
    });
});

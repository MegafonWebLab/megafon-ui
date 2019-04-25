import * as React from 'react';
import { shallow } from 'enzyme';
import ProductTilePrice from './ProductTilePrice';

const props = {
    title: 'title',
    value: '23423',
    unitExtra: 'uniteExtra',
    unitValue: 'uniteValue',
};

describe('<ProductTilePrice />', () => {
    it('renders ProductTilePrice', () => {
        const wrapper = shallow(<ProductTilePrice {...props} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('renders ProductTilePrice with discount', () => {
        const wrapper = shallow(<ProductTilePrice {...props} discount="100" />);
        expect(wrapper).toMatchSnapshot();
    });
});

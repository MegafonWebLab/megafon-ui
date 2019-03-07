import * as React from 'react';
import { shallow } from 'enzyme';
import ProductTilePrice from './ProductTilePrice';

const props = {
    value: '23423',
    unitExtra: 'uniteExtra',
    unitValue: 'uniteValue',
    discount: '23423',
};

describe('<ProductTilePrice />', () => {
    it('it renders ProductTilePrice', () => {
        const wrapper = shallow(<ProductTilePrice {...props} />);
        expect(wrapper).toMatchSnapshot();
    });
});

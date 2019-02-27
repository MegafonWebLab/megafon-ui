import * as React from 'react';
import { shallow } from 'enzyme';
import ProductTileStatic from './ProductTileStatic';

const props = {
    packs: [{
        value: 2342,
        unit: 'unit',
    }],
};

describe('<ProductTileStatic />', () => {
    it('it renders ProductTileStatic', () => {
        const wrapper = shallow(<ProductTileStatic {...props} />);
        expect(wrapper).toMatchSnapshot();
    });
});

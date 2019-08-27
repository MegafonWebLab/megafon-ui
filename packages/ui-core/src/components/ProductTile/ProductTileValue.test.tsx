import * as React from 'react';
import { shallow } from 'enzyme';
import ProductTileValue from './ProductTileValue';

const props = {
    value: 'werwer',
};

describe('<ProductTileValue />', () => {
    it('it renders ProductTileValue', () => {
        const wrapper = shallow(<ProductTileValue {...props} hAlign="center" />);
        expect(wrapper).toMatchSnapshot();
    });
});

import * as React from 'react';
import { shallow } from 'enzyme';
import ProductTileHint from './ProductTileHint';

const props = {
    title: 'sdfsdf',
};

describe('<ProductTileHint />', () => {
    it('it renders ProductTileHint', () => {
        const wrapper = shallow(<ProductTileHint {...props} />);
        expect(wrapper).toMatchSnapshot();
    });
});

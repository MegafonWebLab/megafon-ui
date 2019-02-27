import * as React from 'react';
import { shallow } from 'enzyme';
import ProductTileHint from './ProductTileHint';

const porps = {
    title: 'sdfsdf',
};

describe('<ProductTileHint />', () => {
    it('it renders ProductTileHint', () => {
        const wrapper = shallow(<ProductTileHint {...porps} />);
        expect(wrapper).toMatchSnapshot();
    });
});

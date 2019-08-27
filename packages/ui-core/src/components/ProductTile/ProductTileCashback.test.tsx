import * as React from 'react';
import { shallow } from 'enzyme';
import ProductTileCashback from './ProductTileCashback';

const props = {
    title: 'title',
    value: 23,
    unit: 'unit',
};

describe('<ProductTileCashback />', () => {
    it('it renders ProductTileCashback', () => {
        const wrapper = shallow(<ProductTileCashback {...props} />);
        expect(wrapper).toMatchSnapshot();
    });
});

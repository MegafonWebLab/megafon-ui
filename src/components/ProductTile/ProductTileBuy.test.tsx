import * as React from 'react';
import { shallow } from 'enzyme';
import ProductTileBuy from './ProductTileBuy';

const props = {
    className: 'sdfsdf',
    href: '#',
    buyText: 'sdf',
    connectText: 'werwer',
};

describe('<ProductTileBuy />', () => {
    it('it renders ProductTileBuy', () => {
        const wrapper = shallow(<ProductTileBuy {...props} />);
        expect(wrapper).toMatchSnapshot();
    });
});

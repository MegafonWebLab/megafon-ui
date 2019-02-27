import * as React from 'react';
import { shallow } from 'enzyme';
import ProductSwitcher from './ProductSwitcher';

const props = {
    items: [{
        value: 'value',
        title: 'title',
    }],
    startIndex: 3,
    className: 'sdfsdf',
};

describe('<ProductSwitcher />', () => {
    it('it renders ProductSwitcher', () => {
        const wrapper = shallow(<ProductSwitcher {...props} theme="tariff-showcase" onChange={jest.fn()}/>);
        expect(wrapper).toMatchSnapshot();
    });
});

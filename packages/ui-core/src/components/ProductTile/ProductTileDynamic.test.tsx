import * as React from 'react';
import { shallow } from 'enzyme';
import ProductTileDynamic from './ProductTileDynamic';

const props = {
    currentPack: {
        calls: {
            value: 23423,
            unit: 'unit',
        },
        traffic: {
            value: 234234,
            unit: 'unit',
        },
    },
    switcher: {
        calls: ['344', '2323'],
        traffic: ['3', '2'],
    },
};

describe('<ProductTileDynamic />', () => {
    it('it renders ProductTileDynamic', () => {
        const wrapper = shallow(
            <ProductTileDynamic
                {...props}
                onChangeCalls={jest.fn()}
                onChangeTraffic={jest.fn()}
            />
        );
        expect(wrapper).toMatchSnapshot();
    });
});

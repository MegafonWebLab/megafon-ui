import * as React from 'react';
import { shallow } from 'enzyme';
import ProductCardTotal from './ProductCardTotal';

const props = {
    onClickConnect: () => { },
    payment: {
        value: '600 ₽',
        oldValue: '750 ₽',
        unit: 'в месяц',
    },
};

describe('<ProductCardTotal />', () => {
    it('it renders ProductCardTotal', () => {
        const wrapper = shallow(<ProductCardTotal {...props} />);
        expect(wrapper).toMatchSnapshot();
    });
});

describe('<ProductCardTotal />', () => {
    it('it handle handleSubmit prop', () => {
        const handleSubmit = jest.fn();
        const wrapper = shallow(<ProductCardTotal {...props} onSubmit={handleSubmit} />);

        wrapper.find('.product-card-total__button').simulate('click', {} as React.SyntheticEvent);
        expect(handleSubmit).toHaveBeenCalledTimes(1);
    });
});

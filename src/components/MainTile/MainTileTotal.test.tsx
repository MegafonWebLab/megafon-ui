import * as React from 'react';
import { shallow } from 'enzyme';
import MainTileTotal from './MainTileTotal';

const props = {
    payment: {
        value: '600 ₽',
        oldValue: '750 ₽',
        unit: 'в месяц',
    },
};

describe('<MainTileTotal />', () => {
    it('it renders MainTileTotal', () => {
        const wrapper = shallow(<MainTileTotal {...props} />);
        expect(wrapper).toMatchSnapshot();
    });
});

describe('<MainTileTotal />', () => {
    it('it handle handleSubmit prop', () => {
        const handleSubmit = jest.fn();
        const wrapper = shallow(<MainTileTotal {...props} handleSubmit={handleSubmit} />);

        wrapper.find('.main-tile-total__button').simulate('click', {} as React.SyntheticEvent);
        expect(handleSubmit).toHaveBeenCalledTimes(1);
    });
});

import * as React from 'react';
import { shallow } from 'enzyme';
import ProductCardTotal from './ProductCardTotal';

const props = {
    payment: {
        value: '600 ₽',
        oldValue: '750 ₽',
        unit: 'в месяц',
    },
    info: {},
    submitText: 'submitText',
    moreText: 'moreText',
    moreLink: 'moreLink',
    connectText: 'connectText',
    className: 'className',
    classNameWrap: 'classNameWrap',
    classNameCost: 'classNameCost',
    classNameButtons: 'classNameButtons',
    classNameSubmit: 'classNameSubmit',
    classNameMore: 'classNameMore',
    classNameConnect: 'classNameConnect',
    onClickConnect: jest.fn(),
    onClickMore: jest.fn(),
};

describe('<ProductCardTotal />', () => {
    it('it renders ProductCardTotal', () => {
        const wrapper = shallow(<ProductCardTotal {...props} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('it renders submit button', () => {
        const onSubmit = jest.fn();
        const wrapper = shallow(<ProductCardTotal {...props} onSubmit={onSubmit} submitLink="submitLink" />);
        expect(wrapper).toMatchSnapshot();
    });

    it('it handle handleSubmit prop', () => {
        const handleSubmit = jest.fn();
        const wrapper = shallow(<ProductCardTotal onSubmit={handleSubmit} />);

        wrapper.find('Button').simulate('click', {} as React.SyntheticEvent);
        expect(handleSubmit).toHaveBeenCalledTimes(1);
    });

    it('it handle click more button', () => {
        const handleClick = jest.fn();
        const wrapper = shallow(<ProductCardTotal onClickMore={handleClick} />);

        wrapper.find('Button').simulate('click', {} as React.SyntheticEvent);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('it handle click connect button', () => {
        const handleClick = jest.fn();
        const wrapper = shallow(<ProductCardTotal onClickConnect={handleClick} />);

        wrapper.find('.mfui-beta-product-card-total__connect-button').simulate('click', {} as React.SyntheticEvent);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});

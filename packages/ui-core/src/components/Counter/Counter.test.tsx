import * as React from 'react';
import { shallow } from 'enzyme';
import Counter from './Counter';

const props = {
    className: 'test-class',
    initialNumber: 10,
    minLimitedAmount: 3,
    maxLimitedAmount: 33,
};

describe('<Counter />', () => {
    describe('layout', () => {
        it('renders Counter', () => {
            const wrapper = shallow(
                <Counter />
            );
            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('layout', () => {
        it('renders Counter with props', () => {
            const wrapper = shallow(
                <Counter {...props} />
            );
            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('handlers', () => {
        it.only('calls onClick for left button', () => {
            const handleClick = jest.fn(counterValue => counterValue);

            const amount = 9;

            const wrapper = shallow(
                <Counter initialNumber={10} onChange={handleClick} />
            );

            wrapper.find('.counter__btn_left').simulate('click', {target: {className: 'counter__minus'}});

            expect(handleClick).toHaveBeenCalledWith(amount);
        });
    });

    describe('handlers', () => {
        it.only('calls onClick for right button', () => {
            const onClick = jest.fn(counterValue => counterValue);

            const amount = 11;

            const wrapper = shallow(
                <Counter initialNumber={10} onChange={onClick} />
            );

            wrapper.find('.counter__btn_right').simulate('click', {target: {className: 'counter__plus'}});

            expect(onClick).toHaveBeenCalledWith(amount);
        });
    });

    describe('handlers', () => {
        it.only('calls onChange for input', () => {
            const handleChange = jest.fn(counterValue => counterValue);

            const amount = 22;

            const wrapper = shallow(
                <Counter initialNumber={10} onChange={handleChange} />
            );

            wrapper.find('.counter__input').simulate('change', {target: {className: 'counter__input', value: 22}});
            expect(handleChange).toHaveBeenCalledWith(amount);
        });
    });

    describe('handlers', () => {
        it.only('calls onChange for input with wrong value', () => {
            const handleChange = jest.fn(counterValue => counterValue);

            const wrapper = shallow(
                <Counter initialNumber={10} onChange={handleChange} />
            );

            wrapper.find('.counter__input').simulate('change', {target: {className: 'counter__input', value: 'hello'}});
            expect(handleChange).not.toBeCalled();
        });
    });
});

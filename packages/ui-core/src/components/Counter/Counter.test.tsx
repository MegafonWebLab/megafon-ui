import * as React from 'react';
import { shallow } from 'enzyme';
import Counter from './Counter';

const props = {
    className: 'test-class',
    initialValue: 10,
    min: 3,
    max: 33,
    isDisabled: true,
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
        it('calls onClick for left button', () => {
            const handleClick = jest.fn();

            const wrapper = shallow(
                <Counter initialValue={10} onChange={handleClick} />
            );

            wrapper.find('button').first().simulate('click');
            expect(handleClick).toHaveBeenCalledWith(9);
        });
    });

    describe('handlers', () => {
        it('calls onClick for right button', () => {
            const handleClick = jest.fn();

            const wrapper = shallow(
                <Counter initialValue={10} onChange={handleClick} />
            );

            wrapper.find('button').at(1).simulate('click');
            expect(handleClick).toHaveBeenCalledWith(11);
        });
    });

    describe('handlers', () => {
        it('calls onChange for input', () => {
            const handleChange = jest.fn();

            const wrapper = shallow(
                <Counter onChange={handleChange} />
            );

            wrapper.find('input').simulate('change', { target: { value: 22 } });
            expect(handleChange).toHaveBeenCalledWith(22);
        });
    });

    describe('handlers', () => {
        it('calls onChange for input with wrong value', () => {
            const handleChange = jest.fn();

            const wrapper = shallow(
                <Counter initialValue={10} onChange={handleChange} />
            );

            wrapper.find('input').simulate('change', {target: { value: 'hello' } });
            expect(handleChange).not.toBeCalled();
        });
    });

    describe('handlers', () => {
        it('calls onClick for left button near min limit', () => {
            const handleClick = jest.fn();

            const wrapper = shallow(
                <Counter initialValue={3} min={3} onChange={handleClick} />
            );

            wrapper.find('button').first().simulate('click');
            expect(handleClick).not.toHaveBeenCalledWith(2);
        });
    });

    describe('handlers', () => {
        it('calls onClick for right button near max limit', () => {
            const handleClick = jest.fn();

            const wrapper = shallow(
                <Counter initialValue={33} max={33} onChange={handleClick} />
            );

            wrapper.find('button').at(1).simulate('click');
            expect(handleClick).not.toHaveBeenCalledWith(34);
        });
    });
});

import * as React from 'react';
import { shallow, mount } from 'enzyme';
import Counter, { ICounterProps } from './Counter';

const props: ICounterProps = {
    initialValue: 10,
    min: 3,
    max: 33,
    disabled: true,
    className: 'class-name',
    classes: {
        root: 'root-class',
        buttonMinus: 'button-minus-class',
        buttonPlus: 'button-plus-class',
        input: 'input-class',
    },
};

describe('<Counter />', () => {
    describe('layout', () => {
        it('renders Counter', () => {
            const wrapper = shallow(<Counter />);
            expect(wrapper).toMatchSnapshot();
        });

        it('renders Counter with props', () => {
            const wrapper = shallow(<Counter {...props} />);
            expect(wrapper).toMatchSnapshot();
        });

        it('renders Counter with "isControlled" props', () => {
            const wrapper = shallow(<Counter {...props} isControlled value={15} />);
            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('handlers', () => {
        it('calls onChange for buttons', () => {
            const handleClick = jest.fn();

            const wrapper = shallow(<Counter initialValue={10} onChange={handleClick} />);

            wrapper.find('button').first().simulate('click');
            expect(handleClick).toHaveBeenCalledWith(9);

            wrapper.find('button').at(1).simulate('click');
            expect(handleClick).toHaveBeenCalledWith(10);
        });

        it('calls onChange for input', () => {
            const handleChange = jest.fn();

            const wrapper = shallow(<Counter onChange={handleChange} />);

            wrapper.find('input').simulate('change', { target: { value: 22 } });
            expect(handleChange).toHaveBeenCalledWith(22);
        });

        it('calls onChange for input with wrong value', () => {
            const handleChange = jest.fn();

            const wrapper = shallow(<Counter initialValue={10} onChange={handleChange} />);

            wrapper.find('input').simulate('change', { target: { value: 'hello' } });
            expect(handleChange).not.toBeCalled();
        });

        it('calls onChange for input with value less than min limit and more than max limit', () => {
            const handleChange = jest.fn();

            const wrapper = shallow(<Counter min={3} max={33} onChange={handleChange} />);

            wrapper.find('input').simulate('change', { target: { value: 2 } });
            expect(handleChange).toHaveBeenCalledWith(3);

            wrapper.find('input').simulate('change', { target: { value: 34 } });
            expect(handleChange).toHaveBeenCalledWith(33);
        });

        it('calls onChange for left button near min limit', () => {
            const handleClick = jest.fn();

            const wrapper = mount(<Counter initialValue={3} min={3} onChange={handleClick} />);

            wrapper.find('button').first().simulate('click');
            expect(handleClick).not.toHaveBeenCalled();
        });

        it('calls onChange for right button near max limit', () => {
            const handleClick = jest.fn();

            const wrapper = mount(<Counter initialValue={33} max={33} onChange={handleClick} />);

            wrapper.find('button').at(1).simulate('click');
            expect(handleClick).not.toHaveBeenCalled();
        });
    });
});

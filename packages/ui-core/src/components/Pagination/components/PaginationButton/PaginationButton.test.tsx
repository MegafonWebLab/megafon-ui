import React from 'react';
import { shallow, mount } from 'enzyme';
import PaginationButton from './PaginationButton';

describe('PaginationButton', () => {
    it('should render component', () => {
        const wrapper = shallow(<PaginationButton>Click me</PaginationButton>);

        expect(wrapper).toMatchSnapshot();
    });

    it('should render disabled button', () => {
        const wrapper = shallow(<PaginationButton isDisabled>Click me</PaginationButton>);

        expect(wrapper).toMatchSnapshot();
    });

    it('should render active button', () => {
        const wrapper = shallow(<PaginationButton isActive>Click me</PaginationButton>);

        expect(wrapper).toMatchSnapshot();
    });

    it('should render with optional props', () => {
        const wrapper = shallow(
            <PaginationButton
                theme="light"
                className="custom-class-name"
                value={1}
                onClick={jest.fn()}
            >
                Click me
            </PaginationButton>
        );

        expect(wrapper).toMatchSnapshot();
    });

    describe('click handler', () => {
        const clickHandler = jest.fn();

        afterEach(() => {
            jest.clearAllMocks();
        });

        it('should call click handler with valid arguments', () => {
            const value = 1;
            const wrapper = shallow(<PaginationButton value={value} onClick={clickHandler}>Click me</PaginationButton>);

            wrapper.simulate('click');

            expect(clickHandler).toHaveBeenCalledWith(value);
        });

        it('should not call click handler on disabled button', () => {
            const wrapper = mount(<PaginationButton onClick={clickHandler} isDisabled>Click me</PaginationButton>);

            wrapper.simulate('click');

            expect(clickHandler).not.toHaveBeenCalled();
        });
    });
});

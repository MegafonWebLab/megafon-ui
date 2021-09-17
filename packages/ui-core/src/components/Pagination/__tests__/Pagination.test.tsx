import { shallow, mount } from 'enzyme';
import React from 'react';
import Pagination from '../Pagination';

describe('Pagination', () => {
    it('should render component with number of buttons does not exceed the limit', () => {
        const wrapper = shallow(<Pagination totalPages={3} activePage={1} onChange={jest.fn()} />);

        expect(wrapper).toMatchSnapshot();
    });

    it('should render component with right hidden buttons', () => {
        const wrapper = shallow(<Pagination totalPages={10} activePage={1} onChange={jest.fn()} />);

        expect(wrapper).toMatchSnapshot();
    });

    it('should render component with left hidden buttons', () => {
        const wrapper = shallow(<Pagination totalPages={10} activePage={8} onChange={jest.fn()} />);

        expect(wrapper).toMatchSnapshot();
    });

    it('should render component with left and right hidden buttons', () => {
        const wrapper = shallow(<Pagination totalPages={10} activePage={5} onChange={jest.fn()} />);

        expect(wrapper).toMatchSnapshot();
    });

    it('should disable left navigation button if first page button is active', () => {
        const wrapper = shallow(<Pagination totalPages={3} activePage={1} onChange={jest.fn()} />);
        const button = wrapper.find('PaginationNavigation').first();

        expect(button.prop('isDisabled')).toBeTruthy();
    });

    it('should disable right navigation button if last page button is active', () => {
        const wrapper = shallow(<Pagination totalPages={3} activePage={3} onChange={jest.fn()} />);
        const button = wrapper.find('PaginationNavigation').last();

        expect(button.prop('isDisabled')).toBeTruthy();
    });

    describe('render on mobile resolution', () => {
        type LocalWindowType = Omit<Window, 'innerWidth'> & {
            innerWidth: number;
        };

        const localWindow = window as LocalWindowType;
        const windowInnerWidth = window.innerWidth;

        beforeAll(() => {
            localWindow.innerWidth = 320;
        });

        afterAll(() => {
            localWindow.innerWidth = windowInnerWidth;
        });

        it('should render component with right hidden buttons', () => {
            const wrapper = mount(<Pagination totalPages={10} activePage={1} onChange={jest.fn()} />);

            expect(wrapper).toMatchSnapshot();
        });

        it('should render component with left hidden buttons', () => {
            const wrapper = mount(<Pagination totalPages={10} activePage={8} onChange={jest.fn()} />);

            expect(wrapper).toMatchSnapshot();
        });

        it('should render component with left and right hidden buttons', () => {
            const wrapper = mount(<Pagination totalPages={10} activePage={5} onChange={jest.fn()} />);

            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('should call change handler with valid arguments', () => {
        const handleChange = jest.fn();

        afterEach(() => {
            jest.clearAllMocks();
        });

        it('after click on back button', () => {
            const activePage = 2;
            const wrapper = shallow(<Pagination totalPages={3} activePage={activePage} onChange={handleChange} />);
            const button = wrapper.find('PaginationNavigation').first();

            button.simulate('click');

            expect(handleChange).toHaveBeenCalledWith(activePage - 1);
        });

        it('after click on next button', () => {
            const activePage = 2;
            const wrapper = shallow(<Pagination totalPages={3} activePage={activePage} onChange={handleChange} />);
            const button = wrapper.find('PaginationNavigation').last();

            button.simulate('click');

            expect(handleChange).toHaveBeenCalledWith(activePage + 1);
        });

        it('after click on page button', () => {
            const wrapper = mount(<Pagination totalPages={3} activePage={1} onChange={handleChange} />);
            const button = wrapper.find('PaginationButton').at(1);
            const value = button.prop('value');

            button.simulate('click');

            expect(handleChange).toHaveBeenCalledWith(value);
        });
    });
});

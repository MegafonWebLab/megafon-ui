import React from 'react';
import { shallow } from 'enzyme';
import PaginationNavigation from './PaginationNavigation';

describe('PaginationNavigation', () => {
    it('should render component', () => {
        const wrapper = shallow(<PaginationNavigation dataAttrs={{ root: { 'data-test': 'test' } }} />);

        expect(wrapper).toMatchSnapshot();
    });

    it('should render with left direction', () => {
        const wrapper = shallow(<PaginationNavigation direction="left" />);

        expect(wrapper).toMatchSnapshot();
    });
});

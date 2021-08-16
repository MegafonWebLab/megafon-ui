/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { shallow } from 'enzyme';
import React from 'react';
import PaginationNavigation from './PaginationNavigation';

describe('PaginationNavigation', () => {
    it('should render component', () => {
        const wrapper = shallow(<PaginationNavigation />);

        expect(wrapper).toMatchSnapshot();
    });

    it('should render with left direction', () => {
        const wrapper = shallow(<PaginationNavigation direction="left" />);

        expect(wrapper).toMatchSnapshot();
    });
});

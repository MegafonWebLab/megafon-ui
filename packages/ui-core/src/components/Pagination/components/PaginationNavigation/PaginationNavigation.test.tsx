import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import PaginationNavigation from './PaginationNavigation';

describe('PaginationNavigation', () => {
    it('should render component', () => {
        const { container } = render(<PaginationNavigation />);

        expect(container).toMatchSnapshot();
    });

    it('should render with left direction', () => {
        const { getByRole } = render(<PaginationNavigation direction="left" />);

        expect(getByRole('button')).toHaveClass('mfui-pagination-navigation_direction_left');
    });

    it('should call onClick', () => {
        const onClickMock = jest.fn();
        const { getByRole } = render(<PaginationNavigation direction="left" onClick={onClickMock} />);

        fireEvent.click(getByRole('button'));

        expect(onClickMock).toBeCalled();
    });
});

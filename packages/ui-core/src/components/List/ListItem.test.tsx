import * as React from 'react';
import { render } from '@testing-library/react';
import ListItem from './ListItem';

describe('<ListItem />', () => {
    it('should render ListItem', () => {
        const { container } = render(<ListItem>item</ListItem>);

        expect(container).toMatchSnapshot();
    });

    it('should render with className', () => {
        const { container } = render(<ListItem className="custom-class">item</ListItem>);

        expect(container.firstElementChild).toHaveClass('custom-class');
    });
});

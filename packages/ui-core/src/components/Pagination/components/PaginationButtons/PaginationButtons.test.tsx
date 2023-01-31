import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import PaginationButtons from './PaginationButtons';

const hiddenButton = 'hidden';
const items = [1, hiddenButton, 3];

describe('PaginationButtons', () => {
    it('should render component', () => {
        const { container } = render(
            <PaginationButtons
                dataAttrs={{ root: { 'data-test': 'test' } }}
                items={items}
                onClick={jest.fn()}
                activeButton={3}
                hiddenButton={hiddenButton}
            />,
        );

        expect(container).toMatchSnapshot();
    });

    it('should call click handler', () => {
        const clickHandler = jest.fn();
        const { getAllByRole } = render(
            <PaginationButtons items={items} onClick={clickHandler} activeButton={3} hiddenButton={hiddenButton} />,
        );

        fireEvent.click(getAllByRole('button')[0]);
        expect(clickHandler).toHaveBeenCalled();
    });
});

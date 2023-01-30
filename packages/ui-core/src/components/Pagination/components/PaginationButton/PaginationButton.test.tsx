import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import PaginationButton from './PaginationButton';

describe('PaginationButton', () => {
    it('should render component', () => {
        const { container } = render(<PaginationButton>Click me</PaginationButton>);

        expect(container).toMatchSnapshot();
    });

    it('should render disabled button', () => {
        const { getByRole } = render(<PaginationButton disabled>Click me</PaginationButton>);

        expect(getByRole('button')).toBeDisabled();
    });

    it('should render active button', () => {
        const { getByRole } = render(<PaginationButton isActive>Click me</PaginationButton>);

        expect(getByRole('button')).toHaveClass('mfui-pagination-button_active');
    });

    it('should render with light theme', () => {
        const { getByRole } = render(<PaginationButton theme="light">Click me</PaginationButton>);

        expect(getByRole('button')).toHaveClass('mfui-pagination-button_theme_light');
    });

    it('should render with className props', () => {
        const { getByRole } = render(<PaginationButton className="testClass">Click me</PaginationButton>);

        expect(getByRole('button')).toHaveClass('testClass');
    });

    it('should render with dataAttrs props', () => {
        const { getByRole } = render(
            <PaginationButton dataAttrs={{ root: { 'data-testid': 'test' } }}>Click me</PaginationButton>,
        );

        expect(getByRole('button')).toHaveAttribute('data-testid', 'test');
    });

    it('should call onClick with value props', () => {
        const value = 1;
        const onClickMock = jest.fn();
        const { getByRole } = render(
            <PaginationButton value={value} onClick={onClickMock}>
                Click me
            </PaginationButton>,
        );

        fireEvent.click(getByRole('button'));

        expect(onClickMock).toBeCalledWith(value);
    });

    it('should call onClick without value', () => {
        const onClickMock = jest.fn();
        const { getByRole } = render(<PaginationButton onClick={onClickMock}>Click me</PaginationButton>);

        fireEvent.click(getByRole('button'));

        expect(onClickMock).toBeCalledWith(undefined);
    });
});

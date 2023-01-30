import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Pagination from '../Pagination';

describe('Pagination', () => {
    it('should render', () => {
        const { container } = render(<Pagination totalPages={3} activePage={2} onChange={jest.fn()} />);

        expect(container).toMatchSnapshot();
    });

    it('should disable left navigation button if first page button is active', () => {
        const { getByTestId } = render(
            <Pagination
                totalPages={3}
                activePage={1}
                onChange={jest.fn()}
                dataAttrs={{ prev: { 'data-testid': 'prev' } }}
            />,
        );

        expect(getByTestId('prev')).toBeDisabled();
    });

    it('should disable right navigation button if last page button is active', () => {
        const { getByTestId } = render(
            <Pagination
                totalPages={3}
                activePage={3}
                onChange={jest.fn()}
                dataAttrs={{ next: { 'data-testid': 'next' } }}
            />,
        );

        expect(getByTestId('next')).toBeDisabled();
    });

    it('should render component with one hidden buttons of left side', () => {
        const { getAllByTestId } = render(<Pagination totalPages={10} activePage={1} onChange={jest.fn()} />);

        const hiddenButtons = getAllByTestId('hiddenButton');

        expect(hiddenButtons.length).toEqual(1);
        expect(hiddenButtons[0]).toBeDisabled();
    });

    it('should render component with one hidden buttons of right side', () => {
        const { getAllByTestId } = render(<Pagination totalPages={10} activePage={8} onChange={jest.fn()} />);

        const hiddenButtons = getAllByTestId('hiddenButton');

        expect(hiddenButtons.length).toEqual(1);
        expect(hiddenButtons[0]).toBeDisabled();
    });

    it('should render component with two hidden buttons', () => {
        const { getAllByTestId } = render(<Pagination totalPages={10} activePage={5} onChange={jest.fn()} />);

        const hiddenButtons = getAllByTestId('hiddenButton');

        expect(hiddenButtons.length).toEqual(2);
        expect(hiddenButtons[0]).toBeDisabled();
        expect(hiddenButtons[1]).toBeDisabled();
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
            const { getAllByTestId } = render(<Pagination totalPages={10} activePage={1} onChange={jest.fn()} />);

            const hiddenButtons = getAllByTestId('hiddenButton');

            expect(hiddenButtons.length).toEqual(1);
            expect(hiddenButtons[0]).toBeDisabled();
        });

        it('should render component with left hidden buttons', () => {
            const { getAllByTestId } = render(<Pagination totalPages={10} activePage={8} onChange={jest.fn()} />);

            const hiddenButtons = getAllByTestId('hiddenButton');

            expect(hiddenButtons.length).toEqual(1);
            expect(hiddenButtons[0]).toBeDisabled();
        });

        it('should render component with left and right hidden buttons', () => {
            const { getAllByTestId } = render(<Pagination totalPages={10} activePage={5} onChange={jest.fn()} />);

            const hiddenButtons = getAllByTestId('hiddenButton');

            expect(hiddenButtons.length).toEqual(2);
            expect(hiddenButtons[0]).toBeDisabled();
            expect(hiddenButtons[1]).toBeDisabled();
        });
    });

    describe('should call onChange', () => {
        const onChangeMock = jest.fn();

        afterEach(() => {
            jest.clearAllMocks();
        });

        it('after click on back button', () => {
            const activePage = 2;
            const { getByTestId } = render(
                <Pagination
                    totalPages={3}
                    activePage={activePage}
                    onChange={onChangeMock}
                    dataAttrs={{ prev: { 'data-testid': 'prev' } }}
                />,
            );

            fireEvent.click(getByTestId('prev'));

            expect(onChangeMock).toHaveBeenCalledWith(activePage - 1);
        });

        it('after click on next button', () => {
            const activePage = 2;
            const { getByTestId } = render(
                <Pagination
                    totalPages={3}
                    activePage={activePage}
                    onChange={onChangeMock}
                    dataAttrs={{ next: { 'data-testid': 'next' } }}
                />,
            );

            fireEvent.click(getByTestId('next'));

            expect(onChangeMock).toHaveBeenCalledWith(activePage + 1);
        });

        it('after click on page button', () => {
            const { getByTestId } = render(
                <Pagination
                    totalPages={3}
                    activePage={1}
                    onChange={onChangeMock}
                    dataAttrs={{ button: { 'data-testid': 'button' } }}
                />,
            );

            fireEvent.click(getByTestId('button[1]'));
            expect(onChangeMock).toHaveBeenCalledWith(1);
        });
    });
});

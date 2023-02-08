import * as React from 'react';
import { cnCreate } from '@megafon/ui-helpers';
import { act, fireEvent, render, within } from '@testing-library/react';
import Select, { ISelectProps, ISelectItem } from './Select';

const cn = cnCreate('mfui-select');

const props: ISelectProps<number> = {
    className: 'custom-class',
    label: 'test-label',
    labelId: '1',
    noticeText: 'test-notice-text',
    required: true,
    placeholder: 'test-placeholder',
    classes: {
        root: 'root',
        control: 'control',
        title: 'title',
        titleInner: 'title-inner',
        list: 'list',
        listInner: 'list-inner',
        listItem: 'list-item',
        listItemTitle: 'list-item-title',
    },
    items: [
        {
            value: 1,
            title: 'first item title',
        },
        {
            value: 2,
            title: 'second item title',
        },
    ],
    dataAttrs: {
        root: {
            'data-testid': 'root',
        },
        label: {
            'data-testid': 'label',
        },
        control: {
            'data-testid': 'control',
        },
        title: {
            'data-testid': 'title',
        },
        titleInner: {
            'data-testid': 'title-inner',
        },
        input: {
            'data-testid': 'input',
        },
        noticeText: {
            'data-testid': 'notice-text',
        },
        list: {
            'data-testid': 'list',
        },
        listInner: {
            'data-testid': 'list-inner',
        },
        listItem: {
            'data-testid': 'list-item',
        },
        listItemTitle: {
            'data-testid': 'list-item-title',
        },
        notFound: {
            'data-testid': 'not-found',
        },
    },
};

describe('<Select />', () => {
    describe('classic', () => {
        it('should render after initialization', () => {
            const { container } = render(<Select {...props} type="classic" />);

            expect(container).toMatchSnapshot();
        });

        it('should render after select item', () => {
            const { container, getByTestId, rerender } = render(<Select {...props} type="classic" />);
            const firstItem = getByTestId('list-item[1]');

            fireEvent.mouseEnter(firstItem);
            fireEvent.click(firstItem);

            rerender(<Select {...props} type="classic" currentValue={1} />);

            expect(container).toMatchSnapshot();
        });

        it('should render with dataAttrs', () => {
            const { getByTestId } = render(<Select {...props} />);

            expect(getByTestId('title')).toBeTruthy();
            expect(getByTestId('title-inner')).toBeTruthy();
        });

        it('should render with classes', () => {
            const { getByTestId } = render(<Select {...props} />);

            expect(getByTestId('title')).toHaveClass('title');
            expect(getByTestId('title-inner')).toHaveClass('title-inner');
        });

        it('should render when view is function', () => {
            const viewItems: Array<ISelectItem<number>> = [
                {
                    value: 111,
                    title: '111',
                    view: ({ filterValue, isItemActive }) => (
                        <div>
                            view {filterValue} {isItemActive && 'active'}
                        </div>
                    ),
                },
            ];
            const { queryByText } = render(<Select {...props} currentValue={111} type="classic" items={viewItems} />);

            expect(queryByText('view 111 active')).toBeInTheDocument();
        });

        it('should render when view is element', () => {
            const viewItems = [
                {
                    value: 111,
                    title: 'new-test-name-1',
                    view: <div>item 1</div>,
                },
            ];
            const { queryByText } = render(<Select {...props} type="classic" items={viewItems} />);

            expect(queryByText('item 1')).toBeInTheDocument();
        });

        it('should render when view is missing', () => {
            const { queryByText } = render(<Select {...props} type="classic" />);

            expect(queryByText('first item title')).toBeInTheDocument();
        });

        it('should render with placeholder', () => {
            const { queryByText } = render(<Select {...props} />);

            expect(queryByText('test-placeholder')).toBeInTheDocument();
        });

        it('should call onSelect', () => {
            const handleSelectItem = jest.fn();
            const { getByTestId } = render(<Select {...props} onSelect={handleSelectItem} />);

            fireEvent.mouseEnter(getByTestId('list-item[1]'));
            fireEvent.click(getByTestId('list-item[1]'));

            expect(handleSelectItem).toBeCalledWith(expect.any(Object), { title: 'first item title', value: 1 });
        });

        it('should call onOpened and onClosed when click on select', () => {
            const handleOpened = jest.fn();
            const handleClosed = jest.fn();
            const { getByTestId } = render(
                <Select<number> {...props} onOpened={handleOpened} onClosed={handleClosed} />,
            );

            fireEvent.click(getByTestId('title'));
            expect(handleOpened).toBeCalled();

            fireEvent.click(getByTestId('title'));
            expect(handleClosed).toBeCalled();
        });

        it('should call onOpened when keyDown Enter with focus', () => {
            const handleOpened = jest.fn();
            const { getByTestId } = render(<Select<number> {...props} onOpened={handleOpened} />);

            fireEvent.focus(getByTestId('title'));
            fireEvent.keyDown(getByTestId('control'), { key: 'Enter' });

            expect(handleOpened).toBeCalled();
        });
    });

    describe('combobox', () => {
        it('should render after initialization', () => {
            const { container } = render(<Select {...props} type="combobox" />);

            expect(container).toMatchSnapshot();
        });

        it('should render after changing input', async () => {
            const { container, getByTestId } = render(<Select {...props} type="combobox" />);

            fireEvent.change(getByTestId('input'), { target: { value: 'first' } });

            await act(async () => {
                await new Promise(r => setTimeout(r, 250));
            });

            expect(container).toMatchSnapshot();
        });

        it('should render after select item', async () => {
            const { container, getByTestId, rerender } = render(<Select {...props} type="combobox" />);

            fireEvent.change(getByTestId('input'), { target: { value: 'first' } });

            await act(async () => {
                await new Promise(r => setTimeout(r, 250));
            });

            const firstItem = getByTestId('list-item[1]');

            fireEvent.mouseEnter(firstItem);
            fireEvent.click(firstItem);

            rerender(<Select {...props} type="combobox" currentValue={1} />);

            expect(container).toMatchSnapshot();
        });

        it('should render with dataAttrs', () => {
            const { getByTestId } = render(<Select {...props} type="combobox" items={[]} />);

            expect(getByTestId('input')).toBeTruthy();
            expect(getByTestId('not-found')).toBeTruthy();
        });

        it('should render when view is function', () => {
            const viewItems: Array<ISelectItem<number>> = [
                {
                    value: 111,
                    title: '111',
                    view: ({ filterValue, isItemActive }) => (
                        <div>
                            view {filterValue} {isItemActive && 'active'}
                        </div>
                    ),
                },
            ];
            const { queryByText } = render(<Select {...props} currentValue={111} type="combobox" items={viewItems} />);

            expect(queryByText('view 111 active')).toBeInTheDocument();
        });

        it('should render when view is element', () => {
            const viewItems = [
                {
                    value: 111,
                    title: 'new-test-name-1',
                    view: <div>item 1</div>,
                },
            ];
            const { queryByText } = render(<Select {...props} type="combobox" items={viewItems} />);

            expect(queryByText('item 1')).toBeInTheDocument();
        });

        it('should render when view is missing', async () => {
            const { getByTestId } = render(<Select {...props} type="combobox" />);
            const input = getByTestId('input');

            fireEvent.change(input, { target: { value: 'first' } });

            await act(async () => {
                await new Promise(r => setTimeout(r, 250));
            });

            const firstItem = getByTestId('list-item-title[1]');
            const fragment = firstItem.firstElementChild;

            expect(firstItem.textContent).toEqual('first item title');
            expect(fragment?.textContent).toEqual('first');
        });

        it('should render with default notFoundText', () => {
            const { queryByText } = render(<Select {...props} type="combobox" items={[]} />);

            expect(queryByText('Ничего не нашлось')).toBeInTheDocument();
        });

        it('should render with custom notFoundText', () => {
            const { queryByText } = render(
                <Select {...props} type="combobox" items={[]} notFoundText="Not found text" />,
            );

            expect(queryByText('Not found text')).toBeInTheDocument();
        });

        it('should render without notFoundText when items are not empty array', () => {
            const { queryByText } = render(<Select {...props} type="combobox" notFoundText="Not found text" />);

            expect(queryByText('Not found text')).not.toBeInTheDocument();
        });

        it('should render with placeholder', () => {
            const { getByTestId } = render(<Select {...props} type="combobox" />);

            expect(getByTestId('input')).toHaveAttribute('placeholder', 'test-placeholder');
        });

        it('should call onSelect', () => {
            const handleSelectItem = jest.fn();
            const { getByTestId } = render(<Select<number> {...props} type="combobox" onSelect={handleSelectItem} />);
            const input = getByTestId('input');

            fireEvent.change(input, { target: { value: 'test' } });

            expect(handleSelectItem).toBeCalledWith(null);
        });

        it('should call onOpened when focus in input', () => {
            const handleOpened = jest.fn();
            const { getByTestId } = render(<Select<number> {...props} type="combobox" onOpened={handleOpened} />);

            fireEvent.focus(getByTestId('input'));

            expect(handleOpened).toBeCalled();
        });
    });

    it('should render with classes', () => {
        const { getByTestId } = render(<Select {...props} />);

        expect(getByTestId('root')).toHaveClass('root');
        expect(getByTestId('root')).toHaveClass('custom-class');
        expect(getByTestId('control')).toHaveClass('control');
        expect(getByTestId('list')).toHaveClass('list');
        expect(getByTestId('list-inner')).toHaveClass('list-inner');
        expect(getByTestId('list-item[1]')).toHaveClass('list-item');
        expect(getByTestId('list-item-title[1]')).toHaveClass('list-item-title');
    });

    it('should render with dataAttrs', () => {
        const { getByTestId } = render(<Select {...props} />);

        expect(getByTestId('root')).toBeTruthy();
        expect(getByTestId('label')).toBeTruthy();
        expect(getByTestId('control')).toBeTruthy();
        expect(getByTestId('list')).toBeTruthy();
        expect(getByTestId('list-inner')).toBeTruthy();
        expect(getByTestId('list-item[1]')).toBeTruthy();
        expect(getByTestId('list-item-title[1]')).toBeTruthy();
    });

    it('should render when disabled is true', () => {
        const { getByTestId } = render(<Select {...props} disabled />);

        expect(getByTestId('root')).toHaveClass(cn({ disabled: true }));
    });

    it('should render when verification is valid', () => {
        const { getByTestId } = render(<Select {...props} items={[]} verification="valid" />);

        expect(getByTestId('root')).toHaveClass(cn({ valid: true }));
        expect(getByTestId('notice-text')).toHaveClass(cn('text_success'));
    });

    it('should render when verification is error', () => {
        const { getByTestId } = render(<Select {...props} items={[]} verification="error" />);

        expect(getByTestId('root')).toHaveClass(cn({ error: true }));
        expect(getByTestId('notice-text')).toHaveClass(cn('text_error'));
    });

    it('should render with noticeText', () => {
        const { queryByText } = render(<Select {...props} />);

        expect(queryByText('test-notice-text')).toBeInTheDocument();
    });

    it('should render with label', () => {
        const { queryByText } = render(<Select {...props} />);

        expect(queryByText('test-label')).toBeInTheDocument();
    });

    it('should render with labelId', () => {
        const { getByTestId } = render(<Select {...props} />);

        expect(getByTestId('label')).toHaveAttribute('for', '1');
    });

    it('should render when required is true', () => {
        const { getByTestId } = render(<Select {...props} />);
        const marker = within(getByTestId('label')).queryByText('*');

        expect(marker).toBeInTheDocument();
    });

    it('should render when required is false', () => {
        const { getByTestId } = render(<Select {...props} required={false} />);
        const marker = within(getByTestId('label')).queryByText('*');

        expect(marker).not.toBeInTheDocument();
    });

    it('should render with shortList', () => {
        const { getByTestId } = render(<Select {...props} shortList />);

        expect(getByTestId('list-inner')).toHaveClass(cn('list-inner_short'));
    });

    it('should render after update with new prop items', () => {
        const newItems = [
            {
                value: 111,
                title: 'new-test-name-1',
            },
            {
                value: 222,
                title: 'new-test-name-2',
            },
        ];
        const { queryByText, rerender } = render(<Select {...props} />);

        rerender(<Select {...props} items={newItems} />);

        expect(queryByText('new-test-name-1')).toBeInTheDocument();
        expect(queryByText('new-test-name-2')).toBeInTheDocument();
    });

    it('should call onClosed when click on select item', () => {
        const handleClosed = jest.fn();
        const { getByTestId } = render(<Select {...props} onClosed={handleClosed} />);

        fireEvent.click(getByTestId('title'));
        fireEvent.click(getByTestId('list-item[1]'));

        expect(handleClosed).toBeCalled();
    });

    describe('keyboard actions', () => {
        it('should handle ArrowUp and ArrowDown', () => {
            const { getByTestId } = render(<Select<number> {...props} />);
            const title = getByTestId('title');
            const control = getByTestId('control');
            const firstListItem = getByTestId('list-item[1]');
            const secondListItem = getByTestId('list-item[2]');
            const activeListItemClass = cn('list-item_hovered');

            fireEvent.click(title);

            expect(firstListItem).toHaveClass(activeListItemClass);

            fireEvent.keyDown(control, { key: 'ArrowDown' });

            expect(firstListItem).not.toHaveClass(activeListItemClass);
            expect(secondListItem).toHaveClass(activeListItemClass);

            fireEvent.keyDown(control, { key: 'ArrowUp' });

            expect(firstListItem).toHaveClass(activeListItemClass);
            expect(secondListItem).not.toHaveClass(activeListItemClass);
        });

        it('should handle Tab', () => {
            const { getByTestId } = render(<Select<number> {...props} />);
            const root = getByTestId('root');
            const title = getByTestId('title');
            const control = getByTestId('control');
            const rootOpenClass = cn({ open: true });

            fireEvent.click(title);

            expect(root).toHaveClass(rootOpenClass);

            fireEvent.keyDown(control, { key: 'Tab' });

            expect(root).not.toHaveClass(rootOpenClass);
        });

        it('should handle Enter with focus to open items list', () => {
            const { getByTestId } = render(<Select {...props} />);
            const root = getByTestId('root');
            const title = getByTestId('title');
            const control = getByTestId('control');

            fireEvent.focus(title);
            fireEvent.keyDown(control, { key: 'Enter' });

            expect(root).toHaveClass(cn({ open: true }));
        });
    });
});

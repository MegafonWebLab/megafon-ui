import * as React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import Search, { SearchItem, ISearchProps } from './Search';

const customItems: SearchItem = {
    paddings: 'small',
    searchView: (
        <div>
            <div>
                <b>ИП Баранник Александр Николаевич</b>
            </div>
            <div>
                <b>ИНН: 503209463031</b>
            </div>
            <div>Московская обл, Одинцовский р-н, г Одинцово</div>
        </div>
    ),
    value: `ИП Баранник Александр Николаевич`,
};

const props: ISearchProps = {
    label: 'label',
    className: 'test',
    searchId: 'searchId',
    value: 'initial value',
    noticeText: 'noticeText',
    placeholder: 'type to search here',
    classes: {
        input: 'inputClass',
        label: 'labelClass',
        icon: 'controlClass',
        control: 'controlClass',
        listItemTitle: 'listItemTitleClass',
    },
    dataAttrs: {
        root: { 'data-testid': 'root' },
        item: { 'data-testid': 'item' },
        submit: { 'data-testid': 'submit' },
        notice: { 'data-testid': 'notice' },
        control: { 'data-testid': 'control' },
        itemTitle: { 'data-testid': 'itemTitle' },
        searchField: { 'data-testid': 'searchField' },
    },
    items: [{ value: 'title' }, customItems],
    onBlur: jest.fn(),
    onFocus: jest.fn(),
    onChange: jest.fn(),
    onSubmit: jest.fn(),
};

describe('<Search />', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render', () => {
        const { container } = render(<Search />);

        expect(container).toMatchSnapshot();
    });

    it('should render with dataAttrs', () => {
        const { getByTestId } = render(<Search dataAttrs={props.dataAttrs} items={[props.items?.[0] as SearchItem]} />);

        expect(getByTestId('root')).toBeInTheDocument();
        expect(getByTestId('item[1]')).toBeInTheDocument();
        expect(getByTestId('submit')).toBeInTheDocument();
        expect(getByTestId('searchField')).toBeInTheDocument();
    });

    it('should render with value', () => {
        const { getByTestId } = render(<Search dataAttrs={props.dataAttrs} value={props.value} />);

        expect(getByTestId('searchField')).toHaveAttribute('value', props.value);
        expect(getByTestId('searchField')).toHaveClass('mfui-search__search-field_filled');
    });

    it('should render without label', () => {
        const { getByTestId } = render(<Search dataAttrs={props.dataAttrs} />);

        expect(getByTestId('searchField').closest('label')).toHaveClass('mfui-search__search-wrapper_no-label');
    });

    it('should render with label', () => {
        const { getByTestId, getByText } = render(<Search dataAttrs={props.dataAttrs} label={props.label} />);

        expect(getByTestId('searchField').closest('label')).toHaveClass('mfui-search__search-wrapper_labeled');
        expect(getByTestId('searchField').closest('label')).not.toHaveClass('mfui-search__search-wrapper_no-label');
        expect(getByText(props.label as string)).toMatchSnapshot();
    });

    it('should render with searchId', () => {
        const { getByTestId } = render(<Search dataAttrs={props.dataAttrs} searchId={props.searchId} />);

        expect(getByTestId('searchField')).toHaveAttribute('id', props.searchId);
    });

    it('should render with placeholder', () => {
        const { getByTestId } = render(<Search dataAttrs={props.dataAttrs} placeholder={props.placeholder} />);

        expect(getByTestId('searchField')).toHaveAttribute('placeholder', props.placeholder);
    });

    it('should render without icon', () => {
        const { queryByTestId } = render(<Search dataAttrs={props.dataAttrs} hideIcon />);

        expect(queryByTestId('submit')).not.toBeInTheDocument();
    });

    it('should render with items', () => {
        const { container, getByTestId } = render(<Search dataAttrs={props.dataAttrs} items={props.items} />);

        expect(container).toMatchSnapshot();
        expect(getByTestId('item[2]')).toHaveClass('mfui-search__list-item_paddings_small');
    });

    it('should render with noticeText and verification="valid"', () => {
        const { getByTestId } = render(
            <Search dataAttrs={props.dataAttrs} noticeText={props.noticeText} verification="valid" />,
        );
        const noticeTextNode = getByTestId('notice');

        expect(getByTestId('control')).toHaveClass('mfui-search__control_success');
        expect(noticeTextNode).toHaveClass('mfui-search__notice_success');
        expect(noticeTextNode).toMatchSnapshot();
    });

    it('should render with noticeText and verification="error"', () => {
        const { getByTestId } = render(
            <Search dataAttrs={props.dataAttrs} noticeText={props.noticeText} verification="error" />,
        );
        const noticeTextNode = getByTestId('notice');

        expect(getByTestId('control')).toHaveClass('mfui-search__control_error');
        expect(noticeTextNode).toHaveClass('mfui-search__notice_error');
    });

    it('should render disabled', () => {
        const { getByTestId } = render(<Search dataAttrs={props.dataAttrs} disabled />);

        expect(getByTestId('root')).toHaveClass('mfui-search_disabled');
        expect(getByTestId('searchField')).toHaveAttribute('disabled', '');
    });

    it('should render with required', () => {
        const { getByText } = render(<Search dataAttrs={props.dataAttrs} required label={props.label} />);

        expect(getByText(props.label as string)).toMatchSnapshot();
    });

    it('should render with className', () => {
        const { getByTestId } = render(<Search dataAttrs={props.dataAttrs} className={props.className} />);

        expect(getByTestId('root')).toHaveClass(props.className as string);
    });

    it('should render with classes', () => {
        const { getByTestId, getByText } = render(
            <Search
                label={props.label}
                classes={props.classes}
                dataAttrs={props.dataAttrs}
                items={[props.items?.[0] as SearchItem]}
            />,
        );

        expect(getByTestId('searchField')).toHaveClass(props.classes?.input as string);
        expect(getByText(props.label as string)).toHaveClass(props.classes?.label as string);
        expect(getByTestId('submit').firstChild).toHaveAttribute(
            'classname',
            `mfui-search__icon ${props.classes?.icon as string}`,
        );
        expect(getByTestId('control')).toHaveClass(props.classes?.control as string);
        expect(getByTestId('itemTitle[1]')).toHaveClass(props.classes?.listItemTitle as string);
    });

    it('should call onChange without changeDelay', () => {
        const newValue = 'newValue';
        const { getByTestId } = render(
            <Search dataAttrs={props.dataAttrs} changeDelay={0} onChange={props.onChange} />,
        );

        fireEvent.change(getByTestId('searchField'), { target: { value: newValue } });
        expect(props.onChange).toBeCalledWith(newValue);
    });

    it('should call onChange with changeDelay', async () => {
        const newValue = 'newValue';
        const { getByTestId } = render(
            <Search dataAttrs={props.dataAttrs} changeDelay={300} onChange={props.onChange} />,
        );

        await waitFor(() => {
            fireEvent.change(getByTestId('searchField'), { target: { value: newValue } });
        });

        await waitFor(
            () => {
                expect(props.onChange).toBeCalledWith(newValue);
            },
            { timeout: 350 },
        );
    });

    it('should call onSubmit by click on search icon', () => {
        const searchValue = 'searchValue';
        const { getByTestId } = render(<Search dataAttrs={props.dataAttrs} onSubmit={props.onSubmit} />);

        fireEvent.change(getByTestId('searchField'), { target: { value: searchValue } });
        fireEvent.click(getByTestId('submit'));

        expect(props.onSubmit).toBeCalledWith(searchValue);
    });

    it('should call onSubmit by press Enter on search field', () => {
        const searchValue = 'searchValue';
        const { getByTestId } = render(<Search dataAttrs={props.dataAttrs} onSubmit={props.onSubmit} />);
        const input = getByTestId('searchField');

        fireEvent.change(input, { target: { value: searchValue } });
        fireEvent.keyDown(input, { key: 'Enter' });

        expect(props.onSubmit).toBeCalledWith(searchValue);
    });

    it('should call onSubmit by press Enter on search item', () => {
        const { getByTestId } = render(
            <Search dataAttrs={props.dataAttrs} items={props.items} onSubmit={props.onSubmit} />,
        );
        const input = getByTestId('searchField');

        fireEvent.click(input);
        fireEvent.mouseEnter(getByTestId('item[1]'));
        fireEvent.keyDown(input, { key: 'Enter' });

        expect(props.onSubmit).toBeCalledWith(props.items?.[0].value);
    });

    it('should call onSubmit by search item click', () => {
        const { getByTestId } = render(
            <Search dataAttrs={props.dataAttrs} onSubmit={props.onSubmit} items={props.items} />,
        );
        const item = getByTestId('item[1]');

        fireEvent.click(getByTestId('searchField'));
        fireEvent.mouseEnter(item);
        fireEvent.mouseDown(item);

        expect(props.onSubmit).toBeCalledWith(props.items?.[0].value);
    });

    it('should not call onSubmit by search item click when input is disabled', () => {
        const { getByTestId } = render(
            <Search dataAttrs={props.dataAttrs} disabled onSubmit={props.onSubmit} items={props.items} />,
        );
        const item = getByTestId('item[1]');

        fireEvent.click(getByTestId('searchField'));
        fireEvent.mouseEnter(item);
        fireEvent.mouseDown(item);

        expect(props.onSubmit).not.toBeCalled();
    });

    it('should call onBlur', () => {
        const { getByTestId } = render(<Search dataAttrs={props.dataAttrs} onBlur={props.onBlur} />);

        fireEvent.blur(getByTestId('searchField'));
        expect(props.onBlur).toBeCalled();
    });

    it('should call onFocus', () => {
        const { getByTestId } = render(<Search dataAttrs={props.dataAttrs} onFocus={props.onFocus} />);

        fireEvent.focus(getByTestId('searchField'));
        expect(props.onFocus).toBeCalled();
    });

    it('should render active search item', () => {
        const { getByTestId } = render(<Search dataAttrs={props.dataAttrs} items={props.items} />);
        const item = getByTestId('item[1]');

        fireEvent.click(getByTestId('searchField'));
        fireEvent.mouseEnter(item);

        expect(item).toHaveClass('mfui-search__list-item_active');
    });

    it('should be active second item by press ArrowDown on search field', () => {
        const { getByTestId } = render(<Search dataAttrs={props.dataAttrs} items={props.items} />);
        const input = getByTestId('searchField');

        fireEvent.click(input);
        fireEvent.mouseEnter(getByTestId('item[1]'));
        fireEvent.keyDown(input, { key: 'ArrowDown' });

        expect(getByTestId('item[2]')).toHaveClass('mfui-search__list-item_active');
    });

    it('should be active first item by press ArrowUp on search field', () => {
        const { getByTestId } = render(<Search dataAttrs={props.dataAttrs} items={props.items} />);
        const input = getByTestId('searchField');

        fireEvent.click(input);
        fireEvent.mouseEnter(getByTestId('item[2]'));
        fireEvent.keyDown(input, { key: 'ArrowUp' });

        expect(getByTestId('item[1]')).toHaveClass('mfui-search__list-item_active');
    });
});

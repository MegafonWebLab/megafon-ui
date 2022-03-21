import * as React from 'react';
import { cnCreate } from '@megafon/ui-helpers';
import { shallow, mount } from 'enzyme';
import Select, { ISelectProps, SelectTypes, Verification, ISelectItem } from './Select';

const cn = cnCreate('mfui-select');

const props: ISelectProps<number> = {
    className: 'test-class',
    label: 'test-label',
    labelId: '1',
    noticeText: 'test-notice-text',
    required: true,
    placeholder: 'test-placeholder',
    classes: {
        root: 'test-root-class',
        control: 'test-control-class',
        title: 'test-title',
        titleInner: 'test-title-inner',
        list: 'list',
        listItem: 'list-item',
        listItemTitle: 'list-item-title',
    },
    items: [
        {
            value: 1,
            title: 'test-name-1',
        },
        {
            value: 2,
            title: 'test-name-2',
        },
    ],
    dataAttrs: {
        root: {
            'data-root': 'test',
            'incorrect-attr': 'test',
        },
        label: {
            'data-label': 'test',
            'incorrect-attr': 'test',
        },
        title: {
            'data-title': 'test',
            'incorrect-attr': 'test',
        },
        input: {
            'data-input': 'test',
            'incorrect-attr': 'test',
        },
        noticeText: {
            'data-notice-text': 'test',
            'incorrect-attr': 'test',
        },
        listItem: {
            'data-list-item': 'test',
            'incorrect-attr': 'test',
        },
        listItemTitle: {
            'data-list-item-title': 'test',
            'incorrect-attr': 'test',
        },
        notFound: {
            'data-not-found': 'test',
            'incorrect-attr': 'test',
        },
    },
};

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

const viewItems: Array<ISelectItem<number>> = [
    {
        value: 111,
        title: '111',
        view: ({ filterValue }) => <div>view {filterValue}</div>,
    },
];

describe('<Select />', () => {
    describe('snapshots', () => {
        it('renders with default props', () => {
            const wrapper = mount(<Select items={props.items} />);
            expect(wrapper).toMatchSnapshot();
        });

        it('renders with props', () => {
            const wrapper = mount(<Select<number> {...props} />);
            expect(wrapper).toMatchSnapshot();
        });

        it('renders combobox after update with new prop items', () => {
            const wrapper = mount(<Select<number> {...props} type="combobox" />);

            wrapper.setProps({ items: newItems });
            wrapper.update();

            expect(wrapper).toMatchSnapshot();
        });

        it('it renders with data attributes', () => {
            const wrapper = shallow(<Select dataAttrs={props.dataAttrs} items={props.items} />);
            expect(wrapper).toMatchSnapshot();
        });

        it('should render items.view as function and type combobox', () => {
            const wrapper = shallow(<Select type="combobox" items={viewItems} dataAttrs={props.dataAttrs} />);
            wrapper.find(`.${cn('combobox')}`).simulate('change', { target: { value: '123' } });

            expect(wrapper).toMatchSnapshot();
        });

        it('should render items.view as function and type classic', () => {
            const wrapper = shallow(<Select items={viewItems} dataAttrs={props.dataAttrs} />);
            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('states of select', () => {
        it('renders with disabled state', () => {
            const handleClick = jest.fn();
            const wrapper = shallow(<Select onSelect={handleClick} items={[]} disabled />);

            wrapper.find(`.${cn('control')}`).simulate('click');

            expect(handleClick).not.toHaveBeenCalled();
            expect(wrapper).toMatchSnapshot();
        });

        it('renders with valid state', () => {
            const wrapper = shallow(<Select items={[]} verification={Verification.VALID} noticeText="success" />);
            expect(wrapper).toMatchSnapshot();
        });

        it('renders with error state', () => {
            const wrapper = shallow(<Select items={[]} verification={Verification.ERROR} noticeText="error" />);
            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('onSelect', () => {
        it('calls onSelect', () => {
            const handleSelectItem = jest.fn();
            const wrapper = mount(<Select {...props} onSelect={handleSelectItem} />);
            const listItem = `.${cn('list-item')}`;
            const listItemActive = `${cn('list-item_hovered')}`;

            wrapper.find(`.${cn('title')}`).simulate('click');
            wrapper.find(listItem).at(1).simulate('click');

            expect(wrapper.find(listItem).at(0).hasClass(listItemActive)).toEqual(true);
            expect(wrapper.find(listItem).at(1).hasClass(listItemActive)).toEqual(false);
        });

        it('calls onSelect with null when type combobox after chosen item and change value', () => {
            jest.useFakeTimers();

            const handleSelectItem = jest.fn();
            const wrapper = mount(
                <Select<number> {...props} type={SelectTypes.COMBOBOX} onSelect={handleSelectItem} />,
            );
            const combobox = `.${cn('combobox')}`;
            const listItem = `.${cn('list-item')}`;

            wrapper.find(combobox).simulate('focus');
            wrapper.find(listItem).at(1).simulate('click');
            wrapper.find(combobox).simulate('change', {
                target: {
                    value: 'name-1',
                },
            });

            expect(handleSelectItem).toBeCalledWith(null);

            jest.useRealTimers();
        });
    });

    describe('onOpened and onClosed', () => {
        it('calls onOpened and onClosed when click on select', () => {
            const handleOpened = jest.fn();
            const handleClosed = jest.fn();
            const wrapper = mount(<Select<number> {...props} onOpened={handleOpened} onClosed={handleClosed} />);

            wrapper.find(`.${cn('title')}`).simulate('click');
            expect(handleOpened).toBeCalled();

            wrapper.find(`.${cn('title')}`).simulate('click');
            expect(handleClosed).toBeCalled();
        });

        it('calls onClosed when click on select item', () => {
            const handleSelectItem = jest.fn();
            const handleClosed = jest.fn();
            const wrapper = mount(<Select {...props} onSelect={handleSelectItem} onClosed={handleClosed} />);

            wrapper.find(`.${cn('title')}`).simulate('click');
            wrapper
                .find(`.${cn('list-item')}`)
                .last()
                .simulate('click');

            expect(handleClosed).toBeCalled();
        });

        it('calls onOpened when focus in input', () => {
            const handleOpened = jest.fn();
            const wrapper = mount(<Select<number> {...props} type={SelectTypes.COMBOBOX} onOpened={handleOpened} />);

            wrapper.find(`.${cn('combobox')}`).simulate('focus');
            expect(handleOpened).toBeCalled();
        });

        it('calls onOpened when keyDown Enter with focus', () => {
            const handleOpened = jest.fn();
            const wrapper = mount(<Select<number> {...props} onOpened={handleOpened} />);

            wrapper.find(`.${cn('title')}`).simulate('focus');
            wrapper.find(`.${cn('control')}`).simulate('keyDown', { key: 'Enter', preventDefault: () => undefined });
            expect(handleOpened).toBeCalled();
        });
    });

    describe('key typing handlers', () => {
        it('calls onChange while typing in the field with debounce', async () => {
            const wrapper = shallow(<Select<number> {...props} type={SelectTypes.COMBOBOX} />);

            expect(wrapper).toMatchSnapshot();

            wrapper.find(`.${cn('combobox')}`).simulate('change', {
                target: {
                    value: 'test-name-1',
                },
            });

            await new Promise(r => setTimeout(r, 150));

            expect(wrapper).toMatchSnapshot();

            await new Promise(r => setTimeout(r, 100));

            expect(wrapper).toMatchSnapshot();
        });

        it('highlighted text', () => {
            const wrapper = shallow(<Select<number> {...props} type={SelectTypes.COMBOBOX} />);

            wrapper.find(`.${cn('combobox')}`).simulate('change', {
                target: {
                    value: 'name-1',
                },
            });

            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('keyboard actions', () => {
        it('handles ArrowUp and ArrowDown', () => {
            const wrapper = mount(<Select<number> {...props} />);
            const title = wrapper.find(`.${cn('title')}`);
            const control = wrapper.find(`.${cn('control')}`);
            const listItem = `.${cn('list-item')}`;
            const listItemActive = `${cn('list-item_hovered')}`;

            title.simulate('click');
            expect(wrapper.find(listItem).at(0).hasClass(listItemActive)).toEqual(true);

            control.simulate('keyDown', { key: 'ArrowDown', preventDefault: () => undefined });
            expect(wrapper.find(listItem).at(0).hasClass(listItemActive)).toEqual(false);
            expect(wrapper.find(listItem).at(1).hasClass(listItemActive)).toEqual(true);

            control.simulate('keyDown', { key: 'ArrowUp', preventDefault: () => undefined });
            expect(wrapper.find(listItem).at(0).hasClass(listItemActive)).toEqual(true);
            expect(wrapper.find(listItem).at(1).hasClass(listItemActive)).toEqual(false);
        });

        it('handles Tab', () => {
            const wrapper = mount(<Select<number> {...props} />);
            const title = wrapper.find(`.${cn('title')}`);
            const control = wrapper.find(`.${cn('control')}`);

            title.simulate('click');
            expect(wrapper).toMatchSnapshot();

            control.simulate('keyDown', { key: 'Tab', preventDefault: () => undefined });
            expect(wrapper).toMatchSnapshot();
        });

        it('handles Enter with focus to open items list', () => {
            const handleSelectItem = jest.fn();
            const wrapper = mount(<Select {...props} onSelect={handleSelectItem} />);
            const control = wrapper.find(`.${cn('control')}`);
            const title = wrapper.find(`.${cn('title')}`);

            title.simulate('focus');
            control.simulate('keyDown', { key: 'Enter', preventDefault: () => undefined });

            expect(wrapper.find(`.${cn()}_open`).exists()).toBeTruthy();
        });
    });
});

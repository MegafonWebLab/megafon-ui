import * as React from 'react';
import { shallow, mount } from 'enzyme';
import Select, { ISelectProps, SelectTypes, Verification } from './Select';
import cnCreate from 'utils/cnCreate';

let mockedDebounce;
jest.mock('lodash.debounce', () => {
    mockedDebounce = jest.fn().mockImplementation((fn) => fn);
    return mockedDebounce;
});

const cn = cnCreate('mfui-beta-select');

const props: ISelectProps = {
    className: 'test-class',
    label: 'test-label',
    labelId: '1',
    noticeText: 'test-notice-text',
    required: true,
    placeholder: 'test-placeholder',
    classes: {
        control: 'test-control-class',
        root: 'test-root-class',
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
        'data-test': 'test',
        'incorrect-attr': 'test',
    },
};

describe('<Select />', () => {
    describe('snapshots', () => {
        it('it renders Select', () => {
            const wrapper = mount(<Select items={props.items} />);
            expect(wrapper).toMatchSnapshot();
        });

        it('it renders Select with props', () => {
            const wrapper = mount(<Select {...props} />);
            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('states of select', () => {
        it('it renders with disabled state', () => {
            const handleClick = jest.fn();
            const wrapper = shallow(<Select items={[]} isDisabled />);

            wrapper.find(`.${cn('control')}`).simulate('click');

            expect(handleClick).not.toHaveBeenCalled();
            expect(wrapper).toMatchSnapshot();
        });

        it('it renders with valid state', () => {
            const wrapper = shallow(<Select items={[]} verification={Verification.VALID} />);
            expect(wrapper).toMatchSnapshot();
        });

        it('it renders with error state', () => {
            const wrapper = shallow(<Select items={[]} verification={Verification.ERROR} />);
            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('onSelect', () => {
        it('calls onSelect', () => {
            const handleSelectItem = jest.fn();
            const wrapper = shallow(<Select {...props} onSelect={handleSelectItem} />);
            const listItem = `.${cn('list-item')}`;
            const listItemActive = 'mfui-beta-select__list-item_active';

            wrapper.find(`.${cn('title')}`).simulate('click');
            wrapper.find(listItem).at(1).simulate('click');

            expect(wrapper.find(listItem).at(0).hasClass(listItemActive)).toEqual(true);
            expect(wrapper.find(listItem).at(1).hasClass(listItemActive)).toEqual(false);
        });
    });

    describe('typing', () => {
        it('calls onChange while typing in the field with debounce', () => {
            const wrapper = shallow(<Select {...props} type={SelectTypes.COMBOBOX}  />);

            wrapper.find(`.${cn('combobox')}`).simulate('change', {
                target: {
                    value: 'new value',
                },
            });

            expect(mockedDebounce).toBeCalledWith(expect.any(Function), 250);
            expect(wrapper.state('inputValue')).toEqual('new value');
        });

        it('highlighted text', () => {
            const wrapper = shallow(<Select {...props} type={SelectTypes.COMBOBOX}  />);

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
            const wrapper = mount(<Select {...props}  />);
            const title = wrapper.find(`.${cn('title')}`);
            const control = wrapper.find(`.${cn('control')}`);
            const listItem = `.${cn('list-item')}`;
            const listItemActive = 'mfui-beta-select__list-item_active';

            title.simulate('click');
            expect(wrapper.find(listItem).at(0).hasClass(listItemActive)).toEqual(true);

            control.simulate('keyDown', { key: 'ArrowDown', preventDefault: () => {}});
            expect(wrapper.find(listItem).at(0).hasClass(listItemActive)).toEqual(false);
            expect(wrapper.find(listItem).at(1).hasClass(listItemActive)).toEqual(true);

            control.simulate('keyDown', { key: 'ArrowUp', preventDefault: () => {}});
            expect(wrapper.find(listItem).at(0).hasClass(listItemActive)).toEqual(true);
            expect(wrapper.find(listItem).at(1).hasClass(listItemActive)).toEqual(false);
        });

        it('handles Tab', () => {
            const wrapper = mount(<Select {...props}  />);
            const title = wrapper.find(`.${cn('title')}`);
            const control = wrapper.find(`.${cn('control')}`);

            title.simulate('click');
            control.simulate('keyDown', { key: 'Tab', preventDefault: () => {}});

            expect(wrapper.state('isOpened')).toBeFalsy();
        });

        it('handles Enter to choose item', () => {
            const handleSelectItem = jest.fn();
            const wrapper = mount(<Select {...props} onSelect={handleSelectItem} />);
            const control = wrapper.find(`.${cn('control')}`);
            const title = wrapper.find(`.${cn('title')}`);
            const listItem = `.${cn('list-item')}`;
            const listItemActive = 'mfui-beta-select__list-item_active';

            title.simulate('click');
            control.simulate('keyDown', { key: 'Enter' });

            expect(handleSelectItem).toHaveBeenCalled();
            expect(wrapper.find(listItem).at(0).hasClass(listItemActive)).toEqual(true);
            expect(wrapper.state('inputValue')).toEqual(props.items[0].title);
        });

        it('handles Enter with focus to open items list', () => {
            const handleSelectItem = jest.fn();
            const wrapper = mount(<Select {...props} onSelect={handleSelectItem} />);
            const control = wrapper.find(`.${cn('control')}`);
            const title = wrapper.find(`.${cn('title')}`);

            title.simulate('focus');
            control.simulate('keyDown', { key: 'Enter', preventDefault: () => {}});

            expect(wrapper.state('isOpened')).toBeTruthy();
        });
    });

    it('it renders with data attributes', () => {
        const wrapper = shallow(<Select dataAttrs={props.dataAttrs} />);
        expect(wrapper).toMatchSnapshot();
    });
});

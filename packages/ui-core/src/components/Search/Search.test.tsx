import * as React from 'react';
import { shallow, mount } from 'enzyme';
import Search , { ISearchProps } from './Search';
import cnCreate from 'utils/cnCreate';

let mockedDebounce;
jest.mock('lodash.debounce', () => {
    mockedDebounce = jest.fn().mockImplementation((fn) => fn);
    return mockedDebounce;
});

const cn = cnCreate('mfui-search');

const props: ISearchProps = {
    value: 'initial value',
    placeholder: 'type to search here',
    onChange: jest.fn(),
    onSubmit: jest.fn(),
    items: [
        {
            title: 'item title',
            value: 'item value',
        },
        {
            title: 'another title',
            value: 'another value',
        },
    ],
};

describe('<Search />', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('snapshots', () => {
        it('renders Search without props correctly', () => {
            const wrapper = shallow(<Search />);
            expect(wrapper).toMatchSnapshot();
        });

        it('renders Search with all props correctly', () => {
            const wrapper = shallow(<Search {...props} />);
            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('typing', () => {
        it('calls onChange while typing in the field with delay', () => {
            const wrapper = shallow(<Search {...props} />);
            wrapper.find(`.${cn('search-field')}`).simulate('change', {
                target: {
                    value: 'new value',
                },
            });
            expect(mockedDebounce).toBeCalledWith(expect.any(Function), 500);
            expect(props.onChange).toBeCalledWith('new value');
        });
    });

    describe('submitting', () => {
        it('calls onSubmit on press Enter with focus on input', () => {
            const wrapper = shallow(<Search {...props} />);
            wrapper.find(`.${cn('search-field')}`).simulate('keyDown', { key: 'Enter' });
            expect(props.onSubmit).toBeCalledWith(props.value);
        });

        it('calls onSubmit on press Enter with value from items', () => {
            const wrapper = mount(<Search {...props} />);
            wrapper.find('SelectItem').at(0).simulate('mouseenter');
            wrapper.find(`.${cn('search-field')}`).simulate('keyDown', { key: 'Enter' });

            expect(props.onSubmit).toBeCalledWith('item value');
        });

        it('calls onSubmit by clicking on item', () => {
            const wrapper = mount(<Search {...props} />);
            wrapper.find('SelectItem').at(0).simulate('mouseenter');
            wrapper.find('SelectItem').at(0).simulate('mousedown');

            expect(props.onSubmit).toBeCalledWith('item value');
        });
    });

    describe('keyboard actions', () => {
        it('handles ArrowUp and ArrowDown correctly', () => {
            const wrapper = mount(<Search {...props} />);
            const searchField = wrapper.find(`.${cn('search-field')}`);

            searchField.simulate('keyDown', { key: 'ArrowDown', preventDefault: () => {}});
            expect(wrapper.find('SelectItem').at(0).prop('active')).toBe(true);

            searchField.simulate('keyDown', { key: 'ArrowDown', preventDefault: () => {}});
            expect(wrapper.find('SelectItem').at(0).prop('active')).toBe(false);
            expect(wrapper.find('SelectItem').at(1).prop('active')).toBe(true);

            searchField.simulate('keyDown', { key: 'ArrowUp', preventDefault: () => {}});
            expect(wrapper.find('SelectItem').at(0).prop('active')).toBe(true);
            expect(wrapper.find('SelectItem').at(1).prop('active')).toBe(false);
        });
    });
});

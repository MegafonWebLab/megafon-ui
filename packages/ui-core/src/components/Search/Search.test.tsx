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
    items: ['title', 'title2', 'title3', 'title4'],
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

        it('renders Search without icon', () => {
            const wrapper = shallow(<Search {...props} hideIcon />);
            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('typing', () => {
        it('highlighted text', () => {
            const wrapper = shallow(<Search {...props} />);

            wrapper.find(`.${cn('search-field')}`).simulate('change', {
                target: {
                    value: 'title2',
                },
            });

            expect(wrapper).toMatchSnapshot();
        });
        it('calls onChange while typing in the field with delay', () => {
            jest.useFakeTimers();

            const handleChange = jest.fn();
            const wrapper = shallow(<Search {...props} changeDelay={300} onChange={handleChange} />);

            wrapper.find(`.${cn('search-field')}`).simulate('change', {
                target: {
                    value: 'new value',
                },
            });

            jest.advanceTimersByTime(300);
            expect(handleChange).toHaveBeenCalledTimes(1);
        });
        it('calls onChange', () => {
            const handleChange = jest.fn();
            const wrapper = shallow(<Search {...props} changeDelay={0} onChange={handleChange} />);

            wrapper.find(`.${cn('search-field')}`).simulate('change', {
                target: {
                    value: 'new value',
                },
            });

            expect(handleChange).toBeCalledWith('new value');
        });
    });

    describe('submitting', () => {
        it('calls onSubmit on icon click', () => {
            const handleSubmit = jest.fn();
            const wrapper = shallow(<Search {...props} onSubmit={handleSubmit} />);

            wrapper.find(`.${cn('icon-box')}`).simulate('click');

            expect(handleSubmit).toBeCalledWith(props.value);
        });

        it('calls onSubmit on press Enter with focus on input', () => {
            const handleSubmit = jest.fn();
            const wrapper = shallow(<Search {...props} onSubmit={handleSubmit} />);

            wrapper.find(`.${cn('search-field')}`).simulate('keyDown', { key: 'Enter' });

            expect(handleSubmit).toBeCalledWith(props.value);
        });

        it('calls onSubmit on press Enter with value from items', () => {
            const handleSubmit = jest.fn();
            const wrapper = mount(<Search {...props} onSubmit={handleSubmit} />);

            wrapper.find(`.${cn('search-field')}`).simulate('change', {
                target: {
                    value: 'title',
                },
            });

            wrapper.find(`.${cn('list-item')}`).at(0).simulate('mouseenter');
            wrapper.find(`.${cn('search-field')}`).simulate('keyDown', { key: 'Enter' });

            expect(handleSubmit).toBeCalledWith('title');
        });

        it('calls onSubmit by clicking on item', () => {
            const handleSubmit = jest.fn();
            const listItem = `.${cn('list-item')}`;
            const wrapper = mount(<Search {...props} onSubmit={handleSubmit} />);

            wrapper.find(`.${cn('search-field')}`).simulate('change', {
                target: {
                    value: 'title',
                },
            });
            wrapper.find(listItem).at(0).simulate('mouseenter');
            wrapper.find(listItem).at(0).simulate('mousedown');

            expect(handleSubmit).toBeCalledWith('title');
        });
    });

    describe('keyboard actions', () => {
        it('handles ArrowUp and ArrowDown correctly', () => {
            const wrapper = mount(<Search {...props} />);
            const searchField = wrapper.find(`.${cn('search-field')}`);
            const listItem = `.${cn('list-item')}`;
            const listItemActive = `${cn('list-item_active')}`;

            searchField.simulate('change', {
                target: {
                    value: 'title',
                },
            });

            searchField.simulate('keyDown', { key: 'ArrowDown', preventDefault: () => {}});
            expect(wrapper.find(listItem).at(0).hasClass(listItemActive)).toEqual(true);

            searchField.simulate('keyDown', { key: 'ArrowDown', preventDefault: () => {}});
            expect(wrapper.find(listItem).at(0).hasClass(listItemActive)).toEqual(false);
            expect(wrapper.find(listItem).at(1).hasClass(listItemActive)).toEqual(true);

            searchField.simulate('keyDown', { key: 'ArrowUp', preventDefault: () => {}});
            expect(wrapper.find(listItem).at(0).hasClass(listItemActive)).toEqual(true);
            expect(wrapper.find(listItem).at(1).hasClass(listItemActive)).toEqual(false);
        });
    });
});

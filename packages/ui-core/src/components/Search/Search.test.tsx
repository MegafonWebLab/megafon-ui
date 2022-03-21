import * as React from 'react';
import { cnCreate } from '@megafon/ui-helpers';
import { shallow, mount } from 'enzyme';
import Search, { SearchItem, ISearchProps } from './Search';

const cn = cnCreate('mfui-search');

const getCustomItems = (): SearchItem[] => {
    const getContent = (index: number) => (
        <div>
            <div>
                <b>ИП Баранник Александр Николаевич {index + 1}</b>
            </div>
            <div>
                <b>ИНН: 503209463031</b>
            </div>
            <div>Московская обл, Одинцовский р-н, г Одинцово</div>
        </div>
    );

    return new Array(5).fill('').map((_, i) => ({
        value: `ИП Баранник Александр Николаевич ${i + 1}`,
        searchView: getContent(i),
    }));
};

const props: ISearchProps = {
    dataAttrs: {
        root: { 'data-testid': 'root-test' },
        searchField: { 'data-testid': 'searchField-test' },
        submit: { 'data-testid': 'submit-test' },
        item: { 'data-testid': 'item-test' },
    },
    value: 'initial value',
    placeholder: 'type to search here',
    items: [{ value: 'title' }, { value: 'title2' }, { value: 'title3' }, { value: 'title4' }],
    className: 'test',
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

        it('renders Search with classes', () => {
            const wrapper = shallow(
                <Search
                    {...props}
                    classes={{ listItemTitle: 'wrap-text-test', control: 'control-outer', icon: 'icon-outer' }}
                />,
            );
            expect(wrapper).toMatchSnapshot();
        });

        it('renders with label and required props', () => {
            const wrapper = shallow(<Search {...props} label="test label" required />);
            expect(wrapper).toMatchSnapshot();
        });

        it('renders with customItemsProps', () => {
            const wrapper = shallow(<Search {...props} items={getCustomItems()} />);
            expect(wrapper).toMatchSnapshot();
        });

        it('renders with noticeText and verification="valid"', () => {
            const wrapper = shallow(<Search {...props} noticeText="test notice text" verification="valid" />);
            expect(wrapper).toMatchSnapshot();
        });

        it('renders with noticeText and verification="error"', () => {
            const wrapper = shallow(<Search {...props} noticeText="test notice text" verification="error" />);
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
        it('calls onChange while typing in the field with delay', async () => {
            const handleChange = jest.fn();
            const wrapper = mount(<Search {...props} changeDelay={300} onChange={handleChange} />);

            wrapper.find(`.${cn('search-field')}`).simulate('change', {
                target: {
                    value: 'new value',
                },
            });

            expect(handleChange).not.toHaveBeenCalled();

            await new Promise(r => setTimeout(r, 150));

            expect(handleChange).not.toHaveBeenCalled();

            await new Promise(r => setTimeout(r, 150));

            expect(handleChange).toHaveBeenCalledWith('new value');
        });
        it('calls onChange while typing with changed onChange', async () => {
            const handleChange = jest.fn();
            const wrapper = mount(<Search {...props} changeDelay={300} onChange={undefined} />);

            wrapper.setProps({ changeDelay: 300, onChange: handleChange });
            wrapper.find(`.${cn('search-field')}`).simulate('change', {
                target: {
                    value: 'new value',
                },
            });

            await new Promise(r => setTimeout(r, 300));

            expect(handleChange).toHaveBeenCalledWith('new value');
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
        it('calls onBlur', () => {
            const handleBlur = jest.fn();
            const event = { target: { value: 'new value' } };
            const wrapper = shallow(<Search {...props} onBlur={handleBlur} />);

            wrapper.find(`.${cn('search-field')}`).simulate('blur', event);

            expect(handleBlur).toBeCalledWith(event);
        });
        it('calls onFocus', () => {
            const handleFocus = jest.fn();
            const event = { target: { value: 'new value' } };
            const wrapper = shallow(<Search {...props} onFocus={handleFocus} />);

            wrapper.find(`.${cn('search-field')}`).simulate('focus', event);

            expect(handleFocus).toBeCalledWith(event);
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

            wrapper
                .find(`.${cn('list-item')}`)
                .at(0)
                .simulate('mouseenter');
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

            searchField.simulate('keyDown', { key: 'ArrowDown', preventDefault: () => undefined });
            expect(wrapper.find(listItem).at(0).hasClass(listItemActive)).toEqual(true);

            searchField.simulate('keyDown', { key: 'ArrowDown', preventDefault: () => undefined });
            expect(wrapper.find(listItem).at(0).hasClass(listItemActive)).toEqual(false);
            expect(wrapper.find(listItem).at(1).hasClass(listItemActive)).toEqual(true);

            searchField.simulate('keyDown', { key: 'ArrowUp', preventDefault: () => undefined });
            expect(wrapper.find(listItem).at(0).hasClass(listItemActive)).toEqual(true);
            expect(wrapper.find(listItem).at(1).hasClass(listItemActive)).toEqual(false);
        });
    });
});

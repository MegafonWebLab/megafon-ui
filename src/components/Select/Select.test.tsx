import * as React from 'react';
import { shallow, mount } from 'enzyme';
import Select from './Select';
import SelectItem from './SelectItem';
import CheckedIcon from 'icons/checked_24.svg';

const props = {
    items: [
        {
            id: '1',
            title: 'test1',
        },
        {
            id: '2',
            title: 'test2',
        },
    ],
};

const controlSelector = '.mfui-select__control';
describe('<Select />', () => {
    it('it renders Select', () => {
        const wrapper = mount(<Select {...props} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('it renders witout icon', () => {
        const wrapper = shallow(<Select items={[]} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('it renders witout icon', () => {
        const wrapper = shallow(<Select items={[]} icon={<CheckedIcon />} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('it renders search', () => {
        const noop = () => { };
        const wrapper = mount(<Select {...props} onChangeSearch={noop} />);
        wrapper.find(controlSelector).simulate('click');
        expect(wrapper).toMatchSnapshot();
    });

    it('it renders hidden input', () => {
        const wrapper = shallow(<Select {...props} name="test" />);
        expect(wrapper).toMatchSnapshot();
    });

    it('it handles keydown with argument keyNavigation is false', () => {
        const wrapper = mount(<Select {...props} keyNavigation={false} />);
        wrapper.find(controlSelector).simulate('keydown', {
            keyCode: 40,
        });
        expect(wrapper.state('activeIndex')).toBe(0);
    });

    it('it handles keydown with arrow down', () => {
        const wrapper = mount(<Select {...props} placeholder="test" />);
        const instance = wrapper.instance() as Select;

        instance.itemWrapperNode.scrollTop = -1;
        wrapper.find(controlSelector).simulate('keydown', {
            keyCode: 40,
        });
        expect(wrapper.state('activeIndex')).not.toBe(0);
    });

    it('it handles keydown with arrow top', () => {
        const wrapper = mount(<Select {...props} />);
        const instance = wrapper.instance() as Select;

        instance.itemWrapperNode.scrollTop = 1;
        wrapper.setState({ activeIndex: 1 });
        wrapper.find(controlSelector).simulate('keydown', {
            keyCode: 38,
        });
        expect(wrapper.state('activeIndex')).toBe(0);
    });

    it('it handles keydown with enter', () => {
        const wrapper = mount(<Select {...props} />);
        wrapper.setState({ isOpen: true });
        wrapper.find(controlSelector).simulate('keydown', {
            keyCode: 13,
        });
        expect(wrapper.state('isOpen')).toBe(true);
    });

    it('it handles keydown with enter and isClose false', () => {
        const wrapper = mount(<Select {...props} />);
        wrapper.find(controlSelector).simulate('keydown', {
            keyCode: 13,
        });
        expect(wrapper.state('isOpen')).toBe(true);
    });

    it('it handles keydown with tab', () => {
        const wrapper = mount(<Select {...props} keyNavigation={true} />);
        wrapper.setState({ isOpen: true });
        wrapper.find(controlSelector).simulate('keydown', {
            keyCode: 9,
        });
        expect(wrapper.state('isOpen')).toBe(false);
    });

    it('it handles keydown with no register keyCode', () => {
        const wrapper = mount(<Select {...props} keyNavigation={true} />);
        wrapper.setState({ isOpen: true });
        wrapper.find(controlSelector).simulate('keydown', {
            keyCode: 2,
        });
        expect(wrapper.state('isOpen')).toBe(true);
    });

    it('it handles blur', () => {
        const wrapper = shallow(<Select {...props} />);
        wrapper.setState({ focus: true });
        wrapper.find(controlSelector).simulate('blur');
        expect(wrapper.state('focus')).toBe(false);
    });

    it('it handles focus', () => {
        const wrapper = shallow(<Select {...props} />);
        wrapper.setState({ focus: false });
        wrapper.find(controlSelector).simulate('focus');
        expect(wrapper.state('focus')).toBe(true);
    });

    it('it handles click outside', () => {
        const wrapper = shallow(<Select {...props} />);
        const instance = wrapper.instance() as Select;

        wrapper.setState({ isOpen: true });
        instance.getSelectNode({ contains() { return false; } });
        instance.onClickOutside({ target: {} });
        expect(wrapper.state('isOpen')).toBe(false);
    });

    it('it handles click outside in container', () => {
        const wrapper = shallow(<Select {...props} />);
        const instance = wrapper.instance() as Select;

        wrapper.setState({ isOpen: true });
        instance.getSelectNode({ contains() { return true; } });
        instance.onClickOutside({ target: {} });
        expect(wrapper.state('isOpen')).toBe(true);
    });

    it('it handles hover on item', () => {
        const wrapper = mount(<Select {...props} />);
        wrapper.find(SelectItem).find({ title: 'test2' }).simulate('mouseenter');
        expect(wrapper.state('activeIndex')).toBe(1);
    });

    it('it handles search focus', () => {
        const noop = () => { };
        const onFocusSearch = jest.fn();
        const wrapper = mount(<Select {...props} onChangeSearch={noop} onFocusSearch={onFocusSearch} />);
        wrapper.find('.mfui-select__search-field').simulate('focus');
        expect(onFocusSearch.mock.calls).toHaveLength(1);
    });

    it('it handles search change', () => {
        const onChangeSearch = jest.fn();
        const wrapper = mount(<Select {...props} onChangeSearch={onChangeSearch} />);
        wrapper.find('.mfui-select__search-field').simulate('change');
        expect(onChangeSearch.mock.calls).toHaveLength(1);
    });

    it('it handles search click', () => {
        const noop = () => { };
        const wrapper = mount(<Select {...props} onChangeSearch={noop} />);
        wrapper.find('.mfui-select__search-field').simulate('click');
        expect(wrapper.state('isOpen')).toBe(true);
    });

    it('it handles select item', () => {
        const onSelectItem = jest.fn();
        const wrapper = mount(<Select {...props} onSelectItem={onSelectItem} />);
        wrapper.find(SelectItem).find({ title: 'test2' }).simulate('click');
        expect(onSelectItem.mock.calls).toHaveLength(1);
    });

    it('it handles click title', () => {
        const wrapper = mount(<Select {...props} />);
        wrapper.setState({ isOpen: false });
        wrapper.find('.mfui-select__title').simulate('click');
        expect(wrapper.state('isOpen')).not.toBe(false);
    });

    it('it handles componentWillUnmount', () => {
        const componentWillUnmount = jest.spyOn(Select.prototype, 'componentWillUnmount');
        const wrapper = shallow(<Select {...props} />);
        wrapper.unmount();
        expect(componentWillUnmount.mock.calls).toHaveLength(1);
    });
});

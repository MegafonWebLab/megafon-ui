import * as React from 'react';
import { shallow } from 'enzyme';
import BubbleHint from './BubbleHint';

const props = {
    click: true,
};

describe('<BubbleHint />', () => {
    it('it renders BubbleHint', () => {
        const wrapper = shallow(<BubbleHint />);
        const instance = wrapper.instance() as BubbleHint;
        instance.getTrigger();
        expect(wrapper).toMatchSnapshot();
    });

    it('it renders with click', () => {
        const wrapper = shallow(<BubbleHint {...props} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('it checks popup is closed', () => {
        const wrapper = shallow(<BubbleHint />);
        const instance = wrapper.instance() as BubbleHint;
        wrapper.setState({ show: true });
        expect(wrapper.state('show')).toBe(true);
        instance.closePopup();
        expect(wrapper.state('show')).toBe(false);
    });

    it('it checks click outside', () => {
        const wrapper = shallow(<BubbleHint />);
        wrapper.setState({ show: true });
        expect(wrapper.state('show')).toBe(true);
        wrapper.instance().getContainer({ contains() { } });
        wrapper.instance().handleClickOutside({ target: {} });
        expect(wrapper.state('show')).toBe(false);
    });

    it('it checks click outside with closed popup', () => {
        const wrapper = shallow(<BubbleHint />);
        wrapper.instance().getContainer({ contains() { } });
        wrapper.instance().handleClickOutside({ target: {} });
        expect(wrapper.state('show')).toBe(false);
    });

    it('it handles handle click', () => {
        const onClick = jest.fn();
        const wrapper = shallow(<BubbleHint onClick={onClick} />);
        wrapper.instance().getTrigger({ contains() { return true; } });
        wrapper.instance().handleClick({ target: {} });
        expect(onClick.mock.calls).toHaveLength(1);
    });

    it('it handles handle click not contains element', () => {
        const onClick = jest.fn();
        const wrapper = shallow(<BubbleHint onClick={onClick} />);
        wrapper.instance().getTrigger({ contains() { return false; } });
        wrapper.instance().handleClick({ target: {} });
        expect(onClick.mock.calls).toHaveLength(0);
    });

    it('it handles onMouseLeave', () => {
        const onMouseLeave = jest.fn();
        const wrapper = shallow(<BubbleHint onMouseLeave={onMouseLeave} />);
        const instance = wrapper.instance() as BubbleHint;
        instance.handleMouseLeave();
        expect(onMouseLeave.mock.calls).toHaveLength(1);
    });

    it('it handles onMouseEnter', () => {
        const onMouseEnter = jest.fn();
        const wrapper = shallow(<BubbleHint onMouseEnter={onMouseEnter} />);
        const instance = wrapper.instance() as BubbleHint;
        instance.handleMouseEnter();
        expect(onMouseEnter.mock.calls).toHaveLength(1);
    });

    it('it handles componentWillUnmount', () => {
        const componentWillUnmount = jest.spyOn(BubbleHint.prototype, 'componentWillUnmount');
        const wrapper = shallow(<BubbleHint />);
        wrapper.unmount();
        expect(componentWillUnmount.mock.calls).toHaveLength(1);
    });
});

import * as React from 'react';
import { shallow } from 'enzyme';
import BubbleHint from './BubbleHint';

const props = {
    click: true,
};

const div = document.createElement('div');

describe('<BubbleHint />', () => {

    beforeEach(() => {
        div.contains = () => { return false; };
        jest.resetModules();
    });

    it('it renders BubbleHint', () => {
        jest.doMock('../../utils/detectTouch', () => {
            return jest.fn(() => true);
        });

        // tslint:disable-next-line:no-shadowed-variable
        const BubbleHint = require('./BubbleHint').default;
        const wrapper = shallow(<BubbleHint />);
        const instance = wrapper.instance() as BubbleHint;
        instance.getTrigger({} as HTMLDivElement);
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
        const instance = wrapper.instance() as BubbleHint;

        wrapper.setState({ show: true });
        expect(wrapper.state('show')).toBe(true);
        instance.getContainer(div);
        instance.handleClickOutside({ target: {} } as React.SyntheticEvent<EventTarget>);
        expect(wrapper.state('show')).toBe(false);
    });

    it('it checks click outside with closed popup', () => {
        const wrapper = shallow(<BubbleHint />);
        const instance = wrapper.instance() as BubbleHint;

        instance.getContainer(div);
        instance.handleClickOutside({ target: {} } as React.SyntheticEvent<EventTarget>);
        expect(wrapper.state('show')).toBe(false);
    });

    it('it handles handle click', () => {
        const onClick = jest.fn();
        const wrapper = shallow(<BubbleHint onClick={onClick} />);
        const instance = wrapper.instance() as BubbleHint;
        div.contains = () => { return true; };

        instance.getTrigger(div);
        instance.handleClick({ target: {} } as React.MouseEvent<HTMLElement>);
        expect(onClick.mock.calls).toHaveLength(1);
    });

    it('it handles handle click not contains element', () => {
        const onClick = jest.fn();
        const wrapper = shallow(<BubbleHint onClick={onClick} />);
        const instance = wrapper.instance() as BubbleHint;

        instance.getTrigger(div);
        instance.handleClick({ target: {} } as React.MouseEvent<HTMLElement>);
        expect(onClick.mock.calls).toHaveLength(0);
    });

    it('it handles onMouseLeave', () => {
        const onMouseLeave = jest.fn();
        const wrapper = shallow(<BubbleHint onMouseLeave={onMouseLeave} />);
        const instance = wrapper.instance() as BubbleHint;
        instance.handleMouseLeave({} as React.SyntheticEvent<EventTarget>);
        expect(onMouseLeave.mock.calls).toHaveLength(1);
    });

    it('it handles onMouseEnter', () => {
        const onMouseEnter = jest.fn();
        const wrapper = shallow(<BubbleHint onMouseEnter={onMouseEnter} />);
        const instance = wrapper.instance() as BubbleHint;

        instance.handleMouseEnter({} as React.SyntheticEvent<EventTarget>);
        expect(onMouseEnter.mock.calls).toHaveLength(1);
    });

    it('it handles componentWillUnmount', () => {
        const componentWillUnmount = jest.spyOn(BubbleHint.prototype, 'componentWillUnmount');
        const wrapper = shallow(<BubbleHint />);
        wrapper.unmount();
        expect(componentWillUnmount.mock.calls).toHaveLength(1);
    });
});

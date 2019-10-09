import * as React from 'react';
import { shallow, mount } from 'enzyme';
import Textarea from './Textarea';

describe('<Textarea />', () => {
    it('it renders Textarea', () => {
        const wrapper = shallow(<Textarea />);
        expect(wrapper).toMatchSnapshot();
    });

    it('it renders texts', () => {
        const wrapper = shallow(<Textarea commentText="text" successText="text" />);
        expect(wrapper).toMatchSnapshot();
    });

    it('it renders without valid icon', () => {
        const wrapper = shallow(<Textarea valid={true} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('it renders without error icon', () => {
        const wrapper = shallow(<Textarea error={true} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('it renders error icon', () => {
        const wrapper = shallow(<Textarea error={true} noticeText="text" />);
        expect(wrapper).toMatchSnapshot();
    });

    it('it renders valid icon', () => {
        const wrapper = shallow(<Textarea valid={true} noticeText="text" />);
        expect(wrapper).toMatchSnapshot();
    });

    it('is checked shouldComponentUpdate', () => {
        const wrapper = shallow(<Textarea error={true} noticeText="text" />);

        wrapper.setProps({ error: true, noticeText: 'text' });
        expect(wrapper).toMatchSnapshot();
    });

    it('is checked shouldComponentUpdate with new props', () => {
        const wrapper = shallow(<Textarea error={true} noticeText="text" />);

        wrapper.setProps({ error: false, noticeText: 'text' });
        expect(wrapper).toMatchSnapshot();
    });

    it('is checked focus method', () => {
        const wrapper = mount(<Textarea />);
        const instance = wrapper.instance() as Textarea;

        expect(() => instance.focus()).not.toThrow();
    });

    it('is checked blur method', () => {
        const wrapper = mount(<Textarea />);
        const instance = wrapper.instance() as Textarea;

        expect(() => instance.blur()).not.toThrow();
    });
});
